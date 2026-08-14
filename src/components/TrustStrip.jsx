import {
  IconShieldCheck,
  IconLockFill,
  IconEye,
  IconDocBadge,
} from "@/components/PlatformIcons";

const apps = [
  { Icon: IconShieldCheck, name: "Trust", tagline: "Partner-routed offers", color: "#0071E3" },
  { Icon: IconDocBadge, name: "Verify", tagline: "3-step eligibility", color: "#5856D6" },
  { Icon: IconLockFill, name: "Privacy", tagline: "No fee to start", color: "#34C759" },
  { Icon: IconEye, name: "Clarity", tagline: "Deals required — stated", color: "#FF9500" },
];

export default function TrustStrip() {
  return (
    <section className="pb-6" aria-label="Feature apps">
      <div className="mx-auto max-w-[980px] safe-px lg:px-6">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
          {apps.map((app) => (
            <div
              key={app.name}
              className="as-press flex min-w-0 items-center gap-2.5 rounded-[18px] bg-white p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:gap-3 sm:p-3"
            >
              <div
                className="as-app-icon flex h-10 w-10 flex-shrink-0 items-center justify-center text-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] sm:h-12 sm:w-12"
                style={{ background: app.color }}
              >
                <span className="relative z-[2]">
                  <app.Icon size={20} />
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-dg-navy sm:text-[14px]">{app.name}</p>
                <p className="truncate text-[10px] text-dg-muted sm:text-[11px]">{app.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
