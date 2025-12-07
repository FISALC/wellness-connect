import { CloseIcon } from './Icons'
import { useProducts } from '../../hooks/useProducts';
import { useMemo } from 'react';

export default function FilterPanel({ onClose }: { onClose?: () => void }) {
  const { data: products } = useProducts();

  const filters = useMemo(() => {
    if (!products) return [];
    const tags = new Set<string>();
    products.forEach(p => {
      if (p.tags) p.tags.forEach(t => tags.add(t));
    });
    return Array.from(tags);
  }, [products]);

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      <div className="bg-emerald-50 px-4 py-3 font-semibold text-gray-800 flex items-center justify-between">
        <span>Filters</span>
        {onClose && (
          <button className="p-1 rounded hover:bg-emerald-100" onClick={onClose} aria-label="Close filters"><CloseIcon /></button>
        )}
      </div>
      <div className="p-2 divide-y">
        {filters.length === 0 ? (
          <p className="p-4 text-sm text-gray-500 text-center">No filters available</p>
        ) : (
          filters.map((f) => (
            <label key={f} className="flex items-center gap-3 px-2 py-3 cursor-pointer hover:bg-emerald-50 rounded-xl">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
              <span className="text-sm text-gray-700">{f}</span>
            </label>
          ))
        )}
      </div>
    </div>
  )
}