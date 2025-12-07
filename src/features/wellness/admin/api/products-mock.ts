import { CreateProductDto, ProductCategory } from "../types/product";

const KEY = "wc_products_v1";

export type ProductEntity = CreateProductDto & {
    id: string;
    createdAt: string;
    isNew: boolean;
};

const DUMMY_PRODUCTS: ProductEntity[] = [
    {
        id: "1",
        name: "Sporter Signature Series - Whey Smart Blend - Chocolate - 4 lbs",
        category: ProductCategory.Protein,
        isNew: true,
        imageUrl: "https://www.sporter.com/media/catalog/product/cache/ab46d3f8f49d440eb256434d4997862d/o/n/on-gs-whey-5lb-double-rich-chocolate_2.jpg",
        createdAt: new Date().toISOString(),
        price: 49.99,
        rating: 4.5,
        discountPct: 17,
        tag: "Bestseller",
        description: "High quality whey protein blend for muscle recovery and growth.",
    },
    {
        id: "2",
        name: "Premium Whey Isolate",
        category: ProductCategory.Protein,
        isNew: false,
        imageUrl: "https://www.sporter.com/media/catalog/product/cache/ab46d3f8f49d440eb256434d4997862d/o/n/on-gs-whey-5lb-double-rich-chocolate_2.jpg",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        price: 59.99,
        rating: 4.8,
        tag: "Product",
        description: "Pure whey isolate with zero sugar and fat.",
    },
    {
        id: "3",
        name: "Active Wear Hoodie",
        category: ProductCategory.Apparel,
        isNew: true,
        imageUrl: "https://www.sporter.com/media/catalog/product/cache/ab46d3f8f49d440eb256434d4997862d/o/n/on-gs-whey-5lb-double-rich-chocolate_2.jpg",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        price: 34.99,
        rating: 4.2,
        tag: "Apparel",
        description: "Comfortable and stylish hoodie for your workouts.",
    },
    {
        id: "4",
        name: "BCAA Citrus Blast",
        category: ProductCategory.Vitamins,
        isNew: false,
        imageUrl: "https://www.sporter.com/media/catalog/product/cache/ab46d3f8f49d440eb256434d4997862d/o/n/on-gs-whey-5lb-double-rich-chocolate_2.jpg",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        price: 24.99,
        rating: 4.6,
        discountPct: 10,
        tag: "Product",
        description: "Essential amino acids to fuel your training.",
    },
    {
        id: "5",
        name: "Keto Diet Guide",
        category: ProductCategory.HealthyEats,
        isNew: false,
        imageUrl: "https://www.sporter.com/media/catalog/product/cache/ab46d3f8f49d440eb256434d4997862d/o/n/on-gs-whey-5lb-double-rich-chocolate_2.jpg",
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        price: 14.99,
        rating: 4.0,
        tag: "Digital",
        description: "Comprehensive guide to the ketogenic diet.",
    },
    {
        id: "6",
        name: "Glutamine+",
        category: ProductCategory.Vitamins,
        isNew: false,
        imageUrl: "https://www.sporter.com/media/catalog/product/cache/ab46d3f8f49d440eb256434d4997862d/o/n/on-gs-whey-5lb-double-rich-chocolate_2.jpg",
        createdAt: new Date(Date.now() - 432000000).toISOString(),
        price: 19.99,
        rating: 4.7,
        tag: "Product",
        description: "Supports immune system and gut health.",
    },
];

function load(): ProductEntity[] {
    try {
        const s = localStorage.getItem(KEY);
        if (!s) {
            save(DUMMY_PRODUCTS);
            return DUMMY_PRODUCTS;
        }
        return JSON.parse(s);
    } catch {
        return [];
    }
}

function save(list: ProductEntity[]) {
    localStorage.setItem(KEY, JSON.stringify(list));
}

export const ProductsMock = {
    getAll: async () => {
        // simulate delay
        await new Promise(r => setTimeout(r, 400));
        return load();
    },
    getById: async (id: string) => {
        await new Promise(r => setTimeout(r, 200));
        return load().find(p => p.id === id);
    },
    create: async (dto: CreateProductDto) => {
        await new Promise(r => setTimeout(r, 400));
        const list = load();
        const newId = Math.random().toString(36).slice(2);
        const p: ProductEntity = {
            ...dto,
            id: newId,
            createdAt: new Date().toISOString(),
            isNew: true,
        };
        list.unshift(p);
        save(list);
        return { id: newId };
    },
    update: async (id: string, dto: CreateProductDto) => {
        await new Promise(r => setTimeout(r, 400));
        const list = load();
        const idx = list.findIndex(p => p.id === id);
        if (idx === -1) throw new Error("Not found");

        list[idx] = { ...list[idx], ...dto };
        save(list);
        return {};
    },
    delete: async (id: string) => {
        await new Promise(r => setTimeout(r, 400));
        const list = load().filter(p => p.id !== id);
        save(list);
        return {};
    }
};
