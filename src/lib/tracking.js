const STORAGE_KEY = "dg_visitor_id";

function getVisitorId() {
  let id = sessionStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

async function sendEvent(payload) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        path: window.location.pathname,
        referrer: document.referrer || null,
        ...payload,
      }),
      keepalive: payload.event === "cta_click" || payload.event === "lead_submit",
    });
  } catch {
    // Non-blocking analytics
  }
}

export function trackPageView() {
  return sendEvent({ event: "page_view" });
}

export function trackCtaClick() {
  return sendEvent({ event: "cta_click" });
}

export function submitLead({ email, age }) {
  return sendEvent({ event: "lead_submit", email, age });
}
