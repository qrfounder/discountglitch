import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";

export function getClientIp(req) {
  const cf = req.headers["cf-connecting-ip"];
  if (cf) return String(cf).split(",")[0].trim();

  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return String(forwarded).split(",")[0].trim();

  return req.socket.remoteAddress || "unknown";
}

export function getGeo(ip) {
  const clean = ip.replace(/^::ffff:/, "");
  const lookup = geoip.lookup(clean);

  if (!lookup) {
    return { city: "Unknown", region: "—", country: "—" };
  }

  return {
    city: lookup.city || "Unknown",
    region: lookup.region || "—",
    country: lookup.country || "—",
  };
}

export function parseUserAgent(userAgent = "") {
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  const deviceType = device.type || "desktop";
  const label =
    deviceType === "mobile"
      ? "Mobile"
      : deviceType === "tablet"
        ? "Tablet"
        : "Desktop";

  return {
    device: label,
    browser: [browser.name, browser.version?.split(".")[0]].filter(Boolean).join(" "),
    os: [os.name, os.version?.split(".")[0]].filter(Boolean).join(" "),
  };
}
