import { Image } from "@/components/ui/image";
import { offers } from "@/lib/offers";

const stats = [
  { label: "Avg. listed", value: "$668" },
  { label: "Brand coupons", value: String(offers.length) },
  { label: "Entry starts", value: "12.8k" },
];

export default function InsightsCard() {
  return (
    <div className="as-card">
      <div className="relative h-[116px] overflow-hidden sm:h-auto sm:aspect-[2/1]">
        <Image
          src="/widgets/insights.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-right"
          fallback={<div className="absolute inset-0 bg-[#1D1D1F]" />}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">Snapshot</p>
          <p className="mt-1 text-[20px] font-bold tracking-tight text-white">Insights</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 p-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-dg-surface px-2.5 py-3 text-center">
            <p className="text-[18px] font-bold tabular-nums tracking-tight text-dg-navy sm:text-[20px]">
              {stat.value}
            </p>
            <p className="mt-0.5 text-[10px] font-medium leading-snug text-dg-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <p className="px-4 pb-4 text-[10px] leading-relaxed text-dg-muted">
        Outcomes aren’t guaranteed. Sponsors set eligibility and fulfillment.
      </p>
    </div>
  );
}
