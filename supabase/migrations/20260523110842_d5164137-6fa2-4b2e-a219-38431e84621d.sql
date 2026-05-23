CREATE TABLE IF NOT EXISTS public.support_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  conversation_id uuid NOT NULL,
  role text NOT NULL CHECK (role IN ('user','assistant')),
  content text NOT NULL,
  lang text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_support_messages_user_conv
  ON public.support_messages(user_id, conversation_id, created_at);

ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own support messages"
  ON public.support_messages FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own support messages"
  ON public.support_messages FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own support messages"
  ON public.support_messages FOR DELETE TO authenticated
  USING (auth.uid() = user_id);