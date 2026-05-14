import { motion } from "framer-motion";
import { Truck, ShieldCheck, Sparkles, RotateCcw } from "lucide-react";

const features = [
  { icon: Truck, title: "Express worldwide", text: "Carbon-neutral delivery in 2–4 days, on us above $200." },
  { icon: ShieldCheck, title: "Secure by design", text: "Encrypted checkout, fraud-screened orders, every time." },
  { icon: Sparkles, title: "Curated quality", text: "Every piece reviewed by our buyers before it ships." },
  { icon: RotateCcw, title: "30-day returns", text: "Changed your mind? Send it back, no questions." },
];

export function WhyUs() {
  return (
    <section className="py-24 lg:py-32 max-w-full">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 w-full grid lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative p-8 rounded-3xl border border-border bg-card hover:shadow-elev hover:-translate-y-1 transition-all duration-500"
          >
            <div className="size-14 rounded-2xl bg-gradient-warm grid place-items-center mb-6 group-hover:scale-110 transition">
              <f.icon className="size-6 text-ink" />
            </div>
            <h3 className="font-display text-xl mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
