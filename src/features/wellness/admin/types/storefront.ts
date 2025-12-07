// src/features/wellness/admin/types/storefront.ts

export type HeroConfig = {
    title: string;
    subtitle: string;
    imageUrl: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
};

export type FeatureItem = {
    icon: string; // emoji or icon name
    title: string;
    description: string;
};

export type FeaturesConfig = {
    enabled: boolean;
    items: FeatureItem[];
};

export type SectionConfig = {
    id: string;
    type: "products" | "combos" | "brands" | "custom";
    title?: string;
    enabled: boolean;
    order: number;
};

export type StorefrontConfig = {
    hero: HeroConfig;
    features: FeaturesConfig;
    sections: SectionConfig[];
};

export const DEFAULT_STOREFRONT: StorefrontConfig = {
    hero: {
        title: "Elevate Your Wellness Journey",
        subtitle: "Discover premium supplements, sustainable activewear, and healthy eats designed to fuel your best self.",
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920&auto=format&fit=crop",
        ctaText: "Shop Now",
        ctaLink: "/categories",
        secondaryCtaText: "Learn More",
        secondaryCtaLink: "/wellness-hub",
    },
    features: {
        enabled: true,
        items: [
            { icon: "🌿", title: "100% Organic", description: "Sourced from the finest natural ingredients for pure wellness." },
            { icon: "⚡", title: "Fast Delivery", description: "Get your wellness essentials delivered to your doorstep in 24h." },
            { icon: "🛡️", title: "Quality Guarantee", description: "Lab-tested products ensuring safety and efficacy every time." },
        ],
    },
    sections: [
        { id: "products", type: "products", title: "Explore Our Collection", enabled: true, order: 1 },
        { id: "combos", type: "combos", title: "Featured Bundles", enabled: true, order: 2 },
        { id: "brands", type: "brands", title: "Trusted Brands", enabled: true, order: 3 },
    ],
};
