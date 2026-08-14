# discountglitch Rewards Hub — Design Spec

**Date:** 2026-08-13  
**Status:** Approved for implementation (Approach 1)  
**Brand:** discountglitch  
**Theme:** Existing white + navy/blue (`dg-*` tokens)

## Goal

Replace the single Costco CPA lander with a multi-brand rewards hub and BrandPortal funnel, while preserving discountglitch branding, white/navy theme, Mojo analytics, legal pages, and lead capture.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Theme | Keep white + `dg-navy` / `dg-blue` (not dark SpicyDeals) |
| Catalog | Full multi-brand hub (8 offers from pasted catalog) |
| Brand name | discountglitch |
| Funnel | VerificationModal (3 Qs) → email/age lead → CPA redirect |
| Offer URLs | Per-brand `redirectUrl` with fallback to `VITE_OFFER_URL` |
| Auth / React Query | Not used |
| Approach | Clean rebuild of public marketing surface |

## Architecture

### Routes

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `Home` | Rewards hub |
| `/offer/:slug` | `BrandPortal` | Offer detail + claim |
| `/privacy` | `Privacy` | Unchanged |
| `/terms` | `Terms` | Unchanged |
| `/mojo` | `Mojo` | Unchanged |
| `*` | `PageNotFound` | Link back home |

### Funnel

```
Home (card CTA)
  → /offer/:slug (BrandPortal)
    → Begin Verification
      → VerificationModal step 1–3 (qualifying questions)
        → Lead capture (email + age)
          → submitLead + trackCtaClick
            → window.location → offer.redirectUrl || VITE_OFFER_URL
```

### Data

- `src/lib/offers.js` — catalog, `getOffer(slug)`, `qualifyingQuestions`, `liveFeedSeed`
- Themes remapped to soft brand tints on white (no ember/obsidian tokens)
- Copy refers to **discountglitch**, not SpicyDeals
- Disclaimers: not affiliated with named retailers

### Tracking

- Keep `PageTracker` on Home + BrandPortal
- Reuse `submitLead`, `trackCtaClick` from `src/lib/tracking.js`
- `goToOffer(offer?)` in `utils.js` resolves URL and fires CTA track

## UI / UX

### Visual language

- Background: white / `dg-surface`
- Type: navy (`dg-navy`) headings, `dg-text` / `dg-muted` body
- CTAs: `dg-blue` / `dg-blue-hover`, rounded-full
- Surfaces: light borders (`dg-border`), soft shadows — professional “fintech rewards” not dark glass casino
- Icons: Lucide only
- Motion: subtle fade/slide (framer-motion), respect `prefers-reduced-motion`
- Typography upgrade: keep Inter for body; add a stronger display pairing only if it stays on-brand (e.g. Inter Tight or Space Grotesk for headings) without breaking legal/Mojo pages

### Home

1. `GlassNav` → light sticky nav (blur on white), logo + Rewards + How it works + Trust
2. `Hero` — one composition: brand, headline, short support, CTA, full-bleed lifestyle image
3. Featured / Hot Drops — search + category filters + `SweepstakeCard` grid
4. `LiveFeed` sidebar + monthly stats (calm, not spammy counters)
5. `HowItWorks` — 3 clear steps
6. `TrustSection` — verification, no payment, privacy, sponsor routing
7. `Footer` — legal links, support email, non-affiliation note

### BrandPortal

- Brand-tint radial wash from offer theme (low opacity on white)
- Verified badge, headline, sub, hero image
- Supply remaining + progress
- Reward tiers (primary + 50% + 25% value) → open modal
- Sidebar: About, Tips, ratings, trust indicators, sticky CTA
- Related offers grid

### VerificationModal

1. Progress indicator (steps 1–3, then lead)
2. One qualifying question per step (yes advances; “no” shows polite eligibility message, does not hard-block abusively)
3. Lead form (email + age) — validate, `submitLead`, redirect
4. Professional copy; no fake timers, no “only 2 left!!!” overlays

## Components to create

| File | Role |
|------|------|
| `components/GlassNav.jsx` | Sticky light nav |
| `components/Footer.jsx` | Site footer |
| `components/Hero.jsx` | Hub hero (replaces lander Hero usage) |
| `components/LiveFeed.jsx` | Live claims feed |
| `components/SweepstakeCard.jsx` | Offer card |
| `components/HowItWorks.jsx` | Steps |
| `components/TrustSection.jsx` | Trust strip |
| `components/StarRating.jsx` | Rating stars |
| `components/VerificationModal.jsx` | Funnel modal |
| `components/ui/image.jsx` | Image with lazy/fade fallback |
| `lib/PageNotFound.jsx` | 404 |
| `lib/offers.js` | Catalog |
| `pages/BrandPortal.jsx` | Offer page |
| `pages/Home.jsx` | Rewrite hub |

## Files to update

- `App.jsx` — add BrandPortal + 404 routes
- `index.css` — light utility helpers (surface panels, subtle brand wash); **do not** import dark SpicyDeals tokens
- `utils.js` — `goToOffer(offer?)` with per-offer URL
- `index.html` — meta/title for multi-brand hub

## Files to retire from Home (not delete immediately)

Old lander pieces under `components/lander/` become unused by Home. Leave files in place for now (except where replaced by new Hero path) to avoid scope creep; do not wire spammy ClaimCounter / ActivityToast / SmsCallout into the new hub.

## Images

- Use licensed Unsplash/Pexels URLs in `offers.js` (category-fit lifestyle photos)
- Do **not** scrape Google Images
- No trademark-heavy fake “official partner” badge art
- Brand identity via typography + photography, not counterfeit logos

## Error handling

- Unknown slug → “Reward not found” + link home
- Lead validation errors inline
- Tracking failures non-blocking (existing pattern)
- Image load failure → gradient + brand name fallback

## Out of scope

- AuthProvider / React Query / toaster stack from pasted App.jsx
- Real CPA link values (placeholders until user provides)
- Mojo redesign
- Legal page rewrite (minor footer link updates only)

## Success criteria

- `/` shows filterable multi-brand hub on white/navy theme
- `/offer/costco` (and other slugs) render BrandPortal
- Full funnel ends in redirect + Mojo-compatible lead/CTA events
- UI reads trusted/professional: no neon glass, no fake urgency stickers
- Privacy, Terms, Mojo still work
