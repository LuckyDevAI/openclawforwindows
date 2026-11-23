import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { findCustomerForUser } from "../_shared/billing.ts";

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

    // User-context client — signature is verified by Supabase via getUser()
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    let userId: string | undefined;
    let userEmail: string | undefined;

    const { data: userData, error: userError } = await userClient.auth.getUser();

    if (userError || !userData?.user) {
      logStep("Authentication failed", { error: userError?.message });
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    userId = userData.user.id;
    userEmail = userData.user.email;

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
      const now = new Date();
      localTrialActive = trialStart <= now && now < trialEndDate;
      logStep("Local trial check", { trialStart: trialStart.toISOString(), trialEnd: localTrialEnd, active: localTrialActive });
    }

    // 2) Check Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const boundCustomerId = await findCustomerForUser(stripe, userData.user);

    let stripeSub = false;
    let stripeOnTrial = false;
    let subscriptionEnd: string | null = null;
    let stripeTrialEnd: string | null = null;
    let isLifetime = false;
    let plan: string | null = null;

    if (boundCustomerId) {
      const customerId = boundCustomerId;
      logStep("Found customer", { customerId });

      logStep("Listing active subs");
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 1,
      });
      logStep("Listing trialing subs");
      const trialingSubs = await stripe.subscriptions.list({
        customer: customerId,
        status: "trialing",
        limit: 1,
      });
      logStep("Subs listed", { active: subscriptions.data.length, trialing: trialingSubs.data.length });

      const allSubs = [...subscriptions.data, ...trialingSubs.data];
      if (allSubs.length > 0) {
        const sub = allSubs[0] as any;
        stripeSub = true;
        plan = "annual";
        // In Stripe API 2025-08-27, current_period_end moved onto subscription items
        const periodEnd: number | undefined =
          sub.current_period_end ?? sub.items?.data?.[0]?.current_period_end;
        if (typeof periodEnd === "number" && !Number.isNaN(periodEnd)) {
          subscriptionEnd = new Date(periodEnd * 1000).toISOString();
        }
        stripeOnTrial = sub.status === "trialing";
        if (typeof sub.trial_end === "number" && !Number.isNaN(sub.trial_end)) {
          stripeTrialEnd = new Date(sub.trial_end * 1000).toISOString();
        }
        logStep("Stripe subscription found", { status: sub.status, periodEnd });
      }

      // Check for lifetime one-time purchase
      logStep("Listing payment intents");
      const payments = await stripe.paymentIntents.list({
        customer: customerId,
        limit: 50,
      });
      logStep("Payment intents listed", { count: payments.data.length });

      for (const pi of payments.data) {
        if (pi.status === "succeeded") {
          let sessions;
          try {
            sessions = await stripe.checkout.sessions.list({
            payment_intent: pi.id,
            limit: 1,
          });
          } catch (e) {
            logStep("sessions.list failed", { pi: pi.id, err: String(e) });
            continue;
          }
          for (const session of sessions.data) {
            let lineItems;
            try {
              lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            } catch (e) {
              logStep("listLineItems failed", { session: session.id, err: String(e) });
              continue;
            }
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
