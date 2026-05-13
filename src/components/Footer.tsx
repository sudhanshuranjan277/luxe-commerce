import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook, Youtube, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-luxe text-white mt-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <div className="font-display text-3xl">
            Maison<span className="text-gradient-gold font-bold">Lux</span>
          </div>
          <p className="text-white/70 max-w-sm leading-relaxed">
            A curated house of modern luxury — carefully sourced, beautifully made, delivered with care.
          </p>
          <div className="flex gap-3">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="size-10 rounded-full border border-white/15 grid place-items-center hover:bg-white/10 transition">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {[
            { t: "Shop", l: ["New In", "Bestsellers", "Sale", "Collections"] },
            { t: "Service", l: ["Contact", "Shipping", "Returns", "Size Guide"] },
            { t: "House", l: ["About", "Sustainability", "Press", "Careers"] },
          ].map((c) => (
            <div key={c.t}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">{c.t}</h4>
              <ul className="space-y-2.5 text-sm">
                {c.l.map((x) => <li key={x}><Link to="/shop" className="hover:text-[var(--gold)] transition">{x}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-white/50">Newsletter</h4>
          <p className="text-sm text-white/70">Private previews and editorial — once a week.</p>
          <form className="flex glass rounded-full overflow-hidden p-1 bg-white/5">
            <input placeholder="your@email.com" className="flex-1 bg-transparent px-4 outline-none text-sm placeholder:text-white/40" />
            <button className="size-10 rounded-full bg-white text-ink grid place-items-center"><ArrowRight className="size-4" /></button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-xs text-white/50 text-center">
        © {new Date().getFullYear()} MaisonLux · All rights reserved · Visa · Mastercard · Amex · PayPal · Apple Pay
      </div>
    </footer>
  );
}
