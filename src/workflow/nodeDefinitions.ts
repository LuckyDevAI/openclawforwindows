export interface NodeCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  nodes: NodeTemplate[];
}

export interface NodeTemplate {
  type: string;
  label: string;
  description: string;
  category: string;
  icon: string;
  inputs: number;
  outputs: number;
}

export const NODE_CATEGORIES: NodeCategory[] = [
  {
    id: 'triggers',
    label: 'Trigger',
    icon: 'Zap',
    color: 'hsl(var(--node-trigger))',
    nodes: [
      { type: 'trigger-manual', label: 'Avvio Manuale', description: 'Avvia il workflow manualmente', category: 'triggers', icon: 'Play', inputs: 0, outputs: 1 },
      { type: 'trigger-schedule', label: 'Pianificato', description: 'Esegui ad orario programmato', category: 'triggers', icon: 'Clock', inputs: 0, outputs: 1 },
      { type: 'trigger-webhook', label: 'Webhook', description: 'Ricevi dati da una richiesta HTTP', category: 'triggers', icon: 'Globe', inputs: 0, outputs: 1 },
      { type: 'trigger-file', label: 'File Watch', description: 'Monitora cambiamenti ai file', category: 'triggers', icon: 'FileSearch', inputs: 0, outputs: 1 },
    ],
  },
  {
    id: 'actions',
    label: 'Azioni',
    icon: 'Cog',
    color: 'hsl(var(--node-action))',
    nodes: [
      { type: 'action-http', label: 'Richiesta HTTP', description: 'Invia richieste GET/POST/PUT/DELETE', category: 'actions', icon: 'Send', inputs: 1, outputs: 1 },
      { type: 'action-transform', label: 'Trasforma Dati', description: 'Modifica e mappa dati', category: 'actions', icon: 'Shuffle', inputs: 1, outputs: 1 },
      { type: 'action-delay', label: 'Ritardo', description: 'Attendi prima di continuare', category: 'actions', icon: 'Timer', inputs: 1, outputs: 1 },
      { type: 'action-script', label: 'Script', description: 'Esegui codice personalizzato', category: 'actions', icon: 'Code', inputs: 1, outputs: 1 },
      { type: 'action-email', label: 'Invia Email', description: 'Invia una email', category: 'actions', icon: 'Mail', inputs: 1, outputs: 1 },
    ],
  },
  {
    id: 'conditions',
    label: 'Condizioni',
    icon: 'GitBranch',
    color: 'hsl(var(--node-condition))',
    nodes: [
      { type: 'condition-if', label: 'Se / Altrimenti', description: 'Dividi il flusso in base a condizioni', category: 'conditions', icon: 'GitBranch', inputs: 1, outputs: 2 },
      { type: 'condition-switch', label: 'Switch', description: 'Percorsi multipli basati su valori', category: 'conditions', icon: 'GitFork', inputs: 1, outputs: 3 },
      { type: 'condition-filter', label: 'Filtra', description: 'Filtra elementi in un array', category: 'conditions', icon: 'Filter', inputs: 1, outputs: 1 },
    ],
  },
  {
    id: 'outputs',
    label: 'Output',
    icon: 'Download',
    color: 'hsl(var(--node-output))',
    nodes: [
      { type: 'output-log', label: 'Log', description: 'Scrivi nel log di sistema', category: 'outputs', icon: 'Terminal', inputs: 1, outputs: 0 },
      { type: 'output-file', label: 'Scrivi File', description: 'Salva risultato su file', category: 'outputs', icon: 'FileOutput', inputs: 1, outputs: 0 },
      { type: 'output-notify', label: 'Notifica', description: 'Mostra una notifica desktop', category: 'outputs', icon: 'Bell', inputs: 1, outputs: 0 },
    ],
  },
];
