import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { IconSearch } from "@/components/PlatformIcons";
import BrandLogo from "@/components/BrandLogo";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/#today", label: "Today" },
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

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-[#F5F5F7]/80 backdrop-blur-[20px] border-b border-black/[0.06]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[52px] max-w-[980px] items-center justify-between gap-3 safe-px lg:px-6">
        <BrandLogo size="md" className="min-w-0" />

        <nav className="hidden md:flex items-center gap-5 lg:gap-6">
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
          className="md:hidden as-press inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.06] text-dg-navy"
          aria-label={open ? "Close" : "Menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/[0.06] bg-[#F5F5F7] safe-px pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
          {tabs.map((t) => (
            <a
              key={t.label}
              href={t.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3.5 text-[16px] font-medium text-dg-navy"
            >
              {t.label}
            </a>
          ))}
          <a
            href="/#apps"
            onClick={() => setOpen(false)}
            className="as-get-btn-solid mt-2 mb-2 flex h-11 w-full items-center justify-center gap-1.5 text-[14px]"
          >
            <IconSearch size={14} />
            Browse Coupons
          </a>
        </div>
      )}
    </header>
  );
}
