import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@app/App";
import ErrorBoundary from "@app/ErrorBoundary";
import { adminRoutes } from "@/routes/admin";
import { publicRoutes } from "@/routes/public";

const NotFound = lazy(() => import("@/shared/ui/NotFound"));

function Loader() {
  return (
    <div className="min-h-[40vh] grid place-items-center text-sm text-gray-500">
      Loading…
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      // Public site (home, product info, etc.)
      publicRoutes,
      // Admin app (guarded within adminRoutes)
      adminRoutes,
      // 404
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
