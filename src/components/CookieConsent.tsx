import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/SettingsContext';

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  functional: boolean;
};

const CONSENT_KEY = 'ocw-cookie-consent';
const PREFS_KEY = 'ocw-cookie-prefs';

function getStoredConsent(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeConsent(prefs: CookiePreferences) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
  localStorage.setItem(PREFS_KEY, JSON.stringify({ ...prefs, timestamp: Date.now() }));
}

export function getCookiePreferences(): CookiePreferences {
  return getStoredConsent() ?? { necessary: true, analytics: false, functional: false };
}

export default function CookieConsent() {
  const { t } = useSettings();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  const accept = (all: boolean) => {
    const final: CookiePreferences = all
      ? { necessary: true, analytics: true, functional: true }
      : { ...prefs, necessary: true };
    storeConsent(final);
    setVisible(false);
  };

  const reject = () => {
    storeConsent({ necessary: true, analytics: false, functional: false });
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 pointer-events-none">
      <div className="max-w-lg mx-auto pointer-events-auto animate-in slide-in-from-bottom-4 duration-500">
        <div className="rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-2xl p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary shrink-0" />
              <h3 className="text-sm font-bold text-foreground">
                {t('cookie.title')}
              </h3>
            </div>
            <button
              onClick={reject}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            {t('cookie.description')}{' '}
            <Link to="/cookies" className="text-primary hover:underline">
              {t('footer.cookies')}
            </Link>
          </p>

          {/* Details toggle */}
          {showDetails && (
            <div className="space-y-2 mb-3 rounded-lg bg-muted/40 p-3">
              <label className="flex items-center gap-2 text-xs text-foreground">
                <input type="checkbox" checked disabled className="accent-primary rounded" />
                <span className="font-medium">{t('cookie.necessary')}</span>
                <span className="text-muted-foreground ml-auto">{t('cookie.always_on')}</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs(p => ({ ...p, analytics: e.target.checked }))}
                  className="accent-primary rounded"
                />
                <span className="font-medium">{t('cookie.analytics')}</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs.functional}
                  onChange={(e) => setPrefs(p => ({ ...p, functional: e.target.checked }))}
                  className="accent-primary rounded"
                />
                <span className="font-medium">{t('cookie.functional')}</span>
              </label>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => accept(true)} className="text-xs flex-1">
              {t('cookie.accept_all')}
            </Button>
            <Button size="sm" variant="secondary" onClick={reject} className="text-xs flex-1">
              {t('cookie.reject')}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => showDetails ? accept(false) : setShowDetails(true)}
              className="text-xs"
            >
              {showDetails ? t('cookie.save') : t('cookie.customize' as any)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
