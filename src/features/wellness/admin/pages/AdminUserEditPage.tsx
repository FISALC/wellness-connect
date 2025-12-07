import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdmin, updateAdmin, type UpdateAdminDto } from "../api/admins.api";

export default function AdminUserEditPage() {
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "", // Optional for update
        role: "Admin",
    });
    const [error, setError] = useState<string | null>(null);

    const { data: admin, isLoading, isError } = useQuery({
        queryKey: ["admin", id],
        queryFn: () => getAdmin(id!),
        enabled: !!id,
    });

    useEffect(() => {
        if (admin) {
            setForm({
                username: admin.username,
                email: admin.email,
                password: "", // Don't pre-fill password
                role: admin.role,
            });
        }
    }, [admin]);

    const updateMutation = useMutation({
        mutationFn: (data: UpdateAdminDto) => updateAdmin(id!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
            queryClient.invalidateQueries({ queryKey: ["admin", id] });
            alert("Admin updated successfully");
            nav("/admin/users");
        },
        onError: (err: any) => {
            console.error(err);
            setError(err?.response?.data?.message || "Failed to update admin");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const updateData: UpdateAdminDto = {
            username: form.username,
            email: form.email,
            role: form.role,
        };

        // Only include password if user typed something
        if (form.password) {
            updateData.password = form.password;
        }

        updateMutation.mutate(updateData);
    };

    if (isLoading) return <div className="p-6">Loading...</div>;
    if (isError) return <div className="p-6 text-red-500">Failed to load admin details.</div>;

    return (
        <section className="max-w-2xl space-y-6">
            <header>
                <h1 className="text-xl font-semibold">Edit Admin</h1>
                <p className="text-sm text-gray-500">Update admin user details.</p>
            </header>

            {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm border border-red-200">
                    {error}
                </div>
            )}

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
                        <label className="block text-sm font-medium mb-1">
                            Password <span className="text-gray-400 font-normal">(Leave blank to keep current)</span>
                        </label>
                        <input
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
                            disabled={updateMutation.isPending}
                            className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-black disabled:opacity-70"
                        >
                            {updateMutation.isPending ? "Updating..." : "Update Admin"}
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
