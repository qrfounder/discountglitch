const STORAGE_KEY = "dg_visitor_id";

function getVisitorId() {
  let id = sessionStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

async function sendEvent(event) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        event,
        path: window.location.pathname,
        referrer: document.referrer || null,
      }),
      keepalive: event === "cta_click",
    });
  } catch {
    // Non-blocking analytics
  }
}

export function trackPageView() {
  sendEvent("page_view");
}

export function trackCtaClick() {
  sendEvent("cta_click");
}
