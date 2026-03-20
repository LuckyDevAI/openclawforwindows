import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BarChart3,
  Users,
  Workflow,
  Settings,
  Search,
  Trash2,
  Copy,
  Pause,
  Play,
  Shield,
  Key,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

/* ── Mock Data ── */
const mockWorkflows = [
  { id: 'wf-1', name: 'Sync Ordini → CRM', owner: 'Marco Bianchi', nodes: 8, status: 'active', lastRun: '2 min fa', runs: 1247, errors: 3 },
  { id: 'wf-2', name: 'Report Giornaliero', owner: 'Lucia Verdi', nodes: 5, status: 'active', lastRun: '6 ore fa', runs: 365, errors: 0 },
  { id: 'wf-3', name: 'Backup Database', owner: 'Marco Bianchi', nodes: 4, status: 'paused', lastRun: '2 giorni fa', runs: 89, errors: 12 },
  { id: 'wf-4', name: 'Email Welcome', owner: 'Anna Rossi', nodes: 6, status: 'active', lastRun: '23 min fa', runs: 4510, errors: 7 },
  { id: 'wf-5', name: 'Monitora Prezzi', owner: 'Lucia Verdi', nodes: 12, status: 'error', lastRun: '1 ora fa', runs: 892, errors: 45 },
];

const mockUsers = [
  { id: 'u-1', name: 'Marco Bianchi', email: 'marco@example.com', role: 'admin', workflows: 2, lastActive: '2 min fa', status: 'online' },
  { id: 'u-2', name: 'Lucia Verdi', email: 'lucia@example.com', role: 'editor', workflows: 3, lastActive: '1 ora fa', status: 'online' },
  { id: 'u-3', name: 'Anna Rossi', email: 'anna@example.com', role: 'editor', workflows: 1, lastActive: '3 ore fa', status: 'offline' },
  { id: 'u-4', name: 'Davide Neri', email: 'davide@example.com', role: 'viewer', workflows: 0, lastActive: '2 giorni fa', status: 'offline' },
];

const mockLogs = [
  { id: 'l-1', time: '14:32:05', workflow: 'Sync Ordini → CRM', type: 'success', message: 'Esecuzione completata – 23 record sincronizzati' },
  { id: 'l-2', time: '14:31:58', workflow: 'Email Welcome', type: 'success', message: 'Email inviata a nuovo utente' },
  { id: 'l-3', time: '14:28:12', workflow: 'Monitora Prezzi', type: 'error', message: 'Timeout nella richiesta HTTP – retry #3' },
  { id: 'l-4', time: '14:25:00', workflow: 'Report Giornaliero', type: 'info', message: 'Pianificato per le 18:00' },
  { id: 'l-5', time: '14:22:41', workflow: 'Monitora Prezzi', type: 'error', message: 'Errore parsing JSON dal provider' },
  { id: 'l-6', time: '14:20:10', workflow: 'Sync Ordini → CRM', type: 'success', message: 'Esecuzione completata – 17 record sincronizzati' },
];

const statusBadge = (status: string) => {
  switch (status) {
    case 'active': return <Badge className="bg-accent/15 text-accent border-accent/30 text-[10px]">Attivo</Badge>;
    case 'paused': return <Badge variant="secondary" className="text-[10px]">In pausa</Badge>;
    case 'error': return <Badge variant="destructive" className="text-[10px]">Errore</Badge>;
    case 'online': return <Badge className="bg-accent/15 text-accent border-accent/30 text-[10px]">Online</Badge>;
    case 'offline': return <Badge variant="secondary" className="text-[10px]">Offline</Badge>;
    default: return null;
  }
};

const roleBadge = (role: string) => {
  switch (role) {
    case 'admin': return <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px]"><Shield className="h-2.5 w-2.5 mr-1" />Admin</Badge>;
    case 'editor': return <Badge variant="outline" className="text-[10px]">Editor</Badge>;
    case 'viewer': return <Badge variant="secondary" className="text-[10px]">Viewer</Badge>;
    default: return null;
  }
};

const logIcon = (type: string) => {
  switch (type) {
    case 'success': return <CheckCircle2 className="h-3.5 w-3.5 text-accent" />;
    case 'error': return <AlertTriangle className="h-3.5 w-3.5 text-destructive" />;
    case 'info': return <Clock className="h-3.5 w-3.5 text-muted-foreground" />;
    default: return null;
  }
};

export default function Admin() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="flex h-12 items-center gap-3 border-b border-border bg-card/60 px-4 shrink-0">
        <Link to="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Separator orientation="vertical" className="h-5" />
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15">
            <Shield className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-sm font-bold text-foreground tracking-tight">Pannello Admin</span>
        </div>
        <div className="flex-1" />
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cerca workflow, utenti..."
            className="h-8 pl-8 text-xs bg-secondary/50 border-border"
          />
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="dashboard" className="flex flex-col h-full">
          <div className="border-b border-border bg-card/30 px-4">
            <TabsList className="h-10 bg-transparent gap-1">
              <TabsTrigger value="dashboard" className="gap-1.5 text-xs data-[state=active]:bg-secondary">
                <BarChart3 className="h-3.5 w-3.5" /> Dashboard
              </TabsTrigger>
              <TabsTrigger value="workflows" className="gap-1.5 text-xs data-[state=active]:bg-secondary">
                <Workflow className="h-3.5 w-3.5" /> Workflow
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-1.5 text-xs data-[state=active]:bg-secondary">
                <Users className="h-3.5 w-3.5" /> Utenti
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-1.5 text-xs data-[state=active]:bg-secondary">
                <Settings className="h-3.5 w-3.5" /> Impostazioni
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            {/* ── Dashboard ── */}
            <TabsContent value="dashboard" className="p-4 space-y-4 mt-0">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard icon={Workflow} label="Workflow totali" value="5" trend="+2 questa settimana" />
                <StatCard icon={Zap} label="Esecuzioni oggi" value="142" trend="+18% vs ieri" />
                <StatCard icon={AlertTriangle} label="Errori (24h)" value="7" trend="–3 vs ieri" negative />
                <StatCard icon={Users} label="Utenti attivi" value="4" trend="2 online ora" />
              </div>

              <div className="grid lg:grid-cols-2 gap-3">
                <Card className="border-border bg-card">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-xs font-semibold flex items-center gap-1.5">
                      <Activity className="h-3.5 w-3.5 text-primary" /> Attività recente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="space-y-2">
                      {mockLogs.map(log => (
                        <div key={log.id} className="flex items-start gap-2 py-1.5 border-b border-border/50 last:border-0">
                          {logIcon(log.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] text-foreground truncate">{log.message}</p>
                            <p className="text-[10px] text-muted-foreground">{log.workflow} · {log.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-xs font-semibold flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-accent" /> Top Workflow
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="space-y-2.5">
                      {mockWorkflows
                        .sort((a, b) => b.runs - a.runs)
                        .slice(0, 5)
                        .map((wf, i) => (
                          <div key={wf.id} className="flex items-center gap-2.5">
                            <span className="text-[10px] font-mono text-muted-foreground w-4 text-right">{i + 1}.</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-medium text-foreground truncate">{wf.name}</p>
                              <p className="text-[10px] text-muted-foreground">{wf.owner}</p>
                            </div>
                            <span className="text-[10px] font-mono tabular-nums text-muted-foreground">{wf.runs.toLocaleString()} run</span>
                            {statusBadge(wf.status)}
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ── Workflow ── */}
            <TabsContent value="workflows" className="p-4 mt-0">
              <Card className="border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[10px] uppercase tracking-wider">Workflow</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider">Proprietario</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-center">Nodi</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-center">Stato</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-right">Esecuzioni</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-right">Errori</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-right">Ultima esec.</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-right">Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockWorkflows.map(wf => (
                      <TableRow key={wf.id}>
                        <TableCell className="font-medium text-xs">{wf.name}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{wf.owner}</TableCell>
                        <TableCell className="text-xs text-center tabular-nums">{wf.nodes}</TableCell>
                        <TableCell className="text-center">{statusBadge(wf.status)}</TableCell>
                        <TableCell className="text-xs text-right tabular-nums">{wf.runs.toLocaleString()}</TableCell>
                        <TableCell className="text-xs text-right tabular-nums">{wf.errors}</TableCell>
                        <TableCell className="text-xs text-right text-muted-foreground">{wf.lastRun}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3 w-3" /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Copy className="h-3 w-3" /></Button>
                            {wf.status === 'active'
                              ? <Button variant="ghost" size="icon" className="h-7 w-7"><Pause className="h-3 w-3" /></Button>
                              : <Button variant="ghost" size="icon" className="h-7 w-7"><Play className="h-3 w-3" /></Button>
                            }
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-3 w-3" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* ── Utenti ── */}
            <TabsContent value="users" className="p-4 mt-0">
              <Card className="border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[10px] uppercase tracking-wider">Utente</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider">Ruolo</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-center">Workflow</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-center">Stato</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-right">Ultimo accesso</TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-right">Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map(u => (
                      <TableRow key={u.id}>
                        <TableCell>
                          <div>
                            <p className="text-xs font-medium">{u.name}</p>
                            <p className="text-[10px] text-muted-foreground">{u.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{roleBadge(u.role)}</TableCell>
                        <TableCell className="text-xs text-center tabular-nums">{u.workflows}</TableCell>
                        <TableCell className="text-center">{statusBadge(u.status)}</TableCell>
                        <TableCell className="text-xs text-right text-muted-foreground">{u.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3 w-3" /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-3 w-3" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* ── Impostazioni ── */}
            <TabsContent value="settings" className="p-4 space-y-4 mt-0">
              <Card className="border-border bg-card">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-xs font-semibold">Generali</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-4">
                  <SettingRow label="Registrazione aperta" desc="Consenti a nuovi utenti di registrarsi" />
                  <SettingRow label="Esecuzione automatica" desc="Avvia i workflow automaticamente al salvataggio" />
                  <SettingRow label="Notifiche errori" desc="Invia notifica desktop su errore workflow" defaultChecked />
                  <SettingRow label="Log dettagliati" desc="Salva log estesi per ogni esecuzione" defaultChecked />
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-xs font-semibold flex items-center gap-1.5">
                    <Key className="h-3.5 w-3.5 text-primary" /> API Keys
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  <ApiKeyRow label="Webhook Secret" value="whsec_••••••••k4mR" />
                  <ApiKeyRow label="API Token" value="oclaw_••••••••x9fZ" />
                  <Button variant="outline" size="sm" className="h-8 text-xs mt-1">
                    + Genera nuova API Key
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-xs font-semibold">Integrazioni</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  <IntegrationRow name="SMTP / Email" status="Configurato" connected />
                  <IntegrationRow name="Slack" status="Non connesso" />
                  <IntegrationRow name="Database PostgreSQL" status="Configurato" connected />
                  <IntegrationRow name="AWS S3" status="Non connesso" />
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function StatCard({ icon: Icon, label, value, trend, negative }: {
  icon: React.ElementType; label: string; value: string; trend: string; negative?: boolean;
}) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <p className="text-2xl font-bold tabular-nums text-foreground leading-none">{value}</p>
        <p className={`text-[10px] mt-1 ${negative ? 'text-destructive' : 'text-accent'}`}>{trend}</p>
      </CardContent>
    </Card>
  );
}

function SettingRow({ label, desc, defaultChecked }: { label: string; desc: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground">{desc}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

function ApiKeyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="text-[10px] font-mono text-muted-foreground">{value}</p>
      </div>
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" className="h-7 text-[10px]"><Copy className="h-3 w-3 mr-1" /> Copia</Button>
        <Button variant="ghost" size="sm" className="h-7 text-[10px] text-destructive hover:text-destructive">Revoca</Button>
      </div>
    </div>
  );
}

function IntegrationRow({ name, status, connected }: { name: string; status: string; connected?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
      <div>
        <p className="text-xs font-medium text-foreground">{name}</p>
        <p className={`text-[10px] ${connected ? 'text-accent' : 'text-muted-foreground'}`}>{status}</p>
      </div>
      <Button variant={connected ? "secondary" : "outline"} size="sm" className="h-7 text-[10px]">
        {connected ? 'Modifica' : 'Connetti'}
      </Button>
    </div>
  );
}
