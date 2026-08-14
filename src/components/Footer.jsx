import { Link } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-dg-canvas py-10">
      <div className="mx-auto max-w-[980px] safe-px lg:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <BrandLogo size="md" />
            <p className="mt-3 max-w-xs text-[12px] leading-relaxed text-dg-muted">
              Partner reward routing. Not affiliated with named retailers.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[13px]">
            <a href="/#apps" className="inline-flex min-h-10 items-center text-dg-blue">
              Apps
            </a>
            <a href="/#guide" className="inline-flex min-h-10 items-center text-dg-blue">
              Guide
            </a>
            <a href="/#help" className="inline-flex min-h-10 items-center text-dg-blue">
              Help
            </a>
            <Link to="/privacy" className="inline-flex min-h-10 items-center text-dg-blue">
              Privacy
            </Link>
            <Link to="/terms" className="inline-flex min-h-10 items-center text-dg-blue">
              Terms
            </Link>
            <a href="mailto:support@discountglitch.com" className="inline-flex min-h-10 items-center text-dg-blue">
              Support
            </a>
          </div>
        </div>
        <p className="mt-8 text-[11px] leading-relaxed text-dg-muted">
          © {new Date().getFullYear()} discountglitch. Brand names are for category identification only.
          Reward fulfillment is determined by third-party sponsors.
        </p>
      </div>
    </footer>
  );
}
