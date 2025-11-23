// src/routes/paths.ts
export const PATHS = {
  HOME: "/",
  CATEGORIES: "/categories",
  WELLNESS: "/wellness-hub",
  CONTACT: "/contact",
  CHECKOUT: "/checkout",

  // Admin
   ADMIN_PRODUCTS: "/admin/wellness/products",
  ADMIN_PRODUCTS_NEW: "/admin/wellness/products/new",
  // add more as you grow
  ADMIN_BLOG: "/admin/blog",
  ADMIN_GUIDES: "/admin/guides",
  ADMIN_VIDEOS: "/admin/videos",
  ADMIN_BANNERS: "/admin/banners",
  ADMIN_LEADS: "/admin/leads",
  ADMIN_PRODUCT_EDIT: (id: string) => `/admin/products/${id}`,
} as const;
