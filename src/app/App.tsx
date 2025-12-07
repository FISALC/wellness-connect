import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/features/auth/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
