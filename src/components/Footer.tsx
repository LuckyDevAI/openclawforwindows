import { Link } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';
import logo from '@/assets/logo.png';

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
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="OpenClawForWindows" className="h-5 w-5 rounded-sm object-contain" />
            <span className="text-xs font-bold text-foreground tracking-tight">OpenClawForWindows</span>
            <span className="text-[10px] text-muted-foreground">
              <span className="text-primary">©</span>2025-2030
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

        <p className="mt-2 text-center text-[10px] text-muted-foreground/60 leading-snug max-w-lg mx-auto">
      </div>
    </footer>
  );
}
