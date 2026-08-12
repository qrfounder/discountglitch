import express from "express";
import db from "./db.js";
import { getClientIp, getGeo, parseUserAgent } from "./geo.js";

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const upsertVisitor = db.prepare(`
  INSERT INTO visitors (
    id, ip, city, region, country, user_agent, device, browser, os,
    referrer, path, page_views, cta_clicked, email, age, first_seen, last_seen
  ) VALUES (
    @id, @ip, @city, @region, @country, @user_agent, @device, @browser, @os,
    @referrer, @path, @page_views, @cta_clicked, @email, @age, @first_seen, @last_seen
  )
  ON CONFLICT(id) DO UPDATE SET
    ip = excluded.ip,
    city = excluded.city,
    region = excluded.region,
    country = excluded.country,
    user_agent = excluded.user_agent,
    device = excluded.device,
    browser = excluded.browser,
    os = excluded.os,
    referrer = COALESCE(excluded.referrer, visitors.referrer),
    path = excluded.path,
    page_views = visitors.page_views + @page_views_delta,
    cta_clicked = MAX(visitors.cta_clicked, excluded.cta_clicked),
    email = COALESCE(excluded.email, visitors.email),
    age = COALESCE(excluded.age, visitors.age),
    last_seen = excluded.last_seen
`);

router.post("/track", (req, res) => {
  const {
    visitorId,
    event,
    path: pagePath,
    referrer,
    email,
    age,
  } = req.body || {};

  if (!visitorId || typeof visitorId !== "string" || visitorId.length > 64) {
    return res.status(400).json({ error: "Invalid visitor id" });
  }

  if (!["page_view", "cta_click", "lead_submit"].includes(event)) {
    return res.status(400).json({ error: "Invalid event" });
  }

  let cleanEmail = null;
  let cleanAge = null;

  if (event === "lead_submit") {
    const trimmed = typeof email === "string" ? email.trim().toLowerCase() : "";
    const ageNum = Number(age);

    if (!EMAIL_RE.test(trimmed) || trimmed.length > 254) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 120) {
      return res.status(400).json({ error: "Invalid age" });
    }

    cleanEmail = trimmed;
    cleanAge = ageNum;
  }

  const ip = getClientIp(req);
  const geo = getGeo(ip);
  const userAgent = req.headers["user-agent"] || "";
  const ua = parseUserAgent(userAgent);
  const now = new Date().toISOString();

  upsertVisitor.run({
    id: visitorId,
    ip,
    city: geo.city,
    region: geo.region,
    country: geo.country,
    user_agent: userAgent.slice(0, 512),
    device: ua.device,
    browser: ua.browser || "Unknown",
    os: ua.os || "Unknown",
    referrer: referrer?.slice(0, 512) || null,
    path: pagePath?.slice(0, 256) || "/",
    page_views: event === "page_view" ? 1 : 0,
    cta_clicked: event === "cta_click" || event === "lead_submit" ? 1 : 0,
    email: cleanEmail,
    age: cleanAge,
    first_seen: now,
    last_seen: now,
    page_views_delta: event === "page_view" ? 1 : 0,
  });

  res.json({ ok: true });
});

export default router;
