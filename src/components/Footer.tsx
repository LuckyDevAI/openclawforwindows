import { Link } from 'react-router-dom';
import { Workflow } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

const FOOTER_LINKS = [
  { key: 'footer.terms' as const, path: '/terms' },
  { key: 'footer.privacy' as const, path: '/privacy' },
  { key: 'footer.eula' as const, path: '/eula' },
  { key: 'footer.cookies' as const, path: '/cookies' },
];

export default function Footer() {
  const { t } = useSettings();

  return (
    <footer className="border-t border-border bg-card/40 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Workflow className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-foreground tracking-tight">OpenClaw</span>
            <span className="text-[10px] text-muted-foreground">
              © {new Date().getFullYear()}
            </span>
          </div>

          {/* Legal links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {FOOTER_LINKS.map(({ key, path }) => (
              <Link
                key={path}
                to={path}
                className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(key)}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-4 text-center text-[10px] text-muted-foreground/60 leading-relaxed max-w-lg mx-auto">
          {t('footer.disclaimer')}
        </p>
      </div>
    </footer>
  );
}
