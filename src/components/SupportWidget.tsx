import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, User as UserIcon, Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { useSupportChat } from '@/hooks/useSupportChat';
import { useSettings } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext';
import type { LangCode } from '@/lib/i18n';

type W = {
  title: string;
  welcome: string;
  placeholder: string;
  reset: string;
  open: string;
  quick: string[];
};

const WIDGET_I18N: Partial<Record<LangCode, W>> = {
  it: { title: 'Supporto', welcome: 'Ciao! 👋 Come posso aiutarti con OpenClawForWindows?', placeholder: 'Scrivi un messaggio...', reset: 'Nuova chat', open: 'Apri supporto', quick: ['Come installo?', 'Quanto costa?', 'Reset password', 'Crea un workflow'] },
  en: { title: 'Support', welcome: 'Hi! 👋 How can I help you with OpenClawForWindows?', placeholder: 'Type a message...', reset: 'New chat', open: 'Open support', quick: ['How do I install?', 'How much does it cost?', 'Reset password', 'Create a workflow'] },
  zh: { title: '支持', welcome: '你好! 👋 我能为你的 OpenClawForWindows 做什么?', placeholder: '输入消息...', reset: '新聊天', open: '打开支持', quick: ['如何安装?', '价格是多少?', '重置密码', '创建工作流'] },
  hi: { title: 'सहायता', welcome: 'नमस्ते! 👋 OpenClawForWindows के बारे में मैं कैसे मदद कर सकता हूँ?', placeholder: 'संदेश लिखें...', reset: 'नई चैट', open: 'सहायता खोलें', quick: ['कैसे इंस्टॉल करें?', 'कीमत क्या है?', 'पासवर्ड रीसेट', 'वर्कफ़्लो बनाएँ'] },
  es: { title: 'Soporte', welcome: '¡Hola! 👋 ¿Cómo puedo ayudarte con OpenClawForWindows?', placeholder: 'Escribe un mensaje...', reset: 'Nuevo chat', open: 'Abrir soporte', quick: ['¿Cómo instalar?', '¿Cuánto cuesta?', 'Restablecer contraseña', 'Crear un workflow'] },
  fr: { title: 'Support', welcome: 'Salut ! 👋 Comment puis-je aider avec OpenClawForWindows ?', placeholder: 'Écrivez un message...', reset: 'Nouveau chat', open: 'Ouvrir le support', quick: ['Comment installer ?', 'Quel est le prix ?', 'Réinitialiser le mot de passe', 'Créer un workflow'] },
  ar: { title: 'الدعم', welcome: 'مرحباً! 👋 كيف يمكنني المساعدة في OpenClawForWindows؟', placeholder: 'اكتب رسالة...', reset: 'محادثة جديدة', open: 'افتح الدعم', quick: ['كيف أثبّت؟', 'ما هو السعر؟', 'إعادة تعيين كلمة المرور', 'إنشاء سير عمل'] },
  bn: { title: 'সহায়তা', welcome: 'হাই! 👋 OpenClawForWindows নিয়ে আমি কীভাবে সাহায্য করতে পারি?', placeholder: 'একটি বার্তা লিখুন...', reset: 'নতুন চ্যাট', open: 'সহায়তা খুলুন', quick: ['কীভাবে ইনস্টল করব?', 'দাম কত?', 'পাসওয়ার্ড রিসেট', 'ওয়ার্কফ্লো তৈরি করুন'] },
  pt: { title: 'Suporte', welcome: 'Olá! 👋 Como posso ajudar com OpenClawForWindows?', placeholder: 'Escreva uma mensagem...', reset: 'Nova conversa', open: 'Abrir suporte', quick: ['Como instalar?', 'Quanto custa?', 'Redefinir senha', 'Criar um workflow'] },
  ru: { title: 'Поддержка', welcome: 'Привет! 👋 Чем помочь с OpenClawForWindows?', placeholder: 'Введите сообщение...', reset: 'Новый чат', open: 'Открыть поддержку', quick: ['Как установить?', 'Сколько стоит?', 'Сбросить пароль', 'Создать рабочий процесс'] },
};

const HIDDEN_ROUTES = ['/auth', '/reset-password', '/support', '/admin'];

export default function SupportWidget() {
  const location = useLocation();
  const { user, loading } = useAuth();
  const { lang } = useSettings();
  const t = WIDGET_I18N[lang] || WIDGET_I18N.en;
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, input, setInput, isLoading, send, sendText, reset } = useSupportChat(t.welcome);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  if (loading || !user) return null;
  if (HIDDEN_ROUTES.some(r => location.pathname.startsWith(r))) return null;

  const showQuick = messages.length <= 1;

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label={t.open}
          className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-2rem))] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 h-12 border-b border-border bg-card/80 backdrop-blur">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">{t.title}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={reset} title={t.reset}>
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-3" ref={scrollRef as any}>
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:m-0 [&>ul]:my-1 [&>ol]:my-1 [&_a]:text-primary [&_a]:underline">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <UserIcon className="h-3 w-3 text-primary" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-2 justify-start">
                  <div className="shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-primary" />
                  </div>
                  <div className="bg-muted rounded-xl rounded-bl-sm px-3 py-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              {showQuick && !isLoading && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {t.quick.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendText(q)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-background hover:bg-muted text-foreground transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>

          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="border-t border-border p-2 flex gap-2 bg-card"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              disabled={isLoading}
              className="flex-1 h-9 text-sm"
            />
            <Button type="submit" size="icon" className="h-9 w-9" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}