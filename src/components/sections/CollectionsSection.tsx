import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import collections from "@/data/collections.json";

export function CollectionsSection() {
  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">The Edits</span>
          <h2 className="font-display text-4xl lg:text-6xl mt-3">Featured collections</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          {collections.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={i === 1 ? "lg:translate-y-12" : ""}
            >
              <Link to="/shop" className="group block relative overflow-hidden rounded-3xl aspect-[3/4] bg-card">
                <img src={c.image.replace("w=1600", "w=800").replace("q=80", "q=70") + "&auto=format"} alt={c.title} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="font-display text-3xl lg:text-4xl leading-tight">{c.title}</h3>
                  <p className="mt-2 text-white/80 text-sm">{c.subtitle}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium border-b border-white/40 pb-1 group-hover:gap-3 transition-all">
                    {c.cta} <ArrowUpRight className="size-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
