// src/admin/auth/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

type Role = "Admin" | "Editor" | "Viewer";
type AuthUser = { username: string; email: string; role: Role };
type Ctx = {
  user: AuthUser | null;
  token: string | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
};

const KEY = "wc_admin_token";
const USER_KEY = "wc_admin_user";
const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(KEY));
  const [user, setUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem(KEY, token);
    else localStorage.removeItem(KEY);
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const value: Ctx = {
    user,
    token,
    login: (t, u) => { setToken(t); setUser(u); },
    logout: () => { setToken(null); setUser(null); }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
