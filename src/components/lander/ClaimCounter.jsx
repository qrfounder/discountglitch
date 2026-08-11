import { useEffect, useMemo, useState } from "react";
import { randomClaimCount } from "@/lib/utils";

export default function ClaimCounter() {
  const target = useMemo(() => randomClaimCount(), []);
  const [count, setCount] = useState(() => target - 28);

  useEffect(() => {
    let frame;
    const from = target - 28;
    const start = performance.now();
    const duration = 1800;

    const animate = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(from + (target - from) * eased));
      if (t < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  useEffect(() => {
    let timer;

    const tick = () => {
      setCount((c) => c + 1);
      timer = setTimeout(tick, 14000 + Math.random() * 16000);
    };

    timer = setTimeout(tick, 14000 + Math.random() * 16000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p className="mt-3 flex items-center justify-center gap-2 text-sm text-dg-muted">
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="tabular-nums">
        {count.toLocaleString()} people started today
      </span>
    </p>
  );
}
