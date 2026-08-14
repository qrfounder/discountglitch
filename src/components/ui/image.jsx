import { useState } from "react";
import { cn } from "@/lib/utils";

export function Image({
  src,
  alt = "",
  className,
  fallback,
  loading = "lazy",
  fetchPriority,
  ...props
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return fallback ? (
      <div className={cn("flex items-center justify-center", className)}>{fallback}</div>
    ) : (
      <div className={cn("bg-dg-surface", className)} aria-hidden />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={() => setFailed(true)}
      className={className}
      {...props}
    />
  );
}
