import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAdmins, deleteAdmin, type AdminUserDto } from "../api/admins.api";

export default function AdminUsersPage() {
    const queryClient = useQueryClient();
    const { data: users, isLoading, isError } = useQuery({
        queryKey: ["admins"],
        queryFn: getAdmins,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteAdmin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
        },
    });

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this admin?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <div className="p-6 text-gray-500">Loading admins...</div>;
    if (isError) return <div className="p-6 text-red-500">Failed to load admins.</div>;

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Admin Users</h1>
                <Link
                    to="/admin/users/new"
                    className="rounded-md bg-gray-900 text-white px-3 py-1.5 text-sm"
                >
                    + New Admin
                </Link>
            </div>

            <div className="rounded-lg border bg-white overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-2 text-left font-medium text-gray-500">Id</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-500">Username</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-500">Email</th>
                            <th className="px-3 py-2 text-left font-medium text-gray-500">Role</th>
                            <th className="px-3 py-2 text-right font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users?.map((u: AdminUserDto) => (
                            <tr key={u.id} className="hover:bg-gray-50">
                                <td className="px-3 py-2 font-mono text-xs text-gray-500">{u.id}</td>
                                <td className="px-3 py-2 font-medium text-gray-900">{u.username}</td>
                                <td className="px-3 py-2 text-gray-600">{u.email}</td>
                                <td className="px-3 py-2">
                                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-right">
                                    <Link
                                        to={`/admin/users/${u.id}/edit`}
                                        className="text-gray-400 hover:text-gray-600 mr-3"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(u.id)}
                                        className="text-red-400 hover:text-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
