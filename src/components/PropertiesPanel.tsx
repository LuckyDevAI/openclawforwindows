import { X, Zap, Play, Clock, Globe, FileSearch, Send, Shuffle, Timer, Code, Mail, GitBranch, GitFork, Filter, Terminal, FileOutput, Bell } from 'lucide-react';
import { type Node } from '@xyflow/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  Play, Clock, Globe, FileSearch, Send, Shuffle, Timer, Code, Mail,
  GitBranch, GitFork, Filter, Terminal, FileOutput, Bell, Zap,
};

const CATEGORY_COLORS: Record<string, string> = {
  triggers: 'var(--node-trigger)',
  actions: 'var(--node-action)',
  conditions: 'var(--node-condition)',
  outputs: 'var(--node-output)',
};

// Field definitions per node type
const NODE_FIELDS: Record<string, Field[]> = {
  'trigger-manual': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome del trigger' },
  ],
  'trigger-schedule': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'cron', label: 'Espressione Cron', type: 'text', placeholder: '0 * * * *' },
    { key: 'timezone', label: 'Fuso Orario', type: 'select', options: ['UTC', 'Europe/Rome', 'US/Eastern', 'Asia/Tokyo'] },
  ],
  'trigger-webhook': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'method', label: 'Metodo', type: 'select', options: ['GET', 'POST', 'PUT', 'DELETE'] },
    { key: 'path', label: 'Percorso', type: 'text', placeholder: '/api/webhook' },
  ],
  'trigger-file': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'watchPath', label: 'Percorso', type: 'text', placeholder: '/cartella/da/monitorare' },
    { key: 'recursive', label: 'Ricorsivo', type: 'toggle' },
  ],
  'action-http': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'url', label: 'URL', type: 'text', placeholder: 'https://api.example.com/data' },
    { key: 'method', label: 'Metodo', type: 'select', options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
    { key: 'headers', label: 'Headers (JSON)', type: 'textarea', placeholder: '{"Authorization": "Bearer ..."}' },
    { key: 'body', label: 'Body', type: 'textarea', placeholder: '{"key": "value"}' },
  ],
  'action-transform': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'expression', label: 'Espressione', type: 'textarea', placeholder: 'data.map(item => item.name)' },
  ],
  'action-delay': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'duration', label: 'Durata (ms)', type: 'text', placeholder: '1000' },
  ],
  'action-script': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'code', label: 'Codice', type: 'textarea', placeholder: '// Il tuo codice qui\nreturn data;' },
    { key: 'language', label: 'Linguaggio', type: 'select', options: ['JavaScript', 'Python'] },
  ],
  'action-email': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'to', label: 'Destinatario', type: 'text', placeholder: 'email@example.com' },
    { key: 'subject', label: 'Oggetto', type: 'text', placeholder: 'Oggetto email' },
    { key: 'body', label: 'Contenuto', type: 'textarea', placeholder: 'Corpo della email...' },
  ],
  'condition-if': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'condition', label: 'Condizione', type: 'text', placeholder: 'data.value > 10' },
  ],
  'condition-switch': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'expression', label: 'Espressione', type: 'text', placeholder: 'data.status' },
    { key: 'cases', label: 'Casi (uno per riga)', type: 'textarea', placeholder: 'success\nerror\npending' },
  ],
  'condition-filter': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'condition', label: 'Condizione Filtro', type: 'text', placeholder: 'item.active === true' },
  ],
  'output-log': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'level', label: 'Livello', type: 'select', options: ['info', 'warn', 'error', 'debug'] },
    { key: 'message', label: 'Messaggio', type: 'textarea', placeholder: 'Log: {{data}}' },
  ],
  'output-file': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'filePath', label: 'Percorso File', type: 'text', placeholder: '/output/result.json' },
    { key: 'format', label: 'Formato', type: 'select', options: ['JSON', 'CSV', 'TXT'] },
  ],
  'output-notify': [
    { key: 'name', label: 'Nome', type: 'text', placeholder: 'Nome' },
    { key: 'title', label: 'Titolo', type: 'text', placeholder: 'Notifica' },
    { key: 'message', label: 'Messaggio', type: 'text', placeholder: 'Operazione completata!' },
  ],
};

interface Field {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'toggle';
  placeholder?: string;
  options?: string[];
}

interface Props {
  node: Node | null;
  onClose: () => void;
  onUpdateData: (nodeId: string, data: Record<string, unknown>) => void;
}

export default function PropertiesPanel({ node, onClose, onUpdateData }: Props) {
  if (!node) return null;

  const data = node.data as Record<string, unknown>;
  const nodeType = node.type || '';
  const fields = NODE_FIELDS[nodeType] || [{ key: 'name', label: 'Nome', type: 'text' as const, placeholder: 'Nome' }];
  const category = (data.category as string) || 'actions';
  const colorVar = CATEGORY_COLORS[category] || 'var(--node-action)';
  const Icon = ICONS[(data.icon as string)] || Zap;

  const updateField = (key: string, value: unknown) => {
    onUpdateData(node.id, { ...data, [key]: value });
  };

  return (
    <aside className="flex flex-col w-72 border-l border-border bg-card/80 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-md"
          style={{ backgroundColor: `hsl(${colorVar} / 0.2)` }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color: `hsl(${colorVar})` }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground truncate">{data.label as string}</p>
          <p className="text-[9px] text-muted-foreground">{nodeType}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={onClose}>
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Fields */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Configurazione</p>
          <Separator className="mb-3" />
        </div>

        {fields.map(field => (
          <div key={field.key} className="space-y-1.5">
            <Label className="text-[11px] text-foreground/80">{field.label}</Label>

            {field.type === 'text' && (
              <Input
                className="h-8 text-xs bg-muted/40 border-border"
                placeholder={field.placeholder}
                value={(data[field.key] as string) || ''}
                onChange={e => updateField(field.key, e.target.value)}
              />
            )}

            {field.type === 'textarea' && (
              <Textarea
                className="text-xs bg-muted/40 border-border min-h-[72px] resize-y font-mono"
                placeholder={field.placeholder}
                value={(data[field.key] as string) || ''}
                onChange={e => updateField(field.key, e.target.value)}
              />
            )}

            {field.type === 'select' && field.options && (
              <Select
                value={(data[field.key] as string) || field.options[0]}
                onValueChange={v => updateField(field.key, v)}
              >
                <SelectTrigger className="h-8 text-xs bg-muted/40 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map(opt => (
                    <SelectItem key={opt} value={opt} className="text-xs">{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {field.type === 'toggle' && (
              <div className="flex items-center gap-2">
                <Switch
                  checked={!!data[field.key]}
                  onCheckedChange={v => updateField(field.key, v)}
                />
                <span className="text-[10px] text-muted-foreground">
                  {data[field.key] ? 'Attivo' : 'Disattivo'}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Node ID info */}
        <div className="pt-3">
          <Separator className="mb-3" />
          <p className="text-[9px] text-muted-foreground/60 font-mono">ID: {node.id}</p>
        </div>
      </div>
    </aside>
  );
}
