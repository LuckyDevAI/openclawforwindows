import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LANG_NAMES: Record<string, string> = {
  it: "Italian", en: "English", zh: "Chinese (Simplified)", hi: "Hindi",
  es: "Spanish", fr: "French", ar: "Arabic", bn: "Bengali", pt: "Portuguese", ru: "Russian",
};

const KNOWLEDGE_BASE = `
## Product
OpenClawForWindows is a visual no-code/low-code workflow automation builder for Windows desktop (also macOS & Linux desktop via Electron). Node-RED inspired, drag-and-drop canvas powered by XYFlow.

## Pricing (EUR, via Stripe)
- **Free Trial**: 10 days local trial, no credit card.
- **Annual Plan**: 10,90 € / year.
- **Lifetime Plan**: 29,90 € one-time payment.
- Manage billing from /pricing (Stripe customer portal).

## Installation
- Download from /download. Available builds: Windows (.exe / MSIX), macOS (.dmg), ZIP portable.
- Requirements: Windows 10/11 64-bit, PowerShell 7+ recommended.
- For AI nodes locally we recommend **Ollama** (free, runs on device). Cloud providers (OpenAI, Anthropic, Gemini) are also supported by adding the API key in /home → Agents.
- Full guide at /install.

## Workflow Editor
- Canvas at "/" (Index). Drag nodes from the palette, connect outputs to inputs.
- Node categories: **Triggers** (Manual, Scheduled with cron, Webhook), **Actions** (HTTP, AI Agent, File, Shell), **Conditions** (If/Else, Switch), **Outputs** (Log, Notification, File write).
- Simulation: click "Run" to execute workflow in topological order with real-time visual feedback.
- Projects are auto-synced to the cloud for logged-in users.

## Account
- Sign in at /auth (email+password or Google).
- Reset password at /reset-password.
- Profile & avatar editable at /home.
- Delete account: contact support@openclaw.app.

## Common issues
- "Workflow won't run": check that there is at least one Trigger node connected.
- "AI Agent fails": verify API key in /home → Agents; for Ollama ensure the local server is running on port 11434.
- "Login loop": clear cookies for openclawforwindows.com and try again.
- "Trial expired": upgrade at /pricing.

## Contacts
- Support: support@openclaw.app
- Legal: legal@openclaw.app
- Website: https://openclawforwindows.com
`;

function buildSystemPrompt(lang: string) {
  const langName = LANG_NAMES[lang] || "the same language as the user";
  return `You are the official support assistant for **OpenClawForWindows**.

## Rules
- ALWAYS reply in ${langName}. Even if the user writes in another language, your reply MUST be in ${langName}.
- Be helpful, concise, friendly. Use markdown (lists, **bold**, \`code\`, links).
- Keep answers short (max ~150 words) unless the user asks for detail.
- If the question is outside OpenClawForWindows scope, politely redirect.
- If you don't know, say so and suggest emailing **support@openclaw.app**.
- Never invent prices, features or URLs that are not in the knowledge base below.

## Knowledge Base
${KNOWLEDGE_BASE}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: userData, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !userData?.user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages, lang } = await req.json();
    const userLang = typeof lang === "string" && LANG_NAMES[lang] ? lang : "en";

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const safeMessages = messages
      .slice(-30)
      .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m: any) => ({ role: m.role, content: m.content.slice(0, 4000) }));
    if (safeMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: "messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: buildSystemPrompt(userLang) },
          ...safeMessages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Troppo richieste, riprova tra poco." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crediti esauriti." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Errore AI gateway" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("support-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
