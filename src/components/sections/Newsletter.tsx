import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-24 lg:py-32 max-w-full">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-warm p-10 lg:p-20 text-center max-w-full"
        >
          <div className="absolute -top-20 -right-20 size-[400px] rounded-full bg-[var(--gold)]/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 size-[400px] rounded-full bg-[var(--sale)]/15 blur-3xl pointer-events-none" />
          <div className="relative">
            <span className="text-xs uppercase tracking-[0.25em] text-ink/60">Private list</span>
            <h2 className="font-display text-4xl lg:text-6xl mt-4 max-w-2xl mx-auto leading-tight text-ink">
              First looks, private sales — straight to you.
            </h2>
            <p className="mt-5 text-ink/70 max-w-md mx-auto">Join 80,000 collectors. One thoughtful note a week.</p>
            <form className="mt-10 max-w-md mx-auto flex glass rounded-full p-1.5 shadow-elev">
              <input placeholder="your@email.com" className="flex-1 bg-transparent px-5 outline-none placeholder:text-ink/50 text-ink" />
              <button className="px-6 py-3 rounded-full bg-ink text-cream flex items-center gap-2 font-medium hover:opacity-90">
                Subscribe <ArrowRight className="size-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
