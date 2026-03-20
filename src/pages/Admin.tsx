import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import {
  ArrowLeft, BarChart3, Users, Workflow, Settings, Search, Trash2, Copy, Pause, Play,
  Shield, Key, Activity, AlertTriangle, CheckCircle2, Clock, TrendingUp, Zap, Eye,
  CreditCard, Calendar, Loader2, RefreshCw, Crown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  display_name: string | null;
  avatar_url: string | null;
  roles: string[];
  subscription: {
    id: string;
    status: string;
    current_period_end: string;
    trial_end: string | null;
    cancel_at: string | null;
  } | null;
}

export default function Admin() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [bootstrapping, setBootstrapping] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [newEndDate, setNewEndDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [roleDialog, setRoleDialog] = useState<AdminUser | null>(null);
  const [newRole, setNewRole] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  const loadUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-users', {
        body: { action: 'list-users' },
      });
      if (error) throw error;
      if (data?.error) {
        if (data.error === 'Forbidden: admin only') {
          setIsAdmin(false);
          return;
        }
        throw new Error(data.error);
      }
      setIsAdmin(true);
      setUsers(data.users || []);
    } catch (e: any) {
      // Check if response body has the error
      if (e?.message?.includes('Forbidden') || e?.context?.body?.includes('Forbidden')) {
        setIsAdmin(false);
      } else {
        toast({ title: 'Errore', description: e.message || 'Errore caricamento utenti', variant: 'destructive' });
      }
    } finally {
      setLoadingUsers(false);
    }
  }, [toast]);

  useEffect(() => {
    if (user) loadUsers();
  }, [user, loadUsers]);

  const handleBootstrapAdmin = async () => {
    setBootstrapping(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-users', {
        body: { action: 'make-me-admin' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: 'Successo', description: 'Sei ora admin!' });
      setIsAdmin(true);
      loadUsers();
    } catch (e: any) {
      toast({ title: 'Errore', description: e.message, variant: 'destructive' });
    } finally {
      setBootstrapping(false);
    }
  };

  const handleUpdateSubscription = async () => {
    if (!editingUser || !newEndDate) return;
    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-users', {
        body: { action: 'update-subscription', email: editingUser.email, newEndDate },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: 'Successo', description: 'Scadenza aggiornata' });
      setEditingUser(null);
      loadUsers();
    } catch (e: any) {
      toast({ title: 'Errore', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleSetRole = async () => {
    if (!roleDialog || !newRole) return;
    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-users', {
        body: { action: 'set-role', userId: roleDialog.id, role: newRole },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({ title: 'Successo', description: 'Ruolo aggiornato' });
      setRoleDialog(null);
      loadUsers();
    } catch (e: any) {
      toast({ title: 'Errore', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  // Not admin — bootstrap screen
  if (isAdmin === false) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Card className="max-w-sm">
          <CardContent className="p-6 text-center space-y-4">
            <Shield className="h-10 w-10 text-primary mx-auto" />
            <h2 className="text-lg font-bold">Accesso Admin</h2>
            <p className="text-sm text-muted-foreground">
              Non sei ancora admin. Se sei il primo utente, puoi attivare il ruolo admin.
            </p>
            <Button onClick={handleBootstrapAdmin} disabled={bootstrapping} className="w-full">
              {bootstrapping && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Diventa Admin
            </Button>
            <Link to="/home">
              <Button variant="ghost" className="w-full mt-2">Torna alla Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredUsers = users.filter(u =>
    !search || u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.display_name?.toLowerCase().includes(search.toLowerCase())
  );

  const subStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-accent/15 text-accent border-accent/30 text-[10px]">Attivo</Badge>;
      case 'trialing': return <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px]">Trial</Badge>;
      case 'canceled': return <Badge variant="secondary" className="text-[10px]">Cancellato</Badge>;
      case 'past_due': return <Badge variant="destructive" className="text-[10px]">Scaduto</Badge>;
      default: return <Badge variant="secondary" className="text-[10px]">{status}</Badge>;
    }
  };

  const roleBadge = (role: string) => {
    switch (role) {
      case 'admin': return <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px]"><Shield className="h-2.5 w-2.5 mr-1" />Admin</Badge>;
      case 'moderator': return <Badge variant="outline" className="text-[10px]">Moderatore</Badge>;
      case 'user': return <Badge variant="secondary" className="text-[10px]">Utente</Badge>;
      default: return null;
    }
  };

  const activeSubCount = users.filter(u => u.subscription && ['active', 'trialing'].includes(u.subscription.status)).length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex h-12 items-center gap-3 border-b border-border bg-card/60 px-4 shrink-0">
        <Link to="/home">
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
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={loadUsers} disabled={loadingUsers}>
          <RefreshCw className={`h-3.5 w-3.5 ${loadingUsers ? 'animate-spin' : ''}`} />
        </Button>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cerca utenti..."
            className="h-8 pl-8 text-xs bg-secondary/50 border-border"
          />
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="subscriptions" className="flex flex-col h-full">
          <div className="border-b border-border bg-card/30 px-4">
            <TabsList className="h-10 bg-transparent gap-1">
              <TabsTrigger value="subscriptions" className="gap-1.5 text-xs data-[state=active]:bg-secondary">
                <CreditCard className="h-3.5 w-3.5" /> Abbonamenti
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-1.5 text-xs data-[state=active]:bg-secondary">
                <Users className="h-3.5 w-3.5" /> Utenti & Ruoli
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="gap-1.5 text-xs data-[state=active]:bg-secondary">
                <BarChart3 className="h-3.5 w-3.5" /> Dashboard
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-1.5 text-xs data-[state=active]:bg-secondary">
                <Settings className="h-3.5 w-3.5" /> Impostazioni
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            {/* ── Abbonamenti ── */}
            <TabsContent value="subscriptions" className="p-4 space-y-4 mt-0">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard icon={Users} label="Utenti totali" value={String(users.length)} />
                <StatCard icon={Crown} label="Abbonati attivi" value={String(activeSubCount)} />
                <StatCard icon={CreditCard} label="Trial attivi" value={String(users.filter(u => u.subscription?.status === 'trialing').length)} />
                <StatCard icon={AlertTriangle} label="Senza piano" value={String(users.filter(u => !u.subscription).length)} />
              </div>

              {loadingUsers ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <Card className="border-border bg-card">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-[10px] uppercase tracking-wider">Utente</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider">Stato</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider">Scadenza</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider">Trial</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider text-right">Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map(u => (
                        <TableRow key={u.id}>
                          <TableCell>
                            <div>
                              <p className="text-xs font-medium">{u.display_name || u.email}</p>
                              <p className="text-[10px] text-muted-foreground">{u.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {u.subscription ? subStatusBadge(u.subscription.status) : (
                              <Badge variant="secondary" className="text-[10px]">Nessuno</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-xs tabular-nums text-muted-foreground">
                            {u.subscription?.current_period_end
                              ? new Date(u.subscription.current_period_end).toLocaleDateString('it-IT')
                              : '—'}
                          </TableCell>
                          <TableCell className="text-xs tabular-nums text-muted-foreground">
                            {u.subscription?.trial_end
                              ? new Date(u.subscription.trial_end).toLocaleDateString('it-IT')
                              : '—'}
                          </TableCell>
                          <TableCell className="text-right">
                            {u.subscription && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-[10px] gap-1"
                                onClick={() => {
                                  setEditingUser(u);
                                  setNewEndDate(u.subscription!.current_period_end.split('T')[0]);
                                }}
                              >
                                <Calendar className="h-3 w-3" /> Modifica scadenza
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredUsers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-sm text-muted-foreground py-8">
                            Nessun utente trovato
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Card>
              )}
            </TabsContent>

            {/* ── Utenti & Ruoli ── */}
            <TabsContent value="users" className="p-4 mt-0">
              {loadingUsers ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <Card className="border-border bg-card">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-[10px] uppercase tracking-wider">Utente</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider">Ruoli</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider">Registrato il</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider">Ultimo accesso</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-wider text-right">Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map(u => (
                        <TableRow key={u.id}>
                          <TableCell>
                            <div>
                              <p className="text-xs font-medium">{u.display_name || u.email}</p>
                              <p className="text-[10px] text-muted-foreground">{u.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1 flex-wrap">
                              {u.roles.length > 0
                                ? u.roles.map(r => <span key={r}>{roleBadge(r)}</span>)
                                : <Badge variant="secondary" className="text-[10px]">Nessuno</Badge>
                              }
                            </div>
                          </TableCell>
                          <TableCell className="text-xs tabular-nums text-muted-foreground">
                            {new Date(u.created_at).toLocaleDateString('it-IT')}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {u.last_sign_in_at
                              ? new Date(u.last_sign_in_at).toLocaleDateString('it-IT')
                              : '—'}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-[10px] gap-1"
                              onClick={() => {
                                setRoleDialog(u);
                                setNewRole(u.roles[0] || 'user');
                              }}
                            >
                              <Shield className="h-3 w-3" /> Cambia ruolo
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              )}
            </TabsContent>

            {/* ── Dashboard ── */}
            <TabsContent value="dashboard" className="p-4 space-y-4 mt-0">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard icon={Users} label="Utenti totali" value={String(users.length)} />
                <StatCard icon={Crown} label="Abbonati" value={String(activeSubCount)} />
                <StatCard icon={CreditCard} label="In trial" value={String(users.filter(u => u.subscription?.status === 'trialing').length)} />
                <StatCard icon={AlertTriangle} label="Senza piano" value={String(users.filter(u => !u.subscription).length)} />
              </div>
            </TabsContent>

            {/* ── Impostazioni ── */}
            <TabsContent value="settings" className="p-4 space-y-4 mt-0">
              <Card className="border-border bg-card">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-xs font-semibold">Generali</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-4">
                  <SettingRow label="Registrazione aperta" desc="Consenti a nuovi utenti di registrarsi" />
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
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>

      {/* Edit subscription dialog */}
      <Dialog open={!!editingUser} onOpenChange={open => !open && setEditingUser(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm">Modifica scadenza abbonamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-xs text-muted-foreground">{editingUser?.email}</p>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Nuova data di scadenza</label>
              <Input
                type="date"
                value={newEndDate}
                onChange={e => setNewEndDate(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setEditingUser(null)}>Annulla</Button>
            <Button size="sm" onClick={handleUpdateSubscription} disabled={saving}>
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />}
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role dialog */}
      <Dialog open={!!roleDialog} onOpenChange={open => !open && setRoleDialog(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm">Cambia ruolo utente</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-xs text-muted-foreground">{roleDialog?.email}</p>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Ruolo</label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderatore</SelectItem>
                  <SelectItem value="user">Utente</SelectItem>
                  <SelectItem value="remove">Rimuovi ruolo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setRoleDialog(null)}>Annulla</Button>
            <Button size="sm" onClick={handleSetRole} disabled={saving}>
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />}
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
}

/* ── Sub-components ── */

function StatCard({ icon: Icon, label, value }: {
  icon: React.ElementType; label: string; value: string;
}) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <p className="text-2xl font-bold tabular-nums text-foreground leading-none">{value}</p>
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
