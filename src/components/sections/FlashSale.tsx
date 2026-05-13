import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import products from "@/data/products.json";
import { ProductCard } from "@/components/ProductCard";

const target = new Date(Date.now() + 1000 * 60 * 60 * 36);

export function FlashSale() {
  const [t, setT] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const h = Math.floor(diff / 3.6e6);
      const m = Math.floor((diff % 3.6e6) / 6e4);
      const s = Math.floor((diff % 6e4) / 1000);
      setT({ h: String(h).padStart(2, "0"), m: String(m).padStart(2, "0"), s: String(s).padStart(2, "0") });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const sale = products.filter((p) => p.compareAt).slice(0, 4);

  return (
    <section className="py-24 lg:py-32 bg-gradient-luxe text-white relative overflow-hidden">
      <motion.div
        className="absolute -top-40 -left-40 size-[600px] rounded-full bg-[var(--sale)]/20 blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--sale)]/20 text-[var(--sale)] text-xs uppercase tracking-[0.2em] mb-4">
              <Flame className="size-3.5" /> Flash sale
            </div>
            <h2 className="font-display text-4xl lg:text-6xl">Ends in tonight</h2>
          </div>
          <div className="flex gap-3">
            {[
              { v: t.h, l: "Hours" },
              { v: t.m, l: "Min" },
              { v: t.s, l: "Sec" },
            ].map((x) => (
              <div key={x.l} className="glass border-white/15 rounded-2xl px-5 py-3 text-center min-w-[80px]">
                <div className="font-display text-3xl tabular-nums">{x.v}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/60 mt-1">{x.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 [&_h3]:text-white [&_.text-muted-foreground]:text-white/60">
          {sale.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
