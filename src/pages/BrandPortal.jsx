import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOffer, offers } from "@/lib/offers";
import GlassNav from "@/components/GlassNav";
import Footer from "@/components/Footer";
import VerificationModal from "@/components/VerificationModal";
import SweepstakeCard from "@/components/SweepstakeCard";
import AppIcon from "@/components/AppIcon";
import CouponList from "@/components/CouponList";
import PageTracker from "@/components/PageTracker";
import { Image } from "@/components/ui/image";
import { IconChevronLeft, IconShieldCheck, IconLockFill } from "@/components/PlatformIcons";

export default function BrandPortal() {
  const { slug } = useParams();
  const offer = getOffer(slug);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!offer) {
    return (
      <div className="min-h-screen bg-dg-canvas">
        <GlassNav />
        <div className="flex min-h-[70vh] items-center justify-center px-4 pt-[72px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-dg-navy mb-3">Offer not found</h1>
            <Link to="/#apps" className="text-dg-blue text-[15px] font-medium">
              ← Back to offers
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const related = offers.filter((o) => o.slug !== offer.slug).slice(0, 4);
  const openCoupon = (tier) => {
    setSelectedTier(tier);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-dg-canvas">
      <PageTracker />
      <GlassNav />

      <main className="pt-[64px] pb-16 sm:pt-[72px]">
        <div className="mx-auto max-w-[980px] safe-px lg:px-6">
          <Link
            to="/#apps"
            className="mb-5 inline-flex items-center gap-0.5 text-[15px] text-dg-blue font-medium as-press"
          >
            <IconChevronLeft size={18} /> Offers
          </Link>

          {/* Brand header */}
          <div className="mb-6 flex items-start gap-3 sm:mb-8 sm:gap-4">
            <AppIcon offer={offer} size="lg" />
            <div className="min-w-0 flex-1">
            <h1 className="text-[22px] sm:text-[28px] font-bold tracking-tight text-dg-navy leading-tight">
                {offer.brand} Coupons
              </h1>
              <p className="mt-1 text-[15px] text-dg-muted">{offer.headline}</p>
              <p className="mt-2 text-[13px] text-dg-muted leading-relaxed max-w-xl">{offer.sub}</p>
            </div>
          </div>

          {/* Preview image */}
          <div className="as-card mb-8 overflow-hidden group">
            <div className="aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
              <Image
                src={offer.coverImage}
                alt={`${offer.brand} offer`}
                className="as-story-media h-full w-full object-cover object-top"
                loading="eager"
                fallback={
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${offer.theme.from}, ${offer.theme.to})`,
                    }}
                  >
                    <span className="text-3xl font-bold text-white">{offer.brand}</span>
                  </div>
                }
              />
            </div>
          </div>

          {/* Coupon list — primary CPA CTAs */}
          <section className="mb-10" aria-label="Available coupons">
            <h2 className="mb-4 text-[20px] font-bold text-dg-navy">Available coupons</h2>
            <CouponList offer={offer} onShowCoupon={openCoupon} />
          </section>

          <div className="mb-10 grid gap-3 sm:grid-cols-2">
            <div className="as-card flex gap-3 p-4">
              <IconShieldCheck size={20} className="flex-shrink-0 text-dg-blue" />
              <div>
                <p className="text-[14px] font-semibold text-dg-navy">Verified coupons</p>
                <p className="text-[12px] text-dg-muted leading-snug">
                  Show Coupon opens unlock steps, then the partner page — finish 4–5 deals for the full prize.
                </p>
              </div>
            </div>
            <div className="as-card flex gap-3 p-4">
              <IconLockFill size={20} className="flex-shrink-0 text-dg-green" />
              <div>
                <p className="text-[14px] font-semibold text-dg-navy">No fee to start</p>
                <p className="text-[12px] text-dg-muted leading-snug">
                  discountglitch doesn’t charge. Partner deals may be required to finish.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-[18px] font-bold text-dg-navy mb-2">About this offer</h2>
            <p className="text-[14px] leading-relaxed text-dg-muted">{offer.about}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-dg-muted">{offer.tips}</p>
          </div>

          <div>
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-[18px] font-bold text-dg-navy">More offers</h2>
              <Link to="/#apps" className="text-[14px] text-dg-blue">
                See All
              </Link>
            </div>
            <div className="space-y-2.5">
              {related.map((o) => (
                <SweepstakeCard key={o.slug} offer={o} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <VerificationModal
        offer={offer}
        open={modalOpen}
        selectedTier={selectedTier}
        onClose={() => {
          setModalOpen(false);
          setSelectedTier(null);
        }}
      />
    </div>
  );
}
