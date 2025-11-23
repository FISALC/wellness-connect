// src/pages/Home.tsx
import { useMemo, useState } from "react";
import Hero from "./components/Hero";
import Card from "./components/Card";
import Modal from "./components/Modal";
import QuickView from "./components/QuickView";

import type { Item } from "../../../data";
// ✅ use your existing hook
import { useProducts, type Product } from "../hooks/useProducts";

/* ---------- Tabs ---------- */
type MainTab = "supplements" | "active" | "healthy";

const TABS: { key: MainTab; label: string }[] = [
  { key: "supplements", label: "PROTEINS & SUPPLEMENTS" },
  { key: "active", label: "ACTIVE WEAR" },
  { key: "healthy", label: "HEALTHY EATS" },
];

type SortKey = "featured" | "newest" | "a-z" | "z-a";

/** 🔁 Map API category -> tab + item type
 *  Adjust these numbers to match your backend enum!
 *  Example:
 *   0 = supplements
 *   1 = active wear
 *   2 = healthy eats
 */
const CATEGORY_TO_TAB: Record<number, MainTab> = {
  0: "supplements",
  1: "healthy",
  2: "active",
};

const CATEGORY_TO_TYPE: Record<number, Item["type"]> = {
  0: "product",
  1: "food",
  2: "apparel",
};

const FALLBACK_IMG: Record<"product" | "apparel" | "food", string> = {
  product:
    "https://images.unsplash.com/photo-1579722821273-0f6c5f31b2a3?q=80&w=1200&auto=format&fit=crop",
  apparel:
    "https://images.unsplash.com/photo-1520975922321-16b5f2f65c7d?q=80&w=1200&auto=format&fit=crop",
  food:
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop",
};

// make sure every item has an image
function withImage(arr: Item[]) {
  return arr.map((i) => ({
    ...i,
    image:
      i.image ||
      FALLBACK_IMG[(i.type as "product" | "apparel" | "food") ?? "product"],
  }));
}

// API Product -> UI Item
function mapProductToItem(p: Product): Item & { category: number } {
  const type = CATEGORY_TO_TYPE[p.category] ?? "product";

  return {
    id: p.id,
    name: p.name,
    type,
    image: p.imageUrl,
    isNew: p.isNew,
    createdAt: p.createdAt ? Date.parse(p.createdAt) : undefined,
    category: p.category, // keep original category
  };
}

/* ---------- Page ---------- */
export default function Home() {
  const [tab, setTab] = useState<MainTab>("supplements");
  const [sortBy, setSortBy] = useState<SortKey>("featured");
  const [onlyNew, setOnlyNew] = useState(false);
  const [quickItem, setQuickItem] = useState<Item | null>(null);
  const [visible, setVisible] = useState(9); // how many cards visible

  // 🔥 fetch from API
  const { data: products, isLoading, isError } = useProducts();

  // normalize API -> Item[]
  const allItems = useMemo(
    () => products.map(mapProductToItem),
    [products]
  );

  // items for selected tab
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

  // use first 3 products as "featured combos"
  const featuredCombos = useMemo(
    () => withImage(allItems.filter((i) => i.type === "product").slice(0, 3)),
    [allItems]
  );

  // reset visible when switching tabs
  function selectTab(next: MainTab) {
    setTab(next);
    setVisible(9);
  }

  /* ------- loading / error states ------- */
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Hero />
        <div className="rounded-2xl border bg-white p-8 text-center">
          Loading products…
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <Hero />
        <div className="rounded-2xl border bg-white p-8 text-center text-red-600">
          Failed to load products. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HERO */}
      <Hero />

      {/* Brand strip */}
      <section className="rounded-xl border bg-white p-3 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {["ON", "MyProtein", "MuscleTech", "Dymatize", "GNC", "Bulk"].map(
          (b) => (
            <div
              key={b}
              className="h-10 grid place-items-center text-gray-500 text-sm border rounded-lg"
            >
              {b}
            </div>
          )
        )}
      </section>

      {/* Tabs */}
      <div className="overflow-x-auto">
        <div className="min-w-max flex gap-3">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => selectTab(t.key)}
              className={`px-4 py-2 rounded-t-xl text-sm font-medium transition
              ${
                tab === t.key
                  ? "bg-emerald-600 text-white shadow"
                  : "bg-white border hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between rounded-xl bg-white border p-3">
        <div className="text-sm font-semibold text-gray-800">
          {tab === "supplements"
            ? "PROTEINS & SUPPLEMENTS"
            : tab === "active"
            ? "ACTIVE WEAR"
            : "HEALTHY EATS"}
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 rounded border-gray-300"
              checked={onlyNew}
              onChange={(e) => setOnlyNew(e.target.checked)}
            />
            New items only
          </label>

          <select
            className="input !py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="a-z">A → Z</option>
            <option value="z-a">Z → A</option>
          </select>
        </div>
      </div>

      {/* Products */}
      {shown.length ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shown.map((i) => (
              <Card
                key={i.id}
                item={i}
                onQuickView={(it) => setQuickItem(it)}
              />
            ))}
          </div>

          {canShowMore ? (
            <div className="grid place-items-center">
              <button
                onClick={() => setVisible((v) => v + 9)}
                className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
              >
                Show more
              </button>
            </div>
          ) : items.length > 9 ? (
            <div className="grid place-items-center">
              <button
                onClick={() => setVisible(9)}
                className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
              >
                Show less
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="rounded-2xl border bg-white p-8 text-center text-gray-600">
          No items found for this selection.
        </div>
      )}

      {/* Trust row */}
      <section className="rounded-xl border bg-white p-4 grid sm:grid-cols-3 gap-3">
        <Feature icon="🚚" title="Free shipping" text="on bulk orders" />
        <Feature icon="↩️" title="Easy returns" text="hassle-free process" />
        <Feature
          icon="🔒"
          title="Secure checkout"
          text="we’ll contact you to finalize"
        />
      </section>

      {/* Featured combos */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-gray-800">
            FEATURED COMBOS
          </h2>
          <span className="text-xs text-gray-500">
            {featuredCombos.length} bundles
          </span>
        </div>
        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredCombos.map((i) => (
            <Card
              key={`combo-${i.id}`}
              item={i}
              onQuickView={(it) => setQuickItem(it)}
            />
          ))}
        </div>
      </section>

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

/* --- small helper component --- */
function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 grid place-items-center rounded-lg bg-emerald-50">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-gray-500">{text}</div>
      </div>
    </div>
  );
}
