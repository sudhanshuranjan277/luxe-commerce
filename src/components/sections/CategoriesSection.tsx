import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import categories from "@/data/categories.json";

export function CategoriesSection() {
  return (
    <section className="py-24 lg:py-32 max-w-full">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 w-full">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Browse</span>
            <h2 className="font-display text-4xl lg:text-6xl mt-3">Shop by category</h2>
          </div>
          <Link to="/shop" className="hidden sm:inline-flex items-center gap-2 text-sm hover:gap-3 transition-all">
            All categories <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4">
          {categories.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
            >
              <Link
                to="/shop"
                search={{ category: c.id }}
                className={`group relative block overflow-hidden rounded-3xl bg-secondary ${
                  i === 0 ? "aspect-square lg:aspect-auto lg:h-full" : "aspect-[4/5]"
                }`}
              >
                <img
                  src={c.image.replace("w=1200", "w=600").replace("q=80", "q=70") + "&auto=format"}
                  alt={c.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">{c.count} items</div>
                  <h3 className={`font-display ${i === 0 ? "text-3xl lg:text-5xl" : "text-xl lg:text-2xl"} mt-1`}>{c.name}</h3>
                  <p className="text-xs opacity-80 mt-1">{c.tagline}</p>
                </div>
                <div className="absolute top-4 right-4 size-9 rounded-full glass border-white/30 grid place-items-center text-white opacity-0 group-hover:opacity-100 transition">
                  <ArrowUpRight className="size-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
