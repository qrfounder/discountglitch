import {
  IconShieldCheck,
  IconLockFill,
  IconEye,
  IconScale,
} from "@/components/PlatformIcons";

const modules = [
  {
    Icon: IconShieldCheck,
    name: "Partner Route",
    body: "We bridge you to sponsor pages — no fake codes.",
    color: "#0071E3",
  },
  {
    Icon: IconLockFill,
    name: "No Fee",
    body: "discountglitch never charges to start an entry path.",
    color: "#34C759",
  },
  {
    Icon: IconEye,
    name: "Requirements",
    body: "Sponsored deals are typically required. Stated upfront.",
    color: "#FF9500",
  },
  {
    Icon: IconScale,
    name: "Disclaimers",
    body: "Brand names identify categories. Not affiliations.",
    color: "#5856D6",
  },
];

export default function TrustSection() {
  return (
    <section id="trust" className="scroll-mt-24 py-10">
      <div className="mx-auto max-w-[980px] safe-px lg:px-6">
        <p className="text-[12px] font-semibold text-dg-blue">Trust & Safety</p>
        <h2 className="as-section-title text-[24px] sm:text-[28px] mb-5">Built-in safeguards</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {modules.map((m) => (
            <div key={m.name} className="as-card as-press flex gap-3 p-3.5 sm:gap-4 sm:p-4">
              <div
                className="as-app-icon flex h-12 w-12 flex-shrink-0 items-center justify-center text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] sm:h-14 sm:w-14"
                style={{ background: m.color }}
              >
                <span className="relative z-[2]">
                  <m.Icon size={26} />
                </span>
              </div>
              <div>
                <p className="text-[16px] font-semibold text-dg-navy">{m.name}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-dg-muted">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
