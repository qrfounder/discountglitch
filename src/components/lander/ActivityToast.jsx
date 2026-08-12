import { useEffect, useState } from "react";
import { randomActivityEvent } from "@/lib/utils";

export default function ActivityToast() {
  const [event, setEvent] = useState(() => randomActivityEvent());
  const [show, setShow] = useState(false);

  useEffect(() => {
    const enter = setTimeout(() => setShow(true), 3500);

    const cycle = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setEvent(randomActivityEvent());
        setShow(true);
      }, 320);
    }, 12000 + Math.floor(Math.random() * 4000));

    return () => {
      clearTimeout(enter);
      clearInterval(cycle);
    };
  }, []);

  return (
    <div
      className={`mt-5 transition-all duration-500 ease-out sm:mt-6 ${
        show ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      }`}
      aria-live="polite"
      aria-label="Recent activity"
    >
      <div className="w-full rounded-xl border border-dg-border bg-dg-surface px-4 py-3 text-left shadow-sm sm:px-5">
        <p className="text-[11px] font-medium uppercase tracking-wide text-dg-muted">
          Recent activity
        </p>
        <p className="mt-1.5 text-[13px] leading-snug text-dg-text sm:text-sm">
          <span className="font-semibold">{event.name}</span>
          <span className="text-dg-muted"> from {event.city}</span>
        </p>
        <p className="mt-0.5 text-[12px] text-dg-muted sm:text-[13px]">
          {event.action}.
        </p>
        <p className="mt-1 text-[10px] text-zinc-400 sm:text-[11px]">{event.time}</p>
      </div>
    </div>
  );
}
