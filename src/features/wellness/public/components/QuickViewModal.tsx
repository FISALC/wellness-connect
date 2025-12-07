import { Product } from "../../hooks/useProducts";
import { CloseIcon } from "./Icons";

type Props = {
    product: Product;
    onClose: () => void;
};

export default function QuickViewModal({ product, onClose }: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-gray-100 z-10"
                >
                    <CloseIcon />
                </button>

                <div className="grid md:grid-cols-2">
                    {/* Image */}
                    <div className="bg-gray-50 p-8 flex items-center justify-center">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="max-h-[400px] w-auto object-contain mix-blend-multiply"
                        />
                    </div>

                    {/* Details */}
                    <div className="p-8 flex flex-col">
                        <div className="mb-auto">
                            {product.isNew && (
                                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded mb-2">
                                    NEW ARRIVAL
                                </span>
                            )}
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>

                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex text-amber-400 text-sm">
                                    {"★".repeat(Math.floor(product.rating || 0))}
                                    {"☆".repeat(5 - Math.floor(product.rating || 0))}
                                </div>
                                <span className="text-sm text-gray-500">(12 reviews)</span>
                            </div>

                            <div className="text-2xl font-bold text-emerald-700 mb-6">
                                ${product.price?.toFixed(2)}
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {product.description || "Experience premium quality with our signature blend. Perfect for your daily wellness routine."}
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                    <div className="flex items-center w-32 border rounded-lg">
                                        <button className="px-3 py-2 hover:bg-gray-50">-</button>
                                        <input className="w-full text-center border-none focus:ring-0" defaultValue="1" />
                                        <button className="px-3 py-2 hover:bg-gray-50">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                                Add to Cart
                            </button>
                            <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50">
                                ♡
                            </button>
                        </div>

                        <div className="mt-6 pt-6 border-t text-xs text-gray-500 flex gap-4">
                            <span>SKU: {product.id}</span>
                            <span>Category: {product.category === 0 ? "Supplements" : "Apparel"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
