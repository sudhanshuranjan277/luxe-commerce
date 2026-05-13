import { Link } from "@tanstack/react-router";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { formatPrice } from "@/lib/format";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  compareAt: number | null;
  rating: number;
  reviews: number;
  stock: number;
  badge: string | null;
  images: string[];
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wishlist = useStore((s) => s.wishlist);
  const add = useStore((s) => s.add);
  const wished = wishlist.includes(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative"
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="product-card-img absolute inset-0 size-full object-cover"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          {product.badge && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide ${
              product.badge.startsWith("-") ? "bg-[var(--sale)] text-white" :
              product.badge === "Limited" ? "bg-[var(--gold)] text-ink" :
              "bg-foreground text-background"
            }`}>
              {product.badge}
            </span>
          )}

          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button
              onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
              className={`size-9 grid place-items-center rounded-full glass shadow-soft hover:scale-110 transition ${wished ? "text-[var(--sale)]" : ""}`}
              aria-label="Wishlist"
            >
              <Heart className={`size-4 ${wished ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="size-9 grid place-items-center rounded-full glass shadow-soft hover:scale-110 transition"
              aria-label="Quick view"
            >
              <Eye className="size-4" />
            </button>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              add({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.images[0], qty: 1 });
            }}
            className="absolute bottom-3 inset-x-3 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-foreground/90"
          >
            <ShoppingBag className="size-4" /> Add to cart
          </button>
        </div>

        <div className="pt-4 px-1">
          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="uppercase tracking-widest">{product.brand}</span>
            <span className="flex items-center gap-1">
              <Star className="size-3 fill-[var(--gold)] text-[var(--gold)]" />
              {product.rating}
            </span>
          </div>
          <h3 className="mt-1.5 font-medium leading-tight line-clamp-1">{product.name}</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAt)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
