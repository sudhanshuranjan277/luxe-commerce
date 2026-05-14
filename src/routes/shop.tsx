import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import products from "@/data/products.json";
import categories from "@/data/categories.json";
import brands from "@/data/brands.json";
import { ProductCard } from "@/components/ProductCard";

type Search = {
  category?: string;
  brand?: string;
  sort?: string;
  sale?: boolean;
  q?: string;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
    brand: typeof s.brand === "string" ? s.brand : undefined,
    sort: typeof s.sort === "string" ? s.sort : undefined,
    sale: s.sale === true || s.sale === "true",
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  component: Shop,
});

const sorts = [
  { v: "popular", l: "Popularity" },
  { v: "new", l: "New arrivals" },
  { v: "best", l: "Best selling" },
  { v: "asc", l: "Price: low to high" },
  { v: "desc", l: "Price: high to low" },
];

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [price, setPrice] = useState(3500);

  const filtered = useMemo(() => {
    let r = [...products];
    if (search.category) r = r.filter((p) => p.category === search.category);
    if (search.brand) r = r.filter((p) => p.brand === search.brand);
    if (search.sale) r = r.filter((p) => p.compareAt);
    r = r.filter((p) => p.price <= price);
    switch (search.sort) {
      case "asc": r.sort((a, b) => a.price - b.price); break;
      case "desc": r.sort((a, b) => b.price - a.price); break;
      case "best": r.sort((a, b) => b.reviews - a.reviews); break;
      case "new": r.sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0)); break;
    }
    return r;
  }, [search, price]);

  const setSearch = (patch: Partial<Search>) =>
    navigate({ search: (prev: Search) => ({ ...prev, ...patch }) });

  const activeChips = [
    search.category && { k: "category", v: categories.find((c) => c.id === search.category)?.name },
    search.brand && { k: "brand", v: search.brand },
    search.sale && { k: "sale", v: "On sale" },
  ].filter(Boolean) as { k: keyof Search; v: string }[];

  const Filters = () => (
    <div className="space-y-8">
      <FilterGroup title="Category">
        <div className="flex flex-col gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSearch({ category: search.category === c.id ? undefined : c.id })}
              className={`text-left text-sm py-1 ${search.category === c.id ? "font-semibold" : "text-muted-foreground hover:text-foreground"}`}
            >
              {c.name} <span className="text-xs opacity-50">({c.count})</span>
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Brand">
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => setSearch({ brand: search.brand === b.name ? undefined : b.name })}
              className={`px-3 py-1.5 rounded-full border text-xs transition ${search.brand === b.name ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"}`}
            >{b.name}</button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title={`Price · up to $${price}`}>
        <input type="range" min={100} max={3500} step={50} value={price} onChange={(e) => setPrice(+e.target.value)} className="w-full accent-foreground" />
      </FilterGroup>
      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2">
          {["#1a1a1a", "#f4f1ec", "#caa45a", "#324b3f", "#5b4636", "#cdb898"].map((c) => (
            <button key={c} className="size-8 rounded-full border-2 border-border hover:scale-110 transition" style={{ backgroundColor: c }} />
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Availability">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> In stock</label>
        <label className="flex items-center gap-2 text-sm mt-2"><input type="checkbox" defaultChecked={!!search.sale} onChange={(e) => setSearch({ sale: e.target.checked || undefined })} /> On sale</label>
      </FilterGroup>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-12 lg:py-16 w-full">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 overflow-x-auto pb-2">
        <Link to="/">Home</Link> <span>/</span> <span>Shop</span>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="font-display text-5xl lg:text-7xl">Shop</h1>
          <p className="text-muted-foreground mt-2">{filtered.length} pieces curated for you</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setFiltersOpen(true)} className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border">
            <SlidersHorizontal className="size-4" /> Filters
          </button>
          <div className="relative">
            <select
              value={search.sort ?? "popular"}
              onChange={(e) => setSearch({ sort: e.target.value })}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-full border border-border bg-card text-sm cursor-pointer"
            >
              {sorts.map((s) => <option key={s.v} value={s.v}>Sort: {s.l}</option>)}
            </select>
            <ChevronDown className="size-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeChips.map((c, i) => (
            <button key={i} onClick={() => setSearch({ [c.k]: undefined } as Partial<Search>)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm">
              {c.v} <X className="size-3" />
            </button>
          ))}
          <button onClick={() => navigate({ search: {} })} className="text-sm text-muted-foreground hover:text-foreground px-2">Clear all</button>
        </div>
      )}

      <div className="grid lg:grid-cols-[260px_1fr] gap-10">
        <aside className="hidden lg:block sticky top-28 self-start">
          <Filters />
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <Filter className="size-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-display text-2xl">Nothing matches</h3>
              <p className="text-muted-foreground mt-2">Try removing a filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}

          <div className="mt-16 flex items-center justify-center gap-2">
            {[1, 2, 3, "...", 8].map((n, i) => (
              <button key={i} className={`size-10 rounded-full text-sm ${n === 1 ? "bg-foreground text-background" : "hover:bg-secondary"}`}>{n}</button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60" onClick={() => setFiltersOpen(false)} />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-background p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl">Filters</h3>
                <button onClick={() => setFiltersOpen(false)}><X className="size-5" /></button>
              </div>
              <Filters />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">{title}</h4>
      {children}
    </div>
  );
}
