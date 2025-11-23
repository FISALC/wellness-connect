import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";

const HomePage = lazy(() => import("@/features/wellness/public/Home"));

function Loader() {
  return <div className="p-6 text-sm text-gray-500">Loading…</div>;
}

export const publicRoutes: RouteObject = {
  path: "/",
  element: <AppLayout />,           // <-- wraps Header/Footer + CartProvider
  children: [
    { index: true, element: <Suspense fallback={<Loader />}><HomePage /></Suspense> },
    // add other public pages here...
  ],
};
