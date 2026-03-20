import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo.jpeg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Workflow,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  Rocket,
  Shield,
} from 'lucide-react';

interface OnboardingWizardProps {
  open: boolean;
  onComplete: () => void;
}

const STEPS = [
  { icon: Sparkles, key: 'welcome' },
  { icon: User, key: 'profile' },
  { icon: Workflow, key: 'features' },
  { icon: Rocket, key: 'ready' },
] as const;

export default function OnboardingWizard({ open, onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSaveName = async () => {
    if (name.trim() && user) {
      await supabase
        .from('profiles')
        .update({ display_name: name.trim() } as any)
        .eq('id', user.id);
    }
    setStep(2);
  };

  const handleFinish = async () => {
    // Mark onboarding as complete in localStorage
    if (user) {
      localStorage.setItem(`openclaw_onboarding_${user.id}`, 'done');
    }
    onComplete();
  };

  const handleStartProject = async () => {
    await handleFinish();
    navigate('/');
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md p-0 gap-0 overflow-hidden border-primary/20"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Progress bar */}
        <div className="flex gap-1 px-6 pt-5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="px-6 pt-6 pb-8 min-h-[320px] flex flex-col">
          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <div className="h-20 w-20 rounded-2xl overflow-hidden shadow-lg shadow-primary/20">
                <img src={logo} alt="OpenClawForWindows" className="h-full w-full object-cover" />
              </div>
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-xl font-bold">Benvenuto in OpenClawForWindows!</DialogTitle>
                <DialogDescription className="text-sm leading-relaxed">
                  Crea workflow di automazione visuale con nodi drag-and-drop.
                  <br />Ti guideremo nella configurazione in pochi secondi.
                </DialogDescription>
              </DialogHeader>
              <Button className="mt-2 gap-2" onClick={() => setStep(1)}>
                Iniziamo <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Step 1: Profile */}
          {step === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 animate-in fade-in slide-in-from-right-3 duration-500">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-7 w-7 text-primary" />
              </div>
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-lg font-bold">Come ti chiami?</DialogTitle>
                <DialogDescription className="text-sm">
                  Imposta il tuo nome visualizzato. Potrai cambiarlo in qualsiasi momento.
                </DialogDescription>
              </DialogHeader>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={user?.email?.split('@')[0] || 'Il tuo nome'}
                className="max-w-[260px] text-center"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              />
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setStep(0)}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Indietro
                </Button>
                <Button size="sm" onClick={handleSaveName}>
                  Continua <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Features overview */}
          {step === 2 && (
            <div className="flex-1 flex flex-col gap-5 animate-in fade-in slide-in-from-right-3 duration-500">
              <DialogHeader className="text-center space-y-2">
                <DialogTitle className="text-lg font-bold">Cosa puoi fare</DialogTitle>
                <DialogDescription className="text-sm">
                  Ecco le funzionalità principali a tua disposizione.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 flex-1">
                {[
                  {
                    icon: Workflow,
                    title: 'Editor Visuale',
                    desc: 'Trascina nodi e connettili per creare automazioni complesse.',
                  },
                  {
                    icon: Shield,
                    title: 'Sicurezza Locale',
                    desc: 'I tuoi workflow restano salvati in modo sicuro sul tuo dispositivo.',
                  },
                  {
                    icon: Sparkles,
                    title: 'Nodi Intelligenti',
                    desc: 'Timer, condizioni, azioni su file, mouse, tastiera e molto altro.',
                  },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <f.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{f.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Indietro
                </Button>
                <Button size="sm" onClick={() => setStep(3)}>
                  Continua <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Ready */}
          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 animate-in fade-in slide-in-from-right-3 duration-500">
              <div className="h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-7 w-7 text-green-500" />
              </div>
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-lg font-bold">Tutto pronto!</DialogTitle>
                <DialogDescription className="text-sm leading-relaxed">
                  Sei pronto per creare il tuo primo workflow.
                  <br />Puoi iniziare subito o esplorare la dashboard.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2 w-full max-w-[260px]">
                <Button className="w-full gap-2" onClick={handleStartProject}>
                  <Rocket className="h-4 w-4" /> Crea il primo workflow
                </Button>
                <Button variant="outline" className="w-full" onClick={handleFinish}>
                  Vai alla dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
