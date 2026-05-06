import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { KeyRound, Eye, EyeOff, Loader2 } from 'lucide-react';
import logo from '@/assets/logo.webp';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase puts the recovery tokens in the URL hash and creates a session automatically
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || (session && window.location.hash.includes('type=recovery'))) {
        setValidSession(true);
      }
    });
    // Also check current session in case the event already fired
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setValidSession(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: 'Errore', description: 'Le password non coincidono.', variant: 'destructive' });
      return;
    }
    if (password.length < 6) {
      toast({ title: 'Errore', description: 'La password deve avere almeno 6 caratteri.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: 'Password aggiornata', description: 'Ora puoi accedere con la nuova password.' });
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (err: any) {
      toast({ title: 'Errore', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-sm border-border bg-card">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 overflow-hidden">
              <img src={logo} alt="OpenClawForWindows" className="h-10 w-10 object-contain" />
            </div>
            <CardTitle className="text-lg font-bold tracking-tight">Nuova password</CardTitle>
            <CardDescription className="text-xs">
              {validSession
                ? 'Inserisci la tua nuova password'
                : 'Link non valido o scaduto. Richiedine uno nuovo.'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {validSession ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs">Nuova password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-9 pl-8 pr-9 text-xs"
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
                <div className="space-y-1.5">
                  <Label htmlFor="confirm" className="text-xs">Conferma password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirm"
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-9 pl-8 text-xs"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-9 text-xs font-semibold" disabled={loading}>
                  {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Aggiorna password
                </Button>
              </form>
            ) : (
              <Button onClick={() => navigate('/auth')} className="w-full h-9 text-xs font-semibold">
                Torna al login
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
