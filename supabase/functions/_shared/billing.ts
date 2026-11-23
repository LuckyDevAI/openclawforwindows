import Stripe from "https://esm.sh/stripe@18.5.0";

const ALLOWED_ORIGINS = [
  "https://openclawforwindows.com",
  "https://www.openclawforwindows.com",
  "https://openclawforwindows.lovable.app",
  "https://id-preview--5a2fdf5c-2d0f-4dc1-b000-ba745039ed9b.lovable.app",
  "http://localhost:8080",
];
const DEFAULT_ORIGIN = "https://openclawforwindows.com";

export function safeOrigin(req: Request): string {
  const o = req.headers.get("origin") ?? "";
  return ALLOWED_ORIGINS.includes(o) ? o : DEFAULT_ORIGIN;
}

type AuthUser = { id: string; email?: string | null; email_confirmed_at?: string | null };

/**
 * Finds the Stripe customer bound to this account (by metadata user id).
 * An existing email-matched customer is linked only if the user's email is verified
 * and the customer is not already bound to another account.
 */
export async function findCustomerForUser(stripe: Stripe, user: AuthUser): Promise<string | null> {
  const byId = await stripe.customers.search({
    query: `metadata['supabase_user_id']:'${user.id.replace(/'/g, "")}'`,
    limit: 1,
  });
  if (byId.data.length > 0) return byId.data[0].id;

  if (user.email && user.email_confirmed_at) {
    const byEmail = await stripe.customers.list({ email: user.email, limit: 1 });
    const c = byEmail.data[0];
    if (c && !c.metadata?.supabase_user_id) {
      await stripe.customers.update(c.id, { metadata: { ...c.metadata, supabase_user_id: user.id } });
      return c.id;
    }
  }
  return null;
}
