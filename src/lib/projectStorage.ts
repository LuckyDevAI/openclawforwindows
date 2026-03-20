import type { Node, Edge } from '@xyflow/react';

export interface WorkflowProject {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'openclaw_projects';
const ACTIVE_KEY = 'openclaw_active_project';

function getAll(): WorkflowProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(projects: WorkflowProject[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function listProjects(): WorkflowProject[] {
  return getAll().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getProject(id: string): WorkflowProject | undefined {
  return getAll().find(p => p.id === id);
}

export function saveProject(project: WorkflowProject): void {
  const all = getAll();
  const idx = all.findIndex(p => p.id === project.id);
  project.updatedAt = new Date().toISOString();
  if (idx >= 0) {
    all[idx] = project;
  } else {
    all.push(project);
  }
  saveAll(all);
  setActiveProjectId(project.id);
}

export function deleteProject(id: string): void {
  saveAll(getAll().filter(p => p.id !== id));
  if (getActiveProjectId() === id) {
    localStorage.removeItem(ACTIVE_KEY);
  }
}

export function renameProject(id: string, name: string): void {
  const all = getAll();
  const project = all.find(p => p.id === id);
  if (project) {
    project.name = name;
    project.updatedAt = new Date().toISOString();
    saveAll(all);
  }
}

export function createProject(name: string): WorkflowProject {
  const now = new Date().toISOString();
  const project: WorkflowProject = {
    id: `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name,
    nodes: [],
    edges: [],
    createdAt: now,
    updatedAt: now,
  };
  saveProject(project);
  return project;
}

export function getActiveProjectId(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function setActiveProjectId(id: string): void {
  localStorage.setItem(ACTIVE_KEY, id);
}
