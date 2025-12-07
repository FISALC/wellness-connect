import { NavLink } from "react-router-dom";

type Props = { open: boolean; onClose: () => void };

const links = [
  { to: "/admin", label: "Dashboard", icon: "📊" },
  { to: "/admin/products", label: "Products", icon: "🧴" },
  { to: "/admin/users", label: "Users", icon: "👥" },
  { to: "/admin/categories", label: "Categories", icon: "🗂️" },
];

export default function AdminSideNav({ open, onClose }: Props) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed z-40 top-14 bottom-0 w-72 bg-white border-r transform transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}
      >
        <nav className="h-full overflow-y-auto p-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm
                 ${isActive ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`
              }
              onClick={onClose}
            >
              <span>{l.icon}</span>
              <span>{l.label}</span>
            </NavLink>
          ))}
          <NavLink
            to="/admin/storefront"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-emerald-50 text-emerald-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
            onClick={onClose}
          >
            <span className="text-lg">🎨</span>
            Storefront
          </NavLink>
          <NavLink
            to="/admin/wellness-hub"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-emerald-50 text-emerald-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
            onClick={onClose}
          >
            <span className="text-lg">📰</span>
            Wellness Hub
          </NavLink>
          <NavLink
            to="/admin/support"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-emerald-50 text-emerald-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
            onClick={onClose}
          >
            <span className="text-lg">💬</span>
            Support
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
