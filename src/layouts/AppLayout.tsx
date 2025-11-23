import { Outlet } from "react-router-dom";
import Header from "../features/wellness/public/components/Header";
import Footer from "../features/wellness/public/components/Footer";
// ⬇️ your existing cart context file
import { CartProvider } from "@/store/cart"; // or "../store/cart" if you don't use the @ alias

export default function AppLayout() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <Header /> {/* uses useCart() -> now safely inside provider */}
        <div className="mx-auto w-full max-w-6xl px-4 py-6 flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </CartProvider>
  );
}
