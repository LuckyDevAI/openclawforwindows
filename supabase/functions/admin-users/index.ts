import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

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
    // Auth check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !userData.user) throw new Error("Not authenticated");

    // Check admin role
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

    const { action } = await req.json();

    if (action === "list-users") {
      // List all auth users with their profiles and subscription info
      const { data: authUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers({ perPage: 100 });
      if (listError) throw listError;

      const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });

      const users = [];
      for (const u of authUsers.users) {
        // Get profile
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("display_name, avatar_url")
          .eq("id", u.id)
          .maybeSingle();

        // Get role
        const { data: roles } = await supabaseAdmin
          .from("user_roles")
          .select("role")
          .eq("user_id", u.id);

        // Get Stripe subscription
        let subscription = null;
        if (u.email) {
          try {
            const customers = await stripe.customers.list({ email: u.email, limit: 1 });
            if (customers.data.length > 0) {
              const subs = await stripe.subscriptions.list({
                customer: customers.data[0].id,
                limit: 1,
              });
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
          } catch {
            // Stripe error, skip
          }
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
      const { email, newEndDate } = await req.json().catch(() => ({}));
      // Re-parse from original body
      const body = JSON.parse(await new Response(req.body).text().catch(() => "{}"));
      const targetEmail = body.email;
      const targetEndDate = body.newEndDate;

      if (!targetEmail || !targetEndDate) throw new Error("email and newEndDate required");

      const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });
      const customers = await stripe.customers.list({ email: targetEmail, limit: 1 });
      if (customers.data.length === 0) throw new Error("No Stripe customer found");

      const subs = await stripe.subscriptions.list({
        customer: customers.data[0].id,
        limit: 1,
      });
      if (subs.data.length === 0) throw new Error("No subscription found");

      // Update the subscription's trial_end to effectively extend it
      const newEnd = Math.floor(new Date(targetEndDate).getTime() / 1000);
      await stripe.subscriptions.update(subs.data[0].id, {
        trial_end: newEnd,
        proration_behavior: "none",
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "set-role") {
      const body = JSON.parse(await new Response(req.body).text().catch(() => "{}"));
      const targetUserId = body.userId;
      const targetRole = body.role;

      if (!targetUserId || !targetRole) throw new Error("userId and role required");

      if (targetRole === "remove") {
        await supabaseAdmin.from("user_roles").delete().eq("user_id", targetUserId);
      } else {
        await supabaseAdmin.from("user_roles").upsert(
          { user_id: targetUserId, role: targetRole },
          { onConflict: "user_id,role" }
        );
      }

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
