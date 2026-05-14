import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore, cartTotals } from "@/store/useStore";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const isOpen = useStore((s) => s.isOpen);
  const setOpen = useStore((s) => s.setOpen);
  const items = useStore((s) => s.items);
  const remove = useStore((s) => s.remove);
  const updateQty = useStore((s) => s.updateQty);
  const { subtotal, count } = cartTotals(items);
  const freeShipAt = 200;
  const progress = Math.min(100, (subtotal / freeShipAt) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[min(440px,90vw)] bg-background flex flex-col"
          >
            <div className="p-5 flex items-center justify-between border-b border-border">
              <h3 className="font-display text-xl">Your bag · {count}</h3>
              <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-accent"><X className="size-4" /></button>
            </div>

            {subtotal > 0 && (
              <div className="px-5 py-4 border-b border-border">
                <div className="text-xs text-muted-foreground mb-2">
                  {subtotal >= freeShipAt
                    ? "🎉 You've unlocked free shipping"
                    : `Add ${formatPrice(freeShipAt - subtotal)} for free shipping`}
                </div>
                <div className="h-1 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-gold"
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
                  <div className="size-20 rounded-full bg-secondary grid place-items-center">
                    <ShoppingBag className="size-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg">Your bag is empty</h4>
                    <p className="text-sm text-muted-foreground mt-1">Time to find something beautiful.</p>
                  </div>
                  <Link to="/shop" onClick={() => setOpen(false)} className="px-5 py-2.5 rounded-full bg-foreground text-background text-sm">
                    Continue shopping
                  </Link>
                </div>
              ) : items.map((i) => (
                <div key={`${i.id}-${i.size}-${i.color}`} className="flex gap-4">
                  <div className="size-24 rounded-xl overflow-hidden bg-secondary shrink-0">
                    <img src={i.image} alt={i.name} className="size-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <div className="font-medium leading-tight">{i.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {[i.size, i.color].filter(Boolean).join(" · ")}
                        </div>
                      </div>
                      <button onClick={() => remove(i.id, i.size, i.color)} className="text-muted-foreground hover:text-foreground">
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center border border-border rounded-full">
                        <button className="size-7 grid place-items-center" onClick={() => updateQty(i.id, i.qty - 1, i.size, i.color)}><Minus className="size-3" /></button>
                        <span className="w-7 text-center text-sm">{i.qty}</span>
                        <button className="size-7 grid place-items-center" onClick={() => updateQty(i.id, i.qty + 1, i.size, i.color)}><Plus className="size-3" /></button>
                      </div>
                      <div className="font-semibold">{formatPrice(i.price * i.qty)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
                </div>
                <Link to="/checkout" onClick={() => setOpen(false)} className="w-full py-3.5 rounded-full bg-foreground text-background font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition">
                  Checkout <ArrowRight className="size-4" />
                </Link>
                <Link to="/cart" onClick={() => setOpen(false)} className="block text-center text-sm text-muted-foreground hover:text-foreground">
                  View bag
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
