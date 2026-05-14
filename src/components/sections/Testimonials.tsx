import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import testimonials from "@/data/testimonials.json";

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  return (
    <section className="py-24 lg:py-32 bg-gradient-luxe text-white relative overflow-hidden max-w-full">
      <motion.div className="absolute -top-32 right-1/4 size-[500px] rounded-full bg-[var(--gold)]/15 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 12, repeat: Infinity }}
      />
      <div className="mx-auto max-w-4xl px-5 lg:px-10 text-center relative">
        <Quote className="size-12 mx-auto mb-8 text-[var(--gold)]" />
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="font-display text-3xl lg:text-5xl leading-tight"
          >
            "{t.text}"
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-10 flex flex-col items-center gap-3">
          <img src={t.avatar} alt={t.name} loading="lazy" decoding="async" className="size-14 rounded-full ring-2 ring-[var(--gold)]/40" />
          <div>
            <div className="font-medium">{t.name}</div>
            <div className="text-sm text-white/60">{t.role}</div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: t.rating }).map((_, k) => (
              <Star key={k} className="size-4 fill-[var(--gold)] text-[var(--gold)]" />
            ))}
          </div>
        </div>
        <div className="mt-12 flex items-center justify-center gap-6">
          <button onClick={() => setI((i - 1 + testimonials.length) % testimonials.length)} className="size-12 rounded-full border border-white/20 grid place-items-center hover:bg-white/10">
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, k) => (
              <button key={k} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-[var(--gold)]" : "w-1.5 bg-white/30"}`} />
            ))}
          </div>
          <button onClick={() => setI((i + 1) % testimonials.length)} className="size-12 rounded-full border border-white/20 grid place-items-center hover:bg-white/10">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
