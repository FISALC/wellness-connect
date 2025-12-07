// src/pages/Home.tsx
import { useEffect, useMemo, useState } from "react";
import Hero from "./components/Hero";
import Card from "./components/Card";
import Modal from "./components/Modal";
import QuickView from "./components/QuickView";

import type { Item } from "../../../data";
import { useProducts, type Product } from "../hooks/useProducts";
import { getStorefrontConfig } from "../admin/api/storefront.api";
import { StorefrontConfig, DEFAULT_STOREFRONT } from "../admin/types/storefront";

/* ---------- Tabs ---------- */
type MainTab = "supplements" | "active" | "healthy";

const TABS: { key: MainTab; label: string }[] = [
  { key: "supplements", label: "Proteins & Supplements" },
  { key: "active", label: "Active Wear" },
  { key: "healthy", label: "Healthy Eats" },
];

type SortKey = "featured" | "newest" | "a-z" | "z-a";

const CATEGORY_TO_TAB: Record<number, MainTab> = {
  0: "supplements",
  1: "healthy",
  2: "active",
  3: "supplements",
};

const CATEGORY_TO_TYPE: Record<number, Item["type"]> = {
  0: "product",
  1: "food",
  2: "apparel",
  3: "product",
};

const FALLBACK_IMG: Record<"product" | "apparel" | "food", string> = {
  product:
    "https://images.unsplash.com/photo-1579722821273-0f6c5f31b2a3?q=80&w=1200&auto=format&fit=crop",
  apparel:
    "https://images.unsplash.com/photo-1520975922321-16b5f2f65c7d?q=80&w=1200&auto=format&fit=crop",
  food:
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
};

function withImage(arr: Item[]) {
  return arr.map((i) => ({
    ...i,
    image:
      i.image ||
      FALLBACK_IMG[(i.type as "product" | "apparel" | "food") ?? "product"],
  }));
}

function mapProductToItem(p: Product): Item & { category: number } {
  const type = CATEGORY_TO_TYPE[p.category] ?? "product";

  return {
    id: p.id,
    name: p.name,
    type,
    image: p.imageUrl,
    isNew: p.isNew,
    createdAt: p.createdAt ? Date.parse(p.createdAt) : undefined,
    category: p.category,
    rating: p.rating,
    discountPct: p.discountPct,
    tag: p.tag,
  };
}

/* ---------- Page ---------- */
export default function Home() {
  const [config, setConfig] = useState<StorefrontConfig>(DEFAULT_STOREFRONT);
  const [tab, setTab] = useState<MainTab>("supplements");
  const [sortBy, setSortBy] = useState<SortKey>("featured");
  const [onlyNew, setOnlyNew] = useState(false);
  const [quickItem, setQuickItem] = useState<Item | null>(null);
  const [visible, setVisible] = useState(9);

  const { data: products, isLoading, isError } = useProducts();

  // Fetch dynamic config
  useEffect(() => {
    getStorefrontConfig().then(setConfig);
  }, []);

  const allItems = useMemo(
    () => (products || []).map(mapProductToItem),
    [products]
  );

  const base = useMemo(() => {
    const filtered = allItems.filter(
      (i: any) => CATEGORY_TO_TAB[i.category] === tab
    );
    return withImage(filtered);
  }, [allItems, tab]);

  const items = useMemo(() => {
    let list = [...base];
    if (onlyNew) list = list.filter((x: any) => x?.isNew);

    if (sortBy === "newest") {
      list.sort(
        (a: any, b: any) =>
          (b.createdAt ?? (b.isNew ? 1 : 0)) -
          (a.createdAt ?? (a.isNew ? 1 : 0))
      );
    } else if (sortBy === "a-z") {
      list.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    } else if (sortBy === "z-a") {
      list.sort((a, b) => String(b.name).localeCompare(String(a.name)));
    }
    return list;
  }, [base, sortBy, onlyNew]);

  const shown = items.slice(0, visible);
  const canShowMore = items.length > visible;

  const featuredCombos = useMemo(
    () => withImage(allItems.filter((i) => i.type === "product").slice(0, 3)),
    [allItems]
  );

  function selectTab(next: MainTab) {
    setTab(next);
    setVisible(9);
  }

  if (isLoading) {
    return (
      <div className="space-y-12 pb-12">
        <Hero config={config.hero} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-96 rounded-2xl bg-gray-100 animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-12 pb-12">
        <Hero config={config.hero} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <p className="text-red-600">Failed to load products. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      {/* HERO */}
      <Hero config={config.hero} />

      {/* FEATURES SECTION */}
      {config.features.enabled && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.features.items.map((f, i) => (
              <Feature key={i} icon={f.icon} title={f.title} text={f.description} />
            ))}
          </div>
        </section>
      )}

      {/* DYNAMIC SECTIONS */}
      {config.sections
        .filter((s) => s.enabled)
        .sort((a, b) => a.order - b.order)
        .map((section) => {
          if (section.type === "products") {
            return (
              <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                  <p className="text-gray-500 max-w-2xl mx-auto">
                    Handpicked items to support your journey to a healthier, happier you.
                  </p>
                </div>

                {/* Tabs & Filters */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="bg-gray-100/50 p-1.5 rounded-xl inline-flex">
                    {TABS.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => selectTab(t.key)}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                        ${tab === t.key
                            ? "bg-white text-emerald-700 shadow-sm"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                          }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        checked={onlyNew}
                        onChange={(e) => setOnlyNew(e.target.checked)}
                      />
                      New Arrivals
                    </label>

                    <div className="relative">
                      <select
                        className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortKey)}
                      >
                        <option value="featured">Featured</option>
                        <option value="newest">Newest</option>
                        <option value="a-z">Name (A-Z)</option>
                        <option value="z-a">Name (Z-A)</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Grid */}
                {shown.length ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {shown.map((i) => (
                        <Card
                          key={i.id}
                          item={i}
                          onQuickView={(it) => setQuickItem(it)}
                        />
                      ))}
                    </div>

                    <div className="pt-8 flex justify-center">
                      {canShowMore ? (
                        <button
                          onClick={() => setVisible((v) => v + 9)}
                          className="px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                        >
                          Load More Products
                        </button>
                      ) : items.length > 9 ? (
                        <button
                          onClick={() => setVisible(9)}
                          className="px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                        >
                          Show Less
                        </button>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <div className="py-20 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <span className="text-2xl">🔍</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                    <p className="text-gray-500 mt-1">Try adjusting your filters or category.</p>
                  </div>
                )}
              </section>
            );
          }

          if (section.type === "combos") {
            return (
              <section key={section.id} className="bg-emerald-900 py-16 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-800 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-teal-800 rounded-full blur-3xl opacity-50" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-10">
                    <div>
                      <span className="text-emerald-300 font-semibold tracking-wider uppercase text-sm">Limited Time Offers</span>
                      <h2 className="text-3xl md:text-4xl font-bold mt-2">{section.title}</h2>
                    </div>
                    <button className="text-white border-b border-emerald-400 pb-0.5 hover:text-emerald-300 hover:border-emerald-300 transition-colors">
                      View All Bundles &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredCombos.map((i) => (
                      <div key={`combo-${i.id}`} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors">
                        <Card
                          item={i}
                          onQuickView={(it) => setQuickItem(it)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          if (section.type === "brands") {
            return (
              <section key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-100">
                <p className="text-center text-sm text-gray-400 font-medium mb-6 uppercase tracking-widest">{section.title}</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  {["ON", "MyProtein", "MuscleTech", "Dymatize", "GNC", "Bulk"].map((b) => (
                    <span key={b} className="text-xl font-bold text-gray-800">{b}</span>
                  ))}
                </div>
              </section>
            );
          }

          return null;
        })}

      {/* Quick View modal */}
      <Modal
        open={!!quickItem}
        onClose={() => setQuickItem(null)}
        title="Product details"
      >
        {quickItem && <QuickView item={quickItem} />}
      </Modal>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 hover:shadow-md hover:bg-emerald-50 transition-all duration-300">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-emerald-100 text-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}
