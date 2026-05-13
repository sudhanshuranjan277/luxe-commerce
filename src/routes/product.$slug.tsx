import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Plus, Minus, ChevronDown } from "lucide-react";
import products from "@/data/products.json";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const all = products as Array<{
      id: string; slug: string; name: string; brand: string; category: string;
      price: number; compareAt: number | null; rating: number; reviews: number;
      stock: number; badge: string | null; colors: string[]; sizes: string[];
      images: string[]; description: string;
    }>;
    const product = all.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    const related = all.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
    return { product, related };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <h1 className="font-display text-5xl">Not found</h1>
      <Link to="/shop" className="mt-6 inline-block underline">Back to shop</Link>
    </div>
  ),
});

type Prod = {
  id: string; slug: string; name: string; brand: string; category: string;
  price: number; compareAt: number | null; rating: number; reviews: number;
  stock: number; badge: string | null; colors: string[]; sizes: string[];
  images: string[]; description: string;
};
function ProductPage() {
  const { product, related } = Route.useLoaderData() as { product: Prod; related: Prod[] };
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<string | null>("specs");
  const add = useStore((s) => s.add);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wished = useStore((s) => s.wishlist.includes(product.id));

  const handleAdd = () => {
    add({
      id: product.id, slug: product.slug, name: product.name, price: product.price,
      image: product.images[0], qty, size: size || undefined, color: color || undefined,
    });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-10 lg:py-16">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
        <Link to="/">Home</Link> <span>/</span>
        <Link to="/shop" search={{ category: product.category }}>{product.category}</Link>
        <span>/</span> <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div className="flex flex-col gap-3">
            {product.images.map((src, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`aspect-square rounded-xl overflow-hidden border-2 transition ${i === activeImg ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"}`}>
                <img src={src} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-secondary group lg:sticky lg:top-28"
          >
            <img src={product.images[activeImg]} alt={product.name} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            {product.badge && (
              <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-foreground text-background text-xs">{product.badge}</span>
            )}
          </motion.div>
        </div>

        <div className="space-y-7">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{product.brand}</div>
            <h1 className="font-display text-4xl lg:text-5xl mt-2">{product.name}</h1>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-4 ${i < Math.round(product.rating) ? "fill-[var(--gold)] text-[var(--gold)]" : "text-muted-foreground"}`} />
                ))}
                <span className="text-sm ml-2">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">{product.reviews} reviews</span>
              <span className={`text-sm ${product.stock < 10 ? "text-[var(--sale)]" : "text-emerald-600"}`}>
                {product.stock < 10 ? `Only ${product.stock} left` : "In stock"}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="font-display text-4xl">{formatPrice(product.price)}</span>
            {product.compareAt && <span className="text-xl text-muted-foreground line-through">{formatPrice(product.compareAt)}</span>}
            {product.compareAt && <span className="px-2 py-1 rounded-full bg-[var(--sale)]/10 text-[var(--sale)] text-xs font-medium">Save {Math.round((1 - product.price / product.compareAt) * 100)}%</span>}
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {product.colors.length > 0 && (
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Color</div>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)} className={`size-10 rounded-full border-2 transition ${color === c ? "border-foreground scale-110" : "border-border"}`} style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          )}

          {product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Size</span>
                <button className="text-xs underline">Size guide</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`py-3 rounded-xl border-2 text-sm font-medium transition ${size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <div className="inline-flex items-center border border-border rounded-full">
              <button className="size-11 grid place-items-center" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="size-4" /></button>
              <span className="w-10 text-center">{qty}</span>
              <button className="size-11 grid place-items-center" onClick={() => setQty(qty + 1)}><Plus className="size-4" /></button>
            </div>
            <button onClick={handleAdd} className="flex-1 h-12 rounded-full bg-foreground text-background font-medium inline-flex items-center justify-center gap-2 hover:opacity-90 transition">
              <ShoppingBag className="size-4" /> Add to bag
            </button>
            <button onClick={() => toggleWishlist(product.id)} className={`size-12 rounded-full border border-border grid place-items-center ${wished ? "text-[var(--sale)]" : ""}`}>
              <Heart className={`size-5 ${wished ? "fill-current" : ""}`} />
            </button>
          </div>

          <button className="w-full h-12 rounded-full bg-gradient-gold text-ink font-medium hover:shadow-gold transition">Buy now</button>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            {[
              { i: Truck, t: "Free shipping", s: "Above $200" },
              { i: RotateCcw, t: "30-day returns", s: "Easy & free" },
              { i: ShieldCheck, t: "Authentic", s: "Verified" },
            ].map((x) => (
              <div key={x.t} className="text-center">
                <x.i className="size-5 mx-auto mb-2" />
                <div className="text-xs font-medium">{x.t}</div>
                <div className="text-xs text-muted-foreground">{x.s}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-border">
            {[
              { id: "specs", t: "Specifications", c: "Material: Premium cashmere · Origin: Italy · SKU: " + product.id.toUpperCase() + " · Care: Dry clean only" },
              { id: "ship", t: "Delivery & Returns", c: "Express 2–4 days globally. Free over $200. 30-day no-questions returns with prepaid label." },
              { id: "faq", t: "FAQ", c: "Q: Is this true to size? A: Yes, we recommend your usual size. Q: Sustainably sourced? A: Yes, certified mill." },
            ].map((a) => (
              <div key={a.id} className="border-b border-border">
                <button onClick={() => setOpenAcc(openAcc === a.id ? null : a.id)} className="w-full py-4 flex items-center justify-between text-left">
                  <span className="font-medium">{a.t}</span>
                  <ChevronDown className={`size-4 transition ${openAcc === a.id ? "rotate-180" : ""}`} />
                </button>
                {openAcc === a.id && <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{a.c}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-32">
          <h2 className="font-display text-3xl lg:text-5xl mb-10">You may also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
