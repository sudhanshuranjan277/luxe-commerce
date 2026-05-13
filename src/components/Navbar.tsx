import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Search, ShoppingBag, Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore, cartTotals } from "@/store/useStore";
import categories from "@/data/categories.json";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "New In", search: { sort: "new" } },
  { to: "/shop", label: "Sale", search: { sale: true } },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const items = useStore((s) => s.items);
  const wishlist = useStore((s) => s.wishlist);
  const setCartOpen = useStore((s) => s.setOpen);
  const { count } = cartTotals(items);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      <motion.header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "glass shadow-soft border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10 h-16 lg:h-20 flex items-center justify-between gap-6">
          <button
            className="lg:hidden -ml-2 p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          <Link to="/" className="font-display text-2xl tracking-tight">
            <span className="font-semibold">Maison</span>
            <span className="text-gradient-gold font-bold">Lux</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((l, i) => (
              <Link
                key={i}
                to={l.to}
                className="relative py-2 hover:text-foreground/70 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <button
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              className="relative py-2"
            >
              Categories
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[720px]"
                  >
                    <div className="glass rounded-3xl p-6 shadow-elev grid grid-cols-3 gap-3">
                      {categories.map((c) => (
                        <Link
                          key={c.id}
                          to="/shop"
                          search={{ category: c.id }}
                          className="group relative overflow-hidden rounded-2xl aspect-[4/3]"
                        >
                          <img
                            src={c.image}
                            alt={c.name}
                            className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-3 left-3 text-white text-left">
                            <div className="font-semibold">{c.name}</div>
                            <div className="text-[11px] opacity-80">{c.tagline}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </nav>

          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(true)} className="p-2.5 rounded-full hover:bg-accent" aria-label="Search">
              <Search className="size-[18px]" />
            </button>
            <button onClick={() => setDark((d) => !d)} className="p-2.5 rounded-full hover:bg-accent" aria-label="Theme">
              {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </button>
            <Link to="/wishlist" className="p-2.5 rounded-full hover:bg-accent relative" aria-label="Wishlist">
              <Heart className="size-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 size-4 text-[10px] flex items-center justify-center rounded-full bg-[var(--sale)] text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button onClick={() => setCartOpen(true)} className="p-2.5 rounded-full hover:bg-accent relative" aria-label="Cart">
              <ShoppingBag className="size-[18px]" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 size-4 text-[10px] flex items-center justify-center rounded-full bg-foreground text-background font-medium">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-background p-6 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl">MaisonLux</span>
                <button onClick={() => setMenuOpen(false)}><X className="size-5" /></button>
              </div>
              <nav className="flex flex-col gap-1 text-lg">
                {navLinks.map((l, i) => (
                  <Link key={i} to={l.to} onClick={() => setMenuOpen(false)} className="py-3 border-b border-border">
                    {l.label}
                  </Link>
                ))}
                {categories.map((c) => (
                  <Link key={c.id} to="/shop" search={{ category: c.id }} onClick={() => setMenuOpen(false)} className="py-3 border-b border-border text-base text-muted-foreground">
                    {c.name}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 glass flex items-start justify-center pt-32 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-foreground/20 pb-3">
                <Search className="size-5" />
                <input
                  autoFocus
                  placeholder="Search for products, brands, categories…"
                  className="flex-1 bg-transparent outline-none text-2xl font-display placeholder:text-muted-foreground"
                />
                <button onClick={() => setSearchOpen(false)}><X className="size-5" /></button>
              </div>
              <div className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">Trending</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Cashmere", "Aero Runner", "Chronograph", "Linen", "Aviator"].map((t) => (
                  <button key={t} className="px-4 py-2 rounded-full border border-border hover:bg-accent text-sm">{t}</button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
