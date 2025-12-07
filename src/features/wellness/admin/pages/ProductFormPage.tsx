import { useState } from "react";
import { ProductCategory, type CreateProductDto } from "../types/product";

export type ProductFormValues = CreateProductDto;

type Props = {
  initial?: Partial<ProductFormValues>;
  submitting?: boolean;
  onSubmit: (values: ProductFormValues) => Promise<void> | void;
};

const DEFAULTS: ProductFormValues = {
  name: "",
  category: ProductCategory.Protein,
  description: "",
  imageUrl: "",
  isNew: true,
  tag: "",
  rating: 5,
  discountPct: 0,
  price: 0,
};

export default function ProductForm({ initial, submitting, onSubmit }: Props) {
  const [values, setValues] = useState<ProductFormValues>({ ...DEFAULTS, ...initial });

  function set<K extends keyof ProductFormValues>(key: K, v: ProductFormValues[K]) {
    setValues(prev => ({ ...prev, [key]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Basic client validation
    if (!values.name.trim()) return alert("Name is required");
    if (!values.imageUrl.trim()) return alert("Image URL is required");
    await onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          className="w-full rounded-md border px-3 py-2"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g., Whey Protein Gold"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          className="w-full rounded-md border px-3 py-2 bg-white"
          value={values.category}
          onChange={(e) => set("category", Number(e.target.value) as ProductCategory)}
        >
          <option value={ProductCategory.Protein}>Protein</option>
          <option value={ProductCategory.Vitamins}>Vitamins</option>
          <option value={ProductCategory.Apparel}>Apparel</option>
          <option value={ProductCategory.HealthyEats}>Healthy Eats</option>
          <option value={ProductCategory.Accessories}>Accessories</option>
        </select>
        <p className="mt-1 text-xs text-gray-500">
          (Your API expects the enum **number**)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="w-full rounded-md border px-3 py-2 min-h-[100px]"
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Short description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          className="w-full rounded-md border px-3 py-2"
          value={values.imageUrl}
          onChange={(e) => set("imageUrl", e.target.value)}
          placeholder="https://…"
          required
        />
        <p className="mt-1 text-xs text-gray-500">Store files wherever you like and paste the URL.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="w-full rounded-md border px-3 py-2"
            value={values.price}
            onChange={(e) => set("price", Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tag (Optional)</label>
          <input
            className="w-full rounded-md border px-3 py-2"
            value={values.tag || ""}
            onChange={(e) => set("tag", e.target.value)}
            placeholder="e.g. BESTSELLER"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            className="w-full rounded-md border px-3 py-2"
            value={values.rating}
            onChange={(e) => set("rating", Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Discount %</label>
          <input
            type="number"
            min="0"
            max="100"
            className="w-full rounded-md border px-3 py-2"
            value={values.discountPct}
            onChange={(e) => set("discountPct", Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isNew"
          type="checkbox"
          className="h-4 w-4"
          checked={values.isNew}
          onChange={(e) => set("isNew", e.target.checked)}
        />
        <label htmlFor="isNew" className="text-sm">Mark as New</label>
      </div>

      <div className="pt-2 flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-gray-900 text-white px-4 py-2 text-sm disabled:opacity-60"
        >
          {submitting ? "Saving…" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => setValues({ ...DEFAULTS, ...initial })}
          className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
