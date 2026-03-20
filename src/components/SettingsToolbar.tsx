import { useState } from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useSettings } from '@/contexts/SettingsContext';
import { LANGUAGES } from '@/lib/i18n';

export default function SettingsToolbar() {
  const { lang, setLang, theme, setTheme, t } = useSettings();
  const [langSearch, setLangSearch] = useState('');

  const currentLang = LANGUAGES.find(l => l.code === lang);
  const filtered = LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(langSearch.toLowerCase()) ||
    l.code.includes(langSearch.toLowerCase())
  );

  return (
    <div className="flex items-center gap-1">
      {/* Theme toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        title={theme === 'dark' ? t('settings.light') : t('settings.dark')}
      >
        {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      </Button>

      {/* Language selector */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs px-2">
            <Globe className="h-3.5 w-3.5" />
            <span>{currentLang?.flag}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="end">
          <Input
            value={langSearch}
            onChange={e => setLangSearch(e.target.value)}
            placeholder={t('admin.search')}
            className="h-7 text-xs mb-2"
          />
          <ScrollArea className="max-h-64">
            <div className="space-y-0.5">
              {filtered.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setLangSearch(''); }}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors hover:bg-secondary/50 ${
                    l.code === lang ? 'bg-secondary text-foreground font-medium' : 'text-muted-foreground'
                  }`}
                >
                  <span className="text-sm">{l.flag}</span>
                  <span className="truncate">{l.name}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
