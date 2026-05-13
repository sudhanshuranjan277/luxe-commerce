import { motion } from "framer-motion";
import brands from "@/data/brands.json";

export function BrandsStrip() {
  return (
    <section className="py-12 border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-8">As featured by the houses we carry</div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {brands.map((b, i) => (
            <motion.span
              key={b.id}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="font-display text-2xl text-muted-foreground hover:text-foreground transition tracking-wider"
            >
              {b.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
