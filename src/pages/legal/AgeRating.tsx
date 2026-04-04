import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Users, CreditCard, MessageSquare, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { useSettings } from '@/contexts/SettingsContext';

const RATING_ITEMS = [
  { icon: Shield, labelKey: 'iarc.violence', value: 'No' },
  { icon: Shield, labelKey: 'iarc.fear', value: 'No' },
  { icon: Shield, labelKey: 'iarc.language', value: 'No' },
  { icon: Shield, labelKey: 'iarc.sexual', value: 'No' },
  { icon: Shield, labelKey: 'iarc.drugs', value: 'No' },
  { icon: Shield, labelKey: 'iarc.gambling', value: 'No' },
  { icon: MessageSquare, labelKey: 'iarc.ugc', value: '✓' },
  { icon: CreditCard, labelKey: 'iarc.iap', value: '✓' },
  { icon: Users, labelKey: 'iarc.personal_info', value: '✓' },
  { icon: Users, labelKey: 'iarc.user_interaction', value: 'No' },
  { icon: Globe, labelKey: 'iarc.location', value: 'No' },
];

export default function AgeRating() {
  const { t } = useSettings();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-3xl mx-auto flex items-center h-12 px-4">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs" asChild>
            <Link to="/auth"><ArrowLeft className="h-3.5 w-3.5" /> {t('pricing.back')}</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 space-y-6">
        <h1 className="text-xl font-bold text-foreground">{t('iarc.title' as any)}</h1>
        <p className="text-[10px] text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-foreground/90 space-y-4">
          {/* Intro */}
          <p>{t('iarc.intro' as any)}</p>

          {/* Rating badge */}
          <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card/60">
            <div className="flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-accent/20 border border-accent/30">
              <span className="text-2xl font-black text-accent">3+</span>
              <span className="text-[9px] font-semibold text-accent/80 uppercase tracking-wider">PEGI</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{t('iarc.rating_label' as any)}</p>
              <p className="text-xs text-muted-foreground">{t('iarc.rating_desc' as any)}</p>
            </div>
          </div>

          {/* Content descriptors table */}
          <h2 className="text-base font-semibold mt-6">{t('iarc.content_section' as any)}</h2>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40">
                  <th className="text-left px-3 py-2 font-semibold text-foreground">{t('iarc.category' as any)}</th>
                  <th className="text-center px-3 py-2 font-semibold text-foreground w-20">{t('iarc.present' as any)}</th>
                </tr>
              </thead>
              <tbody>
                {RATING_ITEMS.map(({ icon: Icon, labelKey, value }) => (
                  <tr key={labelKey} className="border-t border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-2 flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="text-foreground/90">{t(labelKey as any)}</span>
                    </td>
                    <td className="text-center px-3 py-2">
                      <span className={value === 'No'
                        ? 'text-muted-foreground'
                        : 'text-primary font-semibold'
                      }>
                        {value}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <h2 className="text-base font-semibold mt-6">{t('iarc.notes_title' as any)}</h2>
          <ul className="list-disc pl-5 space-y-1 text-foreground/90">
            <li>{t('iarc.note_ugc' as any)}</li>
            <li>{t('iarc.note_iap' as any)}</li>
            <li>{t('iarc.note_personal' as any)}</li>
          </ul>

          {/* IARC info */}
          <h2 className="text-base font-semibold mt-6">{t('iarc.about_title' as any)}</h2>
          <p>{t('iarc.about_desc' as any)}</p>
          <p className="text-xs text-muted-foreground">
            {t('iarc.more_info' as any)}{' '}
            <a
              href="https://www.globalratings.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              globalratings.com
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
