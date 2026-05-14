import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import products from "@/data/products.json";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({ component: Wishlist });

function Wishlist() {
  const wishlist = useStore((s) => s.wishlist);
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-12 lg:py-20 w-full">
      <h1 className="font-display text-5xl lg:text-7xl">Wishlist</h1>
      <p className="text-muted-foreground mt-2">Pieces you're saving for later</p>
      {items.length === 0 ? (
        <div className="py-32 text-center">
          <Heart className="size-10 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-display text-2xl">Nothing saved yet</h3>
          <Link to="/shop" className="mt-6 inline-block underline">Browse the shop</Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
