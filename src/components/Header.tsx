import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import logo from '@/assets/logo.webp';
import SettingsToolbar from '@/components/SettingsToolbar';
import { Button } from '@/components/ui/button';
import { Crown, LogOut } from 'lucide-react';

export default function Header() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-4xl mx-auto flex items-center justify-between h-12 px-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/home')}
        >
          <img src={logo} alt="OpenClawForWindows" className="h-6 w-6 rounded-sm object-contain" />
          <span className="font-bold text-sm text-foreground tracking-tight">OpenClawForWindows</span>
        </div>
        <div className="flex items-center gap-1">
          <SettingsToolbar />
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate('/pricing')}>
            <Crown className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={signOut}>
            <LogOut className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
