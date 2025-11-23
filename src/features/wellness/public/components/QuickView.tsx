import { Item } from "../../../../data";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop";

export default function QuickView({ item }: { item: Item }) {
  const src = (item as any).image || FALLBACK_IMG;
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <img src={src} alt={item.name} className="w-full h-56 object-cover rounded-xl" />
      <div>
        <div className="text-xs inline-block px-2 py-1 rounded-full border bg-gray-50 text-gray-600">
          {item.type.toUpperCase()}
        </div>
        <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
        <p className="text-sm text-gray-600 mt-2">
          Clean ingredients and curated picks. Contact us for guidance on flavor, serving size,
          and stack recommendations. No online pricing—our team will reach out.
        </p>

        <ul className="mt-3 text-sm space-y-1 text-gray-700 list-disc pl-5">
          <li>Goal-based suggestions (fat loss, muscle gain, recovery)</li>
          <li>Brand & flavor availability</li>
          <li>Delivery / pickup options</li>
        </ul>
      </div>
    </div>
  );
}
