import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShoppingBag, Plus, Minus, X, ArrowRight, Tag } from "lucide-react";
import { useStore, cartTotals } from "@/store/useStore";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const items = useStore((s) => s.items);
  const updateQty = useStore((s) => s.updateQty);
  const remove = useStore((s) => s.remove);
  const { subtotal, shipping, tax, total } = cartTotals(items);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-32 text-center w-full">
        <div className="size-24 mx-auto rounded-full bg-secondary grid place-items-center mb-6">
          <ShoppingBag className="size-10 text-muted-foreground" />
        </div>
        <h1 className="font-display text-5xl">Your bag is empty</h1>
        <p className="text-muted-foreground mt-3">Find something beautiful to take home.</p>
        <Link to="/shop" className="mt-8 inline-flex px-7 py-3.5 rounded-full bg-foreground text-background">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-12 lg:py-20 w-full">
      <h1 className="font-display text-5xl lg:text-7xl">Your bag</h1>
      <p className="text-muted-foreground mt-2">{items.length} item(s) ready for checkout</p>

      <div className="mt-12 grid lg:grid-cols-[1fr_420px] gap-12">
        <div className="space-y-6">
          {items.map((i) => (
            <motion.div
              key={`${i.id}-${i.size}-${i.color}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex gap-5 p-5 rounded-2xl border border-border bg-card"
            >
              <Link to="/product/$slug" params={{ slug: i.slug }} className="size-32 rounded-xl overflow-hidden bg-secondary shrink-0">
                <img src={i.image} alt={i.name} className="size-full object-cover" />
              </Link>
              <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to="/product/$slug" params={{ slug: i.slug }} className="font-medium text-lg hover:underline">{i.name}</Link>
                    <div className="text-sm text-muted-foreground mt-1">
                      {[i.size && `Size ${i.size}`, i.color && "Color"].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                  <div className="font-display text-xl">{formatPrice(i.price * i.qty)}</div>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="inline-flex items-center border border-border rounded-full">
                    <button className="size-9 grid place-items-center" onClick={() => updateQty(i.id, i.qty - 1, i.size, i.color)}><Minus className="size-3" /></button>
                    <span className="w-10 text-center text-sm">{i.qty}</span>
                    <button className="size-9 grid place-items-center" onClick={() => updateQty(i.id, i.qty + 1, i.size, i.color)}><Plus className="size-3" /></button>
                  </div>
                  <button onClick={() => remove(i.id, i.size, i.color)} className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                    <X className="size-4" /> Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 self-start">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <h3 className="font-display text-2xl">Order summary</h3>
            <div className="space-y-2 text-sm">
              <Row l="Subtotal" v={formatPrice(subtotal)} />
              <Row l="Shipping" v={shipping ? formatPrice(shipping) : "Free"} />
              <Row l="Tax (8%)" v={formatPrice(tax)} />
            </div>
            <div className="border-t border-border pt-4 flex justify-between items-baseline">
              <span className="font-medium">Total</span>
              <span className="font-display text-3xl">{formatPrice(total)}</span>
            </div>
            <div className="flex glass rounded-full p-1.5">
              <input placeholder="Promo code" className="flex-1 bg-transparent px-4 outline-none text-sm" />
              <button className="px-4 py-2 rounded-full bg-foreground text-background text-sm inline-flex items-center gap-1.5"><Tag className="size-3" /> Apply</button>
            </div>
            <Link to="/checkout" className="w-full h-12 rounded-full bg-foreground text-background font-medium inline-flex items-center justify-center gap-2">
              Checkout <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="text-xs text-muted-foreground text-center">Secure checkout · Encrypted · 30-day returns</div>
        </aside>
      </div>
    </div>
  );
}

function Row({ l, v }: { l: string; v: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{l}</span><span>{v}</span></div>;
}
