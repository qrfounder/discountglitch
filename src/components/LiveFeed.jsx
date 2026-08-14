import { useEffect, useState } from "react";
import {
  createLiveEvent,
  formatFeedAgo,
  getOffer,
  hourUnlockCount,
  initialLiveFeed,
} from "@/lib/offers";
import { Image } from "@/components/ui/image";

const VISIBLE = 5;
const hourCount = hourUnlockCount();

function statusLabel(item) {
  if (item.kind === "coupon") return "Unlocked";
  if (item.kind === "deal") return `Deal ${item.deal}/5`;
  return `$${item.amount}`;
}

function statusTone(kind) {
  if (kind === "coupon") return "text-[#248A3D]";
  if (kind === "deal") return "text-dg-blue";
  return "text-dg-navy";
}

export default function LiveFeed() {
  const [items, setItems] = useState(() => initialLiveFeed().slice(0, VISIBLE));
  const [now, setNow] = useState(() => Date.now());
  const featured = items[0];
  const offer = getOffer(featured?.slug);
  const cover = offer?.coverImage || offer?.cardImage || "/widgets/activity.jpg";

  useEffect(() => {
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    let timeoutId;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const schedule = () => {
      const wait = reduced ? 14000 : 4800 + Math.floor(Math.random() * 3200);
      timeoutId = window.setTimeout(() => {
        setItems((prev) => [createLiveEvent(prev), ...prev].slice(0, VISIBLE));
        schedule();
      }, wait);
    };
    schedule();
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="as-card md:flex">
      <div className="relative h-[168px] overflow-hidden sm:h-[188px] md:h-auto md:w-[40%] md:min-h-[268px] md:flex-shrink-0">
        <Image
          key={featured?.id}
          src={cover}
          alt=""
          className="dg-featured-in absolute inset-0 h-full w-full object-cover object-top"
          fallback={<div className="absolute inset-0 bg-[#1D1D1F]" />}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/15" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2 py-0.5 backdrop-blur-md ring-1 ring-white/20">
            <span className="as-live-dot" />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white">Live</span>
          </span>
          <span className="text-[11px] font-medium tabular-nums text-white/75">
            {hourCount} this hour
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
            {featured?.kind === "deal" ? "In progress" : "Just unlocked"}
          </p>
          <p className="mt-1 text-[22px] font-bold tracking-tight text-white leading-tight">
            {featured?.user}
          </p>
          <p className="mt-0.5 text-[13px] text-white/80">{featured?.detail}</p>
          <p className="mt-1 text-[11px] text-white/55">
            {featured?.city}
            <span className="mx-1.5 text-white/30">·</span>
            {formatFeedAgo(featured?.at, now)}
          </p>
        </div>
      </div>

      <ul className="flex flex-1 flex-col justify-center divide-y divide-black/[0.05]" aria-live="polite">
        {items.map((item, idx) => {
          const rowOffer = getOffer(item.slug);
          const isNew = idx === 0;
          const unlock = item.kind === "coupon" || item.kind === "tier" || item.kind === "prize";
          return (
            <li
              key={item.id}
              className={`flex items-center gap-3 px-3.5 py-2.5 sm:px-4 ${
                isNew ? "dg-feed-row-in" : ""
              } ${isNew && unlock ? "dg-unlock-flash" : ""}`}
            >
              <div
                className="as-offer-thumb h-10 w-[60px] flex-shrink-0 overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
                style={{
                  background: rowOffer
                    ? `linear-gradient(160deg, ${rowOffer.theme.from}, ${rowOffer.theme.to})`
                    : "#F5F5F7",
                }}
              >
                <Image
                  src={rowOffer?.cardImage}
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
                  <span className="font-normal text-dg-muted"> · {item.city}</span>
                </p>
                <p className="truncate text-[12px] text-dg-muted">{item.detail}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className={`text-[11px] font-semibold ${statusTone(item.kind)}`}>
                  {statusLabel(item)}
                </p>
                <p className="text-[10px] tabular-nums text-dg-muted/80">{formatFeedAgo(item.at, now)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
