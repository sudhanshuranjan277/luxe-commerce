import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden max-w-full">
      <div className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=75&auto=format"
          alt="Hero"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        <motion.div
          className="absolute -top-40 -right-40 size-[600px] rounded-full bg-[var(--gold)]/20 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative mx-auto max-w-[1400px] w-full px-5 lg:px-10 pb-24 lg:pb-32 text-white">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/20 text-xs uppercase tracking-[0.2em] mb-6"
          >
            <Sparkles className="size-3.5 text-[var(--gold)]" /> Winter Edit · 2025
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl lg:text-[8.5rem] leading-[0.95] max-w-5xl"
          >
            Quietly <em className="text-gradient-gold not-italic">crafted.</em><br />
            Endlessly worn.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-white/80 text-lg leading-relaxed"
          >
            A house of modern essentials — sourced from independent ateliers,
            shaped for the way we live now.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/shop" className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white text-ink font-medium hover:shadow-gold transition-all duration-500">
              Shop the edit
              <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/shop" search={{ category: "watches" }} className="inline-flex items-center gap-3 px-7 py-4 rounded-full glass border-white/30 text-white font-medium hover:bg-white/10 transition">
              Discover watches
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-white/60"
          >
            <span>Free shipping</span>
            <span className="size-1 rounded-full bg-white/40" />
            <span>30-day returns</span>
            <span className="size-1 rounded-full bg-white/40 hidden sm:block" />
            <span className="hidden sm:inline">Carbon neutral</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
