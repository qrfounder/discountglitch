import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function BrandLogo({
  to = "/",
  size = "md",
  showWordmark = true,
  className,
  onClick,
}) {
  const icon = {
    sm: "h-7 w-7",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }[size];

  const word = {
    sm: "text-[15px]",
    md: "text-[17px]",
    lg: "text-[21px]",
  }[size];

  const content = (
    <>
      <img
        src="/logo.svg"
        alt=""
        width={40}
        height={40}
        className={cn(icon, "flex-shrink-0 rounded-[22.5%] shadow-[0_1px_3px_rgba(0,0,0,0.12)]")}
        draggable={false}
      />
      {showWordmark && (
        <span className={cn("dg-wordmark whitespace-nowrap", word)}>
          discount<span className="dg-wordmark-accent">glitch</span>
        </span>
      )}
    </>
  );

  if (to === null || to === false) {
    return (
      <span className={cn("inline-flex items-center gap-2.5", className)} aria-label="discountglitch">
        {content}
      </span>
    );
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn("inline-flex items-center gap-2.5 as-press", className)}
      aria-label="discountglitch home"
    >
      {content}
    </Link>
  );
}
