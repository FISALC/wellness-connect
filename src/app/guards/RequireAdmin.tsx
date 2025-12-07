import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthContext";

type Props = { children: JSX.Element };

export default function RequireAdmin({ children }: Props) {
  const { token, user } = useAuth();
  const loc = useLocation();

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }

  // Optional: Check specific roles if needed
  // if (user.role !== 'Admin') return <Forbidden />

  return children;
}
