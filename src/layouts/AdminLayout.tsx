import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminTopNav from "./AdminTopNav";
import AdminSideNav from "./AdminSideNav";
import AdminFooter from "./AdminFooter";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminTopNav onToggleSidebar={() => setSidebarOpen(v => !v)} />

      <div className="flex flex-1">
        <AdminSideNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </main>
      </div>

      <AdminFooter />
    </div>
  );
}
