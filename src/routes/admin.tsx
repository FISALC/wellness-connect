import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import RequireAdmin from "@/app/guards/RequireAdmin";
import AdminLayout from "@/layouts/AdminLayout";

const DashboardPage = lazy(() => import("@/features/wellness/admin/pages/DashboardPage"));
const ProductsPage = lazy(() => import("@/features/wellness/admin/pages/ProductsPage"));
const ProductCreatePage = lazy(() => import("@/features/wellness/admin/pages/ProductCreatePage"));
const ProductEditPage = lazy(() => import("@/features/wellness/admin/pages/ProductEditPage"));
const AdminUsersPage = lazy(() => import("@/features/wellness/admin/pages/AdminUsersPage"));
const AdminUserCreatePage = lazy(() => import("@/features/wellness/admin/pages/AdminUserCreatePage"));
const AdminUserEditPage = lazy(() => import("@/features/wellness/admin/pages/AdminUserEditPage"));

const ProfilePage = lazy(() => import("@/features/wellness/admin/pages/ProfilePage"));
const SettingsPage = lazy(() => import("@/features/wellness/admin/pages/SettingsPage"));
const StorefrontPage = lazy(() => import("@/features/wellness/admin/pages/StorefrontPage"));
const WellnessHubAdminPage = lazy(() => import("@/features/wellness/admin/pages/WellnessHubAdminPage"));
const AdminSupportPage = lazy(() => import("@/features/wellness/admin/pages/AdminSupportPage"));
const CategoriesPage = lazy(() => import("@/features/wellness/admin/pages/CategoriesPage"));
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
    { path: "products/:id/edit", element: <Suspense fallback={<Loader />}><ProductEditPage /></Suspense> },
    // { path: "categories", element: <Suspense fallback={<Loader />}><CategoriesPage /></Suspense> },
    { path: "users", element: <Suspense fallback={<Loader />}><AdminUsersPage /></Suspense> },
    { path: "users/new", element: <Suspense fallback={<Loader />}><AdminUserCreatePage /></Suspense> },
    { path: "users/:id/edit", element: <Suspense fallback={<Loader />}><AdminUserEditPage /></Suspense> },
    { path: "profile", element: <Suspense fallback={<Loader />}><ProfilePage /></Suspense> },
    { path: "settings", element: <Suspense fallback={<Loader />}><SettingsPage /></Suspense> },
    { path: "storefront", element: <Suspense fallback={<Loader />}><StorefrontPage /></Suspense> },
    { path: "wellness-hub", element: <Suspense fallback={<Loader />}><WellnessHubAdminPage /></Suspense> },
    { path: "wellness-hub", element: <Suspense fallback={<Loader />}><WellnessHubAdminPage /></Suspense> },
    { path: "categories", element: <Suspense fallback={<Loader />}><CategoriesPage /></Suspense> },
    { path: "support", element: <Suspense fallback={<Loader />}><AdminSupportPage /></Suspense> },
  ],
};




