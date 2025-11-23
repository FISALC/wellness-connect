import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductFormPage from "./ProductFormPage";
import { createProduct } from "../api/products.api";
import type { CreateProductDto } from "../types/product";

export default function ProductCreatePage() {
  const nav = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  async function handleCreate(values: CreateProductDto) {
    setSubmitting(true);
    setError(null);
    setOkMsg(null);
    try {
      const res = await createProduct(values);
      setOkMsg(res.message ?? "Product created");
      // navigate to list (or edit page using returned id)
      // if your API returns { data: { id } }
      if (res?.data?.id) {
        nav(`/admin/products/${res.data.id}/edit`, { replace: true });
      } else {
        nav("/admin/products", { replace: true });
      }
    } catch (e) {
      setError((e as Error).message || "Failed to create product");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create Product</h1>
      </header>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">
          {error}
        </div>
      )}
      {okMsg && (
        <div className="rounded-md border border-green-200 bg-green-50 text-green-700 px-3 py-2 text-sm">
          {okMsg}
        </div>
      )}

      <div className="rounded-lg border bg-white p-4">
        <ProductFormPage submitting={submitting} onSubmit={handleCreate} />
      </div>
    </section>
  );
}
