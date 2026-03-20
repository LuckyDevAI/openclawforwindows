import { useState } from 'react';
import { NODE_CATEGORIES } from '@/workflow/nodeDefinitions';
import {
  Zap, Cog, GitBranch, Download, ChevronDown, ChevronRight, GripVertical,
  Play, Clock, Globe, FileSearch, Send, Shuffle, Timer, Code, Mail,
  GitFork, Filter, Terminal, FileOutput, Bell,
} from 'lucide-react';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  Zap, Cog, GitBranch, Download, Play, Clock, Globe, FileSearch,
  Send, Shuffle, Timer, Code, Mail, GitFork, Filter, Terminal, FileOutput, Bell,
};

export default function NodePalette() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set(NODE_CATEGORIES.map(c => c.id))
  );

  const toggle = (id: string) => {
    setOpenCategories(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const onDragStart = (e: React.DragEvent, nodeType: string, data: Record<string, unknown>) => {
    e.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType, data }));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-bold text-foreground tracking-wide">Nodi</h2>
        <p className="text-[10px] text-muted-foreground mt-0.5">Trascina nella canvas</p>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {NODE_CATEGORIES.map(cat => {
          const CatIcon = ICONS[cat.icon] || Zap;
          const isOpen = openCategories.has(cat.id);

          return (
            <div key={cat.id}>
              <button
                onClick={() => toggle(cat.id)}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs font-semibold text-foreground hover:bg-muted/60 transition-colors"
              >
                <CatIcon className="h-3.5 w-3.5" style={{ color: cat.color }} />
                <span className="flex-1 text-left">{cat.label}</span>
                {isOpen ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />}
              </button>

              {isOpen && (
                <div className="ml-2 space-y-0.5 mb-1">
                  {cat.nodes.map(node => {
                    const NodeIcon = ICONS[node.icon] || Zap;
                    return (
                      <div
                        key={node.type}
                        draggable
                        onDragStart={e => onDragStart(e, node.type, {
                          label: node.label,
                          icon: node.icon,
                          category: cat.id,
                          inputs: node.inputs,
                          outputs: node.outputs,
                        })}
                        className="flex items-center gap-2 rounded-md border border-transparent px-2 py-1.5 cursor-grab
                          hover:bg-muted/40 hover:border-border active:cursor-grabbing transition-all group"
                      >
                        <GripVertical className="h-3 w-3 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                        <NodeIcon className="h-3.5 w-3.5 shrink-0" style={{ color: cat.color }} />
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium text-foreground truncate">{node.label}</p>
                          <p className="text-[9px] text-muted-foreground truncate">{node.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
