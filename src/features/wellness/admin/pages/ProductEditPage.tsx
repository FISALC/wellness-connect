import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductFormPage, { ProductFormValues } from "./ProductFormPage";
import { getProduct, updateProduct } from "../api/products.api";

export default function ProductEditPage() {
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [initialValues, setInitialValues] = useState<Partial<ProductFormValues>>({});

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getProduct(id)
            .then((res) => {
                if (res.data) {
                    setInitialValues(res.data);
                } else {
                    setError("Product not found");
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    async function handleUpdate(values: ProductFormValues) {
        if (!id) return;
        setSubmitting(true);
        setError(null);
        try {
            await updateProduct(id, values);
            nav("/admin/products", { replace: true });
        } catch (e) {
            setError((e as Error).message || "Failed to update product");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <div className="p-6">Loading product...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <section className="space-y-6">
            <header className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Edit Product</h1>
            </header>

            <div className="rounded-lg border bg-white p-4">
                <ProductFormPage
                    initial={initialValues}
                    submitting={submitting}
                    onSubmit={handleUpdate}
                />
            </div>
        </section>
    );
}
