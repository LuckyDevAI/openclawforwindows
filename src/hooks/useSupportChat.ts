import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';

export type ChatMsg = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/support-chat`;
const CONV_KEY = 'openclaw_support_conv_id';

function genId() {
  return (crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`);
}

export function useSupportChat(welcome: string) {
  const { user } = useAuth();
  const { lang } = useSettings();
  const [messages, setMessages] = useState<ChatMsg[]>([{ role: 'assistant', content: welcome }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const convIdRef = useRef<string>('');

  // Init conversation id + load history for logged users
  useEffect(() => {
    let id = localStorage.getItem(CONV_KEY) || '';
    if (!id) {
      id = genId();
      localStorage.setItem(CONV_KEY, id);
    }
    convIdRef.current = id;

    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from('support_messages')
        .select('role, content')
        .eq('conversation_id', id)
        .order('created_at', { ascending: true });
      if (data && data.length > 0) {
        setMessages([{ role: 'assistant', content: welcome }, ...data.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const persist = useCallback(async (role: 'user' | 'assistant', content: string) => {
    if (!user) return;
    await supabase.from('support_messages').insert({
      user_id: user.id,
      conversation_id: convIdRef.current,
      role,
      content,
      lang,
    });
  }, [user, lang]);

  const reset = useCallback(async () => {
    if (user) {
      await supabase.from('support_messages').delete().eq('conversation_id', convIdRef.current);
    }
    const id = genId();
    localStorage.setItem(CONV_KEY, id);
    convIdRef.current = id;
    setMessages([{ role: 'assistant', content: welcome }]);
  }, [user, welcome]);

  const sendText = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    const userMsg: ChatMsg = { role: 'user', content: trimmed };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput('');
    setIsLoading(true);
    persist('user', trimmed);

    let assistantSoFar = '';
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && prev.length === allMessages.length + 1) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: 'assistant', content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages, lang }),
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: 'Connection error' }));
        upsert(err.error || 'An error occurred. Please retry.');
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let done = false;
      while (!done) {
        const r = await reader.read();
        if (r.done) break;
        textBuffer += decoder.decode(r.value, { stream: true });
        let nl: number;
        while ((nl = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, nl);
          textBuffer = textBuffer.slice(nl + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') { done = true; break; }
          try {
            const parsed = JSON.parse(jsonStr);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) upsert(c);
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
      if (assistantSoFar) persist('assistant', assistantSoFar);
    } catch (e) {
      console.error('Chat error:', e);
      upsert('Connection error. Please retry.');
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, lang, persist]);

  const send = useCallback(() => sendText(input), [sendText, input]);

  return { messages, input, setInput, isLoading, send, sendText, reset };
}