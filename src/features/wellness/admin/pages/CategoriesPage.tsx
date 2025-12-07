import { useEffect, useState } from "react";
import { Category, CreateCategoryDto } from "../types/categories";
import { getCategories, createCategory, deleteCategory } from "../api/categories.api";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [form, setForm] = useState<CreateCategoryDto>({ name: "", slug: "", description: "" });

    useEffect(() => {
        load();
    }, []);

    function load() {
        setLoading(true);
        getCategories()
            .then(setCategories)
            .finally(() => setLoading(false));
    }

    async function handleCreate() {
        if (!form.name || !form.slug) return;
        await createCategory(form);
        setIsCreating(false);
        setForm({ name: "", slug: "", description: "" });
        load();
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure? This will not delete products in this category.")) return;
        await deleteCategory(id);
        load();
    }

    // Auto-generate slug from name
    useEffect(() => {
        if (isCreating) {
            setForm(prev => ({
                ...prev,
                slug: prev.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
            }));
        }
    }, [form.name, isCreating]);

    if (loading && !categories.length) return <div className="p-6">Loading categories...</div>;

    return (
        <div className="p-6 space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                    <p className="text-sm text-gray-500">Manage product categories.</p>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium flex items-center gap-2"
                >
                    <span>+</span> New Category
                </button>
            </header>

            {isCreating && (
                <div className="bg-white rounded-xl border shadow-sm p-6 mb-6 animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-bold mb-4">Add Category</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                className="w-full border rounded px-3 py-2"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                placeholder="e.g. Protein Powder"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug</label>
                            <input
                                className="w-full border rounded px-3 py-2 bg-gray-50"
                                value={form.slug}
                                readOnly
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <input
                                className="w-full border rounded px-3 py-2"
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                placeholder="Brief description for SEO"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setIsCreating(false)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                        <button onClick={handleCreate} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Save Category</button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 font-medium text-gray-500">Name</th>
                            <th className="px-6 py-3 font-medium text-gray-500">Slug</th>
                            <th className="px-6 py-3 font-medium text-gray-500">Description</th>
                            <th className="px-6 py-3 font-medium text-gray-500">Products</th>
                            <th className="px-6 py-3 font-medium text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {categories.map(cat => (
                            <tr key={cat.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{cat.slug}</td>
                                <td className="px-6 py-4 text-gray-500">{cat.description}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {cat.count} items
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-900 font-medium">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {!categories.length && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
