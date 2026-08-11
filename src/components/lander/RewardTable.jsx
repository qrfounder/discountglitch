export default function RewardTable() {
  return (
    <section className="border-y border-zinc-200/80 bg-white px-5 py-12">
      <div className="mx-auto max-w-lg">
        <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900">
          Why finish 4–5 deals?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Partner programs fund rewards when members complete a set number of
          qualified deals. Completing only 1–2 usually means a much smaller
          reward — or none — until the featured requirement is met.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200">
          <div className="grid grid-cols-2 bg-zinc-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <span>Effort</span>
            <span>Typical outcome</span>
          </div>
          {[
            ["1–2 deals", "Low / partial credit"],
            ["3 deals", "Limited reward tier"],
            ["4–5 featured deals", "Qualifies for higher Costco tiers"],
            ["More deals (optional)", "Higher levels on partner ladder"],
          ].map(([effort, outcome], i) => (
            <div
              key={effort}
              className={`grid grid-cols-2 px-4 py-3.5 text-sm ${
                i === 2
                  ? "bg-teal-50/80 font-semibold text-zinc-900"
                  : "border-t border-zinc-100 text-zinc-700"
              }`}
            >
              <span>{effort}</span>
              <span>{outcome}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Exact levels and amounts are shown on the partner page after you
          continue. Values can vary by program and eligibility.
        </p>
      </div>
    </section>
  );
}
