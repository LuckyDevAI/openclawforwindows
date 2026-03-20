import { useState } from 'react';
import { Play, Save, FolderOpen, Settings, PanelLeftClose, PanelLeft, Workflow } from 'lucide-react';
import NodePalette from '@/components/NodePalette';
import WorkflowCanvas from '@/components/WorkflowCanvas';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function WorkflowEditor() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`
          flex flex-col border-r border-border bg-sidebar transition-all duration-200 ease-out
          ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}
        `}
      >
        {/* Branding */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <Workflow className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground tracking-tight">OpenClaw</h1>
            <p className="text-[9px] text-muted-foreground">Automation Builder</p>
          </div>
        </div>

        <NodePalette />
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Toolbar */}
        <header className="flex h-12 items-center gap-2 border-b border-border bg-card/60 px-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSidebarOpen(v => !v)}
          >
            {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </Button>

          <Separator orientation="vertical" className="h-5" />

          <span className="text-xs font-medium text-muted-foreground">Progetto senza titolo</span>

          <div className="flex-1" />

          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
            <FolderOpen className="h-3.5 w-3.5" /> Apri
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
            <Save className="h-3.5 w-3.5" /> Salva
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
            <Settings className="h-3.5 w-3.5" />
          </Button>

          <Separator orientation="vertical" className="h-5" />

          <Button size="sm" className="h-8 gap-1.5 text-xs font-semibold">
            <Play className="h-3.5 w-3.5" /> Esegui
          </Button>
        </header>

        {/* Canvas */}
        <main className="flex-1 relative">
          <WorkflowCanvas />

          {/* Empty state */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" id="empty-hint">
            <div className="text-center opacity-30">
              <Workflow className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">Trascina i nodi dalla sidebar per iniziare</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
