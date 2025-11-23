import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      {/* Global providers go here later (QueryClientProvider, I18n, etc.) */}
      <Outlet />
    </>
  );
}
