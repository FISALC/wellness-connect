import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import PublicLayout from "@/layouts/AppLayout";



const HomePage = lazy(() => import("@/features/wellness/public/Home")); 
const ContactPage = lazy(() => import("@/features/wellness/public/ContactPage"));
const CategoriesPage = lazy(() => import("@/features/wellness/public/CategoriesPage"));
const WellnessHubPage = lazy(() => import("@/features/wellness/public/WellnessHubPage"));
const CheckoutPage = lazy(() => import("@/features/wellness/public/CheckoutPage"));
// ^ Adjust this import to your actual public home component.

function Loader() {
  return <div className="p-6 text-sm text-gray-500">Loading…</div>;
}

export const publicRoutes: RouteObject = {
  path: "/",
  element: <PublicLayout />,
  children: [
    { index: true, element: <Suspense fallback={<Loader />}><HomePage /></Suspense> },
    { path: "contact", element: <Suspense fallback={<Loader />}><ContactPage /></Suspense> },
    { path: "categories", element: <Suspense fallback={<Loader />}><CategoriesPage /></Suspense> },
    { path: "wellness-hub", element: <Suspense fallback={<Loader />}><WellnessHubPage /></Suspense> },
    { path: "checkout", element: <Suspense fallback={<Loader />}><CheckoutPage /></Suspense> },
  ],
};
