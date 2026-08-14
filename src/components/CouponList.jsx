/**
 * Coupon tier cards + “Show Coupon” CTA (CPA funnel entry).
 */
export default function CouponList({ offer, onShowCoupon }) {
  const couponsLeft = Math.max(5, Math.min(48, Math.floor(offer.supplyLeft / 40)));
  const usesBase = Math.max(800, Math.floor(offer.ratingsCount * 1.1));

  const tiers = [
    {
      id: "full",
      amount: `$${offer.rewardValue} OFF`,
      title: `$${offer.rewardValue} OFF ${offer.brand}`,
      verified: "Verified TODAY",
      uses: usesBase,
    },
    {
      id: "half",
      amount: `$${Math.round(offer.rewardValue * 0.5)} OFF`,
      title: `$${Math.round(offer.rewardValue * 0.5)} OFF ${offer.brand}`,
      verified: "Verified TODAY",
      uses: Math.floor(usesBase * 0.55),
    },
    {
      id: "all",
      amount: "100% OFF",
      title: `100% OFF ${offer.brand}`,
      verified: "Verified 1 Day Ago",
      uses: Math.floor(usesBase * 0.35),
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="inline-flex items-center justify-center rounded-lg border border-dashed border-[#C45C5C] bg-[#F8E8E8] px-5 py-2.5">
          <p className="text-[15px] font-bold text-dg-navy">
            Coupons Left: <span className="tabular-nums">{couponsLeft}</span>
          </p>
        </div>
        <div className="sm:text-right">
          <div className="flex items-center gap-1.5 sm:justify-end">
            <span className="flex text-[#FF9F0A]" aria-hidden>
              {"★★★★★".split("").map((s, i) => (
                <span key={i} className="text-[14px] leading-none">
                  {s}
                </span>
              ))}
            </span>
            <span className="text-[13px] font-semibold text-dg-navy">
              {offer.ratingsCount.toLocaleString()} Ratings
            </span>
          </div>
          <p className="mt-1 text-[11px] text-dg-muted italic">
            Note: Rating is only available for registered users.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {tiers.map((tier) => (
          <article
            key={tier.id}
            className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:gap-4 sm:p-4"
          >
            <div className="flex w-full flex-shrink-0 items-center justify-center sm:w-[100px] sm:justify-start">
              <p className="text-center text-[20px] font-extrabold leading-[1.05] tracking-tight text-[#7C3AED] sm:text-[24px]">
                {tier.amount.split(" ").map((part, i) => (
                  <span key={i} className="block">
                    {part}
                  </span>
                ))}
              </p>
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <h3 className="text-[16px] font-bold text-dg-navy sm:text-[17px]">{tier.title}</h3>
              <p className="mt-1 text-[12px] text-dg-muted sm:text-[13px]">
                {tier.verified}{" "}
                <span className="text-dg-muted/80">|</span> {tier.uses.toLocaleString()} uses today
              </p>
            </div>

            <button
              type="button"
              onClick={() => onShowCoupon(tier)}
              className="as-press h-11 w-full flex-shrink-0 rounded-lg bg-[#1D1D1F] px-5 text-[14px] font-semibold text-white hover:bg-[#2D2D2F] sm:h-12 sm:w-auto sm:min-w-[140px]"
            >
              Show Coupon
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
