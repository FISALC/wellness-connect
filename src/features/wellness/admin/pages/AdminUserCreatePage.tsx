import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdmin } from "../api/admins.api";

export default function AdminUserCreatePage() {
    const nav = useNavigate();
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "Admin",
    });

    const createMutation = useMutation({
        mutationFn: createAdmin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
            alert("Admin created successfully");
            nav("/admin/users");
        },
        onError: (err: any) => {
            console.error(err);
            alert(err?.response?.data?.message || "Failed to create admin");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate(form);
    };

    return (
        <section className="max-w-2xl space-y-6">
            <header>
                <h1 className="text-xl font-semibold">Create New Admin</h1>
                <p className="text-sm text-gray-500">Add a new user with administrative privileges.</p>
            </header>

            <div className="rounded-lg border bg-white p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            required
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            value={form.username}
                            onChange={e => setForm({ ...form, username: e.target.value })}
                            placeholder="e.g. jdoe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            required
                            type="email"
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            placeholder="e.g. jdoe@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            required
                            type="password"
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Role</label>
                        <select
                            className="w-full rounded-md border px-3 py-2 text-sm bg-white"
                            value={form.role}
                            onChange={e => setForm({ ...form, role: e.target.value })}
                        >
                            <option value="Admin">Admin</option>
                            <option value="SuperAdmin">SuperAdmin</option>
                            <option value="Editor">Editor</option>
                        </select>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="submit"
                            disabled={createMutation.isPending}
                            className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-black disabled:opacity-70"
                        >
                            {createMutation.isPending ? "Creating..." : "Create Admin"}
                        </button>
                        <button
                            type="button"
                            onClick={() => nav("/admin/users")}
                            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
