import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import {
  Play, Clock, Globe, FileSearch, Send, Shuffle, Timer, Code, Mail,
  GitBranch, GitFork, Filter, Terminal, FileOutput, Bell, Zap, Cog, Download,
} from 'lucide-react';

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

function WorkflowNode({ data, selected }: NodeProps) {
  const { label, icon, category, inputs, outputs } = data as {
    label: string; icon: string; category: string; inputs: number; outputs: number;
  };

  const Icon = ICONS[icon] || Zap;
  const colorVar = CATEGORY_COLORS[category] || 'var(--node-action)';

  return (
    <div
      className={`
        relative min-w-[160px] rounded-lg border-2 bg-card shadow-lg
        transition-shadow duration-150
        ${selected ? 'shadow-xl ring-2 ring-primary/40' : 'shadow-md'}
      `}
      style={{ borderColor: `hsl(${colorVar})` }}
    >
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
        <span className="text-[10px] text-muted-foreground">Configura…</span>
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
