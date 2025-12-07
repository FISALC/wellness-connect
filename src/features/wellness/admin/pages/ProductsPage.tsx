import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";

type Product = {
  id: string;
  name: string;
  category: number;      // enum number from your API
  isNew: boolean;
  imageUrl?: string;
  createdAt?: string;
};

const CATEGORY_LABELS: Record<number, string> = {
  0: "Protein",
  1: "Vitamins",
  2: "Apparel",
  3: "Healthy Eats",
  4: "Accessories",
};

export default function ProductsPage() {
  const nav = useNavigate();
  const { data, isLoading, isError } = useProducts(); // expected to return Product[]

  // UI state
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<number | "all">("all");
  const [sort, setSort] = useState<"name" | "created" | "category">("created");
  const [dir, setDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // filter + sort
  const filtered: Product[] = useMemo(() => {
    const list = (data ?? []) as Product[];

    const f = list.filter((p) => {
      const matchesText =
        !q ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        CATEGORY_LABELS[p.category]?.toLowerCase().includes(q.toLowerCase());
      const matchesCat = cat === "all" ? true : p.category === cat;
      return matchesText && matchesCat;
    });

    const s = [...f].sort((a, b) => {
      const mul = dir === "asc" ? 1 : -1;
      if (sort === "name") return a.name.localeCompare(b.name) * mul;
      if (sort === "category") return (a.category - b.category) * mul;
      // created
      const ta = a.createdAt ? Date.parse(a.createdAt) : 0;
      const tb = b.createdAt ? Date.parse(b.createdAt) : 0;
      return (ta - tb) * mul;
    });

    return s;
  }, [data, q, cat, sort, dir]);

  // pagination
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  useEffect(() => { if (page > pages) setPage(pages); }, [pages, page]);
  const view = filtered.slice((page - 1) * pageSize, page * pageSize);

  // helpers
  const toggleSort = (key: typeof sort) => {
    if (sort === key) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSort(key); setDir("asc"); }
  };

  // loading skeleton
  if (isLoading) {
    return (
      <section className="p-6 space-y-4">
        <HeaderBar />
        <div className="rounded-lg border bg-white p-4">
          <SkeletonTable rows={6} />
        </div>
      </section>
    );
  }
  if (isError) return <p className="p-6 text-red-600">Failed to load products.</p>;

  return (
    <section className="p-6 space-y-4">
      <HeaderBar />

      {/* Filters */}
      <div className="rounded-lg border bg-white p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 flex-1">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder="Search by name or category…"
            className="w-full md:w-72 rounded-md border px-3 py-2 text-sm"
          />
          <select
            value={cat}
            onChange={(e) => { setCat(e.target.value === "all" ? "all" : Number(e.target.value)); setPage(1); }}
            className="rounded-md border px-3 py-2 text-sm bg-white"
          >
            <option value="all">All categories</option>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setQ(""); setCat("all"); setSort("created"); setDir("desc"); setPage(1); }}
            className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Reset
          </button>
          <Link
            to="/admin/products/new"
            className="rounded-md bg-gray-900 text-white px-3 py-2 text-sm"
          >
            + New Product
          </Link>
        </div>
      </div>

      {/* Table / empty */}
      {total === 0 ? (
        <EmptyState />
      ) : (
        <div className="rounded-lg border bg-white overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <Th onClick={() => toggleSort("name")} active={sort === "name"} dir={dir}>Name</Th>
                <Th>Preview</Th>
                <Th onClick={() => toggleSort("category")} active={sort === "category"} dir={dir}>Category</Th>
                <Th>New?</Th>
                <Th onClick={() => toggleSort("created")} active={sort === "created"} dir={dir}>Created</Th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {view.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">{p.name}</td>
                  <td className="px-3 py-2">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="h-10 w-10 rounded object-cover border" />
                    ) : (
                      <div className="h-10 w-10 rounded border grid place-items-center text-xs text-gray-400">—</div>
                    )}
                  </td>
                  <td className="px-3 py-2">{CATEGORY_LABELS[p.category] ?? p.category}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs
                      ${p.isNew ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                      {p.isNew ? "New" : "—"}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-gray-500">
                    {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded-md border px-2 py-1 hover:bg-gray-50"
                        onClick={() => nav(`/admin/products/${p.id}/edit`)}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-md border px-2 py-1 hover:bg-red-50 text-red-600"
                        onClick={() => confirmDelete(p)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-3 py-2 border-t text-sm">
            <span className="text-gray-600">
              Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
            </span>
            <div className="flex items-center gap-2">
              <button
                className="rounded-md border px-2 py-1 disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              <span className="min-w-[3rem] text-center">{page}/{pages}</span>
              <button
                className="rounded-md border px-2 py-1 disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                disabled={page === pages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );

  // --- handlers ---
  function confirmDelete(p: Product) {
    if (!confirm(`Delete "${p.name}"?`)) return;
    // TODO: call delete API, then refresh useProducts cache
    // e.g., await deleteProduct(p.id); queryClient.invalidateQueries(['products'])
    alert("Delete API not wired yet.");
  }
}

/* ----------------- Small UI pieces ----------------- */

function HeaderBar() {
  return (
    <div className="mb-1 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Products</h1>
      <Link
        to="/admin/products/new"
        className="rounded-md bg-gray-900 text-white px-3 py-1.5 text-sm"
      >
        + New
      </Link>
    </div>
  );
}

function Th({
  children,
  onClick,
  active,
  dir,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  dir?: "asc" | "desc";
}) {
  return (
    <th
      onClick={onClick}
      className={`px-3 py-2 text-left select-none ${onClick ? "cursor-pointer" : ""}`}
      title={onClick ? "Sort" : undefined}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {active && (
          <svg viewBox="0 0 20 20" className="h-3 w-3 text-gray-500">
            {dir === "asc" ? (
              <path d="M10 6l-4 6h8l-4-6z" fill="currentColor" />
            ) : (
              <path d="M10 14l4-6H6l4 6z" fill="currentColor" />
            )}
          </svg>
        )}
      </span>
    </th>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border bg-white p-8 text-center">
      <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gray-100 grid place-items-center">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 7h18M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M7 7v10m10-10v10M9 11h6" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold">No products yet</h3>
      <p className="text-sm text-gray-600 mt-1">Create your first product to get started.</p>
      <Link
        to="/admin/products/new"
        className="inline-flex mt-4 rounded-md bg-gray-900 text-white px-3 py-1.5 text-sm"
      >
        + Create Product
      </Link>
    </div>
  );
}

function SkeletonTable({ rows = 6 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="h-9 w-full bg-gray-100 rounded" />
      ))}
    </div>
  );
}
