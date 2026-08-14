import { useState } from "react";
import GlassNav from "@/components/GlassNav";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import LiveFeed from "@/components/LiveFeed";
import InsightsCard from "@/components/InsightsCard";
import SweepstakeCard, { OfferStoryCard } from "@/components/SweepstakeCard";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import FaqSection from "@/components/FaqSection";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";
import PageTracker from "@/components/PageTracker";
import { IconSearch } from "@/components/PlatformIcons";
import { offers } from "@/lib/offers";

const categories = [
  "All",
  "Marketplace",
  "Warehouse",
  "Fashion",
  "Retail",
  "Electronics",
  "Sneakers",
  "Food Delivery",
  "Beauty",
  "Athletic",
];

export default function Home() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = offers.filter((o) => {
    const cat = active === "All" || o.category === active;
    const q =
      query.trim() === "" ||
      o.brand.toLowerCase().includes(query.toLowerCase()) ||
      o.headline.toLowerCase().includes(query.toLowerCase());
    return cat && q;
  });

  const featuredRow = offers.slice(0, 6);

  return (
    <div className="min-h-screen safe-pb bg-dg-canvas">
      <PageTracker />
      <GlassNav />

      <main>
        {/* Today story */}
        <Hero />

        {/* Feature apps strip */}
        <TrustStrip />

        {/* Must-haves horizontal collection */}
        <section className="pb-8">
          <div className="mx-auto max-w-[980px] safe-px lg:px-6">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-[22px] font-bold tracking-tight text-dg-navy">Must-Haves</h2>
              <a href="#apps" className="text-[15px] font-normal text-dg-blue">
                See All
              </a>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2 -mx-1 px-1">
              {featuredRow.map((o) => (
                <OfferStoryCard key={o.slug} offer={o} />
              ))}
            </div>
          </div>
        </section>

        {/* Guide app */}
        <HowItWorks />

        {/* Apps catalog */}
        <section id="apps" className="scroll-mt-24 py-8">
          <div className="mx-auto max-w-[980px] safe-px lg:px-6">
            <div className="mb-5">
              <p className="text-[12px] font-semibold text-dg-blue">Coupons</p>
              <h2 className="as-section-title text-[24px] sm:text-[28px]">Brand Coupons</h2>
              <p className="mt-1 text-[14px] text-dg-muted">Open an offer, then tap Show Coupon to continue.</p>
            </div>

            <div className="mb-4 flex min-h-11 items-center gap-2 rounded-xl bg-black/[0.05] px-3.5">
              <IconSearch size={15} className="text-dg-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Games, Apps, and More"
                className="flex-1 bg-transparent py-2.5 text-[15px] outline-none placeholder:text-dg-muted"
                aria-label="Search"
              />
            </div>

            <div className="mb-5 flex gap-2 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-0.5 -mx-1 px-1">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={`h-8 flex-shrink-0 snap-start rounded-full px-3.5 text-[13px] font-medium transition-colors ${
                    active === c
                      ? "bg-dg-navy text-white"
                      : "bg-white text-dg-navy shadow-sm"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-5 md:gap-6">
              <div className="md:col-span-3 min-w-0 space-y-2.5">
                {filtered.map((o) => (
                  <SweepstakeCard key={o.slug} offer={o} />
                ))}
                {filtered.length === 0 && (
                  <div className="as-card p-10 text-center text-[14px] text-dg-muted">
                    No apps match your search.
                  </div>
                )}
              </div>
              <div className="md:col-span-2 min-w-0">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 md:sticky md:top-[68px]">
                  <LiveFeed />
                  <InsightsCard />
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustSection />
        <FaqSection />
        <ClosingCta />
      </main>

      <Footer />
    </div>
  );
}

