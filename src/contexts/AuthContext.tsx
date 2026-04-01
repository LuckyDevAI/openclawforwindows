import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface SubscriptionState {
  subscribed: boolean;
  onTrial: boolean;
  subscriptionEnd: string | null;
  trialEnd: string | null;
  loading: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  subscription: SubscriptionState;
  signOut: () => Promise<void>;
  checkSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  subscription: { subscribed: false, onTrial: false, subscriptionEnd: null, trialEnd: null, loading: true },
  signOut: async () => {},
  checkSubscription: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionState>({
    subscribed: false,
    onTrial: false,
    subscriptionEnd: null,
    trialEnd: null,
    loading: true,
  });

  const checkSubscription = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) {
        // If 401, session is invalid - sign out
        if (error.message?.includes('401') || error.message?.includes('Authentication failed')) {
          await supabase.auth.signOut();
          return;
        }
        throw error;
      }
      if (data?.error && (data.error.includes('Authentication') || data.error.includes('unauthorized'))) {
        await supabase.auth.signOut();
        return;
      }
      setSubscription({
        subscribed: data.subscribed ?? false,
        onTrial: data.on_trial ?? false,
        subscriptionEnd: data.subscription_end ?? null,
        trialEnd: data.trial_end ?? null,
        loading: false,
      });
    } catch {
      setSubscription(prev => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        setTimeout(() => checkSubscription(), 0);
      } else {
        setSubscription({ subscribed: false, onTrial: false, subscriptionEnd: null, trialEnd: null, loading: false });
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) checkSubscription();
    });

    return () => authSub.unsubscribe();
  }, [checkSubscription]);

  // Periodically check subscription
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(checkSubscription, 60000);
    return () => clearInterval(interval);
  }, [user, checkSubscription]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, subscription, signOut, checkSubscription }}>
      {children}
    </AuthContext.Provider>
  );
}
