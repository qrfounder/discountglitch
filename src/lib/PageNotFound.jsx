import { Link } from "react-router-dom";
import GlassNav from "@/components/GlassNav";
import Footer from "@/components/Footer";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <GlassNav />
      <main className="flex-1 flex items-center justify-center px-4 pt-28 pb-16">
        <div className="text-center max-w-md">
          <p className="text-sm font-semibold tracking-[0.16em] text-dg-gold uppercase mb-3">404</p>
          <h1 className="font-serif-display text-3xl font-semibold text-dg-navy tracking-tight mb-3">
            Page not found
          </h1>
          <p className="text-dg-muted mb-8 leading-relaxed">
            That link doesn’t match a live reward or page. Head back to browse verified offers.
          </p>
          <Link
            to="/"
            className="inline-flex h-12 items-center justify-center rounded-full dg-cta px-7 text-sm font-semibold text-white"
          >
            Back to rewards
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
