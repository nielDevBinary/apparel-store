import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useShoppingCart } from "../context/ShoppingCartContext";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type NavLinkItem = {
  name: string;
  path: string;
};

export function Navbar() {
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isPending, startTransition] = useTransition();
  const location = useLocation();
  const navigate = useNavigate();

  const { setIsOpen, cartQuantity } = useShoppingCart();

  const navLinks: NavLinkItem[] = [
    { name: "Men", path: "/category/men" },
    { name: "Women", path: "/category/women" },
    { name: "New Arrivals", path: "/" },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // React 19 Transition Navigation
  const handleNavigate = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4",
        isScrolled
          ? "bg-white/90 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 -ml-2"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <button
          onClick={() => handleNavigate("/")}
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
          <h1 className="text-2xl md:text-3xl tracking-[0.2em] font-serif uppercase">
            Lumière
          </h1>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <button
                key={link.name}
                onClick={() => handleNavigate(link.path)}
                className={cn(
                  "text-xs uppercase tracking-widest font-medium transition-colors",
                  isActive
                    ? "text-black"
                    : "hover:text-brand-muted",
                  isPending && "opacity-50"
                )}
              >
                {link.name}
              </button>
            );
          })}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <button className="p-2 hover:text-brand-muted transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>

          <button onClick={() => setIsOpen(true)}  className="p-2 hover:text-brand-muted transition-colors relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 bg-brand-muted text-brand-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-sm">
            {cartQuantity}
          </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-8 flex flex-col space-y-6 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigate(link.path)}
                className=" text-center text-lg uppercase tracking-widest font-serif"
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}