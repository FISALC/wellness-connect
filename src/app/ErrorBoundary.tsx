import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorBoundary() {
  const err = useRouteError();
  const message = isRouteErrorResponse(err)
    ? `${err.status} ${err.statusText}`
    : (err as Error)?.message ?? "Something went wrong";

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-lg w-full rounded-lg border bg-white p-6">
        <h1 className="text-xl font-semibold mb-2">Oops!</h1>
        <p className="text-gray-600 mb-4">{message}</p>
        <Link to="/" className="text-sm text-blue-600 underline">
          Go back home
        </Link>
      </div>
    </div>
  );
}
