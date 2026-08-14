import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const go = () => document.getElementById(id)?.scrollIntoView({ block: "start" });
      go();
      requestAnimationFrame(go);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
