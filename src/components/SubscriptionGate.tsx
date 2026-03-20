import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function SubscriptionGate({ children }: { children: React.ReactNode }) {
  const { subscription } = useAuth();

  if (subscription.loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!subscription.subscribed) {
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
}
