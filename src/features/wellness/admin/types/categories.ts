// src/features/wellness/admin/types/categories.ts

export type Category = {
    id: string;
    name: string;
    slug: string;
    description: string;
    count: number;
    createdAt: string;
};

export type CreateCategoryDto = Omit<Category, "id" | "createdAt" | "count">;
