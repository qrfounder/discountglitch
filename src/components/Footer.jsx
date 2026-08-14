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
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px]">
            <a href="/#apps" className="text-dg-blue">
              Apps
            </a>
            <a href="/#guide" className="text-dg-blue">
              Guide
            </a>
            <a href="/#help" className="text-dg-blue">
              Help
            </a>
            <Link to="/privacy" className="text-dg-blue">
              Privacy
            </Link>
            <Link to="/terms" className="text-dg-blue">
              Terms
            </Link>
            <a href="mailto:support@discountglitch.com" className="text-dg-blue">
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
