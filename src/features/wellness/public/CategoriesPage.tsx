import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterPanel from "@/features/wellness/public/components/FilterPanel";
import Card from "@/features/wellness/public/components/Card";
import { ITEMS, WELLNESS_HUB } from "@/data";

/** Tabs we support (shareable via ?category=) */
type CategoryKey = "all" | "supplements" | "apparel" | "diet";
const CATEGORY_TABS: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "supplements", label: "Supplements" },
  { key: "apparel", label: "Apparel" },
  { key: "diet", label: "Diet" },
];

/** Helpers to pull data from your existing data.ts */
function getSupplements() {
  // You already have ITEMS grouped by tabs. Flatten a few buckets together.
  // Adjust if you add more keys later.
  const protein = ITEMS["Proteing Products"] ?? [];
  const bcaa    = ITEMS["BCAAs/Amino Acids"] ?? [];
  const vits    = ITEMS["Vitaminist Workout"] ?? [];
  return [...protein, ...bcaa, ...vits];
}

function getApparel() {
  // If your Card item has a category/type field, filter by it.
  // For now we simulate apparel by picking WELLNESS_HUB items that look like clothing.
  // You can replace with a proper array in data.ts later.
  return WELLNESS_HUB.filter(i =>
    /wear|hoodie|shirt|apparel|active/i.test(i.name ?? "")
  );
}

function getDiet() {
  // Diet plans/guides — reuse WELLNESS_HUB as a placeholder (or create DIET array in data.ts)
  return WELLNESS_HUB.filter(i =>
    /diet|meal|food|healthy|guide/i.test(i.name ?? "")
  );
}

export default function CategoriesPage() {
  const [sp, setSp] = useSearchParams();
  const initial = (sp.get("category") as CategoryKey) || "all";
  const [active, setActive] = useState<CategoryKey>(initial);
  const [query, setQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // derive datasets
  const supplements = useMemo(() => getSupplements(), []);
  const apparel     = useMemo(() => getApparel(), []);
  const diet        = useMemo(() => getDiet(), []);

  // filter by search query
  const applyQuery = (arr: any[]) =>
    query.trim()
      ? arr.filter(x => (x.name || "").toLowerCase().includes(query.toLowerCase()))
      : arr;

  const filtered = {
    supplements: applyQuery(supplements),
    apparel:     applyQuery(apparel),
    diet:        applyQuery(diet),
  };

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 md:grid-cols-[16rem,1fr] gap-6">
        {/* LEFT: Filters (desktop) */}
        <aside className="hidden md:block sticky top-20 self-start">
          <FilterPanel />
        </aside>

        {/* RIGHT: Content */}
        <section className="space-y-6">
          {/* Header row: title + search + mobile-filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
              <p className="text-sm text-gray-600">Browse supplements, apparel, and diet guides.</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                className="input w-64"
                placeholder="Search items…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="md:hidden px-3 py-2 rounded-lg border text-sm hover:bg-gray-50"
                onClick={() => setMobileFiltersOpen(true)}
              >
                Filters
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="overflow-x-auto">
            <div className="min-w-max flex gap-8 border-b">
              {CATEGORY_TABS.map(t => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`relative pb-2 text-sm transition-colors ${
                    active === t.key
                      ? "text-emerald-700 font-semibold after:absolute after:left-0 after:-bottom-[1px] after:h-[2px] after:w-full after:bg-emerald-700"
                      : "text-gray-900 hover:text-emerald-700"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content switcher */}
          {active === "all" ? (
            <div className="space-y-10">
              <CategorySection title="Supplements" count={filtered.supplements.length}>
                <GridThree>
                  {filtered.supplements.map(i => <Card key={i.id} item={i} />)}
                </GridThree>
              </CategorySection>

              <CategorySection title="Apparel" count={filtered.apparel.length}>
                <GridThree>
                  {filtered.apparel.map(i => <Card key={i.id} item={i} />)}
                </GridThree>
              </CategorySection>

              <CategorySection title="Diet Plans & Guides" count={filtered.diet.length}>
                <GridThree>
                  {filtered.diet.map(i => <Card key={i.id} item={i} />)}
                </GridThree>
              </CategorySection>
            </div>
          ) : active === "supplements" ? (
            <CategorySection title="Supplements" count={filtered.supplements.length}>
              <GridThree>
                {filtered.supplements.map(i => <Card key={i.id} item={i} />)}
              </GridThree>
            </CategorySection>
          ) : active === "apparel" ? (
            <CategorySection title="Apparel" count={filtered.apparel.length}>
              <GridThree>
                {filtered.apparel.map(i => <Card key={i.id} item={i} />)}
              </GridThree>
            </CategorySection>
          ) : (
            <CategorySection title="Diet Plans & Guides" count={filtered.diet.length}>
              <GridThree>
                {filtered.diet.map(i => <Card key={i.id} item={i} />)}
              </GridThree>
            </CategorySection>
          )}
        </section>
      </main>

      {/* MOBILE FILTER DRAWER */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white p-3 shadow-xl">
            <FilterPanel onClose={() => setMobileFiltersOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- small helpers ---------- */

function CategorySection({
  title, count, children
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-end justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-gray-800">{title}</h2>
        {typeof count === "number" && (
          <span className="text-xs text-gray-500">{count} items</span>
        )}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function GridThree({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>;
}
