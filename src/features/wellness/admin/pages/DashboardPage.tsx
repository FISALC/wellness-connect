import { Link } from "react-router-dom";
import KpiCard from "@/shared/ui/KpiCard";
import { useProducts } from "../../hooks/useProducts";
import { useMemo } from "react";

export default function DashboardPage() {
  const { data: products, isLoading } = useProducts();

  const stats = useMemo(() => {
    const total = products.length;
    const published = products.length; // Assuming all are published for now
    const newArrivals = products.filter(p => p.isNew).length;
    // Mock leads for now as we don't have a leads API yet
    const leads = 46;

    return [
      { label: "Total Products", value: total, delta: total > 0 ? "+1" : "0" },
      { label: "Published", value: published, delta: "+0" },
      { label: "New Arrivals", value: newArrivals, delta: newArrivals > 0 ? `+${newArrivals}` : "0" },
      { label: "Leads (7d)", value: leads, delta: "+9" },
    ];
  }, [products]);

  const recentProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return db - da;
      })
      .slice(0, 5);
  }, [products]);

  if (isLoading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">Overview of your store performance.</p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/admin/products/new"
            className="rounded-md bg-gray-900 text-white px-3 py-1.5 text-sm"
          >
            + Add Product
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((k) => <KpiCard key={k.label} {...k} />)}
      </div>

      <div className="rounded-lg border bg-white">
        <div className="px-4 py-3 border-b font-medium flex justify-between items-center">
          <span>Recent Activity</span>
          <Link to="/admin/products" className="text-sm text-emerald-600 hover:underline">View All</Link>
        </div>
        <div className="divide-y">
          {recentProducts.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No activity yet.</p>
          ) : (
            recentProducts.map((p) => (
              <div key={p.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="h-10 w-10 rounded object-cover border" />
                  ) : (
                    <div className="h-10 w-10 rounded border bg-gray-100 grid place-items-center text-xs">IMG</div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-500">
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "Unknown date"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {p.isNew && <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-700">New</span>}
                  <span className="text-sm font-medium">${p.price?.toFixed(2) ?? "0.00"}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
