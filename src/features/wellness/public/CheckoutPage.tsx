import { useState } from "react";
import { useCart } from "../../../store/cart";
import { api } from "@/lib/api"; // <-- use your shared api client

export default function CheckoutPage() {
  const { items, remove, clear } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const canSubmit = items.length > 0 && form.name && form.email && !isSubmitting;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);

    // Match CartLeadCreateDto on the backend
    const payload = {
      customerName: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      items: items.map((it) => ({
        productId: it.id,   // Guid on backend
        quantity: it.qty,
      })),
    };

    try {
      await api.post("/api/v1/public/wellness/leads/cart", payload);

      alert("Thanks! We received your request. We’ll contact you soon.");
      clear();
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.error ??
        "Something went wrong. Please try again.";
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 grid lg:grid-cols-12 gap-6">
      {/* Cart items */}
      <section className="lg:col-span-7">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        {items.length === 0 ? (
          <p className="mt-3 text-gray-600">Your cart is empty.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {items.map((it) => (
              <li
                key={it.id}
                className="flex items-center gap-3 rounded-xl border bg-white p-3"
              >
                <img
                  src={it.image}
                  alt={it.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold">{it.name}</div>
                  <div className="text-xs text-gray-500">
                    {it.type.toUpperCase()}
                  </div>
                </div>
                <div className="text-sm text-gray-600">Qty: {it.qty}</div>
                <button
                  className="text-xs rounded-lg bg-gray-100 text-gray-800 px-3 py-1 hover:bg-gray-200"
                  onClick={() => remove(it.id)}
                  type="button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Contact form */}
      <section className="lg:col-span-5">
        <h2 className="text-lg font-semibold">Send your contact details</h2>
        <p className="text-sm text-gray-600">
          We’ll call or email you back to finalize options and pricing.
        </p>

        <form onSubmit={submit} className="mt-4 space-y-3 rounded-xl border bg-white p-4">
          <input
            className="input w-full"
            placeholder="Full name*"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="input w-full"
            placeholder="Email*"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="input w-full"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <textarea
            className="input w-full min-h-24"
            placeholder="Message (e.g., preferred brand, flavors, goals)"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button
            className="btn-primary w-full disabled:opacity-60"
            disabled={!canSubmit}
            type="submit"
          >
            {isSubmitting ? "Sending..." : "Send request"}
          </button>
          <p className="text-[11px] text-gray-500">
            By submitting, you agree to be contacted about your cart items. No payment is taken online.
          </p>
        </form>
      </section>
    </div>
  );
}
