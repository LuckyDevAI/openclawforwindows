import { useEffect, useState, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { supabase } from '@/integrations/supabase/client';
import { listProjects, deleteProject, type WorkflowProject } from '@/lib/projectStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import {
  Workflow, Plus, Trash2, Crown, Clock,
  FolderOpen, Pencil, Check, X, Camera, Loader2, Bot,
} from 'lucide-react';
import OnboardingWizard from '@/components/OnboardingWizard';
import AgentInstallWizard from '@/components/AgentInstallWizard';
import AgentList, { type Agent } from '@/components/AgentList';

export default function Home() {
  const { user, subscription } = useAuth();
  const { t } = useSettings();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [projects, setProjects] = useState<WorkflowProject[]>([]);
  const [displayName, setDisplayName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAgentWizard, setShowAgentWizard] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);

  const loadAgents = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('agents')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (data) setAgents(data as unknown as Agent[]);
  };

  // Check if onboarding needed
  useEffect(() => {
    if (user && !localStorage.getItem(`openclaw_onboarding_${user.id}`)) {
      setShowOnboarding(true);
    }
  }, [user]);

  // Load profile
  useEffect(() => {
    if (!user) return;
    supabase
      .from('profiles')
      .select('display_name, avatar_url')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data?.display_name) setDisplayName(data.display_name);
        else setDisplayName(user.email?.split('@')[0] ?? '');
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
      });
  }, [user]);

  // Load projects & agents
  useEffect(() => {
    listProjects().then(setProjects);
    loadAgents();
  }, [user]);

  const initials = displayName
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?';

  const handleSaveName = async () => {
    if (!nameInput.trim() || !user) return;
    await supabase
      .from('profiles')
      .update({ display_name: nameInput.trim() } as any)
      .eq('id', user.id);
    setDisplayName(nameInput.trim());
    setEditingName(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Errore', description: 'Seleziona un file immagine.', variant: 'destructive' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'Errore', description: 'Immagine troppo grande (max 5MB).', variant: 'destructive' });
      return;
    }

    setUploadingAvatar(true);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const filePath = `${user.id}/avatar.${ext}`;

      // Upload (upsert to overwrite previous)
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true, contentType: file.type });
      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;

      // Save to profile
      await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl } as any)
        .eq('id', user.id);

      setAvatarUrl(publicUrl);
      toast({ title: '✓', description: 'Avatar aggiornato.' });
    } catch (err: any) {
      console.error('Avatar upload error:', err);
      toast({ title: 'Errore', description: err.message, variant: 'destructive' });
    } finally {
      setUploadingAvatar(false);
      // Reset input so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    const updated = await listProjects();
    setProjects(updated);
  };

  const handleOpenProject = (id: string) => {
    localStorage.setItem('openclaw_active_project', id);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OnboardingWizard open={showOnboarding} onComplete={() => setShowOnboarding(false)} />
      <AgentInstallWizard open={showAgentWizard} onOpenChange={setShowAgentWizard} onAgentAdded={loadAgents} />
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Section */}
        <section className="flex items-center gap-4">
          {/* Avatar with upload overlay */}
          <div className="relative group">
            <Avatar className="h-14 w-14 border-2 border-primary/20">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-wait"
            >
              {uploadingAvatar ? (
                <Loader2 className="h-4 w-4 text-white animate-spin" />
              ) : (
                <Camera className="h-4 w-4 text-white" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>

          <div className="flex-1 min-w-0">
            {editingName ? (
              <div className="flex items-center gap-2">
                <Input
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="h-8 text-sm max-w-[200px]"
                  autoFocus
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') setEditingName(false);
                  }}
                />
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleSaveName}>
                  <Check className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditingName(false)}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground truncate">{displayName}</h1>
                <button
                  onClick={() => { setNameInput(displayName); setEditingName(true); }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            {subscription.subscribed && (
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-primary font-medium">
                <Crown className="h-3 w-3" />
                {subscription.onTrial ? t('pricing.trial_active') : 'Pro'}
              </span>
            )}
          </div>
        </section>

        {/* Agents */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              Agenti configurati
            </h2>
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs gap-1.5"
              onClick={() => setShowAgentWizard(true)}
            >
              <Plus className="h-3.5 w-3.5" />
              Nuovo agente
            </Button>
          </div>
          <AgentList agents={agents} onRefresh={loadAgents} />
        </section>

        {/* Workflow Projects */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">{t('admin.workflows')}</h2>
            <Button
              size="sm"
              className="h-8 text-xs gap-1.5"
              onClick={() => navigate('/')}
            >
              <Plus className="h-3.5 w-3.5" />
              {t('editor.new_project')}
            </Button>
          </div>

          {projects.length === 0 ? (
            <Card className="border-dashed border-2 border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 gap-3">
                <FolderOpen className="h-10 w-10 text-muted-foreground/40" />
                <p className="text-xs text-muted-foreground">{t('editor.no_projects')}</p>
                <Button size="sm" variant="outline" className="text-xs gap-1.5" onClick={() => navigate('/')}>
                  <Plus className="h-3.5 w-3.5" />
                  {t('editor.new_project')}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-2">
              {projects.map(p => (
                <Card
                  key={p.id}
                  className="group cursor-pointer hover:border-primary/30 transition-colors"
                  onClick={() => handleOpenProject(p.id)}
                >
                  <CardContent className="flex items-center gap-3 py-3 px-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <Workflow className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(p.updatedAt).toLocaleDateString()}
                        </span>
                        <span>{p.nodes.length} nodi · {p.edges.length} connessioni</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      onClick={e => { e.stopPropagation(); handleDelete(p.id); }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
