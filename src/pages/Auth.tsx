import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Workflow, Mail, KeyRound, Eye, EyeOff, Loader2 } from 'lucide-react';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate('/home', { replace: true });
  }, [user, navigate]);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({ title: 'Controlla la tua email', description: 'Ti abbiamo inviato un link di conferma.' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/home');
      }
    } catch (err: any) {
      toast({ title: 'Errore', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) toast({ title: 'Errore', description: error.message, variant: 'destructive' });
  };

  const handlePasskey = async () => {
    toast({
      title: 'Passkey',
      description: 'Il supporto Passkey/WebAuthn sarà disponibile prossimamente.',
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm border-border bg-card">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
            <Workflow className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg font-bold tracking-tight">OpenClaw</CardTitle>
          <CardDescription className="text-xs">
            {mode === 'login' ? 'Accedi al tuo account' : 'Crea un nuovo account'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Google */}
          <Button
            variant="outline"
            className="w-full h-10 gap-2 text-xs font-medium"
            onClick={handleGoogle}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continua con Google
          </Button>

          {/* Passkey */}
          <Button
            variant="outline"
            className="w-full h-10 gap-2 text-xs font-medium"
            onClick={handlePasskey}
          >
            <KeyRound className="h-4 w-4" />
            Accedi con Passkey
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">oppure</span>
            <Separator className="flex-1" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmail} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="nome@esempio.com"
                  className="h-9 pl-8 text-xs"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-9 pr-9 text-xs"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full h-9 text-xs font-semibold" disabled={loading}>
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {mode === 'login' ? 'Accedi' : 'Registrati'}
            </Button>
          </form>

          <p className="text-center text-[11px] text-muted-foreground">
            {mode === 'login' ? 'Non hai un account?' : 'Hai già un account?'}{' '}
            <button
              onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')}
              className="text-primary hover:underline font-medium"
            >
              {mode === 'login' ? 'Registrati' : 'Accedi'}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
