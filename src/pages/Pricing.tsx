import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Workflow, Check, Loader2, Crown, ArrowLeft } from 'lucide-react';

const featureKeys = [
  'feat.unlimited',
  'feat.all_nodes',
  'feat.auto_exec',
  'feat.webhooks',
  'feat.notifications',
  'feat.support',
] as const;

export default function Pricing() {
  const { subscription, checkSubscription } = useAuth();
  const { t, lang } = useSettings();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout');
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleManage = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: any) {
      console.error('Portal error:', err);
    } finally {
      setLoading(false);
    }
  };

  const isActive = subscription.subscribed;

  const dateFmt = (d: string) => new Date(d).toLocaleDateString(lang === 'en' ? 'en-GB' : lang);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15">
            <Workflow className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">{t('pricing.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('pricing.subtitle')}</p>
        </div>

        <Card className={`border-border bg-card ${isActive ? 'ring-2 ring-accent' : ''}`}>
          {isActive && (
            <div className="flex justify-center -mt-3">
              <Badge className="bg-accent text-accent-foreground text-[10px] gap-1">
                <Crown className="h-3 w-3" />
                {subscription.onTrial ? t('pricing.trial_active') : t('pricing.active')}
              </Badge>
            </div>
          )}
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-4xl font-bold tabular-nums">
              €10,90
              <span className="text-sm font-normal text-muted-foreground">{t('pricing.year')}</span>
            </CardTitle>
            <CardDescription className="text-xs">{t('pricing.trial')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2.5">
              {featureKeys.map(k => (
                <li key={k} className="flex items-center gap-2.5 text-xs text-foreground">
                  <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                  {t(k)}
                </li>
              ))}
            </ul>

            {isActive ? (
              <div className="space-y-2">
                <p className="text-[10px] text-center text-muted-foreground">
                  {subscription.onTrial && subscription.trialEnd
                    ? `${t('pricing.trial_until')} ${dateFmt(subscription.trialEnd)}`
                    : subscription.subscriptionEnd
                      ? `${t('pricing.renews')} ${dateFmt(subscription.subscriptionEnd)}`
                      : ''}
                </p>
                <Button variant="outline" className="w-full h-9 text-xs" onClick={handleManage} disabled={loading}>
                  {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  {t('pricing.manage')}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-muted-foreground"
                  onClick={() => checkSubscription()}
                >
                  {t('pricing.refresh')}
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button className="w-full h-10 text-xs font-semibold" onClick={handleSubscribe} disabled={loading}>
                  {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  {t('pricing.start_trial')}
                </Button>
                <p className="text-[10px] text-center text-muted-foreground">{t('pricing.no_charge')}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Button variant="ghost" size="sm" className="text-xs gap-1.5" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-3 w-3" /> {t('pricing.back')}
          </Button>
        </div>
      </div>
    </div>
  );
}
