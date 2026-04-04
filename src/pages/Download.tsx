import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Monitor, Apple, Shield, Globe } from 'lucide-react';
import appIcon from '@/assets/app-icon.png';

const DOWNLOADS = [
  {
    platform: 'Windows',
    icon: Monitor,
    arch: 'x64',
    badge: 'Consigliato',
    fileName: 'OpenClawForWindows-win32-x64.zip',
    size: '~346 MB',
    note: 'Windows 10/11 (64-bit)',
  },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <div className="text-center mb-10 space-y-4">
          <img
            src={appIcon}
            alt="OpenClawForWindows"
            className="h-20 w-20 rounded-2xl mx-auto shadow-lg"
            width={80}
            height={80}
          />
          <h1 className="text-2xl font-bold text-foreground">Scarica OpenClawForWindows</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Scarica l'app desktop per il tuo sistema operativo. Nessuna installazione complicata: estrai e avvia.
          </p>
        </div>

        <div className="space-y-4">
          {DOWNLOADS.map((dl) => {
            const Icon = dl.icon;
            return (
              <Card key={dl.platform} className="border-primary/40 bg-primary/5">
                <CardContent className="flex items-center gap-5 py-5 px-5">
                  <div className="h-14 w-14 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-lg font-semibold text-foreground">{dl.platform}</p>
                      <Badge className="text-[10px]">{dl.badge}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {dl.note} · {dl.arch} · {dl.size}
                    </p>
                  </div>
                  <a href={`/downloads/${dl.fileName}`} download>
                    <Button size="sm" className="gap-2 text-sm h-10 px-5">
                      <Download className="h-4 w-4" /> Scarica
                    </Button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-8 space-y-3 text-xs text-muted-foreground">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <p>L'app è firmata e sicura. Estrai lo ZIP ed esegui <code className="text-foreground font-mono">OpenClawForWindows.exe</code>.</p>
          </div>
          <div className="flex items-start gap-2">
            <Globe className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p>Serve una connessione internet per accedere al tuo account e sincronizzare i workflow.</p>
          </div>
        </div>

        {/* Microsoft Store note */}
        <Card className="mt-8 border-muted">
          <CardContent className="flex items-center gap-4 py-4 px-5">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <Monitor className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Microsoft Store</p>
              <p className="text-xs text-muted-foreground">Prossimamente disponibile anche su Microsoft Store.</p>
            </div>
            <Badge variant="secondary" className="ml-auto text-[10px]">Coming soon</Badge>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
