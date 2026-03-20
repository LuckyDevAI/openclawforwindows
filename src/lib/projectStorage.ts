import type { Node, Edge } from '@xyflow/react';
import { supabase } from '@/integrations/supabase/client';

export interface WorkflowProject {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: string;
  updatedAt: string;
}

const ACTIVE_KEY = 'openclaw_active_project';
const LEGACY_KEY = 'openclaw_projects';

// ─── Helpers ───────────────────────────────────────────────

function getUserId(): string | null {
  // Sync read from localStorage (supabase stores session there)
  try {
    const raw = localStorage.getItem(`sb-${import.meta.env.VITE_SUPABASE_PROJECT_ID}-auth-token`);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed?.user?.id ?? null;
    }
  } catch { /* ignore */ }
  return null;
}

function rowToProject(row: any): WorkflowProject {
  return {
    id: row.id,
    name: row.name,
    nodes: (row.nodes ?? []) as Node[],
    edges: (row.edges ?? []) as Edge[],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ─── Migration from localStorage ───────────────────────────

export async function migrateLocalProjects(): Promise<void> {
  const raw = localStorage.getItem(LEGACY_KEY);
  if (!raw) return;

  const userId = getUserId();
  if (!userId) return;

  try {
    const locals: WorkflowProject[] = JSON.parse(raw);
    if (!Array.isArray(locals) || locals.length === 0) {
      localStorage.removeItem(LEGACY_KEY);
      return;
    }

    // Upsert all local projects to cloud
    const rows = locals.map(p => ({
      id: p.id,
      user_id: userId,
      name: p.name,
      nodes: p.nodes as any,
      edges: p.edges as any,
      created_at: p.createdAt,
      updated_at: p.updatedAt,
    }));

    const { error } = await supabase
      .from('workflows')
      .upsert(rows as any, { onConflict: 'id,user_id' });

    if (!error) {
      localStorage.removeItem(LEGACY_KEY);
      console.log(`[OpenClaw] Migrated ${locals.length} workflows to cloud`);
    }
  } catch (e) {
    console.error('[OpenClaw] Migration error:', e);
  }
}

// ─── CRUD ──────────────────────────────────────────────────

export async function listProjects(): Promise<WorkflowProject[]> {
  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('listProjects error:', error);
    return [];
  }
  return (data ?? []).map(rowToProject);
}

export async function getProject(id: string): Promise<WorkflowProject | undefined> {
  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) return undefined;
  return rowToProject(data);
}

export async function saveProject(project: WorkflowProject): Promise<void> {
  const userId = getUserId();
  if (!userId) return;

  const { error } = await supabase
    .from('workflows')
    .upsert({
      id: project.id,
      user_id: userId,
      name: project.name,
      nodes: project.nodes as any,
      edges: project.edges as any,
      created_at: project.createdAt,
      updated_at: new Date().toISOString(),
    } as any, { onConflict: 'id,user_id' });

  if (error) console.error('saveProject error:', error);
  setActiveProjectId(project.id);
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('workflows')
    .delete()
    .eq('id', id);

  if (error) console.error('deleteProject error:', error);
  if (getActiveProjectId() === id) {
    localStorage.removeItem(ACTIVE_KEY);
  }
}

export async function renameProject(id: string, name: string): Promise<void> {
  const { error } = await supabase
    .from('workflows')
    .update({ name, updated_at: new Date().toISOString() } as any)
    .eq('id', id);

  if (error) console.error('renameProject error:', error);
}

export async function createProject(name: string): Promise<WorkflowProject> {
  const now = new Date().toISOString();
  const project: WorkflowProject = {
    id: `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name,
    nodes: [],
    edges: [],
    createdAt: now,
    updatedAt: now,
  };
  await saveProject(project);
  return project;
}

export function getActiveProjectId(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function setActiveProjectId(id: string): void {
  localStorage.setItem(ACTIVE_KEY, id);
}
