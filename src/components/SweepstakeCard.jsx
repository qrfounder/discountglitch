import { Link } from "react-router-dom";
import AppIcon from "@/components/AppIcon";
import StarRating from "@/components/StarRating";

/** Offer row — opens portal to Show Coupon list */
export default function SweepstakeCard({ offer }) {
  return (
    <Link
      to={`/offer/${offer.slug}`}
      className="as-press group flex items-center gap-2.5 rounded-2xl bg-white p-2.5 pr-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] sm:gap-3.5 sm:p-3 sm:pr-4"
    >
      <AppIcon offer={offer} size="md" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold tracking-tight text-dg-navy sm:text-[15px]">{offer.brand}</p>
        <p className="truncate text-[11px] text-dg-muted sm:text-[12px]">
          Up to ${offer.rewardValue} OFF · {offer.category}
        </p>
        <div className="mt-1 flex items-center gap-1.5">
          <StarRating value={offer.rating} size={11} />
          <span className="text-[11px] tabular-nums text-dg-muted">{offer.rating}</span>
        </div>
      </div>
      <span className="inline-flex h-8 flex-shrink-0 items-center rounded-lg bg-[#1D1D1F] px-2.5 text-[11px] font-semibold text-white group-hover:bg-[#2D2D2F] sm:h-9 sm:px-3 sm:text-[12px]">
        <span className="sm:hidden">Show</span>
        <span className="hidden sm:inline">Show Coupon</span>
      </span>
    </Link>
  );
}

export function OfferStoryCard({ offer }) {
  return (
    <Link
      to={`/offer/${offer.slug}`}
      className="group relative block w-[min(72vw,240px)] flex-shrink-0 snap-start as-card as-press aspect-[3/4] sm:w-[260px] md:w-[280px]"
    >
      <img
        src={offer.coverImage}
        alt={offer.brand}
        className="as-story-media absolute inset-0 h-full w-full object-cover object-top"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">{offer.category}</p>
        <p className="mt-0.5 text-[17px] font-bold tracking-tight text-white sm:text-[18px]">{offer.brand}</p>
        <p className="text-[13px] text-white/80">Up to ${offer.rewardValue} OFF</p>
        <span className="mt-3 inline-flex h-8 items-center rounded-lg bg-white px-3 text-[12px] font-semibold text-dg-navy">
          Show Coupon
        </span>
      </div>
    </Link>
  );
}
