// src/components/Header.tsx
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { CartIcon, MenuIcon, SearchIcon } from "./Icons";
import { useCart } from "../../../../store/cart";

type Props = { onOpenFilters?: () => void };

export default function Header({ onOpenFilters }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between h-14">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-600 grid place-items-center text-white font-bold">W</div>
              <div className="leading-tight">
                <div className="font-bold text-sm">WELLNESS</div>
                <div className="text-[10px] text-gray-500">CONNECT</div>
              </div>
            </Link>

            {/* Nav Desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <NavLink to="/" end className={({ isActive }) => isActive ? "font-semibold text-emerald-700" : "hover:text-emerald-700"}>HOME</NavLink>
              <NavLink to="/categories" className={({ isActive }) => isActive ? "font-semibold text-emerald-700" : "hover:text-emerald-700"}>CATEGORIES</NavLink>
              <NavLink to="/wellness-hub" className={({ isActive }) => isActive ? "font-semibold text-emerald-700" : "hover:text-emerald-700"}>WELLNESS HUB</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "font-semibold text-emerald-700" : "hover:text-emerald-700"}>CONTACT</NavLink>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-xl border md:hidden"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon />
              </button>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white">
                <SearchIcon />
                <input className="outline-none text-sm w-40" placeholder="Search" aria-label="Search" />
              </div>

              {/* Use the CartButton (links to /checkout + badge) */}
              <CartButton />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white p-4 md:hidden flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <span className="font-bold text-lg">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
          <nav className="flex flex-col gap-4 text-lg">
            <NavLink
              to="/"
              end
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => isActive ? "font-semibold text-emerald-700" : "text-gray-600"}
            >
              Home
            </NavLink>
            <NavLink
              to="/categories"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => isActive ? "font-semibold text-emerald-700" : "text-gray-600"}
            >
              Categories
            </NavLink>
            <NavLink
              to="/wellness-hub"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => isActive ? "font-semibold text-emerald-700" : "text-gray-600"}
            >
              Wellness Hub
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => isActive ? "font-semibold text-emerald-700" : "text-gray-600"}
            >
              Contact
            </NavLink>
          </nav>
        </div>
      )}
    </>
  );
}

/* ---- Cart button component ---- */
function CartButton() {
  const { count } = useCart();
  return (
    <Link to="/checkout" className="relative p-2 rounded-xl border hover:bg-gray-50" aria-label="Cart">
      <CartIcon />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-emerald-600 text-white text-xs grid place-items-center">
          {count}
        </span>
      )}
    </Link>
  );
}
