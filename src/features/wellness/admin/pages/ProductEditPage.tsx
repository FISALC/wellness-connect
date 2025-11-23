// // src/admin/pages/ProductEdit.tsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuthFetch } from "../../../../utils/authFetch";
// import { AdminApi } from "../api/admin";
// import type { Product } from "../api/types";

// const EMPTY: Product = {
//   name: "",
//   category: 1,
//   description: "",
//   imageUrl: "",
//   isNew: true,
//   isPublished: false, // keep only if backend supports it
// };

// export default function ProductEditPage() {
//   const { id } = useParams<{ id: string }>();
//   const isCreate = !id;
//   const nav = useNavigate();
//   const authFetch = useAuthFetch();

//   const [model, setModel] = useState<Product>(EMPTY);
//   const [loading, setLoading] = useState(!!id);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;
//     (async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const p = await AdminApi.getProduct(authFetch, id);
//         setModel({
//           ...p,
//           description: p.description ?? "",
//           imageUrl: p.imageUrl ?? "",
//           isNew: !!p.isNew,
//           isPublished: typeof p.isPublished === "boolean" ? p.isPublished : false,
//         });
//       } catch (e: any) {
//         setError(e?.message ?? "Failed to load product");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [id, authFetch]);

//   function update<K extends keyof Product>(k: K, v: Product[K]) {
//     setModel((m) => ({ ...m, [k]: v }));
//   }

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setSaving(true);
//     setError(null);
//     try {
//       if (isCreate) {
//         const created = await AdminApi.createProduct(authFetch, {
//           name: model.name,
//           category: model.category ?? 1,
//           description: model.description ?? "",
//           imageUrl: model.imageUrl ?? "",
//           isNew: !!model.isNew,
//           ...(typeof model.isPublished === "boolean" ? { isPublished: model.isPublished } : {}),
//         });
//         if (created?.id) {
//           nav(`/admin/products/${created.id}`, { replace: true });
//         } else {
//           nav(`/admin/products`, { replace: true });
//         }
//       } else if (id) {
//         await AdminApi.updateProduct(authFetch, id, {
//           name: model.name,
//           category: model.category ?? 1,
//           description: model.description ?? "",
//           imageUrl: model.imageUrl ?? "",
//           isNew: !!model.isNew,
//           ...(typeof model.isPublished === "boolean" ? { isPublished: model.isPublished } : {}),
//         });
//         alert("Saved");
//       }
//     } catch (e: any) {
//       setError(e?.message ?? "Save failed");
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function onPickImage(file: File) {
//     try {
//       const { url } = await AdminApi.uploadFile(authFetch, file);
//       setModel((m) => ({ ...m, imageUrl: url }));
//     } catch (e: any) {
//       setError(e?.message ?? "Image upload failed");
//     }
//   }

//   if (loading) return <div className="mt-6 text-gray-600">Loading…</div>;

//   return (
//     <div className="max-w-3xl">
//       <form onSubmit={onSubmit} className="space-y-4">
//         <div className="flex items-center justify-between">
//           <h1 className="text-xl font-semibold">
//             {isCreate ? "New product" : "Edit product"}
//           </h1>

//           <div className="flex items-center gap-3">
//             {/* Optional: only show if you use it in backend */}
//             <label className="text-sm inline-flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={!!model.isPublished}
//                 onChange={(e) => update("isPublished", e.target.checked as any)}
//               />
//               Published
//             </label>

//             <button
//               type="submit"
//               disabled={saving}
//               className="px-3 py-2 rounded bg-emerald-600 text-white text-sm hover:bg-emerald-700 disabled:opacity-60"
//             >
//               {saving ? "Saving…" : "Save"}
//             </button>
//           </div>
//         </div>

//         {error && <div className="text-sm text-rose-600">{error}</div>}

//         {/* Image picker */}
//         <ImagePicker url={model.imageUrl ?? ""} onPick={onPickImage} />

//         <div className="grid sm:grid-cols-2 gap-4">
//           <Field label="Name">
//             <input
//               className="w-full border rounded px-3 py-2"
//               value={model.name ?? ""}
//               onChange={(e) => update("name", e.target.value)}
//               required
//             />
//           </Field>

//           <Field label="Category (number)">
//             <input
//               type="number"
//               className="w-full border rounded px-3 py-2"
//               value={model.category ?? 1}
//               onChange={(e) => update("category", Number(e.target.value))}
//             />
//           </Field>

//           <Field label="Image URL">
//             <input
//               className="w-full border rounded px-3 py-2"
//               value={model.imageUrl ?? ""}
//               onChange={(e) => update("imageUrl", e.target.value)}
//             />
//           </Field>

//           <Field label="Flags">
//             <label className="text-sm inline-flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={!!model.isNew}
//                 onChange={(e) => update("isNew", e.target.checked as any)}
//               />
//               New item
//             </label>
//           </Field>

//           <Field label="Description">
//             <textarea
//               rows={4}
//               className="w-full border rounded px-3 py-2"
//               value={model.description ?? ""}
//               onChange={(e) => update("description", e.target.value)}
//             />
//           </Field>
//         </div>
//       </form>
//     </div>
//   );
// }

// function Field({ label, children }: { label: string; children: React.ReactNode }) {
//   return (
//     <label className="block text-sm">
//       <div className="mb-1 text-gray-600">{label}</div>
//       {children}
//     </label>
//   );
// }

// function ImagePicker({
//   url,
//   onPick,
// }: {
//   url?: string;
//   onPick: (f: File) => void;
// }) {
//   return (
//     <div className="grid sm:grid-cols-[12rem,1fr] gap-4 items-start">
//       <div className="border rounded-xl bg-white p-2 w-48 h-48 grid place-items-center overflow-hidden">
//         {url ? (
//           <img src={url} className="object-cover w-full h-full" />
//         ) : (
//           <div className="text-xs text-gray-500">No image</div>
//         )}
//       </div>
//       <div className="flex items-center gap-3">
//         <label className="px-3 py-2 rounded border bg-white cursor-pointer hover:bg-gray-50 text-sm">
//           Choose image
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => e.target.files?.[0] && onPick(e.target.files[0])}
//           />
//         </label>
//         {url && (
//           <a href={url} target="_blank" rel="noreferrer" className="text-sm text-emerald-700">
//             Open
//           </a>
//         )}
//       </div>
//     </div>
//   );
// }
