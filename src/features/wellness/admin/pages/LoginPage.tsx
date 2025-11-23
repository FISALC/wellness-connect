// src/admin/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext";

export default function AdminLoginPage() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: call your real API here:
    // const res = await fetch('/api/admin/auth/login', { ... })
    // const { token, user } = await res.json();
    const fakeToken = "demo-token";
    const fakeUser = { email, role: "Admin" as const };
    login(fakeToken, fakeUser);
    nav("/admin", { replace: true });
  }

  return (
    <div className="min-h-[70vh] grid place-items-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm border rounded-xl p-6 bg-white">
        <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
        <label className="block text-sm">Email</label>
        <input className="w-full border rounded p-2 mb-3" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label className="block text-sm">Password</label>
        <input type="password" className="w-full border rounded p-2 mb-4" value={pwd} onChange={(e)=>setPwd(e.target.value)} />
        <button className="w-full bg-emerald-600 text-white rounded p-2 hover:bg-emerald-700">Login</button>
      </form>
    </div>
  );
}
