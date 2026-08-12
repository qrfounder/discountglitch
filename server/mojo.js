import express from "express";
import db from "./db.js";
import { authMiddleware, checkPassword, signToken } from "./auth.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { password } = req.body || {};

  if (!process.env.MOJO_PASSWORD) {
    return res.status(503).json({ error: "Admin panel not configured" });
  }

  if (!checkPassword(password)) {
    return res.status(401).json({ error: "Invalid password" });
  }

  res.json({ token: signToken() });
});

router.get("/stats", authMiddleware, (_req, res) => {
  const stats = db
    .prepare(
      `
    SELECT
      COUNT(*) AS total_visitors,
      SUM(CASE WHEN cta_clicked = 1 THEN 1 ELSE 0 END) AS cta_clicks,
      SUM(CASE WHEN email IS NOT NULL AND email != '' THEN 1 ELSE 0 END) AS leads,
      SUM(page_views) AS total_page_views
    FROM visitors
  `
    )
    .get();

  const clickRate =
    stats.total_visitors > 0
      ? Math.round((stats.cta_clicks / stats.total_visitors) * 100)
      : 0;

  res.json({
    totalVisitors: stats.total_visitors || 0,
    ctaClicks: stats.cta_clicks || 0,
    leads: stats.leads || 0,
    totalPageViews: stats.total_page_views || 0,
    clickRate,
  });
});

router.get("/visitors", authMiddleware, (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 200, 500);

  const rows = db
    .prepare(
      `
    SELECT
      id, ip, city, region, country, device, browser, os,
      referrer, path, page_views, cta_clicked, email, age,
      first_seen, last_seen
    FROM visitors
    ORDER BY last_seen DESC
    LIMIT ?
  `
    )
    .all(limit);

  res.json({ visitors: rows });
});

router.delete("/visitors", authMiddleware, (_req, res) => {
  db.prepare("DELETE FROM visitors").run();
  res.json({ ok: true });
});

export default router;
