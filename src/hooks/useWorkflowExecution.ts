import { useState, useCallback, useRef } from 'react';
import type { Node, Edge } from '@xyflow/react';

export type NodeExecStatus = 'idle' | 'running' | 'success' | 'error';

export interface ExecLogEntry {
  nodeId: string;
  label: string;
  status: 'running' | 'success' | 'error';
  message: string;
  timestamp: number;
}

interface UseWorkflowExecutionReturn {
  executing: boolean;
  nodeStatuses: Record<string, NodeExecStatus>;
  execLog: ExecLogEntry[];
  runWorkflow: (nodes: Node[], edges: Edge[]) => Promise<void>;
  stopExecution: () => void;
}

function getExecutionOrder(nodes: Node[], edges: Edge[]): string[] {
  // Find trigger nodes (no incoming edges)
  const incoming = new Map<string, string[]>();
  const outgoing = new Map<string, string[]>();
  for (const n of nodes) {
    incoming.set(n.id, []);
    outgoing.set(n.id, []);
  }
  for (const e of edges) {
    incoming.get(e.target)?.push(e.source);
    outgoing.get(e.source)?.push(e.target);
  }

  // Topological sort (Kahn's algorithm)
  const inDeg = new Map<string, number>();
  for (const [id, deps] of incoming) inDeg.set(id, deps.length);

  const queue: string[] = [];
  for (const [id, deg] of inDeg) {
    if (deg === 0) queue.push(id);
  }

  const order: string[] = [];
  while (queue.length > 0) {
    const id = queue.shift()!;
    order.push(id);
    for (const next of outgoing.get(id) || []) {
      const newDeg = (inDeg.get(next) || 1) - 1;
      inDeg.set(next, newDeg);
      if (newDeg === 0) queue.push(next);
    }
  }

  return order;
}

function simulateNodeExecution(node: Node): { success: boolean; message: string; duration: number } {
  const category = (node.data as any).category as string;
  const label = (node.data as any).label as string;

  // Simulate random duration 400-1200ms
  const duration = 400 + Math.random() * 800;

  // 90% success rate, slightly lower for conditions
  const successRate = category === 'conditions' ? 0.85 : 0.92;
  const success = Math.random() < successRate;

  const messages: Record<string, string[]> = {
    triggers: ['Trigger attivato', 'Evento ricevuto', 'Segnale catturato'],
    actions: ['Azione eseguita con successo', 'Operazione completata', 'Dati elaborati'],
    conditions: ['Condizione valutata: true', 'Percorso selezionato', 'Filtro applicato'],
    outputs: ['Output generato', 'Risultato scritto', 'Notifica inviata'],
  };

  const errorMessages = [
    'Timeout nella connessione',
    'Risposta non valida',
    'Errore di autenticazione',
    'Risorsa non trovata',
  ];

  const msg = success
    ? (messages[category] || messages.actions)[Math.floor(Math.random() * 3)]
    : errorMessages[Math.floor(Math.random() * errorMessages.length)];

  return { success, message: `${label}: ${msg}`, duration };
}

export function useWorkflowExecution(): UseWorkflowExecutionReturn {
  const [executing, setExecuting] = useState(false);
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, NodeExecStatus>>({});
  const [execLog, setExecLog] = useState<ExecLogEntry[]>([]);
  const abortRef = useRef(false);

  const stopExecution = useCallback(() => {
    abortRef.current = true;
  }, []);

  const runWorkflow = useCallback(async (nodes: Node[], edges: Edge[]) => {
    if (nodes.length === 0) return;

    abortRef.current = false;
    setExecuting(true);
    setExecLog([]);

    // Reset all statuses
    const initial: Record<string, NodeExecStatus> = {};
    for (const n of nodes) initial[n.id] = 'idle';
    setNodeStatuses(initial);

    const order = getExecutionOrder(nodes, edges);
    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    for (const nodeId of order) {
      if (abortRef.current) break;

      const node = nodeMap.get(nodeId);
      if (!node) continue;

      const label = (node.data as any).label as string;

      // Set running
      setNodeStatuses(prev => ({ ...prev, [nodeId]: 'running' }));
      setExecLog(prev => [...prev, {
        nodeId,
        label,
        status: 'running',
        message: `${label}: In esecuzione...`,
        timestamp: Date.now(),
      }]);

      // Simulate execution
      const result = simulateNodeExecution(node);
      await new Promise(resolve => setTimeout(resolve, result.duration));

      if (abortRef.current) break;

      const status: NodeExecStatus = result.success ? 'success' : 'error';
      setNodeStatuses(prev => ({ ...prev, [nodeId]: status }));
      setExecLog(prev => [...prev, {
        nodeId,
        label,
        status: result.success ? 'success' : 'error',
        message: result.message,
        timestamp: Date.now(),
      }]);

      // If error, stop execution (don't continue downstream)
      if (!result.success) break;
    }

    setExecuting(false);
  }, []);

  return { executing, nodeStatuses, execLog, runWorkflow, stopExecution };
}
