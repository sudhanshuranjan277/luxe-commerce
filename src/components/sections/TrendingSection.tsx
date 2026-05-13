import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import products from "@/data/products.json";
import { ProductCard } from "@/components/ProductCard";

export function TrendingSection() {
  const trending = products.slice(0, 8);
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">In rotation</span>
            <h2 className="font-display text-4xl lg:text-6xl mt-3">Trending now</h2>
          </motion.div>
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm hover:gap-3 transition-all">
            View all <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
