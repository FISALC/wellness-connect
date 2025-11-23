// Uses Vite env: VITE_API_BASE_URL, example: https://api.yourdomain.com
export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  // Some APIs return empty-body on 201; guard for that
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? (await res.json()) as T : (undefined as T);
}

export async function post<TReq, TRes>(path: string, body: TReq, init?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    body: JSON.stringify(body),
    // credentials: "include", // keep cookies if you use auth cookies
    ...init,
  });
  return handle<TRes>(res);
}
