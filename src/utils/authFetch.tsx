// src/admin/utils/authFetch.ts
import { useAuth } from "../features/auth/AuthContext";

export function useAuthFetch() {
  const { token } = useAuth();
  return async (url: string, init: RequestInit = {}) => {
    const headers = new Headers(init.headers);
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return fetch(url, { ...init, headers });
  };
}
