// src/components/Card.tsx
import { Link } from "react-router-dom";
import { Item } from "../../../../data";
import { useCart } from "../../../../store/cart";

const FALLBACK_IMG =
  "data:image/jpeg;base64,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";

type Props = {
  item: Item;
  onQuickView?: (item: Item) => void;
};

export default function Card({ item, onQuickView }: Props) {
  const { add } = useCart();
  const src = item.image || FALLBACK_IMG;

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      {/* IMAGE + BADGES */}
      <div className="relative">
        <img
          src={src}
          alt={item.name}
          className="h-56 w-full object-contain bg-white p-4 transition-transform duration-300 group-hover:scale-[1.02]"
          onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
          loading="lazy"
        />

        {/* discount badge (top-left) */}
        {typeof item.discountPct === "number" && item.discountPct > 0 && (
          <div className="absolute top-3 left-3">
            <div className="text-[10px] leading-tight font-semibold text-white bg-rose-600 px-2 py-1 rounded">
              UP TO
              <div className="text-xs">{item.discountPct}% OFF</div>
            </div>
          </div>
        )}

        {/* type/tag pills (top-right) */}
        <div className="absolute top-3 right-3 flex gap-2">
          <span className="text-[10px] px-2 py-1 rounded-full bg-white/95 border text-gray-700 backdrop-blur">
            {item.type.toUpperCase()}
          </span>
          {item.tag && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
              {item.tag}
            </span>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="px-3 pb-3">
        {/* title */}
        <h4 className="mt-1 text-center font-medium text-gray-900 leading-snug line-clamp-2 min-h-[3rem]">
          {item.name}
        </h4>

        {/* rating row */}
        <div className="mt-2 flex items-center justify-center gap-1">
          <Stars value={item.rating ?? 4.5} />
        </div>

        {/* actions */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => add({ id: item.id, name: item.name, image: src, type: item.type })}
            className="text-xs rounded-lg bg-emerald-600 text-white px-3 py-2 hover:bg-emerald-700"
          >
            ADD TO CART
          </button>
          <button
            onClick={() => onQuickView?.(item)}
            className="text-xs rounded-lg bg-gray-100 text-gray-800 px-3 py-2 hover:bg-gray-200"
          >
            QUICK VIEW
          </button>
        </div>

        {/* optional deep link (hidden on small cards; keep for SEO/navigation) */}
        <Link
          to={`/item/${item.id}`}
          className="mt-2 block text-center text-[11px] text-gray-500 hover:text-emerald-700"
        >
          View details →
        </Link>
      </div>
    </div>
  );
}

/* --- Stars component --- */
function Stars({ value = 0 }: { value?: number }) {
  // clamp 0..5 and show halves
  const v = Math.max(0, Math.min(5, value));
  const full = Math.floor(v);
  const half = v - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} type="full" />
      ))}
      {half && <Star type="half" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} type="empty" />
      ))}
    </div>
  );
}

function Star({ type }: { type: "full" | "half" | "empty" }) {
  if (type === "full")
    return <span className="text-amber-400">★</span>;
  if (type === "half")
    return (
      <span className="relative inline-block w-4 h-4">
        <span className="absolute inset-0 text-amber-400 overflow-hidden" style={{ width: "50%" }}>★</span>
        <span className="absolute inset-0 text-gray-300">★</span>
      </span>
    );
  return <span className="text-gray-300">★</span>;
}
