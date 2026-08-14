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
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-1 px-1">
          {apps.map((app) => (
            <div
              key={app.name}
              className="as-press flex min-w-[168px] flex-1 items-center gap-3 rounded-[18px] bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              <div
                className="as-app-icon flex h-12 w-12 flex-shrink-0 items-center justify-center text-white shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
                style={{ background: app.color }}
              >
                <span className="relative z-[2]">
                  <app.Icon size={22} />
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-dg-navy">{app.name}</p>
                <p className="truncate text-[11px] text-dg-muted">{app.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
