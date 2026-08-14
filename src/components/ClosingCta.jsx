export default function ClosingCta() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-[980px] safe-px lg:px-6">
        <div className="as-card relative overflow-hidden bg-gradient-to-br from-[#0071E3] to-[#5856D6] p-8 sm:p-10 text-white">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-white/70">Get Started</p>
          <h2 className="mt-1 text-[28px] sm:text-[34px] font-bold tracking-tight leading-tight max-w-md">
            Your next coupon is one tap away.
          </h2>
          <p className="mt-3 max-w-sm text-[15px] text-white/75">
            Browse · Show Coupon · Continue to partner deals.
          </p>
          <a
            href="#apps"
            className="as-press mt-6 inline-flex h-10 items-center rounded-full bg-white px-5 text-[14px] font-semibold text-dg-blue"
          >
            Browse Coupons
          </a>
        </div>
      </div>
    </section>
  );
}
