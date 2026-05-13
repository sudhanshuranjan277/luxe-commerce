import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const shots = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=70&auto=format",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=70&auto=format",
  "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=70&auto=format",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=70&auto=format",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=70&auto=format",
  "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=70&auto=format",
];

export function InstagramGallery() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Community</span>
          <h2 className="font-display text-4xl lg:text-6xl mt-3">@maisonlux</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
          {shots.map((src, i) => (
            <motion.a
              key={i} href="#"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-secondary"
            >
              <img src={src} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition grid place-items-center">
                <Instagram className="size-7 text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
