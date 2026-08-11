import { useEffect } from "react";
import { trackPageView } from "@/lib/tracking";

export default function PageTracker() {
  useEffect(() => {
    trackPageView();
  }, []);

  return null;
}
