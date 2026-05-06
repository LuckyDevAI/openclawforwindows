import { Link } from 'react-router-dom';
import { Map, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

type Entry = { path: string; label: string; description: string };

const sections: { title: string; items: Entry[] }[] = [
  {
    title: 'Principali',
    items: [
      { path: '/', label: 'Home Editor', description: 'Editor visuale dei workflow' },
      { path: '/home', label: 'Dashboard', description: 'Area utente e progetti' },
      { path: '/auth', label: 'Accesso', description: 'Login e registrazione' },
    ],
  },
  {
    title: 'Prodotto',
    items: [
      { path: '/pricing', label: 'Prezzi', description: 'Piani Annual e Lifetime' },
      { path: '/install', label: 'Installazione', description: 'Guida configurazione Ollama e PowerShell' },
      { path: '/download', label: 'Download', description: 'Versioni Windows, macOS e ZIP' },
      { path: '/support', label: 'Supporto', description: 'Chatbot di assistenza AI' },
    ],
  },
  {
    title: 'Legale',
    items: [
      { path: '/terms', label: 'Termini di Servizio', description: 'Condizioni di utilizzo' },
      { path: '/privacy', label: 'Privacy Policy', description: 'Trattamento dati personali' },
      { path: '/eula', label: 'EULA', description: 'Licenza utente finale' },
      { path: '/cookies', label: 'Cookie Policy', description: 'Gestione cookie' },
      { path: '/age-rating', label: 'Classificazione PEGI', description: 'IARC PEGI 3' },
    ],
  },
];

export default function Sitemap() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center h-12 px-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Indietro
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <Map className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Mappa del sito</h1>
        </div>
        <p className="text-muted-foreground mb-10">
          Elenco completo delle pagine di OpenClawForWindows.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">
                {section.title}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="block p-4 rounded-lg border border-border hover:border-primary hover:bg-accent/40 transition-colors"
                    >
                      <div className="font-medium text-foreground">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                      <div className="text-xs text-primary mt-1 font-mono">{item.path}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          Versione XML per i motori di ricerca:{' '}
          <a href="/sitemap.xml" className="text-primary underline">/sitemap.xml</a>
        </p>
      </main>
      <Footer />
    </div>
  );
}
