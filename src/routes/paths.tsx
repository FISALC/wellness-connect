// src/routes/paths.ts
export const PATHS = {
  HOME: "/",
  CATEGORIES: "/categories",
  WELLNESS: "/wellness-hub",
  CONTACT: "/contact",
  CHECKOUT: "/checkout",

  // Admin
  // Admin
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_PRODUCTS_NEW: "/admin/products/new",
  // add more as you grow
  ADMIN_BLOG: "/admin/blog",
  ADMIN_GUIDES: "/admin/guides",
  ADMIN_VIDEOS: "/admin/videos",
  ADMIN_BANNERS: "/admin/banners",
  ADMIN_LEADS: "/admin/leads",
  ADMIN_PRODUCT_EDIT: (id: string) => `/admin/products/${id}/edit`,
} as const;
