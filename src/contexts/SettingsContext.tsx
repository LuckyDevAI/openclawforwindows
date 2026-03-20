import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { LangCode } from '@/lib/i18n';
import { t as translate } from '@/lib/i18n';

type Theme = 'light' | 'dark';

interface SettingsContextType {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: (key: Parameters<typeof translate>[0]) => string;
}

const SettingsContext = createContext<SettingsContextType>({
  lang: 'it',
  setLang: () => {},
  theme: 'dark',
  setTheme: () => {},
  t: (key) => key,
});

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    return (localStorage.getItem('openclaw_lang') as LangCode) || 'it';
  });
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('openclaw_theme') as Theme) || 'dark';
  });

  const setLang = (l: LangCode) => {
    setLangState(l);
    localStorage.setItem('openclaw_lang', l);
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('openclaw_theme', t);
  };

  // Apply theme class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const tFn = (key: Parameters<typeof translate>[0]) => translate(key, lang);

  return (
    <SettingsContext.Provider value={{ lang, setLang, theme, setTheme, t: tFn }}>
      {children}
    </SettingsContext.Provider>
  );
}
