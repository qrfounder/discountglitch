import { Link } from "react-router-dom";
import GlassNav from "@/components/GlassNav";
import Footer from "@/components/Footer";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-dg-canvas">
      <GlassNav />
      <main className="flex-1 flex items-center justify-center safe-px pt-[72px] pb-16">
        <div className="text-center max-w-md">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-dg-blue uppercase mb-3">404</p>
          <h1 className="as-section-title text-[28px] sm:text-[32px] mb-3">Page not found</h1>
          <p className="text-[15px] text-dg-muted mb-8 leading-relaxed">
            That link doesn’t match a live reward or page. Head back to browse verified offers.
          </p>
          <Link
            to="/"
            className="as-get-btn-solid inline-flex h-11 items-center justify-center px-7 text-[14px]"
          >
            Back to rewards
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
