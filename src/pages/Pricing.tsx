import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo.webp';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2, Crown, ArrowLeft, Infinity } from 'lucide-react';
import { toast } from 'sonner';

const featureKeys = [
  'feat.unlimited',
  'feat.all_nodes',
  'feat.auto_exec',
  'feat.webhooks',
  'feat.notifications',
] as const;

export default function Pricing() {
  const { subscription, checkSubscription } = useAuth();
  const { t, lang } = useSettings();
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStartTrial = async () => {
    setLoading('trial');
    try {
      const { data, error } = await supabase.functions.invoke('start-trial');
      if (error) throw error;
      if (data?.success) {
        toast.success('Prova gratuita attivata!');
        await checkSubscription();
        navigate('/');
      }
    } catch (err: any) {
      if (err?.message?.includes('already started')) {
        toast.error('Hai già usato la prova gratuita');
      } else {
        console.error('Trial error:', err);
        toast.error('Errore nell\'attivazione della prova');
      }
    } finally {
      setLoading(null);
    }
  };

  const handleSubscribe = async (plan: 'annual' | 'lifetime') => {
    setLoading(plan);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(null);
    }
  };

  const handleManage = async () => {
    setLoading('manage');
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: any) {
      console.error('Portal error:', err);
    } finally {
      setLoading(null);
    }
  };

  const isActive = subscription.subscribed;
  const isOnTrial = subscription.onTrial;
  const dateFmt = (d: string) => new Date(d).toLocaleDateString(lang === 'en' ? 'en-GB' : lang);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-8">
          {/* Hero */}
          <div className="text-center space-y-3">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl overflow-hidden shadow-lg">
              <img src={logo} alt="OpenClawForWindows" className="h-20 w-20 object-cover" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">{t('pricing.title')}</h1>
            <p className="text-base text-muted-foreground">{t('pricing.subtitle')}</p>
          </div>

          {/* Active subscription banner */}
          {isActive && (
            <div className="flex justify-center">
              <Badge className="bg-accent text-accent-foreground text-sm gap-2 px-4 py-1.5">
                <Crown className="h-4 w-4" />
                {isOnTrial ? t('pricing.trial_active') : t('pricing.active')}
              </Badge>
            </div>
          )}

          {/* Plans grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Annual plan */}
            <Card className="border-border bg-card relative">
              <CardHeader className="text-center pb-3 pt-6">
                <CardTitle className="text-4xl font-bold tabular-nums text-foreground">
                  €10,90
                  <span className="text-base font-normal text-muted-foreground ml-1">{t('pricing.year')}</span>
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  10 giorni di prova gratuita<br />Annulla quando vuoi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pt-2">
                <ul className="space-y-3">
                  {featureKeys.map(k => (
                    <li key={k} className="flex items-center gap-3 text-sm text-foreground">
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      <span className="font-medium">{t(k)}</span>
                    </li>
                  ))}
                </ul>

                {isActive && !isOnTrial ? (
                  <div className="space-y-3">
                    {subscription.subscriptionEnd && (
                      <p className="text-xs text-center text-muted-foreground">
                        {t('pricing.renews')} {dateFmt(subscription.subscriptionEnd)}
                      </p>
                    )}
                    <Button variant="outline" className="w-full h-11 text-sm font-semibold" onClick={handleManage} disabled={!!loading}>
                      {loading === 'manage' && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                      {t('pricing.manage')}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {!isActive && (
                      <>
                        <Button className="w-full h-11 text-sm font-bold" onClick={handleStartTrial} disabled={!!loading}>
                          {loading === 'trial' && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                          {t('pricing.start_trial')}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">{t('pricing.no_charge')}</p>
                        <div className="relative flex items-center py-1">
                          <div className="flex-grow border-t border-border" />
                          <span className="mx-4 text-xs text-muted-foreground">pagamento</span>
                          <div className="flex-grow border-t border-border" />
                        </div>
                      </>
                    )}
                    <Button
                      variant={isActive ? "default" : "outline"}
                      className="w-full h-11 text-sm font-bold"
                      onClick={() => handleSubscribe('annual')}
                      disabled={!!loading}
                    >
                      {loading === 'annual' && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                      {isOnTrial ? 'Abbonati subito' : 'Abbonati subito'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Lifetime plan */}
            <Card className="border-primary/50 bg-card relative ring-2 ring-primary/30 shadow-lg shadow-primary/5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground text-xs gap-1.5 px-3 py-1">
                  <Infinity className="h-3.5 w-3.5" />
                  Miglior valore
                </Badge>
              </div>
              <CardHeader className="text-center pb-3 pt-8">
                <CardTitle className="text-4xl font-bold tabular-nums text-foreground">
                  €29,90
                  <span className="text-base font-normal text-muted-foreground ml-1"> una tantum</span>
                </CardTitle>
                <CardDescription className="text-sm mt-1">10 giorni di prova gratuita · Pagamento unico</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 pt-2">
                <ul className="space-y-3">
                  {featureKeys.map(k => (
                    <li key={k} className="flex items-center gap-3 text-sm text-foreground">
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      <span className="font-medium">{t(k)}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-bold">Accesso per sempre</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-bold">Aggiornamenti futuri inclusi</span>
                  </li>
                </ul>

                {!isActive && (
                  <>
                    <Button className="w-full h-11 text-sm font-bold" onClick={handleStartTrial} disabled={!!loading}>
                      {loading === 'trial' && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                      {t('pricing.start_trial')}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">{t('pricing.no_charge')}</p>
                    <div className="relative flex items-center py-1">
                      <div className="flex-grow border-t border-border" />
                      <span className="mx-4 text-xs text-muted-foreground">pagamento</span>
                      <div className="flex-grow border-t border-border" />
                    </div>
                  </>
                )}
                <Button
                  className="w-full h-12 text-sm font-bold"
                  onClick={() => handleSubscribe('lifetime')}
                  disabled={!!loading}
                >
                  {loading === 'lifetime' && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  Acquista Lifetime
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Pagamento unico · Nessun rinnovo
                </p>
              </CardContent>
            </Card>
          </div>

          {isActive && (
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-muted-foreground"
                onClick={() => checkSubscription()}
              >
                {t('pricing.refresh')}
              </Button>
            </div>
          )}

          <div className="text-center">
            <Button variant="ghost" size="sm" className="text-sm gap-2" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" /> {t('pricing.back')}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
