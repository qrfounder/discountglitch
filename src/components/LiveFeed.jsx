import { useEffect, useState } from "react";
import { liveFeedSeed, getOffer } from "@/lib/offers";
import { Image } from "@/components/ui/image";

export default function LiveFeed() {
  const [items, setItems] = useState(liveFeedSeed.slice(0, 4));

  useEffect(() => {
    const id = setInterval(() => {
      setItems((prev) => {
        const next = liveFeedSeed[Math.floor(Math.random() * liveFeedSeed.length)];
        return [{ ...next, ago: "now", _key: `${Date.now()}` }, ...prev].slice(0, 4);
      });
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="as-card">
      <div className="relative aspect-[2/1] overflow-hidden">
        <Image
          src="/widgets/activity.jpg?v=1"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-right"
          fallback={<div className="absolute inset-0 bg-[#1D1D1F]" />}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2 py-0.5 backdrop-blur-md ring-1 ring-white/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#FF375F]" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#FF375F]" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white">Live</span>
          </span>
          <p className="mt-2 text-[20px] font-bold tracking-tight text-white">Activity</p>
          <p className="text-[12px] text-white/70">Entry starts as they happen</p>
        </div>
      </div>

      <ul className="p-2.5">
        {items.map((item, idx) => {
          const offer = getOffer(item.slug);
          return (
            <li
              key={item._key || `${item.user}-${idx}`}
              className={`flex items-center gap-3 rounded-2xl px-2 py-2 ${idx === 0 ? "dg-feed-in bg-black/[0.03]" : ""}`}
            >
              <div
                className="as-offer-thumb h-10 w-[60px] flex-shrink-0 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
                style={{
                  background: offer
                    ? `linear-gradient(160deg, ${offer.theme.from}, ${offer.theme.to})`
                    : "#F5F5F7",
                }}
              >
                <Image
                  src={offer?.cardImage ? `${offer.cardImage.split("?")[0]}?v=2` : undefined}
                  alt=""
                  className="h-full w-full object-contain object-center"
                  fallback={
                    <span className="flex h-full w-full items-center justify-center text-[11px] font-bold text-white">
                      {item.user.slice(0, 1)}
                    </span>
                  }
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold tracking-tight text-dg-navy">
                  {item.user}
                </p>
                <p className="truncate text-[11px] text-dg-muted">{item.reward}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-dg-muted">{item.city}</p>
                <p className="text-[10px] tabular-nums text-dg-muted/80">{item.ago}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
