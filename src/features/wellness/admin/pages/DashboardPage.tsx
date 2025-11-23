import { Link } from "react-router-dom";
import KpiCard from "@/shared/ui/KpiCard";

export default function DashboardPage() {
  const kpis = [
    { label: "Total Products", value: 184, delta: "+12" },
    { label: "Published", value: 152, delta: "+7" },
    { label: "Drafts", value: 32, delta: "-1" },
    { label: "Leads (7d)", value: 46, delta: "+9" },
  ];

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">Minimal, fast overview.</p>
        </div>

        <div className="flex gap-2">
          <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50">
            Export
          </button>
          <Link
            to="/admin/products/new"
            className="rounded-md bg-gray-900 text-white px-3 py-1.5 text-sm"
          >
            Add Product
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => <KpiCard key={k.label} {...k} />)}
      </div>

      <div className="rounded-lg border bg-white">
        <div className="px-4 py-3 border-b font-medium">Recent Activity</div>
        <div className="p-4 text-sm text-gray-600">
          Connect to Admin APIs and list product/price updates here.
        </div>
      </div>
    </section>
  );
}
