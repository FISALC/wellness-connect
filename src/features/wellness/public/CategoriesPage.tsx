import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterPanel from "@/features/wellness/public/components/FilterPanel";
import Card from "@/features/wellness/public/components/Card";
import { useProducts, Product } from "@/features/wellness/hooks/useProducts";
import QuickViewModal from "@/features/wellness/public/components/QuickViewModal";

/** Tabs we support (shareable via ?category=) */
type CategoryKey = "all" | "supplements" | "apparel" | "diet";
const CATEGORY_TABS: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "supplements", label: "Supplements" },
  { key: "apparel", label: "Apparel" },
  { key: "diet", label: "Diet" },
];

export default function CategoriesPage() {
  const [sp, setSp] = useSearchParams();
  const initial = (sp.get("category") as CategoryKey) || "all";
  const [active, setActive] = useState<CategoryKey>(initial);
  const [query, setQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { data: products, isLoading } = useProducts();

  // sync tab -> url
  useEffect(() => {
    const cur = sp.get("category");
    if (cur !== active) {
      setSp(prev => {
        const p = new URLSearchParams(prev);
        if (active === "all") p.delete("category"); else p.set("category", active);
        return p;
      }, { replace: true });
    }
  }, [active, sp, setSp]);

  // filter by search query
  const filtered = useMemo(() => {
    let res = products || [];

    // 1. Filter by Tab
    if (active === "supplements") res = res.filter(p => p.category === 0 || p.category === 1); // Protein(0) + Vitamins(1)
    if (active === "apparel") res = res.filter(p => p.category === 2 || p.category === 4); // Apparel(2) + Accessories(4)
    if (active === "diet") res = res.filter(p => p.category === 3); // Healthy Eats(3)

    // 2. Filter by Search
    if (query.trim()) {
      const q = query.toLowerCase();
      res = res.filter(p => p.name.toLowerCase().includes(q));
    }

    return res;
  }, [products, active, query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* LEFT: Filters (desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <FilterPanel />
          </aside>

          {/* RIGHT: Content */}
          <div className="flex-1">
            {/* Header row: title + search + mobile-filters */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
                  <p className="text-gray-500 mt-1">Browse supplements, apparel, and diet guides.</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      placeholder="Search items..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <button
                    className="md:hidden p-2 rounded-lg border bg-white text-gray-600 hover:bg-gray-50"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex gap-8">
                  {CATEGORY_TABS.map(t => (
                    <button
                      key={t.key}
                      onClick={() => setActive(t.key)}
                      className={`pb-4 text-sm font-medium transition-all relative ${active === t.key
                        ? "text-emerald-600 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-emerald-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {active === 'all' ? 'All Products' : CATEGORY_TABS.find(t => t.key === active)?.label}
              </h2>
              <span className="text-sm text-gray-500">{filtered.length} items</span>
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(p => {
                  // Transform Product -> Item for Card compatibility
                  const item: any = {
                    id: p.id,
                    name: p.name,
                    image: p.imageUrl,
                    rating: p.rating,
                    discountPct: p.discountPct,
                    tag: p.tags?.[0],
                    type: p.category === 2 || p.category === 4 ? "apparel" : p.category === 3 ? "food" : "product",
                    isNew: p.isNew
                  };
                  return (
                    <Card
                      key={p.id}
                      item={item}
                      onQuickView={() => setQuickViewProduct(p)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900">No items found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MOBILE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-4">
              <FilterPanel />
            </div>
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
