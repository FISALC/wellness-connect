// src/pages/NotFound.tsx
import { Link } from "react-router-dom";
export default function NotFound(){
  return (
    <div className="py-12 text-center">
      <h1 className="text-3xl font-bold mb-2">404</h1>
      <p className="text-gray-600 mb-4">Page not found.</p>
      <Link to="/" className="btn-primary inline-block">Go Home</Link>
    </div>
  );
}
