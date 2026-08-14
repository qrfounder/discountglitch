import { Link } from "react-router-dom";
import AppIcon from "@/components/AppIcon";
import StarRating from "@/components/StarRating";

/** Offer row — opens portal to Show Coupon list */
export default function SweepstakeCard({ offer }) {
  return (
    <Link
      to={`/offer/${offer.slug}`}
      className="as-press group flex items-center gap-3.5 rounded-2xl bg-white p-3 pr-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
    >
      <AppIcon offer={offer} size="md" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold tracking-tight text-dg-navy">{offer.brand}</p>
        <p className="truncate text-[12px] text-dg-muted">
          Up to ${offer.rewardValue} OFF · {offer.category}
        </p>
        <div className="mt-1 flex items-center gap-1.5">
          <StarRating value={offer.rating} size={11} />
          <span className="text-[11px] tabular-nums text-dg-muted">{offer.rating}</span>
        </div>
      </div>
      <span className="inline-flex h-9 flex-shrink-0 items-center rounded-lg bg-[#1D1D1F] px-3 text-[12px] font-semibold text-white group-hover:bg-[#2D2D2F]">
        Show Coupon
      </span>
    </Link>
  );
}

export function OfferStoryCard({ offer }) {
  return (
    <Link
      to={`/offer/${offer.slug}`}
      className="group relative block w-[260px] flex-shrink-0 as-card as-press aspect-[3/4] sm:w-[280px]"
    >
      <img
        src={offer.coverImage ? `${offer.coverImage.split("?")[0]}?v=3` : undefined}
        alt={offer.brand}
        className="as-story-media absolute inset-0 h-full w-full object-cover object-top"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">{offer.category}</p>
        <p className="mt-0.5 text-[18px] font-bold tracking-tight text-white">{offer.brand}</p>
        <p className="text-[13px] text-white/80">Up to ${offer.rewardValue} OFF</p>
        <span className="mt-3 inline-flex h-8 items-center rounded-lg bg-white px-3 text-[12px] font-semibold text-dg-navy">
          Show Coupon
        </span>
      </div>
    </Link>
  );
}
