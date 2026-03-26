import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Bot, Trash2, Pencil, Check, X, Zap, Globe, Cpu,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export interface Agent {
  id: string;
  provider: string;
  name: string;
  api_key_hint: string | null;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

interface AgentListProps {
  agents: Agent[];
  onRefresh: () => void;
}

const PROVIDER_META: Record<string, { icon: typeof Bot; color: string; label: string }> = {
  anthropic: { icon: Bot, color: 'text-orange-500', label: 'Anthropic (Claude)' },
  openai: { icon: Zap, color: 'text-green-500', label: 'OpenAI (GPT)' },
  google: { icon: Globe, color: 'text-blue-500', label: 'Google (Gemini)' },
  qwen: { icon: Cpu, color: 'text-purple-500', label: 'Qwen (DashScope)' },
  deepseek: { icon: Zap, color: 'text-cyan-500', label: 'DeepSeek' },
  mistral: { icon: Zap, color: 'text-amber-500', label: 'Mistral' },
  ollama: { icon: Cpu, color: 'text-emerald-500', label: 'Ollama (Locale)' },
};

export default function AgentList({ agents, onRefresh }: AgentListProps) {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleStartEdit = (agent: Agent) => {
    setEditingId(agent.id);
    setEditName(agent.name);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editName.trim()) return;
    await supabase
      .from('agents')
      .update({ name: editName.trim(), updated_at: new Date().toISOString() })
      .eq('id', editingId);
    setEditingId(null);
    onRefresh();
    toast({ title: '✓', description: 'Agente aggiornato.' });
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await supabase.from('agents').delete().eq('id', deleteId);
    setDeleteId(null);
    onRefresh();
    toast({ title: '✓', description: 'Agente rimosso.' });
  };

  if (agents.length === 0) {
    return (
      <Card className="border-dashed border-2 border-border">
        <CardContent className="flex flex-col items-center justify-center py-8 gap-2">
          <Bot className="h-8 w-8 text-muted-foreground/40" />
          <p className="text-xs text-muted-foreground">Nessun agente configurato</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-2">
        {agents.map((agent) => {
          const meta = PROVIDER_META[agent.provider] || { icon: Bot, color: 'text-primary', label: agent.provider };
          const Icon = meta.icon;
          const isEditing = editingId === agent.id;

          return (
            <Card key={agent.id} className="group hover:border-primary/30 transition-colors">
              <CardContent className="flex items-center gap-3 py-3 px-4">
                <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Icon className={`h-4 w-4 ${meta.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <div className="flex items-center gap-1.5">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-7 text-xs max-w-[180px]"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                      />
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleSaveEdit}>
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setEditingId(null)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-foreground truncate">{agent.name}</p>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span>{meta.label}</span>
                        {agent.api_key_hint && (
                          <>
                            <span>·</span>
                            <Badge variant="outline" className="text-[9px] px-1.5 py-0 font-mono">
                              {agent.api_key_hint}
                            </Badge>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
                {!isEditing && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-foreground"
                      onClick={() => handleStartEdit(agent)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => setDeleteId(agent.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-sm">Rimuovi agente</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Sei sicuro di voler rimuovere questo agente? L'azione non può essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-xs">Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Rimuovi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
