import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  Bot,
  Key,
  Zap,
  Globe,
  Cpu,
  ExternalLink,
  Rocket,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AgentInstallWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PROVIDERS = [
  {
    id: 'anthropic',
    name: 'Anthropic (Claude)',
    desc: 'Claude 4, Claude 3.5 Sonnet, Haiku. Eccellente per coding e ragionamento.',
    icon: Bot,
    color: 'text-orange-500',
    keyLabel: 'ANTHROPIC_API_KEY',
    keyPlaceholder: 'sk-ant-...',
    link: 'https://console.anthropic.com/settings/keys',
    configCmd: (key: string) => `openclaw config set anthropic.apiKey "${key}"`,
    testCmd: 'openclaw test anthropic',
  },
  {
    id: 'openai',
    name: 'OpenAI (GPT)',
    desc: 'GPT-5, GPT-4o, o3. Il più versatile e popolare.',
    icon: Zap,
    color: 'text-green-500',
    keyLabel: 'OPENAI_API_KEY',
    keyPlaceholder: 'sk-...',
    link: 'https://platform.openai.com/api-keys',
    configCmd: (key: string) => `openclaw config set openai.apiKey "${key}"`,
    testCmd: 'openclaw test openai',
  },
  {
    id: 'google',
    name: 'Google (Gemini)',
    desc: 'Gemini 2.5 Pro, Flash. Ottimo per multimodale e contesti lunghi.',
    icon: Globe,
    color: 'text-blue-500',
    keyLabel: 'GOOGLE_API_KEY',
    keyPlaceholder: 'AIza...',
    link: 'https://aistudio.google.com/apikey',
    configCmd: (key: string) => `openclaw config set google.apiKey "${key}"`,
    testCmd: 'openclaw test google',
  },
  {
    id: 'qwen',
    name: 'Qwen (DashScope)',
    desc: 'Qwen3.5. Modello Alibaba Cloud, ottimo rapporto qualità/prezzo.',
    icon: Cpu,
    color: 'text-purple-500',
    keyLabel: 'DASHSCOPE_API_KEY',
    keyPlaceholder: 'sk-...',
    link: 'https://dashscope.console.aliyun.com/',
    configCmd: (key: string) => `openclaw config set qwen.apiKey "${key}"`,
    testCmd: 'openclaw test qwen',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    desc: 'DeepSeek V3, R1. Economico e potente per reasoning.',
    icon: Zap,
    color: 'text-cyan-500',
    keyLabel: 'DEEPSEEK_API_KEY',
    keyPlaceholder: 'sk-...',
    link: 'https://platform.deepseek.com/api_keys',
    configCmd: (key: string) => `openclaw config set deepseek.apiKey "${key}"`,
    testCmd: 'openclaw test deepseek',
  },
  {
    id: 'mistral',
    name: 'Mistral',
    desc: 'Mistral Large, Medium. Modello europeo, veloce e preciso.',
    icon: Zap,
    color: 'text-amber-500',
    keyLabel: 'MISTRAL_API_KEY',
    keyPlaceholder: 'sk-...',
    link: 'https://console.mistral.ai/api-keys',
    configCmd: (key: string) => `openclaw config set mistral.apiKey "${key}"`,
    testCmd: 'openclaw test mistral',
  },
  {
    id: 'ollama',
    name: 'Ollama (Locale)',
    desc: 'Esegui modelli in locale. Nessuna API key necessaria.',
    icon: Cpu,
    color: 'text-emerald-500',
    keyLabel: '',
    keyPlaceholder: '',
    link: 'https://ollama.com/download',
    configCmd: () => 'openclaw config set ollama.host "http://localhost:11434"',
    testCmd: 'openclaw test ollama',
    noKey: true,
  },
];

function CopyBlock({ code, label }: { code: string; label?: string }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({ title: 'Copiato!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {label && <p className="text-xs text-muted-foreground mb-1">{label}</p>}
      <div className="flex items-center gap-2 bg-muted/60 border border-border rounded-lg px-3 py-2 font-mono text-[11px] leading-relaxed">
        <Terminal className="h-3 w-3 text-primary shrink-0" />
        <code className="flex-1 text-foreground select-all overflow-x-auto">{code}</code>
        <button onClick={handleCopy} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
          {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
        </button>
      </div>
    </div>
  );
}

export default function AgentInstallWizard({ open, onOpenChange }: AgentInstallWizardProps) {
  const [step, setStep] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<typeof PROVIDERS[0] | null>(null);
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const reset = () => {
    setStep(0);
    setSelectedProvider(null);
    setApiKey('');
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(reset, 300);
  };

  const handleSelectProvider = (provider: typeof PROVIDERS[0]) => {
    setSelectedProvider(provider);
    setApiKey('');
    setStep(1);
  };

  const handleConfigured = () => {
    setStep(2);
  };

  const handleFinish = () => {
    toast({
      title: '✓ Agente configurato',
      description: `${selectedProvider?.name} è pronto per l'uso nei tuoi workflow.`,
    });
    handleClose();
  };

  const STEP_LABELS = ['Provider', 'Configura', 'Pronto'];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden border-primary/20 max-h-[90vh]">
        {/* Progress */}
        <div className="flex gap-1 px-5 pt-4">
          {STEP_LABELS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="px-5 pt-4 pb-6 overflow-y-auto max-h-[75vh]">
          {/* Step 0: Choose provider */}
          {step === 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <DialogHeader className="space-y-1">
                <DialogTitle className="text-base font-bold flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Installa nuovo agente
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Scegli il provider AI per il tuo nuovo agente. Puoi aggiungerne quanti ne vuoi.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-2">
                {PROVIDERS.map((provider) => {
                  const Icon = provider.icon;
                  return (
                    <Card
                      key={provider.id}
                      className="cursor-pointer hover:border-primary/30 transition-colors"
                      onClick={() => handleSelectProvider(provider)}
                    >
                      <CardContent className="flex items-center gap-3 py-3 px-4">
                        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <Icon className={`h-4 w-4 ${provider.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-foreground">{provider.name}</p>
                            {provider.noKey && (
                              <Badge variant="secondary" className="text-[9px] px-1.5 py-0">Locale</Badge>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground">{provider.desc}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 1: Configure */}
          {step === 1 && selectedProvider && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-500">
              <DialogHeader className="space-y-1">
                <DialogTitle className="text-base font-bold flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Configura {selectedProvider.name}
                </DialogTitle>
                <DialogDescription className="text-xs">
                  {selectedProvider.noKey
                    ? 'Ollama non richiede API key. Assicurati che sia in esecuzione localmente.'
                    : `Inserisci la tua API key e configura l'agente.`}
                </DialogDescription>
              </DialogHeader>

              {/* Get API Key */}
              {!selectedProvider.noKey && (
                <Card>
                  <CardContent className="py-4 px-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-foreground">1. Ottieni la API Key</p>
                      <a
                        href={selectedProvider.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                      >
                        Apri console <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <Input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={selectedProvider.keyPlaceholder}
                      className="font-mono text-xs h-9"
                    />
                    <p className="text-[10px] text-muted-foreground">
                      La key resta salvata localmente nel tuo sistema, mai inviata a server esterni.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Configure command */}
              <Card>
                <CardContent className="py-4 px-4 space-y-3">
                  <p className="text-xs font-medium text-foreground">
                    {selectedProvider.noKey ? '1' : '2'}. Configura nel terminale
                  </p>
                  <CopyBlock
                    code={selectedProvider.configCmd(apiKey || selectedProvider.keyPlaceholder)}
                    label="Esegui questo comando:"
                  />
                </CardContent>
              </Card>

              {/* Test command */}
              <Card>
                <CardContent className="py-4 px-4 space-y-3">
                  <p className="text-xs font-medium text-foreground">
                    {selectedProvider.noKey ? '2' : '3'}. Testa la connessione
                  </p>
                  <CopyBlock
                    code={selectedProvider.testCmd}
                    label="Verifica che funzioni:"
                  />
                </CardContent>
              </Card>

              {selectedProvider.noKey && (
                <Card className="border-dashed">
                  <CardContent className="py-3 px-4">
                    <p className="text-[11px] text-muted-foreground">
                      <strong>Suggerimento:</strong> Per scaricare un modello con Ollama, esegui{' '}
                      <code className="bg-muted px-1 py-0.5 rounded text-[10px] font-mono">ollama pull llama3.1</code>
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between pt-1">
                <Button variant="ghost" size="sm" onClick={() => setStep(0)} className="gap-1.5 text-xs">
                  <ArrowLeft className="h-3.5 w-3.5" /> Indietro
                </Button>
                <Button
                  size="sm"
                  onClick={handleConfigured}
                  disabled={!selectedProvider.noKey && !apiKey.trim()}
                  className="gap-1.5 text-xs"
                >
                  Ho configurato <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Done */}
          {step === 2 && selectedProvider && (
            <div className="flex flex-col items-center justify-center text-center gap-5 py-6 animate-in fade-in slide-in-from-right-3 duration-500">
              <div className="h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-green-500" />
              </div>
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-base font-bold">Agente pronto!</DialogTitle>
                <DialogDescription className="text-sm leading-relaxed">
                  <strong>{selectedProvider.name}</strong> è stato configurato con successo.
                  <br />Ora puoi usarlo nei tuoi workflow di automazione.
                </DialogDescription>
              </DialogHeader>

              <CopyBlock
                code={`openclaw agent add --provider ${selectedProvider.id} --name "Il mio agente"`}
                label="Aggiungi l'agente al progetto:"
              />

              <div className="flex flex-col gap-2 w-full max-w-[280px]">
                <Button className="w-full gap-2 text-xs" onClick={handleFinish}>
                  <Rocket className="h-4 w-4" /> Chiudi e inizia
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-xs"
                  onClick={() => {
                    reset();
                  }}
                >
                  Aggiungi un altro agente
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
