import { IconListBullet, IconCheckSeal, IconSparkles } from "@/components/PlatformIcons";

const steps = [
  {
    Icon: IconListBullet,
    title: "Browse coupons",
    body: "Pick a brand offer from the catalog.",
    color: "#0071E3",
  },
  {
    Icon: IconCheckSeal,
    title: "Show Coupon",
    body: "Reveal your code, finish unlock steps, then complete 4–5 partner deals for the full prize.",
    color: "#5856D6",
  },
  {
    Icon: IconSparkles,
    title: "Finish 4–5 deals",
    body: "On the partner page, complete the featured deals — that’s how most successful claimers win big.",
    color: "#FF9500",
  },
];

export default function HowItWorks() {
  return (
    <section id="guide" className="scroll-mt-24 py-10">
      <div className="mx-auto max-w-[980px] safe-px lg:px-6">
        <div className="mb-5">
          <p className="text-[12px] font-semibold text-dg-blue">Guide</p>
          <h2 className="as-section-title text-[24px] sm:text-[28px]">How coupons work</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {steps.map((s, i) => (
            <article key={s.title} className="as-card as-press p-5">
              <div className="mb-4 flex items-center justify-between">
                <div
                  className="as-app-icon flex h-14 w-14 items-center justify-center text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                  style={{ background: s.color }}
                >
                  <span className="relative z-[2]">
                    <s.Icon size={26} />
                  </span>
                </div>
                <span className="text-[13px] font-semibold tabular-nums text-dg-muted">{i + 1}</span>
              </div>
              <h3 className="text-[17px] font-semibold text-dg-navy">{s.title}</h3>
              <p className="mt-1.5 text-[13px] leading-snug text-dg-muted">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
