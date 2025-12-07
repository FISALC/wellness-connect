import { useEffect, useState } from "react";
import { StorefrontConfig, DEFAULT_STOREFRONT } from "../types/storefront";
import { getStorefrontConfig, updateStorefrontConfig } from "../api/storefront.api";

export default function StorefrontPage() {
    const [config, setConfig] = useState<StorefrontConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);

    useEffect(() => {
        getStorefrontConfig()
            .then(setConfig)
            .finally(() => setLoading(false));
    }, []);

    async function handleSave() {
        if (!config) return;
        setSaving(true);
        setMsg(null);
        await updateStorefrontConfig(config);
        setMsg("Storefront updated successfully!");
        setSaving(false);
        setTimeout(() => setMsg(null), 3000);
    }

    if (loading) return <div className="p-6">Loading storefront config...</div>;
    if (!config) return <div className="p-6">Failed to load config.</div>;

    return (
        <section className="space-y-6 p-6 max-w-4xl">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Storefront Manager</h1>
                    <p className="text-sm text-gray-500">Manage your Home Page content dynamically.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-sm"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </header>

            {msg && (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg border border-green-200">
                    {msg}
                </div>
            )}

            {/* HERO EDITOR */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b">
                    <h2 className="font-semibold text-gray-800">Hero Section</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Headline</label>
                        <input
                            className="w-full rounded-lg border px-3 py-2"
                            value={config.hero.title}
                            onChange={(e) => setConfig({ ...config, hero: { ...config.hero, title: e.target.value } })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Subtitle</label>
                        <textarea
                            className="w-full rounded-lg border px-3 py-2 h-20"
                            value={config.hero.subtitle}
                            onChange={(e) => setConfig({ ...config, hero: { ...config.hero, subtitle: e.target.value } })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Background Image URL</label>
                        <input
                            className="w-full rounded-lg border px-3 py-2"
                            value={config.hero.imageUrl}
                            onChange={(e) => setConfig({ ...config, hero: { ...config.hero, imageUrl: e.target.value } })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Primary CTA Text</label>
                            <input
                                className="w-full rounded-lg border px-3 py-2"
                                value={config.hero.ctaText}
                                onChange={(e) => setConfig({ ...config, hero: { ...config.hero, ctaText: e.target.value } })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Primary CTA Link</label>
                            <input
                                className="w-full rounded-lg border px-3 py-2"
                                value={config.hero.ctaLink}
                                onChange={(e) => setConfig({ ...config, hero: { ...config.hero, ctaLink: e.target.value } })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* FEATURES EDITOR */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="font-semibold text-gray-800">Features Grid</h2>
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={config.features.enabled}
                            onChange={(e) => setConfig({ ...config, features: { ...config.features, enabled: e.target.checked } })}
                        />
                        Enabled
                    </label>
                </div>
                <div className="p-6 space-y-6">
                    {config.features.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border">
                            <div className="w-12 pt-2 text-center">
                                <span className="text-2xl">{item.icon}</span>
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="flex gap-3">
                                    <div className="w-20">
                                        <label className="text-xs font-medium text-gray-500">Icon</label>
                                        <input
                                            className="w-full rounded border px-2 py-1 text-center"
                                            value={item.icon}
                                            onChange={(e) => {
                                                const newItems = [...config.features.items];
                                                newItems[idx].icon = e.target.value;
                                                setConfig({ ...config, features: { ...config.features, items: newItems } });
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs font-medium text-gray-500">Title</label>
                                        <input
                                            className="w-full rounded border px-2 py-1"
                                            value={item.title}
                                            onChange={(e) => {
                                                const newItems = [...config.features.items];
                                                newItems[idx].title = e.target.value;
                                                setConfig({ ...config, features: { ...config.features, items: newItems } });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500">Description</label>
                                    <input
                                        className="w-full rounded border px-2 py-1"
                                        value={item.description}
                                        onChange={(e) => {
                                            const newItems = [...config.features.items];
                                            newItems[idx].description = e.target.value;
                                            setConfig({ ...config, features: { ...config.features, items: newItems } });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECTIONS CONTROL */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b">
                    <h2 className="font-semibold text-gray-800">Page Sections</h2>
                </div>
                <div className="p-6 space-y-3">
                    {config.sections.map((section, idx) => (
                        <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                            <span className="font-medium text-gray-700">{section.title || section.id}</span>
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={section.enabled}
                                    onChange={(e) => {
                                        const newSections = [...config.sections];
                                        newSections[idx].enabled = e.target.checked;
                                        setConfig({ ...config, sections: newSections });
                                    }}
                                />
                                Visible
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
