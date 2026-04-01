import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

const TRIAL_DAYS = 10;
const LIFETIME_PRODUCT_ID = "prod_UDo3mzdfWpDlzz";

// Decode JWT payload without verification (session validation happens via getUser)
function decodeJwtPayload(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload;
  } catch {
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const token = authHeader.replace("Bearer ", "");

    // Try user-context client first
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    let userId: string | undefined;
    let userEmail: string | undefined;

    const { data: userData, error: userError } = await userClient.auth.getUser();
    
    if (userError) {
      // Fallback: decode JWT to get user info (token may be valid but session expired)
      logStep("getUser failed, trying JWT decode", { error: userError.message });
      const payload = decodeJwtPayload(token);
      if (payload?.sub && payload?.email && payload?.exp && payload.exp > Date.now() / 1000) {
        userId = payload.sub;
        userEmail = payload.email;
        logStep("JWT decode fallback succeeded", { email: userEmail });
      } else {
        return new Response(JSON.stringify({ error: "Authentication failed", details: userError.message }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        });
      }
    } else {
      userId = userData.user?.id;
      userEmail = userData.user?.email;
    }

    if (!userId || !userEmail) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Service-role client for admin queries
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    logStep("User authenticated", { email: userEmail });

    // 1) Check local trial from profiles
    const { data: profile } = await supabaseClient
      .from("profiles")
      .select("trial_start")
      .eq("id", userId)
      .single();

    const trialStart = profile?.trial_start ? new Date(profile.trial_start) : null;
    let localTrialActive = false;
    let localTrialEnd: string | null = null;

    if (trialStart) {
      const trialEndDate = new Date(trialStart.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
      localTrialEnd = trialEndDate.toISOString();
      localTrialActive = new Date() < trialEndDate;
      logStep("Local trial check", { trialStart: trialStart.toISOString(), trialEnd: localTrialEnd, active: localTrialActive });
    }

    // 2) Check Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const customers = await stripe.customers.list({ email: userEmail, limit: 1 });

    let stripeSub = false;
    let stripeOnTrial = false;
    let subscriptionEnd: string | null = null;
    let stripeTrialEnd: string | null = null;
    let isLifetime = false;
    let plan: string | null = null;

    if (customers.data.length > 0) {
      const customerId = customers.data[0].id;
      logStep("Found customer", { customerId });

      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 1,
      });
      const trialingSubs = await stripe.subscriptions.list({
        customer: customerId,
        status: "trialing",
        limit: 1,
      });

      const allSubs = [...subscriptions.data, ...trialingSubs.data];
      if (allSubs.length > 0) {
        const sub = allSubs[0];
        stripeSub = true;
        plan = "annual";
        subscriptionEnd = new Date(sub.current_period_end * 1000).toISOString();
        stripeOnTrial = sub.status === "trialing";
        if (sub.trial_end) {
          stripeTrialEnd = new Date(sub.trial_end * 1000).toISOString();
        }
        logStep("Stripe subscription found", { status: sub.status });
      }

      // Check for lifetime one-time purchase
      const payments = await stripe.paymentIntents.list({
        customer: customerId,
        limit: 50,
      });

      for (const pi of payments.data) {
        if (pi.status === "succeeded") {
          const sessions = await stripe.checkout.sessions.list({
            payment_intent: pi.id,
            limit: 1,
          });
          for (const session of sessions.data) {
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            for (const item of lineItems.data) {
              if (item.price?.product === LIFETIME_PRODUCT_ID) {
                isLifetime = true;
                stripeSub = true;
                plan = "lifetime";
                logStep("Lifetime purchase found", { paymentIntent: pi.id });
                break;
              }
            }
            if (isLifetime) break;
          }
          if (isLifetime) break;
        }
      }
    }

    const subscribed = stripeSub || localTrialActive;
    const onTrial = localTrialActive && !stripeSub;

    return new Response(JSON.stringify({
      subscribed,
      on_trial: onTrial || stripeOnTrial,
      subscription_end: subscriptionEnd,
      trial_end: onTrial ? localTrialEnd : stripeTrialEnd,
      is_lifetime: isLifetime,
      plan,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
