import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { findCustomerForUser } from "../_shared/billing.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !userData.user) throw new Error("Not authenticated");

    const { data: roleData } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden: admin only" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { action } = body;

    if (action === "list-users") {
      const { data: authUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers({ perPage: 100 });
      if (listError) throw listError;

      const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });

      const users = [];
      for (const u of authUsers.users) {
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("display_name, avatar_url")
          .eq("id", u.id)
          .maybeSingle();

        const { data: roles } = await supabaseAdmin
          .from("user_roles")
          .select("role")
          .eq("user_id", u.id);

        let subscription = null;
        {
          try {
            const customerId = await findCustomerForUser(stripe, u);
            if (customerId) {
              const subs = await stripe.subscriptions.list({ customer: customerId, limit: 1 });
              if (subs.data.length > 0) {
                const sub = subs.data[0];
                subscription = {
                  id: sub.id,
                  status: sub.status,
                  current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
                  trial_end: sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
                  cancel_at: sub.cancel_at ? new Date(sub.cancel_at * 1000).toISOString() : null,
                };
              }
            }
          } catch { /* skip */ }
        }

        users.push({
          id: u.id,
          email: u.email,
          created_at: u.created_at,
          last_sign_in_at: u.last_sign_in_at,
          display_name: profile?.display_name || null,
          avatar_url: profile?.avatar_url || null,
          roles: roles?.map(r => r.role) || [],
          subscription,
        });
      }

      return new Response(JSON.stringify({ users }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "update-subscription") {
      const { userId: targetUserId, newEndDate } = body;
      if (!targetUserId || !newEndDate) throw new Error("userId and newEndDate required");

      const { data: target, error: tErr } = await supabaseAdmin.auth.admin.getUserById(targetUserId);
      if (tErr || !target.user) throw new Error("User not found");

      const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });
      const customerId = await findCustomerForUser(stripe, target.user);
      if (!customerId) throw new Error("No Stripe customer found");

      const subs = await stripe.subscriptions.list({ customer: customerId, limit: 1 });
      if (subs.data.length === 0) throw new Error("No subscription found");

      const newEnd = Math.floor(new Date(newEndDate).getTime() / 1000);
      await stripe.subscriptions.update(subs.data[0].id, {
        trial_end: newEnd,
        proration_behavior: "none",
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "update-profile") {
      const { userId: targetUserId, displayName, avatarUrl } = body;
      if (!targetUserId) throw new Error("userId required");
      const updates: Record<string, string> = {};
      if (displayName !== undefined) updates.display_name = displayName;
      if (avatarUrl !== undefined) updates.avatar_url = avatarUrl;
      const { error: updErr } = await supabaseAdmin
        .from("profiles")
        .update(updates)
        .eq("id", targetUserId);
      if (updErr) throw updErr;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete-user") {
      const { userId: targetUserId } = body;
      if (!targetUserId) throw new Error("userId required");
      const { error: delErr } = await supabaseAdmin.auth.admin.deleteUser(targetUserId);
      if (delErr) throw delErr;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "set-role") {
      const { userId: targetUserId, role: targetRole } = body;
      if (!targetUserId || !targetRole) throw new Error("userId and role required");

      if (targetRole === "remove") {
        await supabaseAdmin.from("user_roles").delete().eq("user_id", targetUserId);
      } else {
        // Remove existing roles first, then insert new one
        await supabaseAdmin.from("user_roles").delete().eq("user_id", targetUserId);
        await supabaseAdmin.from("user_roles").insert({ user_id: targetUserId, role: targetRole });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "make-me-admin") {
      // Special bootstrap: if no admins exist, let the caller become admin
      const { count } = await supabaseAdmin
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .eq("role", "admin");

      if ((count ?? 0) > 0) {
        return new Response(JSON.stringify({ error: "Admin already exists" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await supabaseAdmin.from("user_roles").insert({ user_id: userData.user.id, role: "admin" });
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("Unknown action");
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
