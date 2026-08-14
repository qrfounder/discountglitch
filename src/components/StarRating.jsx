import { IconStar } from "@/components/PlatformIcons";
import { cn } from "@/lib/utils";

/** App Store rating stars — Apple system orange #FF9F0A */
export default function StarRating({ value = 0, size = 12, className }) {
  const full = Math.floor(value);
  const partial = value - full >= 0.5;

  return (
    <div className={cn("inline-flex items-center gap-[1px]", className)} aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && partial);
        return <IconStar key={i} filled={filled} size={size} />;
      })}
    </div>
  );
}
