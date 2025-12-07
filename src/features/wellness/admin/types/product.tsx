// src/features/wellness/admin/types/product.ts
import { z } from "zod";

/** Your existing enum */
export enum ProductCategory {
  Protein = 0,
  Vitamins = 1,
  Apparel = 2,
  HealthyEats = 3,
  Accessories = 4,
}

/** Your existing DTO for create */
export type CreateProductDto = {
  name: string;
  category: ProductCategory; // number enum
  description: string;
  imageUrl: string;
  isNew: boolean;
  tag?: string;
  rating?: number;
  discountPct?: number;
  price?: number;
};

/** Generic API result wrapper */
export type ApiResult<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

/** 👇 Category type used in dropdown in ProductForm */
export type Category = {
  id: ProductCategory; // matches your enum values
  name: string;        // "Protein & Whey", "Vitamins", etc.
};

/** 👇 Zod schema used by react-hook-form (ProductForm) */
export const ProductCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.nativeEnum(ProductCategory),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  isNew: z.boolean().default(false),
  tag: z.string().optional(),
  rating: z.number().min(0).max(5).default(0).optional(),
  discountPct: z.number().min(0).max(100).default(0).optional(),
  price: z.number().min(0).default(0).optional(),
});


/** 👇 Type that other files import (alias to your existing DTO) */
export type ProductCreateDto = CreateProductDto;
