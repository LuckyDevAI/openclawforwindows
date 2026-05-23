import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, ShieldAlert, CheckCircle2, XCircle, RefreshCw, Database, Lock, KeyRound, FileCheck2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Footer from '@/components/Footer';

type FixStatus = 'resolved' | 'open' | 'monitoring';

interface Fix {
  id: string;
  date: string;
  area: string;
  title: string;
  description: string;
  status: FixStatus;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface ScannerStatus {
  name: string;
  label: string;
  icon: typeof Database;
  findings: number;
  timestamp: string;
}

// Snapshot statico dello stato di sicurezza, aggiornato manualmente dopo ogni scan.
// Ultimo aggiornamento: 23/05/2026
const LAST_SCAN_AT = '2026-05-23T11:17:50Z';

const SCANNERS: ScannerStatus[] = [
  { name: 'supabase_lov', label: 'Supabase RLS & Policies', icon: Database, findings: 0, timestamp: LAST_SCAN_AT },
  { name: 'supabase', label: 'Supabase Linter', icon: FileCheck2, findings: 0, timestamp: LAST_SCAN_AT },
  { name: 'agent_security', label: 'Edge Functions', icon: KeyRound, findings: 0, timestamp: LAST_SCAN_AT },
  { name: 'connector_security_scan', label: 'Connectors', icon: Lock, findings: 0, timestamp: LAST_SCAN_AT },
];

const FIXES: Fix[] = [
  {
    id: 'rls-profiles',
    date: '2026-03-12',
    area: 'Database / RLS',
    title: 'RLS abilitata su tutte le tabelle pubbliche',
    description: 'Attivate policy owner-scoped (auth.uid() = user_id) su profiles, workflows, agents e support_messages.',
    status: 'resolved',
    severity: 'critical',
  },
  {
    id: 'roles-table',
    date: '2026-03-12',
    area: 'Auth / Roles',
    title: 'Ruoli spostati in tabella dedicata user_roles',
    description: 'Eliminato rischio di privilege escalation: ruoli non più sul profilo. Funzione has_role() SECURITY DEFINER.',
    status: 'resolved',
    severity: 'critical',
  },
  {
    id: 'avatars-bucket',
    date: '2026-03-18',
    area: 'Storage',
    title: 'Bucket avatars reso privato con signed URLs',
    description: 'Caricamento e lettura solo via URL firmati a tempo, niente accesso pubblico anonimo.',
    status: 'resolved',
    severity: 'high',
  },
  {
    id: 'hibp-check',
    date: '2026-03-25',
    area: 'Auth',
    title: 'Controllo password compromesse (HIBP)',
    description: 'Verifica via k-anonymity contro Have I Been Pwned in fase di signup e reset.',
    status: 'resolved',
    severity: 'medium',
  },
  {
    id: 'edge-jwt',
    date: '2026-04-02',
    area: 'Edge Functions',
    title: 'Validazione JWT in tutte le funzioni admin',
    description: 'Pattern dual-client (anon + service role) con verifica esplicita del token e has_role(admin).',
    status: 'resolved',
    severity: 'high',
  },
  {
    id: 'search-path',
    date: '2026-04-15',
    area: 'Database / Functions',
    title: 'search_path fissato su tutte le SECURITY DEFINER',
    description: 'Aggiunto SET search_path = public alle funzioni handle_new_user, has_role, update_updated_at.',
    status: 'resolved',
    severity: 'medium',
  },
  {
    id: 'cors-headers',
    date: '2026-04-20',
    area: 'Edge Functions',
    title: 'Header CORS uniformati e restrittivi',
    description: 'Risposte (incluso errori) con corsHeaders dal pacchetto ufficiale Supabase, no wildcard non necessari.',
    status: 'resolved',
    severity: 'low',
  },
  {
    id: 'input-validation',
    date: '2026-05-10',
    area: 'Edge Functions',
    title: 'Validazione input con Zod su tutte le funzioni',
    description: 'Body e query parametri validati con schema tipizzato, errori 400 con messaggi puliti.',
    status: 'resolved',
    severity: 'medium',
  },
  {
    id: 'sql-injection',
    date: '2026-05-10',
    area: 'Database',
    title: 'Zero SQL dinamico nelle edge functions',
    description: 'Solo client tipizzato Supabase e RPC parametrizzate, nessuna concatenazione di stringhe SQL.',
    status: 'resolved',
    severity: 'high',
  },
  {
    id: 'rotating-keys',
    date: '2026-05-23',
    area: 'Secrets',
    title: 'Audit chiavi e rotazione',
    description: 'Verificate STRIPE_SECRET_KEY, SUPABASE_SERVICE_ROLE_KEY, LOVABLE_API_KEY. Procedura di rotazione documentata.',
    status: 'monitoring',
    severity: 'medium',
  },
];

const severityBadge = (s: Fix['severity']) => {
  const map = {
    low:      'bg-muted text-muted-foreground border-border',
    medium:   'bg-primary/15 text-primary border-primary/30',
    high:     'bg-orange-500/15 text-orange-500 border-orange-500/30',
    critical: 'bg-destructive/15 text-destructive border-destructive/30',
  } as const;
  const labels = { low: 'Basso', medium: 'Medio', high: 'Alto', critical: 'Critico' };
  return <Badge className={`${map[s]} text-[10px]`}>{labels[s]}</Badge>;
};

const statusBadge = (s: FixStatus) => {
  if (s === 'resolved')
    return <Badge className="bg-accent/15 text-accent border-accent/30 text-[10px] gap-1"><CheckCircle2 className="h-3 w-3" />Risolto</Badge>;
  if (s === 'monitoring')
    return <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px] gap-1"><ShieldCheck className="h-3 w-3" />In monitoraggio</Badge>;
  return <Badge variant="destructive" className="text-[10px] gap-1"><XCircle className="h-3 w-3" />Aperto</Badge>;
};

export default function AdminSecurity() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user]);

  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader><CardTitle>Accesso negato</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Solo gli amministratori possono visualizzare questa pagina.</p>
            <Button onClick={() => navigate('/home')} variant="outline" className="w-full">Torna alla Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalFindings = SCANNERS.reduce((sum, s) => sum + s.findings, 0);
  const resolvedCount = FIXES.filter(f => f.status === 'resolved').length;
  const openCount = FIXES.filter(f => f.status === 'open').length;
  const monitoringCount = FIXES.filter(f => f.status === 'monitoring').length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-12 items-center gap-3 border-b border-border bg-card/60 px-4 shrink-0">
        <Link to="/admin">
          <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <Separator orientation="vertical" className="h-5" />
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-sm font-bold text-foreground tracking-tight">Sicurezza</span>
        </div>
        <div className="flex-1" />
        <span className="text-[10px] text-muted-foreground">
          Ultimo scan: {new Date(LAST_SCAN_AT).toLocaleString('it-IT')}
        </span>
      </header>

      <ScrollArea className="flex-1">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* Overall status */}
          <Card className={totalFindings === 0 ? 'border-accent/40 bg-accent/5' : 'border-destructive/40 bg-destructive/5'}>
            <CardContent className="p-6 flex items-center gap-4">
              {totalFindings === 0 ? (
                <ShieldCheck className="h-10 w-10 text-accent shrink-0" />
              ) : (
                <ShieldAlert className="h-10 w-10 text-destructive shrink-0" />
              )}
              <div className="flex-1">
                <h1 className="text-lg font-bold">
                  {totalFindings === 0 ? 'Nessuna vulnerabilità rilevata' : `${totalFindings} vulnerabilità da risolvere`}
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Database, Edge Functions e Connectors risultano puliti all'ultimo scan.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Scanner grid */}
          <div>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Scanner</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {SCANNERS.map(s => {
                const Icon = s.icon;
                const clean = s.findings === 0;
                return (
                  <Card key={s.name} className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {clean
                          ? <CheckCircle2 className="h-4 w-4 text-accent" />
                          : <XCircle className="h-4 w-4 text-destructive" />}
                      </div>
                      <p className="text-xs font-semibold">{s.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {clean ? 'Nessun finding' : `${s.findings} finding`}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Stats fixes */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Risolti</p>
                <p className="text-2xl font-bold text-accent tabular-nums">{resolvedCount}</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">In monitoraggio</p>
                <p className="text-2xl font-bold text-primary tabular-nums">{monitoringCount}</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Aperti</p>
                <p className="text-2xl font-bold text-destructive tabular-nums">{openCount}</p>
              </CardContent>
            </Card>
          </div>

          {/* Fix history table */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5" /> Cronologia correzioni
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-[10px] uppercase tracking-wider">Data</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider">Area</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider">Correzione</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider">Severità</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-wider">Stato</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {FIXES.map(f => (
                    <TableRow key={f.id}>
                      <TableCell className="text-xs tabular-nums text-muted-foreground whitespace-nowrap">
                        {new Date(f.date).toLocaleDateString('it-IT')}
                      </TableCell>
                      <TableCell className="text-xs whitespace-nowrap">{f.area}</TableCell>
                      <TableCell>
                        <p className="text-xs font-medium">{f.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{f.description}</p>
                      </TableCell>
                      <TableCell>{severityBadge(f.severity)}</TableCell>
                      <TableCell>{statusBadge(f.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="text-[10px] text-muted-foreground text-center">
            I risultati provengono dagli scanner Lovable Cloud (Supabase RLS, Linter, Edge Functions, Connectors).
            Lo storico delle correzioni viene aggiornato manualmente dopo ogni intervento.
          </p>
        </div>
        <Footer />
      </ScrollArea>
    </div>
  );
}