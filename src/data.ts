export const TABS = ["Proteing Products", "BCAAs/Amino Acids", "Vitaminst Workout"] as const;
export type Tab = typeof TABS[number];

// in src/data.ts
export type Item = {
  id: string;
  name: string;
  tag?: string;
  type: "product" | "apparel" | "food";
  image?: string;        // used by the card
  rating?: number;       // 0..5
  discountPct?: number;  // e.g., 17 (for "UP TO 17% OFF")
  isNew?: boolean;
  createdAt?: number;
   category?: number; 
};


export const ITEMS: Record<Tab, Item[]> = {
  "Proteing Products": [
   {
  id: "p99",
  name: "Sporter Signature Series - Whey Smart Blend - Chocolate - 4 lbs",
  type: "product",
  image: "https://your-cdn/whey.jpg",
  rating: 4,
  discountPct: 17,
  tag: "BESTSELLER"
},
    { id: "p2", name: "Premium Whey Isolate", type: "product" },
    { id: "a1", name: "Active Wear", type: "apparel" },
    { id: "f1", name: "3. Healthy Eats", type: "food" },
  ],
  "BCAAs/Amino Acids": [
    { id: "b1", name: "BCAA Citrus", type: "product" },
    { id: "b2", name: "Glutamine+", type: "product" },
    { id: "a2", name: "Zip Hoodie", type: "apparel" },
    { id: "f2", name: "Meal Prep Bowl", type: "food" },
  ],
  "Vitaminst Workout": [
    { id: "v1", name: "Multivitamin Daily", type: "product" },
    { id: "v2", name: "Omega-3", type: "product" },
    { id: "a3", name: "Tank Top", type: "apparel" },
    { id: "f3", name: "Salad Bowl", type: "food" },
  ],
};

export const WELLNESS_HUB: Item[] = [
  { id: "w1", name: "Protein Powder", type: "product" },
  { id: "w2", name: "Vegan Blend", type: "product" },
  { id: "w3", name: "Vegan Blend (Mint)", type: "product" },
  { id: "w4", name: "Active Wear", type: "apparel" },
];