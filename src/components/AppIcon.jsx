import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";

/** Offer thumbnail — 3:2 rectangle matching generated promo art. */
export default function AppIcon({ offer, size = "md", className }) {
  const sizes = {
    sm: "h-12 w-[72px]",
    md: "h-16 w-24",
    lg: "h-[72px] w-[108px] sm:h-20 sm:w-[120px]",
    xl: "h-[88px] w-[132px] sm:h-[100px] sm:w-[150px]",
  };

  const letterFallback = (
    <span className="text-[22px] font-bold text-white drop-shadow-sm sm:text-[26px]">
      {offer.brand.slice(0, 1)}
    </span>
  );

  return (
    <div
      className={cn(
        "as-offer-thumb flex flex-shrink-0 items-center justify-center overflow-hidden",
        "shadow-[0_2px_8px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.04)]",
        sizes[size],
        className
      )}
      style={{
        background: `linear-gradient(160deg, ${offer.theme.from} 0%, ${offer.theme.to} 100%)`,
      }}
      aria-hidden
    >
      <Image
        src={offer.cardImage ? `${offer.cardImage.split("?")[0]}?v=2` : undefined}
        alt=""
        className="h-full w-full object-contain object-center"
        fallback={letterFallback}
      />
    </div>
  );
}
