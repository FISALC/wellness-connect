import { useEffect, useState } from "react";
import { Article, CreateArticleDto, ArticleCategory } from "../types/wellness-hub";
import { getArticles, createArticle, updateArticle, deleteArticle } from "../api/wellness-hub.api";

const CATEGORIES: ArticleCategory[] = ["Nutrition", "Workouts", "Mental Health", "Lifestyle"];

export default function WellnessHubAdminPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Article | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Form State
    const [form, setForm] = useState<CreateArticleDto>({
        title: "",
        excerpt: "",
        content: "",
        imageUrl: "",
        category: "Nutrition",
        author: "",
        readTime: "",
        tags: [],
    });

    useEffect(() => {
        load();
    }, []);

    function load() {
        setLoading(true);
        getArticles()
            .then(setArticles)
            .finally(() => setLoading(false));
    }

    function handleEdit(article: Article) {
        setEditing(article);
        setForm(article);
        setIsCreating(false);
    }

    function handleCreate() {
        setEditing(null);
        setForm({
            title: "",
            excerpt: "",
            content: "",
            imageUrl: "",
            category: "Nutrition",
            author: "",
            readTime: "",
            tags: [],
        });
        setIsCreating(true);
    }

    async function handleSave() {
        if (isCreating) {
            await createArticle(form);
        } else if (editing) {
            await updateArticle(editing.id, form);
        }
        setIsCreating(false);
        setEditing(null);
        load();
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure?")) return;
        await deleteArticle(id);
        load();
    }

    if (loading && !articles.length) return <div className="p-6">Loading articles...</div>;

    if (isCreating || editing) {
        return (
            <div className="p-6 max-w-4xl">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">{isCreating ? "New Article" : "Edit Article"}</h1>
                    <button onClick={() => { setIsCreating(false); setEditing(null); }} className="text-gray-500 hover:text-gray-700">Cancel</button>
                </header>

                <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input className="w-full border rounded px-3 py-2" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select className="w-full border rounded px-3 py-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value as ArticleCategory })}>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Read Time</label>
                            <input className="w-full border rounded px-3 py-2" placeholder="e.g. 5 min read" value={form.readTime} onChange={e => setForm({ ...form, readTime: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input className="w-full border rounded px-3 py-2" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Excerpt</label>
                        <textarea className="w-full border rounded px-3 py-2 h-20" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Content (HTML/Markdown)</label>
                        <textarea className="w-full border rounded px-3 py-2 h-40 font-mono text-sm" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Author</label>
                            <input className="w-full border rounded px-3 py-2" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                            <input
                                className="w-full border rounded px-3 py-2"
                                value={form.tags.join(", ")}
                                onChange={e => setForm({ ...form, tags: e.target.value.split(",").map(t => t.trim()) })}
                            />
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button onClick={handleSave} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">
                            Save Article
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Wellness Hub Manager</h1>
                    <p className="text-sm text-gray-500">Manage blog posts and resources.</p>
                </div>
                <button onClick={handleCreate} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium flex items-center gap-2">
                    <span>+</span> New Article
                </button>
            </header>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 font-medium text-gray-500">Article</th>
                            <th className="px-6 py-3 font-medium text-gray-500">Category</th>
                            <th className="px-6 py-3 font-medium text-gray-500">Author</th>
                            <th className="px-6 py-3 font-medium text-gray-500">Date</th>
                            <th className="px-6 py-3 font-medium text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {articles.map(article => (
                            <tr key={article.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={article.imageUrl} alt="" className="w-10 h-10 rounded object-cover bg-gray-100" />
                                        <div>
                                            <div className="font-medium text-gray-900">{article.title}</div>
                                            <div className="text-xs text-gray-500 line-clamp-1">{article.excerpt}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                        {article.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{article.author}</td>
                                <td className="px-6 py-4 text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => handleEdit(article)} className="text-indigo-600 hover:text-indigo-900 font-medium">Edit</button>
                                    <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-900 font-medium">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {!articles.length && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No articles found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
