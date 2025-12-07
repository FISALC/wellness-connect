// src/features/wellness/admin/types/wellness-hub.ts

export type ArticleCategory = "Nutrition" | "Workouts" | "Mental Health" | "Lifestyle";

export type Article = {
    id: string;
    title: string;
    excerpt: string;
    content: string; // HTML or Markdown
    imageUrl: string;
    category: ArticleCategory;
    author: string;
    readTime: string; // e.g. "5 min read"
    createdAt: string; // ISO date
    tags: string[];
};

export type CreateArticleDto = Omit<Article, "id" | "createdAt">;
