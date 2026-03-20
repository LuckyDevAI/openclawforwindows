import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import {
  Play, Clock, Globe, FileSearch, Send, Shuffle, Timer, Code, Mail,
  GitBranch, GitFork, Filter, Terminal, FileOutput, Bell, Zap, Cog, Download,
  CheckCircle2, XCircle, Loader2,
} from 'lucide-react';
import type { NodeExecStatus } from '@/hooks/useWorkflowExecution';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  Play, Clock, Globe, FileSearch, Send, Shuffle, Timer, Code, Mail,
  GitBranch, GitFork, Filter, Terminal, FileOutput, Bell, Zap, Cog, Download,
};

const CATEGORY_COLORS: Record<string, string> = {
  triggers: 'var(--node-trigger)',
  actions: 'var(--node-action)',
  conditions: 'var(--node-condition)',
  outputs: 'var(--node-output)',
};

const STATUS_STYLES: Record<NodeExecStatus, { border: string; glow: string; icon: React.ReactNode | null }> = {
  idle: { border: '', glow: '', icon: null },
  running: {
    border: 'border-primary animate-exec-pulse',
    glow: 'shadow-[0_0_16px_hsl(var(--primary)/0.4)]',
    icon: <Loader2 className="h-3 w-3 animate-spin text-primary" />,
  },
  success: {
    border: 'border-accent',
    glow: 'shadow-[0_0_12px_hsl(var(--accent)/0.3)]',
    icon: <CheckCircle2 className="h-3 w-3 text-accent" />,
  },
  error: {
    border: 'border-destructive',
    glow: 'shadow-[0_0_12px_hsl(var(--destructive)/0.3)]',
    icon: <XCircle className="h-3 w-3 text-destructive" />,
  },
};

function WorkflowNode({ data, selected }: NodeProps) {
  const { label, icon, category, inputs, outputs, execStatus } = data as {
    label: string; icon: string; category: string; inputs: number; outputs: number;
    execStatus?: NodeExecStatus;
  };

  const Icon = ICONS[icon] || Zap;
  const colorVar = CATEGORY_COLORS[category] || 'var(--node-action)';
  const status = execStatus || 'idle';
  const statusStyle = STATUS_STYLES[status];

  return (
    <div
      className={`
        relative min-w-[160px] rounded-lg border-2 bg-card shadow-lg
        transition-all duration-300 ease-out
        ${selected ? 'shadow-xl ring-2 ring-primary/40' : 'shadow-md'}
        ${status !== 'idle' ? statusStyle.border + ' ' + statusStyle.glow : ''}
      `}
      style={status === 'idle' ? { borderColor: `hsl(${colorVar})` } : undefined}
    >
      {/* Execution status indicator */}
      {statusStyle.icon && (
        <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-card border border-border z-10">
          {statusStyle.icon}
        </div>
      )}

      {/* Header */}
      <div
        className="flex items-center gap-2 rounded-t-[6px] px-3 py-2"
        style={{ backgroundColor: `hsl(${colorVar} / 0.15)` }}
      >
        <div
          className="flex h-6 w-6 items-center justify-center rounded"
          style={{ backgroundColor: `hsl(${colorVar} / 0.3)` }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color: `hsl(${colorVar})` }} />
        </div>
        <span className="text-xs font-semibold text-foreground truncate">{label}</span>
      </div>

      {/* Body placeholder */}
      <div className="px-3 py-2">
        <span className="text-[10px] text-muted-foreground">
          {status === 'running' ? 'In esecuzione...' : status === 'success' ? 'Completato ✓' : status === 'error' ? 'Errore ✗' : 'Configura…'}
        </span>
      </div>

      {/* Input handles */}
      {Array.from({ length: inputs as number }).map((_, i) => (
        <Handle
          key={`in-${i}`}
          type="target"
          position={Position.Left}
          id={`in-${i}`}
          style={{ top: `${30 + i * 20}px` }}
        />
      ))}

      {/* Output handles */}
      {Array.from({ length: outputs as number }).map((_, i) => (
        <Handle
          key={`out-${i}`}
          type="source"
          position={Position.Right}
          id={`out-${i}`}
          style={{ top: `${30 + i * 20}px` }}
        />
      ))}
    </div>
  );
}

export default memo(WorkflowNode);

export const nodeTypes = {
  'trigger-manual': WorkflowNode,
  'trigger-schedule': WorkflowNode,
  'trigger-webhook': WorkflowNode,
  'trigger-file': WorkflowNode,
  'action-http': WorkflowNode,
  'action-transform': WorkflowNode,
  'action-delay': WorkflowNode,
  'action-script': WorkflowNode,
  'action-email': WorkflowNode,
  'condition-if': WorkflowNode,
  'condition-switch': WorkflowNode,
  'condition-filter': WorkflowNode,
  'output-log': WorkflowNode,
  'output-file': WorkflowNode,
  'output-notify': WorkflowNode,
};
