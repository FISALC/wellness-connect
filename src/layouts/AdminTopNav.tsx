import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

type Props = { onToggleSidebar: () => void };

export default function AdminTopNav({ onToggleSidebar }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click / Esc
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="h-14 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSidebar}
            className="inline-flex items-center justify-center rounded-md p-2 border hover:bg-gray-50 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor">
              <path d="M3 6h14M3 10h14M3 14h14" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="font-semibold">
            WellnessConnect <span className="text-gray-400">/ Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* + New -> create product */}
          <Link
            to="/admin/products/new"
            className="hidden sm:inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            + New
          </Link>

          {/* Profile menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full border px-2 py-1 hover:bg-gray-50"
              aria-haspopup="menu"
              aria-expanded={open}
            >
              <img
                src="https://ui-avatars.com/api/?name=AD&background=EEE&color=555"
                alt="profile"
                className="h-7 w-7 rounded-full"
              />
              <span className="hidden sm:inline text-sm">admin@you.com</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 20 20" className="text-gray-500">
                <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {open && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg overflow-hidden"
              >
                <Link
                  to="/admin/profile"
                  role="menuitem"
                  className="block px-3 py-2 text-sm hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/admin/settings"
                  role="menuitem"
                  className="block px-3 py-2 text-sm hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  Settings
                </Link>
                <button
                  role="menuitem"
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  onClick={() => {
                    setOpen(false);
                    // TODO: clear token/cookies here
                    // e.g., localStorage.removeItem("access_token");
                    navigate("/login", { replace: true });
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
