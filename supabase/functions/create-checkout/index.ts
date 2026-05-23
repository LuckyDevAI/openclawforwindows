import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PLANS = {
  annual: {
    price_id: "price_1TFMS9CRiYFDB9U60PVsyVk1",
    mode: "subscription" as const,
  },
  lifetime: {
    price_id: "price_1TaDfxCRiYFDB9U6QWYsiyLd",
    mode: "payment" as const,
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    // Get plan from request body
    let plan = "annual";
    try {
      const body = await req.json();
      if (body?.plan && PLANS[body.plan as keyof typeof PLANS]) {
        plan = body.plan;
      }
    } catch {
      // default to annual
    }

    const selectedPlan = PLANS[plan as keyof typeof PLANS];

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const sessionParams: any = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [{ price: selectedPlan.price_id, quantity: 1 }],
      mode: selectedPlan.mode,
      success_url: `${req.headers.get("origin")}/`,
      cancel_url: `${req.headers.get("origin")}/pricing`,
    };

    // Add trial only for subscription mode
    if (selectedPlan.mode === "subscription") {
      sessionParams.subscription_data = { trial_period_days: 10 };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
