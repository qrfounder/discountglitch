import { Link } from "react-router-dom";
import GlassNav from "@/components/GlassNav";
import Footer from "@/components/Footer";

export default function LegalLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-dg-canvas">
      <GlassNav />
      <main className="mx-auto w-full max-w-[980px] pt-[72px] pb-16 safe-px lg:px-6">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-[15px] font-medium text-dg-blue"
        >
          ← Back to home
        </Link>
        <h1 className="as-section-title mt-3 text-[24px] sm:text-[28px]">{title}</h1>
        <div className="mt-6 max-w-[640px] space-y-4 text-[15px] leading-relaxed text-dg-muted">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
