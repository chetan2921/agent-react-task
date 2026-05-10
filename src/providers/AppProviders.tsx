import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { repositories } from '@/repositories/mockRepositories';
import type { AuthSession, User } from '@/types/domain';
import type { Repositories } from '@/types/repositories';

const sessionKey = 'solehead.session.v1';

type AuthContextValue = AuthSession & {
  isReady: boolean;
  login(email: string, password: string): Promise<void>;
  register(username: string, email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  completeIntro(): Promise<void>;
  updateCurrentUser(user: User): Promise<void>;
};

const RepositoriesContext = createContext<Repositories>(repositories);
const AuthContext = createContext<AuthContextValue | null>(null);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 30,
    },
  },
});

export const useRepositories = () => useContext(RepositoriesContext);

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used within AppProviders');
  }
  return value;
};

export const AppProviders = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  const [session, setSession] = useState<AuthSession>({
    currentUser: null,
    isLoggedIn: false,
    isFirstTime: true,
  });

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const saved = await AsyncStorage.getItem(sessionKey);
      if (!mounted) {
        return;
      }
      if (saved) {
        setSession(JSON.parse(saved));
      }
      setIsReady(true);
    };

    loadSession();

    return () => {
      mounted = false;
    };
  }, []);

  const persist = async (next: AuthSession) => {
    setSession(next);
    await AsyncStorage.setItem(sessionKey, JSON.stringify(next));
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      ...session,
      isReady,
      async login(email, password) {
        const user = await repositories.auth.login({ email, password });
        await persist({ ...session, currentUser: user, isLoggedIn: true });
      },
      async register(username, email, password) {
        const user = await repositories.auth.register({ username, email, password });
        await persist({ ...session, currentUser: user, isLoggedIn: true });
      },
      async logout() {
        await repositories.auth.logout();
        await persist({ ...session, currentUser: null, isLoggedIn: false });
        queryClient.clear();
      },
      async completeIntro() {
        await persist({ ...session, isFirstTime: false });
      },
      async updateCurrentUser(user) {
        await persist({ ...session, currentUser: user });
      },
    }),
    [isReady, session],
  );

  return (
    <RepositoriesContext.Provider value={repositories}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      </QueryClientProvider>
    </RepositoriesContext.Provider>
  );
};
