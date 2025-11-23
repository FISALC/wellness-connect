import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import RequireAdmin from "@/app/guards/RequireAdmin";
import AdminLayout from "@/layouts/AdminLayout";

const DashboardPage     = lazy(() => import("@/features/wellness/admin/pages/DashboardPage"));
const ProductsPage      = lazy(() => import("@/features/wellness/admin/pages/ProductsPage"));
const ProductCreatePage = lazy(() => import("@/features/wellness/admin/pages/ProductCreatePage"));
// const ProductEditPage   = lazy(() => import("@/features/wellness/admin/pages/ProductEditPage"));
const ProfilePage  = lazy(() => import("@/features/wellness/admin/pages/ProfilePage"));
const SettingsPage = lazy(() => import("@/features/wellness/admin/pages/SettingsPage"));
// const CategoriesPage    = lazy(() => import("@/features/wellness/admin/pages/CategoriesPage"));
// Optional extras later: GuidesPage, SettingsPage, etc.

function Loader() {
  return <div className="p-6 text-sm text-gray-500">Loading…</div>;
}

export const adminRoutes: RouteObject = {
  path: "/admin",
  element: (
    <RequireAdmin>
      <AdminLayout />
    </RequireAdmin>
  ),
  children: [
    { index: true, element: <Suspense fallback={<Loader />}><DashboardPage /></Suspense> },
    { path: "products", element: <Suspense fallback={<Loader />}><ProductsPage /></Suspense> },
    { path: "products/new", element: <Suspense fallback={<Loader />}><ProductCreatePage /></Suspense> },
    // { path: "products/:id/edit", element: <Suspense fallback={<Loader />}><ProductEditPage /></Suspense> },
    // { path: "categories", element: <Suspense fallback={<Loader />}><CategoriesPage /></Suspense> },
    { path: "profile",  element: <Suspense fallback={<Loader />}><ProfilePage /></Suspense> },
    { path: "settings", element: <Suspense fallback={<Loader />}><SettingsPage /></Suspense> },
  ],
};




