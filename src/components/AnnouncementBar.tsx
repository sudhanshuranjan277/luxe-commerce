import banners from "@/data/banners.json";

export function AnnouncementBar() {
  const items = [...banners, ...banners];
  return (
    <div className="bg-gradient-luxe text-white text-xs tracking-[0.18em] uppercase overflow-hidden border-b border-white/5">
      <div className="marquee py-2.5 whitespace-nowrap">
        {items.map((b, i) => (
          <span key={i} className="mx-10 inline-flex items-center gap-3 opacity-90">
            <span className="size-1 rounded-full bg-[var(--gold)]" />
            {b.text}
          </span>
        ))}
      </div>
    </div>
  );
}
