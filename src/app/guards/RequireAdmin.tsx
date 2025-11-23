import { Navigate, useLocation } from "react-router-dom";

type Props = { children: JSX.Element };

export default function RequireAdmin({ children }: Props) {
  // TODO: connect to your auth store
  const isLoggedIn = true;        // replace with real check
  const hasAdminRole = true;      // replace with role check
  const loc = useLocation();

  if (!isLoggedIn || !hasAdminRole) {
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }
  return children;
}
