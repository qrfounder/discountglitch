import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { IconSearch } from "@/components/PlatformIcons";
import BrandLogo from "@/components/BrandLogo";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Today" },
  { href: "/#apps", label: "Apps" },
  { href: "/#guide", label: "Guide" },
  { href: "/#help", label: "Help" },
];

export default function GlassNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-[#F5F5F7]/80 backdrop-blur-[20px] border-b border-black/[0.06]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[52px] max-w-[980px] items-center justify-between safe-px lg:px-6">
        <BrandLogo size="md" />

        <nav className="hidden sm:flex items-center gap-6">
          {tabs.map((t) => (
            <a
              key={t.label}
              href={t.href}
              className="text-[12px] font-normal text-dg-muted hover:text-dg-navy transition-colors"
            >
              {t.label}
            </a>
          ))}
          <a href="/#apps" className="as-get-btn-solid h-8 gap-1.5 px-3.5 text-[12px]">
            <IconSearch size={12} />
            Browse Coupons
          </a>
        </nav>

        <button
          type="button"
          className="sm:hidden as-press inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.06] text-dg-navy"
          aria-label={open ? "Close" : "Menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {open && (
        <div className="sm:hidden border-t border-black/[0.06] bg-[#F5F5F7] px-4 pb-4 pt-2">
          {tabs.map((t) => (
            <a
              key={t.label}
              href={t.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 text-[15px] font-medium text-dg-navy"
            >
              {t.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
