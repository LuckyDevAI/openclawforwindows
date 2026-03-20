import { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { type Node } from '@xyflow/react';
import {
  Play, Save, FolderOpen, Settings, PanelLeftClose, PanelLeft,
  Workflow, LogOut, Plus, Trash2, Pencil, Check, X, Square,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import NodePalette from '@/components/NodePalette';
import SettingsToolbar from '@/components/SettingsToolbar';
import WorkflowCanvas, { type CanvasHandle } from '@/components/WorkflowCanvas';
import PropertiesPanel from '@/components/PropertiesPanel';
import ExecutionLog from '@/components/ExecutionLog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useWorkflowExecution } from '@/hooks/useWorkflowExecution';
import {
  listProjects,
  getProject,
  saveProject,
  deleteProject,
  renameProject,
  createProject,
  getActiveProjectId,
  type WorkflowProject,
} from '@/lib/projectStorage';


export default function WorkflowEditor() {
  const { signOut } = useAuth();
  const { t } = useSettings();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const canvasRef = useRef<CanvasHandle>(null);
  const { executing, nodeStatuses, execLog, runWorkflow, stopExecution } = useWorkflowExecution();
  const [showLog, setShowLog] = useState(false);

  // Project state
  const [currentProject, setCurrentProject] = useState<WorkflowProject | null>(null);
  const [projectName, setProjectName] = useState('');
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [openDialogOpen, setOpenDialogOpen] = useState(false);
  const [projects, setProjects] = useState<WorkflowProject[]>([]);

  // Load last active project on mount
  useEffect(() => {
    const activeId = getActiveProjectId();
    if (activeId) {
      const proj = getProject(activeId);
      if (proj) {
        setCurrentProject(proj);
        setProjectName(proj.name);
        // Defer loading until canvas is ready
        setTimeout(() => {
          canvasRef.current?.loadState(proj.nodes, proj.edges);
        }, 100);
        return;
      }
    }
    // No active project — create a new one
    const newProj = createProject(t('editor.untitled'));
    setCurrentProject(newProj);
    setProjectName(newProj.name);
  }, []);

  const handleSave = useCallback(() => {
    if (!currentProject || !canvasRef.current) return;
    const updated: WorkflowProject = {
      ...currentProject,
      name: projectName,
      nodes: canvasRef.current.getNodes(),
      edges: canvasRef.current.getEdges(),
    };
    saveProject(updated);
    setCurrentProject(updated);
    toast({ title: t('editor.saved'), description: `"${projectName}"` });
  }, [currentProject, projectName, toast]);

  // Sync execution statuses to canvas
  useEffect(() => {
    canvasRef.current?.setExecStatuses(nodeStatuses);
  }, [nodeStatuses]);

  const handleExecute = useCallback(async () => {
    if (!canvasRef.current) return;
    const nodes = canvasRef.current.getNodes();
    const edges = canvasRef.current.getEdges();
    if (nodes.length === 0) {
      toast({ title: t('editor.no_nodes'), variant: 'destructive' });
      return;
    }
    setShowLog(true);
    await runWorkflow(nodes, edges);
  }, [runWorkflow, toast]);

  // Keyboard shortcut Ctrl+S
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleSave]);

  const handleOpen = () => {
    setProjects(listProjects());
    setOpenDialogOpen(true);
  };

  const handleLoadProject = (proj: WorkflowProject) => {
    // Save current first
    if (currentProject && canvasRef.current) {
      saveProject({
        ...currentProject,
        name: projectName,
        nodes: canvasRef.current.getNodes(),
        edges: canvasRef.current.getEdges(),
      });
    }
    setCurrentProject(proj);
    setProjectName(proj.name);
    setSelectedNode(null);
    canvasRef.current?.loadState(proj.nodes, proj.edges);
    setOpenDialogOpen(false);
    toast({ title: t('editor.opened'), description: `"${proj.name}"` });
  };

  const handleNewProject = () => {
    // Save current first
    if (currentProject && canvasRef.current) {
      saveProject({
        ...currentProject,
        name: projectName,
        nodes: canvasRef.current.getNodes(),
        edges: canvasRef.current.getEdges(),
      });
    }
    const newProj = createProject(t('editor.new_project'));
    setCurrentProject(newProj);
    setProjectName(newProj.name);
    setSelectedNode(null);
    canvasRef.current?.loadState([], []);
    setOpenDialogOpen(false);
    toast({ title: t('editor.created') });
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteProject(id);
    setProjects(listProjects());
    if (currentProject?.id === id) {
      const remaining = listProjects();
      if (remaining.length > 0) {
        handleLoadProject(remaining[0]);
      } else {
        handleNewProject();
      }
    }
  };

  const startRename = () => {
    setRenameValue(projectName);
    setIsRenaming(true);
  };

  const confirmRename = () => {
    if (!renameValue.trim() || !currentProject) return;
    setProjectName(renameValue.trim());
    renameProject(currentProject.id, renameValue.trim());
    setCurrentProject(prev => prev ? { ...prev, name: renameValue.trim() } : prev);
    setIsRenaming(false);
    toast({ title: t('editor.renamed'), description: `"${renameValue.trim()}"` });
  };

  const cancelRename = () => setIsRenaming(false);

  const handleNodeSelect = (node: Node | null) => setSelectedNode(node);

  const handleUpdateData = (nodeId: string, data: Record<string, unknown>) => {
    canvasRef.current?.update(nodeId, data);
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

          {/* Project name / rename */}
          {isRenaming ? (
            <div className="flex items-center gap-1">
              <Input
                value={renameValue}
                onChange={e => setRenameValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') confirmRename();
                  if (e.key === 'Escape') cancelRename();
                }}
                className="h-7 w-48 text-xs"
                autoFocus
              />
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={confirmRename}>
                <Check className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={cancelRename}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <button
              onClick={startRename}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
              {projectName}
              <Pencil className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          )}

          <div className="flex-1" />
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs" onClick={handleOpen}>
            <FolderOpen className="h-3.5 w-3.5" /> {t('editor.open')}
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs" onClick={handleSave}>
            <Save className="h-3.5 w-3.5" /> {t('editor.save')}
          </Button>
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
              <Settings className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-5" />
          {executing ? (
            <Button size="sm" variant="destructive" className="h-8 gap-1.5 text-xs font-semibold" onClick={stopExecution}>
              <Square className="h-3.5 w-3.5" /> {t('editor.stop')}
            </Button>
          ) : (
            <Button size="sm" className="h-8 gap-1.5 text-xs font-semibold" onClick={handleExecute}>
              <Play className="h-3.5 w-3.5" /> {t('editor.run')}
            </Button>
          )}
          <SettingsToolbar />
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={signOut}>
            <LogOut className="h-3.5 w-3.5" />
          </Button>
        </header>

        {/* Canvas + Properties */}
        <div className="flex flex-1 min-h-0">
          <main className="flex-1 relative">
            <WorkflowCanvas
              ref={canvasRef}
              selectedNodeId={selectedNode?.id || null}
              onNodeSelect={handleNodeSelect}
              onNodeDataUpdate={handleUpdateData}
            />
            {/* Empty state hint */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" id="empty-hint">
              <div className="text-center opacity-30">
                <Workflow className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">{t('editor.drag_hint')}</p>
              </div>
            </div>

            {/* Execution Log */}
            {showLog && (
              <ExecutionLog
                log={execLog}
                executing={executing}
                onClose={() => setShowLog(false)}
              />
            )}
          </main>

          {/* Right Properties Panel */}
          <PropertiesPanel
            node={selectedNode}
            onClose={handleClosePanel}
            onUpdateData={handleUpdateData}
          />
        </div>
      </div>

      {/* Open Project Dialog */}
      <Dialog open={openDialogOpen} onOpenChange={setOpenDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">{t('editor.open_project')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Button variant="outline" size="sm" className="w-full h-9 gap-1.5 text-xs" onClick={handleNewProject}>
              <Plus className="h-3.5 w-3.5" /> {t('editor.new_project')}
            </Button>
            <Separator />
            <ScrollArea className="max-h-64">
              {projects.length === 0 ? (
                <p className="text-xs text-center text-muted-foreground py-4">{t('editor.no_projects')}</p>
              ) : (
                <div className="space-y-1">
                  {projects.map(proj => (
                    <div
                      key={proj.id}
                      onClick={() => handleLoadProject(proj)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer transition-colors hover:bg-secondary/50 ${
                        proj.id === currentProject?.id ? 'bg-secondary' : ''
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-foreground truncate">{proj.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {proj.nodes.length} nodi · {new Date(proj.updatedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive shrink-0"
                        onClick={(e) => handleDeleteProject(proj.id, e)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
