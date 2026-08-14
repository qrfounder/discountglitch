import { useId } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

function TicketMark({ className }) {
  const uid = useId().replace(/:/g, "");
  const bg = `${uid}-bg`;
  const sheen = `${uid}-sheen`;

  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={bg} x1="24" y1="8" x2="104" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A84FF" />
          <stop offset="0.55" stopColor="#0071E3" />
          <stop offset="1" stopColor="#0058B0" />
        </linearGradient>
        <linearGradient id={sheen} x1="64" y1="8" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="28.5" fill={`url(#${bg})`} />
      <rect width="128" height="64" rx="28.5" fill={`url(#${sheen})`} />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M30 46c0-4.4 3.6-8 8-8h52c4.4 0 8 3.6 8 8v8.2c-3.3.9-5.7 3.9-5.7 7.4s2.4 6.5 5.7 7.4V84c0 4.4-3.6 8-8 8H38c-4.4 0-8-3.6-8-8v-7c3.3-.9 5.7-3.9 5.7-7.4S33.3 55.1 30 54.2V46zm18 6.5a3.5 3.5 0 100 7h32a3.5 3.5 0 100-7H48zm0 16a3.5 3.5 0 100 7h20a3.5 3.5 0 100-7H48z"
      />
    </svg>
  );
}

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
      <TicketMark
        className={cn(
          icon,
          "flex-shrink-0 rounded-[22.5%] shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
        )}
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
