// File: frontend/src/lib/ic/auth.tsx
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

interface AuthState {
  isReady: boolean;
  isAuthenticated: boolean;
  principal?: string;
  agent?: HttpAgent;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthCtx = createContext<AuthState | null>(null);

function resolveHost(): string {
  const env = (import.meta as any).env ?? {};
  return env.VITE_IC_HOST || (env.DEV ? "http://127.0.0.1:4943" : "https://icp0.io");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<AuthClient | null>(null);
  const [agent, setAgent] = useState<HttpAgent | undefined>();
  const [principal, setPrincipal] = useState<string | undefined>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const c = await AuthClient.create();
      setClient(c);
      if (await c.isAuthenticated()) {
        const i = c.getIdentity();
        const a = new HttpAgent({ identity: i, host: resolveHost() });
        if (import.meta.env.DEV) await a.fetchRootKey();
        setAgent(a);
        setPrincipal(i.getPrincipal().toText());
      }
      setReady(true);
    })();
  }, []);

  const login = async () => {
    if (!client) return;
    await client.login({
      identityProvider: import.meta.env.VITE_II_PROVIDER || undefined,
      onSuccess: async () => {
        const i = client.getIdentity();
        const a = new HttpAgent({ identity: i, host: resolveHost() });
        if (import.meta.env.DEV) await a.fetchRootKey();
        setAgent(a);
        setPrincipal(i.getPrincipal().toText());
      },
    });
  };

  const logout = async () => {
    if (!client) return;
    await client.logout();
    setAgent(undefined);
    setPrincipal(undefined);
  };

  const value = useMemo<AuthState>(
    () => ({ isReady: ready, isAuthenticated: !!principal, principal, agent, login, logout }),
    [ready, principal, agent]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// Aliases to avoid name collisions with app-level AuthContext
export { useAuth as useIcAuth, AuthProvider as IcAuthProvider };
