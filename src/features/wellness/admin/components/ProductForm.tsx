import { useMemo } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductCreateSchema,
  type ProductCreateDto,
  type Category,
} from "../types/product";

type ProductFormValues = ProductCreateDto;

type Props = {
  categories: Category[];
  onSubmit: (values: ProductFormValues) => void;
  submitting?: boolean;
};

export default function ProductForm({ categories, onSubmit, submitting }: Props) {
  const defaultValues: ProductFormValues = useMemo(
    () => ({
      name: "",
      category: 0, // placeholder option until user picks one
      description: "",
      imageUrl: "",
      isNew: true,
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductCreateSchema) as unknown as Resolver<ProductFormValues>,
    mode: "onChange",
    defaultValues,
  });

  const disabled = submitting || isSubmitting || !isValid;
  const imageUrl = watch("imageUrl");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4" noValidate>
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          {...register("name")}
          aria-invalid={!!errors.name}
          className="mt-1 w-full rounded border p-2"
          placeholder="Whey Protein Gold Standard"
          required
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          {...register("category", { valueAsNumber: true })}
          aria-invalid={!!errors.category}
          className="mt-1 w-full rounded border p-2"
          required
        >
          <option value={0}>Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          aria-invalid={!!errors.description}
          className="mt-1 w-full rounded border p-2"
          rows={4}
          placeholder="High-quality whey protein isolate with 24g protein per serving."
          required
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input
          {...register("imageUrl")}
          aria-invalid={!!errors.imageUrl}
          className="mt-1 w-full rounded border p-2"
          placeholder="https://example.com/images/whey-protein.jpg"
          required
        />
        {errors.imageUrl && (
          <p className="text-sm text-red-600">{errors.imageUrl.message}</p>
        )}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="mt-2 h-28 w-28 rounded object-cover border"
            onError={(e) => ((e.currentTarget.style.display = "none"))}
          />
        )}
      </div>

      <label className="inline-flex items-center gap-2">
        <input type="checkbox" {...register("isNew")} />
        <span>Mark as New</span>
      </label>

      <div className="pt-2">
        <button
          type="submit"
          disabled={disabled}
          className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
        >
          {disabled ? "Saving..." : "Create Product"}
        </button>
      </div>
    </form>
  );
}
