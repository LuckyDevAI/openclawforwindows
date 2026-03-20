import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { type Node } from '@xyflow/react';
import { Play, Save, FolderOpen, Settings, PanelLeftClose, PanelLeft, Workflow, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import NodePalette from '@/components/NodePalette';
import WorkflowCanvas from '@/components/WorkflowCanvas';
import PropertiesPanel from '@/components/PropertiesPanel';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function WorkflowEditor() {
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const canvasRef = useRef<{ update: (id: string, data: Record<string, unknown>) => void; getNode: (id: string) => Node | undefined } | null>(null);

  const handleNodeSelect = (node: Node | null) => {
    setSelectedNode(node);
  };

  const handleUpdateData = (nodeId: string, data: Record<string, unknown>) => {
    canvasRef.current?.update(nodeId, data);
    // Also update local selected node so panel reflects changes immediately
    setSelectedNode(prev => prev && prev.id === nodeId ? { ...prev, data } : prev);
  };

  const handleClosePanel = () => setSelectedNode(null);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Left Sidebar */}
      <aside
        className={`
          flex flex-col border-r border-border bg-sidebar transition-all duration-200 ease-out
          ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}
        `}
      >
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
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSidebarOpen(v => !v)}>
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
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
              <Settings className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-5" />
          <Button size="sm" className="h-8 gap-1.5 text-xs font-semibold">
            <Play className="h-3.5 w-3.5" /> Esegui
          </Button>
        </header>

        {/* Canvas + Properties */}
        <div className="flex flex-1 min-h-0">
          <main className="flex-1 relative">
            <WorkflowCanvas
              selectedNodeId={selectedNode?.id || null}
              onNodeSelect={handleNodeSelect}
              onNodeDataUpdate={handleUpdateData}
              nodesRef={canvasRef}
            />
            {/* Empty state hint */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" id="empty-hint">
              <div className="text-center opacity-30">
                <Workflow className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">Trascina i nodi dalla sidebar per iniziare</p>
              </div>
            </div>
          </main>

          {/* Right Properties Panel */}
          <PropertiesPanel
            node={selectedNode}
            onClose={handleClosePanel}
            onUpdateData={handleUpdateData}
          />
        </div>
      </div>
    </div>
  );
}
