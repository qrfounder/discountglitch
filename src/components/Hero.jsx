import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { offers } from "@/lib/offers";
import { IconArrowRight } from "@/components/PlatformIcons";

const featured = offers.find((o) => o.slug === "amazon") || offers[0];

function formatToday(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function msUntilNextMidnight() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next.getTime() - now.getTime();
}

export default function Hero() {
  const [todayLabel, setTodayLabel] = useState(() => formatToday());

  useEffect(() => {
    let timeoutId;

    const scheduleMidnightRefresh = () => {
      timeoutId = window.setTimeout(() => {
        setTodayLabel(formatToday());
        scheduleMidnightRefresh();
      }, msUntilNextMidnight() + 50);
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        setTodayLabel(formatToday());
      }
    };

    scheduleMidnightRefresh();
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section className="pt-[72px] pb-8">
      <div className="mx-auto max-w-[980px] safe-px lg:px-6">
        <div className="mb-6">
          <h1 className="as-section-title">Today</h1>
          <p className="mt-1 text-[15px] text-dg-muted">{todayLabel}</p>
        </div>

        <Link
          to={`/offer/${featured.slug}`}
          className="group relative block as-card as-press aspect-[4/5] sm:aspect-[16/10] overflow-hidden"
        >
          <Image
            src={featured.coverImage ? `${featured.coverImage.split("?")[0]}?v=3` : "/hero-rewards.jpg"}
            alt={featured.headline}
            loading="eager"
            className="as-story-media absolute inset-0 h-full w-full object-cover object-top"
            fallback={<div className="absolute inset-0 bg-dg-navy" />}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/70">
              App of the Day
            </p>
            <h2 className="mt-1 text-[28px] sm:text-[34px] font-bold tracking-tight text-white leading-[1.1] max-w-md">
              {featured.headline}
            </h2>
            <p className="mt-2 max-w-sm text-[15px] text-white/75 leading-snug">
              Partner-verified entry path. No payment to discountglitch.
            </p>
            <span className="mt-5 inline-flex h-9 items-center gap-1.5 rounded-lg bg-white px-4 text-[13px] font-semibold text-dg-navy as-press">
              Show Coupon
              <IconArrowRight size={13} />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
