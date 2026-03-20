import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2, X, Terminal } from 'lucide-react';
import type { ExecLogEntry } from '@/hooks/useWorkflowExecution';

interface Props {
  log: ExecLogEntry[];
  executing: boolean;
  onClose: () => void;
}

export default function ExecutionLog({ log, executing, onClose }: Props) {
  if (log.length === 0) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 z-20 max-h-48 rounded-lg border border-border bg-card/95 backdrop-blur-sm shadow-xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Log esecuzione
          </span>
          {executing && (
            <span className="flex items-center gap-1 text-[10px] text-primary">
              <Loader2 className="h-3 w-3 animate-spin" /> In corso…
            </span>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="h-3 w-3" />
        </Button>
      </div>
      <ScrollArea className="max-h-32">
        <div className="px-3 py-1.5 space-y-0.5">
          {log.map((entry, i) => (
            <div key={i} className="flex items-start gap-2 py-1">
              {entry.status === 'running' && <Loader2 className="h-3 w-3 animate-spin text-primary mt-0.5 shrink-0" />}
              {entry.status === 'success' && <CheckCircle2 className="h-3 w-3 text-accent mt-0.5 shrink-0" />}
              {entry.status === 'error' && <XCircle className="h-3 w-3 text-destructive mt-0.5 shrink-0" />}
              <span className={`text-[11px] ${entry.status === 'error' ? 'text-destructive' : 'text-foreground'}`}>
                {entry.message}
              </span>
              <span className="text-[9px] text-muted-foreground ml-auto shrink-0 tabular-nums">
                {new Date(entry.timestamp).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
