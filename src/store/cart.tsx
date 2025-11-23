import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  image?: string;
  type: string;     // product/apparel/food
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartCtx | null>(null);
const KEY = "wc_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);

  const api: CartCtx = useMemo(() => ({
    items,
    count: items.reduce((n, x) => n + x.qty, 0),
    add: (i, qty = 1) => {
      setItems(prev => {
        const found = prev.find(p => p.id === i.id);
        if (found) return prev.map(p => p.id === i.id ? { ...p, qty: p.qty + qty } : p);
        return [...prev, { ...i, qty }];
      });
    },
    remove: (id) => setItems(prev => prev.filter(p => p.id !== id)),
    clear: () => setItems([]),
  }), [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
