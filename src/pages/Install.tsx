import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle2,
  Copy,
  Terminal,
  Download,
  FolderOpen,
  Link2,
  MessageSquare,
  Mail,
  Globe,
  Shield,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Check,
  Loader2,
  HardDrive,
  Cpu,
  Settings2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const STEPS = [
  { label: 'Prerequisiti', icon: Cpu },
  { label: 'Installazione', icon: Download },
  { label: 'Configurazione', icon: Settings2 },
  { label: 'Canali', icon: MessageSquare },
  { label: 'Completato', icon: CheckCircle2 },
];

function CopyBlock({ code, label }: { code: string; label?: string }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({ title: 'Copiato!', description: 'Comando copiato negli appunti.' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      {label && <p className="text-xs text-muted-foreground mb-1.5">{label}</p>}
      <div className="flex items-center gap-2 bg-muted/60 border border-border rounded-lg px-4 py-3 font-mono text-xs leading-relaxed">
        <Terminal className="h-3.5 w-3.5 text-primary shrink-0" />
        <code className="flex-1 text-foreground select-all overflow-x-auto">{code}</code>
        <button
          onClick={handleCopy}
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}

export default function Install() {
  const [step, setStep] = useState(0);
  const [installPath, setInstallPath] = useState('C:\\OpenClawForWindows');
  const { user } = useAuth();
  const [checks, setChecks] = useState({
    node: false,
    powershell: false,
    apiKey: false,
  });

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecked = checks.node && checks.powershell && checks.apiKey;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === step;
              const isDone = i < step;
              return (
                <div key={i} className="flex items-center gap-2">
                  <button
                    onClick={() => setStep(i)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                      ${isActive ? 'bg-primary text-primary-foreground' : ''}
                      ${isDone ? 'bg-primary/10 text-primary' : ''}
                      ${!isActive && !isDone ? 'text-muted-foreground hover:text-foreground' : ''}
                    `}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <Icon className="h-3.5 w-3.5" />
                    )}
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`w-6 h-px ${i < step ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex gap-1">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  i <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 0: Prerequisites */}
        {step === 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <div>
              <h1 className="text-xl font-bold text-foreground mb-1">Prerequisiti</h1>
              <p className="text-sm text-muted-foreground">
                Verifica di avere tutto il necessario prima di procedere con l'installazione.
              </p>
            </div>

            <div className="space-y-3">
              {/* OpenClaw Installer — standalone card */}
              <Card className="border-primary/40 bg-primary/5">
                <CardContent className="flex items-start gap-3 py-4 px-4">
                  <div className="h-9 w-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Installer OpenClawForWindows</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Scarica l'installer ufficiale o installa via npm. L'installer configura automaticamente la cartella dedicata.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="https://github.com/openclaw-ai/openclaw/releases/latest"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className="h-8 text-xs gap-1.5">
                          <Download className="h-3.5 w-3.5" /> Scarica .exe
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </a>
                      <a
                        href="https://www.npmjs.com/package/openclaw"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                          npm install -g openclaw
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </a>
                    </div>
                    <CopyBlock code="npm install -g openclaw@latest" label="Oppure installa via terminale:" />
                  </div>
                </CardContent>
              </Card>

              {[
                {
                  key: 'node' as const,
                  title: 'Node.js 24 (o 22.16+)',
                  desc: "Necessario per eseguire OpenClawForWindows. L'installer può installarlo automaticamente.",
                  link: 'https://nodejs.org/',
                  command: 'node --version',
                },
                {
                  key: 'powershell' as const,
                  title: 'PowerShell 5.1+',
                  desc: 'Incluso in Windows 10/11. Usato per lo script di installazione.',
                  command: '$PSVersionTable.PSVersion',
                },
                {
                  key: 'apiKey' as const,
                  title: 'API Key (Anthropic, OpenAI, Google, Qwen, DeepSeek, Mistral, ecc.)',
                  desc: "Necessaria per il modello AI. Supporta Anthropic, OpenAI, Google, Qwen, DeepSeek, Mistral e altri.",
                  link: 'https://docs.openclaw.ai/providers',
                },
              ].map((item) => (
                <Card
                  key={item.key}
                  className={`cursor-pointer transition-all ${
                    checks[item.key] ? 'border-primary/40 bg-primary/5' : 'hover:border-primary/20'
                  }`}
                  onClick={() => toggleCheck(item.key)}
                >
                  <CardContent className="flex items-start gap-3 py-4 px-4">
                    <div
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        checks[item.key] ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                      }`}
                    >
                      {checks[item.key] && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-primary hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      {item.command && (
                        <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                          <CopyBlock code={item.command} label="Verifica:" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(1)} disabled={!allChecked} className="gap-2">
                Continua <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 1: Installation */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-500">
            <div>
              <h1 className="text-xl font-bold text-foreground mb-1">Installazione</h1>
              <p className="text-sm text-muted-foreground">
                Installa OpenClaw in una cartella dedicata e isolata sul tuo sistema.
              </p>
            </div>

            {/* Install path */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-primary" />
                  Cartella di installazione
                </CardTitle>
                <CardDescription className="text-xs">
                  OpenClaw verrà installato in una cartella separata per massima sicurezza.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input
                    value={installPath}
                    onChange={(e) => setInstallPath(e.target.value)}
                    className="font-mono text-xs h-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-[10px]">
                    <Shield className="h-3 w-3 mr-1" /> Isolata
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    <FolderOpen className="h-3 w-3 mr-1" /> Dedicata
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Metodo 1: Script automatico */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm">Metodo 1: Script automatico</CardTitle>
                  <Badge className="text-[10px]">Consigliato</Badge>
                </div>
                <CardDescription className="text-xs">
                  Lo script installer rileva il tuo sistema, installa Node se necessario, e avvia l'onboarding.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <CopyBlock
                  code={`$env:OPENCLAW_HOME="${installPath}"; iwr -useb https://openclaw.ai/install.ps1 | iex`}
                  label="PowerShell (Amministratore):"
                />
                <p className="text-[11px] text-muted-foreground">
                  Apri PowerShell come amministratore, incolla il comando e premi Invio.
                </p>
              </CardContent>
            </Card>

            {/* Metodo 2: npm */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Metodo 2: npm (manuale)</CardTitle>
                <CardDescription className="text-xs">
                  Se hai già Node.js installato e preferisci un controllo maggiore.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <CopyBlock code={`mkdir "${installPath}"`} label="1. Crea la cartella:" />
                <CopyBlock
                  code={`cd "${installPath}" && npm install -g openclaw@latest`}
                  label="2. Installa OpenClaw:"
                />
                <CopyBlock code="openclaw onboard --install-daemon" label="3. Avvia onboarding:" />
              </CardContent>
            </Card>

            {/* Metodo 3: Windows Node (Tray App) */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  Metodo 3: Windows Tray App
                  <Badge variant="secondary" className="text-[10px]">Opzionale</Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  App companion per system tray con icona, quick-send, e controllo canali.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href="https://github.com/openclaw/openclaw-windows-node/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-primary hover:underline font-medium"
                >
                  <Download className="h-3.5 w-3.5" />
                  Scarica l'ultimo release da GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
                <p className="text-[11px] text-muted-foreground">
                  Scarica il file .exe o .msix e installalo. Supporta auto-update, hotkey globali, notifiche toast, e WebView2 chat.
                </p>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(0)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Indietro
              </Button>
              <Button onClick={() => setStep(2)} className="gap-2">
                Continua <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Configuration */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-500">
            <div>
              <h1 className="text-xl font-bold text-foreground mb-1">Configurazione</h1>
              <p className="text-sm text-muted-foreground">
                Configura il Gateway e verifica che tutto funzioni correttamente.
              </p>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Onboarding Wizard</CardTitle>
                <CardDescription className="text-xs">
                  L'onboarding ti guida nella scelta del provider AI e nella configurazione del Gateway.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <CopyBlock code="openclaw onboard --install-daemon" label="Avvia il wizard:" />
                <p className="text-[11px] text-muted-foreground">
                  Il wizard chiederà: provider AI (Anthropic, OpenAI, Google, Qwen…), API key, e configurerà il Gateway automaticamente.
                </p>
              </CardContent>
            </Card>

            {/* Qwen / DashScope */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  Qwen (Alibaba Cloud / DashScope)
                  <Badge variant="secondary" className="text-[10px]">Nuovo</Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Configura Qwen3.5 tramite DashScope per usare i modelli Alibaba Cloud.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">1. Crea un account Alibaba Cloud</p>
                  <p className="text-[11px] text-muted-foreground">
                    Vai su{' '}
                    <a href="https://www.alibabacloud.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Alibaba Cloud <ExternalLink className="inline h-3 w-3" />
                    </a>
                    {' '}e registrati. Potrebbe essere richiesta la verifica con numero di telefono o carta di credito.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">2. Ottieni la tua API Key</p>
                  <p className="text-[11px] text-muted-foreground">
                    Accedi alla{' '}
                    <a href="https://dashscope.console.aliyun.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      console DashScope <ExternalLink className="inline h-3 w-3" />
                    </a>
                    {' '}→ "API Key Management" → Genera nuova chiave.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">3. Installa l'SDK (opzionale)</p>
                  <CopyBlock code="pip install dashscope" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">4. Configura come variabile d'ambiente</p>
                  <CopyBlock code='$env:DASHSCOPE_API_KEY="LA_TUA_API_KEY"' label="PowerShell:" />
                  <CopyBlock code='set DASHSCOPE_API_KEY=LA_TUA_API_KEY' label="CMD:" />
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-foreground">Modelli disponibili</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'qwen-max', desc: 'Compiti complessi' },
                      { name: 'qwen-plus', desc: 'Bilanciato' },
                      { name: 'qwen-turbo', desc: 'Veloce ed economico' },
                    ].map((m) => (
                      <div key={m.name} className="bg-muted/40 border border-border rounded-md px-2.5 py-2 text-center">
                        <code className="text-[10px] font-mono text-primary">{m.name}</code>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/30 border border-border rounded-md px-3 py-2 space-y-1">
                  <p className="text-[11px] font-medium text-foreground">⚠️ Note importanti</p>
                  <ul className="text-[10px] text-muted-foreground space-y-0.5 list-disc list-inside">
                    <li>Errore <code className="text-foreground">401</code>: API Key non valida o scaduta</li>
                    <li>Errore <code className="text-foreground">429</code>: Superato il limite di richieste/minuto</li>
                    <li>
                      <a href="https://help.aliyun.com/zh/model-studio/developer-reference/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Documentazione DashScope <ExternalLink className="inline h-2.5 w-2.5" />
                      </a>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* DeepSeek */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  DeepSeek
                  <Badge variant="secondary" className="text-[10px]">Alternativo</Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Modelli AI open-weight ad alte prestazioni da DeepSeek. Ottimo rapporto qualità/prezzo.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">1. Crea un account DeepSeek</p>
                  <p className="text-[11px] text-muted-foreground">
                    Vai su{' '}
                    <a href="https://platform.deepseek.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      DeepSeek Platform <ExternalLink className="inline h-3 w-3" />
                    </a>
                    {' '}e registrati. Ricarica il credito per iniziare.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">2. Genera la tua API Key</p>
                  <p className="text-[11px] text-muted-foreground">
                    Dalla dashboard vai su{' '}
                    <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      API Keys <ExternalLink className="inline h-3 w-3" />
                    </a>
                    {' '}→ "Create new secret key".
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">3. Configura come variabile d'ambiente</p>
                  <CopyBlock code='$env:DEEPSEEK_API_KEY="LA_TUA_API_KEY"' label="PowerShell:" />
                  <CopyBlock code='set DEEPSEEK_API_KEY=LA_TUA_API_KEY' label="CMD:" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">4. Endpoint API (compatibile OpenAI)</p>
                  <CopyBlock code="https://api.deepseek.com/v1/chat/completions" label="Base URL:" />
                  <p className="text-[11px] text-muted-foreground">
                    DeepSeek usa un'API compatibile con il formato OpenAI. Puoi usare qualsiasi client OpenAI cambiando solo la base URL.
                  </p>
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-foreground">Modelli disponibili</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: 'deepseek-chat', desc: 'Chat generale (V3)' },
                      { name: 'deepseek-reasoner', desc: 'Ragionamento (R1)' },
                      { name: 'deepseek-coder', desc: 'Generazione codice' },
                    ].map((m) => (
                      <div key={m.name} className="bg-muted/40 border border-border rounded-md px-2.5 py-2 text-center">
                        <code className="text-[10px] font-mono text-primary">{m.name}</code>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/30 border border-border rounded-md px-3 py-2 space-y-1">
                  <p className="text-[11px] font-medium text-foreground">💡 Suggerimento</p>
                  <p className="text-[10px] text-muted-foreground">
                    DeepSeek R1 eccelle nel ragionamento matematico e logico. Usa <code className="text-foreground">deepseek-chat</code> per uso generale e <code className="text-foreground">deepseek-reasoner</code> per problemi complessi.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Mistral */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  Mistral AI
                  <Badge variant="secondary" className="text-[10px]">Alternativo</Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Modelli AI europei ad alte prestazioni. Eccellenti per multilingua e codice.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">1. Crea un account Mistral</p>
                  <p className="text-[11px] text-muted-foreground">
                    Vai su{' '}
                    <a href="https://console.mistral.ai/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Mistral Console <ExternalLink className="inline h-3 w-3" />
                    </a>
                    {' '}e registrati. Attiva un piano a consumo o prova gratuita.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">2. Genera la tua API Key</p>
                  <p className="text-[11px] text-muted-foreground">
                    Dalla console vai su{' '}
                    <a href="https://console.mistral.ai/api-keys/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      API Keys <ExternalLink className="inline h-3 w-3" />
                    </a>
                    {' '}→ "Create new key".
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">3. Installa il client (opzionale)</p>
                  <CopyBlock code="pip install mistralai" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">4. Configura come variabile d'ambiente</p>
                  <CopyBlock code='$env:MISTRAL_API_KEY="LA_TUA_API_KEY"' label="PowerShell:" />
                  <CopyBlock code='set MISTRAL_API_KEY=LA_TUA_API_KEY' label="CMD:" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">5. Endpoint API</p>
                  <CopyBlock code="https://api.mistral.ai/v1/chat/completions" label="Base URL:" />
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-foreground">Modelli disponibili</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'mistral-large', desc: 'Massime prestazioni' },
                      { name: 'mistral-medium', desc: 'Bilanciato' },
                      { name: 'mistral-small', desc: 'Veloce ed economico' },
                      { name: 'codestral', desc: 'Ottimizzato per codice' },
                    ].map((m) => (
                      <div key={m.name} className="bg-muted/40 border border-border rounded-md px-2.5 py-2 text-center">
                        <code className="text-[10px] font-mono text-primary">{m.name}</code>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/30 border border-border rounded-md px-3 py-2 space-y-1">
                  <p className="text-[11px] font-medium text-foreground">🇪🇺 Vantaggi Mistral</p>
                  <ul className="text-[10px] text-muted-foreground space-y-0.5 list-disc list-inside">
                    <li>Hosting EU — conformità GDPR nativa</li>
                    <li><code className="text-foreground">codestral</code> è tra i migliori per generazione di codice</li>
                    <li>Eccellente supporto multilingua (italiano, francese, tedesco, ecc.)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Ollama (Locale) */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  Ollama (Locale)
                  <Badge variant="secondary" className="text-[10px]">Gratuito</Badge>
                  <Badge variant="outline" className="text-[10px]">Nessuna API Key</Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Esegui modelli AI direttamente sul tuo PC, offline e senza costi. Nessun account richiesto.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">1. Scarica e installa Ollama</p>
                  <p className="text-[11px] text-muted-foreground">
                    Vai su{' '}
                    <a href="https://ollama.com/download" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      ollama.com/download <ExternalLink className="inline h-3 w-3" />
                    </a>
                    {' '}e scarica l'installer per Windows. L'installazione è automatica.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">2. Scarica un modello</p>
                  <CopyBlock code="ollama pull llama3.1" label="Modello consigliato:" />
                  <CopyBlock code="ollama pull mistral" label="Alternativa leggera:" />
                  <p className="text-[11px] text-muted-foreground">
                    Il download del modello può richiedere alcuni minuti a seconda della connessione.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">3. Avvia il server</p>
                  <CopyBlock code="ollama serve" />
                  <p className="text-[11px] text-muted-foreground">
                    Il server sarà disponibile su <code className="text-foreground">http://localhost:11434</code>. Ollama si avvia automaticamente in background dopo l'installazione.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">4. Configura OpenClaw per Ollama</p>
                  <CopyBlock code='$env:OLLAMA_BASE_URL="http://localhost:11434"' label="PowerShell:" />
                  <CopyBlock code='set OLLAMA_BASE_URL=http://localhost:11434' label="CMD:" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">5. Testa il modello</p>
                  <CopyBlock code='ollama run llama3.1 "Ciao, come stai?"' label="Test rapido:" />
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-foreground">Modelli consigliati</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'llama3.1', desc: '8B — Ottimo tuttofare' },
                      { name: 'mistral', desc: '7B — Veloce, multilingua' },
                      { name: 'codellama', desc: '7B — Ottimizzato codice' },
                      { name: 'gemma2', desc: '9B — Google, compatto' },
                    ].map((m) => (
                      <div key={m.name} className="bg-muted/40 border border-border rounded-md px-2.5 py-2 text-center">
                        <code className="text-[10px] font-mono text-primary">{m.name}</code>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/30 border border-border rounded-md px-3 py-2 space-y-1">
                  <p className="text-[11px] font-medium text-foreground">💻 Requisiti hardware</p>
                  <ul className="text-[10px] text-muted-foreground space-y-0.5 list-disc list-inside">
                    <li>Modelli 7B: almeno 8 GB di RAM</li>
                    <li>Modelli 13B: almeno 16 GB di RAM</li>
                    <li>GPU consigliata ma non obbligatoria (NVIDIA con CUDA o AMD con ROCm)</li>
                    <li>Completamente offline — nessun dato esce dal tuo PC</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Comparatore Provider AI */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">📊 Confronto Provider AI</CardTitle>
                <CardDescription className="text-xs">Pro, contro e costi a colpo d'occhio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-0">
                <div className="overflow-x-auto -mx-2">
                  <table className="w-full text-[11px] border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-2 font-semibold text-foreground">Provider</th>
                        <th className="text-left py-2 px-2 font-semibold text-foreground">Costo</th>
                        <th className="text-left py-2 px-2 font-semibold text-green-500">Pro</th>
                        <th className="text-left py-2 px-2 font-semibold text-destructive">Contro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: 'OpenAI',
                          badge: 'Popolare',
                          badgeVariant: 'default' as const,
                          cost: 'Da $0.50/1M token',
                          pros: ['Modelli più avanzati (GPT-4o)', 'Ecosistema maturo', 'Documentazione eccellente'],
                          cons: ['Costoso per uso intensivo', 'Dati inviati a server USA', 'Rate limit stretti sul free tier'],
                        },
                        {
                          name: 'Qwen (DashScope)',
                          badge: 'Cina',
                          badgeVariant: 'secondary' as const,
                          cost: 'Da ¥0.5/1M token',
                          pros: ['Ottimo per cinese/multilingue', 'Prezzi competitivi', 'Modelli open-weight'],
                          cons: ['Server in Cina (latenza)', 'Docs principalmente in cinese', 'Meno integrazioni terze parti'],
                        },
                        {
                          name: 'DeepSeek',
                          badge: 'Economico',
                          badgeVariant: 'secondary' as const,
                          cost: 'Da $0.14/1M token',
                          pros: ['Prezzo ultra-competitivo', 'Reasoning avanzato (R1)', 'API compatibile OpenAI'],
                          cons: ['Meno modelli disponibili', 'Server in Cina', 'Uptime meno garantito'],
                        },
                        {
                          name: 'Mistral',
                          badge: 'EU',
                          badgeVariant: 'secondary' as const,
                          cost: 'Da €0.10/1M token',
                          pros: ['Server in Europa (GDPR)', 'Codestral ottimo per codice', 'Modelli open-source'],
                          cons: ['Meno potente di GPT-4o', 'Ecosistema più giovane', 'Free tier limitato'],
                        },
                        {
                          name: 'Ollama',
                          badge: 'Locale',
                          badgeVariant: 'outline' as const,
                          cost: 'Gratuito',
                          pros: ['100% offline e privato', 'Nessun costo ricorrente', 'Nessun rate limit'],
                          cons: ['Richiede hardware potente', 'Modelli meno avanzati', 'Setup più complesso'],
                        },
                      ].map((provider, i) => (
                        <tr key={provider.name} className={i < 4 ? 'border-b border-border/50' : ''}>
                          <td className="py-2.5 px-2 align-top">
                            <span className="font-semibold text-foreground">{provider.name}</span>
                            <br />
                            <Badge variant={provider.badgeVariant} className="text-[9px] mt-0.5">{provider.badge}</Badge>
                          </td>
                          <td className="py-2.5 px-2 align-top text-muted-foreground font-mono">
                            {provider.cost}
                          </td>
                          <td className="py-2.5 px-2 align-top">
                            <ul className="space-y-0.5">
                              {provider.pros.map((p) => (
                                <li key={p} className="flex items-start gap-1 text-muted-foreground">
                                  <Check className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="py-2.5 px-2 align-top">
                            <ul className="space-y-0.5">
                              {provider.cons.map((c) => (
                                <li key={c} className="flex items-start gap-1 text-muted-foreground">
                                  <span className="text-destructive shrink-0 mt-0.5">✕</span>
                                  <span>{c}</span>
                                </li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    💡 <strong>Consiglio:</strong> inizia con <strong>Ollama</strong> per testare gratuitamente in locale,
                    poi passa a <strong>DeepSeek</strong> o <strong>Mistral</strong> per il miglior rapporto qualità/prezzo in produzione.
                    Usa <strong>OpenAI</strong> solo se ti servono le capacità più avanzate.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Verifica il Gateway</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CopyBlock code="openclaw gateway status" label="Controlla lo stato:" />
                <p className="text-[11px] text-muted-foreground">
                  Dovresti vedere il Gateway in ascolto sulla porta <code className="text-foreground">18789</code>.
                </p>

                <Separator />

                <CopyBlock code="openclaw dashboard" label="Apri la dashboard:" />
                <p className="text-[11px] text-muted-foreground">
                  Si apre la Control UI nel browser. Se si carica, tutto funziona.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Variabili d'ambiente (Avanzato)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { var: 'OPENCLAW_HOME', desc: 'Directory home per i percorsi interni' },
                  { var: 'OPENCLAW_STATE_DIR', desc: 'Override della directory di stato' },
                  { var: 'OPENCLAW_CONFIG_PATH', desc: 'Override del percorso del file di configurazione' },
                ].map((env) => (
                  <div key={env.var} className="flex items-start gap-2 text-xs">
                    <code className="text-primary font-mono bg-muted/50 px-1.5 py-0.5 rounded shrink-0">
                      {env.var}
                    </code>
                    <span className="text-muted-foreground">— {env.desc}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Indietro
              </Button>
              <Button onClick={() => setStep(3)} className="gap-2">
                Continua <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Channels/Integrations */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-500">
            <div>
              <h1 className="text-xl font-bold text-foreground mb-1">Collega Canali e Dipendenze</h1>
              <p className="text-sm text-muted-foreground">
                Connetti i canali di comunicazione e le integrazioni per estendere le funzionalità.
              </p>
            </div>

            {[
              {
                icon: MessageSquare,
                name: 'Telegram',
                desc: 'Collegamento più veloce. Serve un bot token da @BotFather.',
                commands: ['openclaw channels telegram setup'],
                link: 'https://docs.openclaw.ai/channels/telegram',
              },
              {
                icon: Mail,
                name: 'Email (Gmail / SMTP)',
                desc: 'Invia e ricevi email tramite il tuo agente AI.',
                commands: ['openclaw channels email setup'],
                link: 'https://docs.openclaw.ai/automation/gmail-pubsub',
              },
              {
                icon: Globe,
                name: 'WhatsApp',
                desc: 'Collega tramite WhatsApp Web con QR code.',
                commands: ['openclaw channels whatsapp setup'],
                link: 'https://docs.openclaw.ai/channels/whatsapp',
              },
              {
                icon: Link2,
                name: 'Discord',
                desc: 'Usa un bot Discord per interagire con i tuoi server.',
                commands: ['openclaw channels discord setup'],
                link: 'https://docs.openclaw.ai/channels/discord',
              },
              {
                icon: Globe,
                name: 'Slack',
                desc: 'Integra con il tuo workspace Slack.',
                commands: ['openclaw channels slack setup'],
                link: 'https://docs.openclaw.ai/channels/slack',
              },
            ].map((ch) => (
              <Card key={ch.name} className="hover:border-primary/20 transition-colors">
                <CardContent className="py-4 px-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <ch.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{ch.name}</p>
                        <a
                          href={ch.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <p className="text-xs text-muted-foreground">{ch.desc}</p>
                    </div>
                  </div>
                  {ch.commands.map((cmd, i) => (
                    <CopyBlock key={i} code={cmd} />
                  ))}
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed">
              <CardContent className="py-4 px-4">
                <p className="text-xs text-muted-foreground">
                  <strong>Altri canali disponibili:</strong> iMessage, Microsoft Teams, Google Chat, Matrix, IRC, Signal, LINE, e molti altri.{' '}
                  <a
                    href="https://docs.openclaw.ai/channels"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Vedi tutti i canali →
                  </a>
                </p>
              </CardContent>
            </Card>

            <Separator />

            <div>
              <h2 className="text-sm font-bold text-foreground mb-3">Funzioni e Strumenti</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Browser Automation', cmd: 'openclaw tools browser', link: 'https://docs.openclaw.ai/tools' },
                  { name: 'Cron Jobs', cmd: 'openclaw cron list', link: 'https://docs.openclaw.ai/automation/cron-jobs' },
                  { name: 'Webhooks', cmd: 'openclaw webhooks list', link: 'https://docs.openclaw.ai/automation/webhook' },
                  { name: 'Skills & Plugins', cmd: 'openclaw skills list', link: 'https://docs.openclaw.ai/tools' },
                ].map((tool) => (
                  <Card key={tool.name} className="hover:border-primary/20 transition-colors">
                    <CardContent className="py-3 px-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-foreground">{tool.name}</p>
                        <a
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <CopyBlock code={tool.cmd} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setStep(2)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Indietro
              </Button>
              <Button onClick={() => setStep(4)} className="gap-2">
                Completa <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Done */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-3 duration-500">
            <div className="text-center py-8 space-y-4">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Installazione Completata!</h1>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                OpenClaw è stato configurato nella cartella <code className="text-primary font-mono text-xs bg-muted/50 px-1.5 py-0.5 rounded">{installPath}</code>.
                Ora puoi creare workflow di automazione dal tuo editor.
              </p>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Comandi utili</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CopyBlock code="openclaw gateway status" label="Stato del gateway:" />
                <CopyBlock code="openclaw dashboard" label="Apri la dashboard:" />
                <CopyBlock code="openclaw doctor" label="Diagnostica problemi:" />
                <CopyBlock code="openclaw update" label="Aggiorna OpenClaw:" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Risorse</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: 'Documentazione completa', url: 'https://docs.openclaw.ai' },
                  { label: 'Guida ai canali', url: 'https://docs.openclaw.ai/channels' },
                  { label: 'Strumenti e plugin', url: 'https://docs.openclaw.ai/tools' },
                  { label: 'GitHub - Windows Node', url: 'https://github.com/openclaw/openclaw-windows-node' },
                  { label: 'Piattaforma Windows', url: 'https://docs.openclaw.ai/platforms/windows' },
                ].map((res) => (
                  <a
                    key={res.url}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-primary hover:underline font-medium"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {res.label}
                  </a>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={() => setStep(0)} className="gap-2 text-xs">
                <ArrowLeft className="h-4 w-4" /> Rivedi installazione
              </Button>
              <Button onClick={() => {
                if (user) localStorage.setItem(`openclaw_install_${user.id}`, 'done');
                window.location.href = '/home';
              }} className="gap-2 text-xs">
                Vai alla dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
