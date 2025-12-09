// src/admin/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

export default function AdminLoginPage() {
  const nav = useNavigate();
  const { login, token } = useAuth();
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await import("../api/auth.api").then(m => m.login({ username, password: pwd }));
      // Response is flat: { token, username, role }
      login(res.token, { username: res.username, email: "admin@wellness.com", role: res.role as any });
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        nav("/admin", { replace: true });
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
      setLoading(false); // Only stop loading on error, keep it for success redirect
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center bg-gray-50">
      <form onSubmit={onSubmit} className="w-full max-w-sm border rounded-xl p-6 bg-white shadow-sm">
        <h1 className="text-xl font-semibold mb-4 text-center">Admin Login</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-sm rounded-md border border-emerald-200">
            {success}
          </div>
        )}

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-gray-700">Username</label>
          <input
            className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. admin"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
          <input
            type="password"
            className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-gray-900 text-white rounded-md py-2 text-sm font-medium hover:bg-black disabled:opacity-70 transition-colors"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
