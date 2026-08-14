# Rewards Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the public site as a multi-brand discountglitch rewards hub with BrandPortal + verification→lead→CPA funnel on the existing white/navy theme.

**Architecture:** Catalog-driven React pages (`Home`, `BrandPortal`) share light UI components; `VerificationModal` closes with `submitLead` + `goToOffer(offer)`. No Auth/React Query. Mojo/legal untouched.

**Tech Stack:** React 18, React Router 6, Vite 6, Tailwind 3, Framer Motion, Lucide, existing Express tracking API.

**Verify:** No unit test suite — after each task run `npm run build` (or check Vite HMR) and smoke-test routes in browser. Do not commit unless user asks.

---

## File map

| Path | Action |
|------|--------|
| `src/lib/offers.js` | Create |
| `src/lib/utils.js` | Modify `goToOffer` |
| `src/lib/PageNotFound.jsx` | Create |
| `src/index.css` | Add light panel utilities |
| `index.html` | Meta/fonts for hub |
| `src/components/ui/image.jsx` | Create |
| `src/components/StarRating.jsx` | Create |
| `src/components/GlassNav.jsx` | Create |
| `src/components/Footer.jsx` | Create |
| `src/components/Hero.jsx` | Create (hub hero) |
| `src/components/LiveFeed.jsx` | Create |
| `src/components/SweepstakeCard.jsx` | Create |
| `src/components/HowItWorks.jsx` | Create |
| `src/components/TrustSection.jsx` | Create |
| `src/components/VerificationModal.jsx` | Create |
| `src/pages/BrandPortal.jsx` | Create |
| `src/pages/Home.jsx` | Rewrite |
| `src/App.jsx` | Add routes |

---

### Task 1: Offers catalog + redirect helper

**Files:**
- Create: `src/lib/offers.js`
- Modify: `src/lib/utils.js`

- [ ] **Step 1:** Create `offers.js` with 8 brands (shein, doordash, costco, amazon, walmart, ubereats, nike, sephora), `getOffer`, `qualifyingQuestions`, `liveFeedSeed`. Use discountglitch copy (not SpicyDeals). Theme colors as soft accents for white UI. `redirectUrl: ""` (empty → fallback).

- [ ] **Step 2:** Update `goToOffer`:

```js
export function goToOffer(offer) {
  trackCtaClick();
  const url = (offer && offer.redirectUrl) || OFFER_URL;
  window.location.assign(url);
}
```

- [ ] **Step 3:** Verify file imports resolve (`npm run build` later with pages).

---

### Task 2: CSS utilities + HTML meta

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1:** Add utilities: `.dg-panel`, `.dg-panel-strong`, `.text-balance` (exists), subtle fade-in keyframes. Keep white background tokens. Do not add ember/obsidian.

- [ ] **Step 2:** Update `index.html` title/description for multi-brand hub; optionally add Plus Jakarta Sans or DM Sans for display alongside Inter.

---

### Task 3: Primitives (Image, StarRating, PageNotFound)

**Files:**
- Create: `src/components/ui/image.jsx`
- Create: `src/components/StarRating.jsx`
- Create: `src/lib/PageNotFound.jsx`

- [ ] **Step 1:** `Image` — `img` with lazy loading, onError → hide img / show fallback slot via state.
- [ ] **Step 2:** `StarRating` — Lucide Star fill based on value.
- [ ] **Step 3:** `PageNotFound` — centered message + Link to `/`.

---

### Task 4: Shell (GlassNav, Footer)

**Files:**
- Create: `src/components/GlassNav.jsx`
- Create: `src/components/Footer.jsx`

- [ ] **Step 1:** Sticky white/blur nav: discountglitch wordmark, anchors `#hot-drops` `#how-it-works` `#trust`, mobile-friendly.
- [ ] **Step 2:** Footer: Privacy, Terms, support@discountglitch.com, non-affiliation disclaimer.

---

### Task 5: Marketing sections

**Files:**
- Create: `src/components/Hero.jsx`
- Create: `src/components/SweepstakeCard.jsx`
- Create: `src/components/LiveFeed.jsx`
- Create: `src/components/HowItWorks.jsx`
- Create: `src/components/TrustSection.jsx`

- [ ] **Step 1:** Hero — brand-first, one headline, one sentence, CTA to `#hot-drops`, full-bleed photo (Unsplash).
- [ ] **Step 2:** SweepstakeCard — image, brand, reward, supply, rating, Link to `/offer/:slug`.
- [ ] **Step 3:** LiveFeed — rotate `liveFeedSeed` + occasional random inserts; calm list UI.
- [ ] **Step 4:** HowItWorks — 3 steps with Lucide icons.
- [ ] **Step 5:** TrustSection — 4 trust points, professional tone.

---

### Task 6: VerificationModal

**Files:**
- Create: `src/components/VerificationModal.jsx`

- [ ] **Step 1:** Modal overlay; steps 0–2 = qualifyingQuestions; step 3 = email/age form.
- [ ] **Step 2:** Yes advances; No shows short eligibility note with Close.
- [ ] **Step 3:** On submit: validate → `await submitLead` → `goToOffer(offer)`.
- [ ] **Step 4:** Escape / backdrop closes; lock body scroll when open.

---

### Task 7: BrandPortal page

**Files:**
- Create: `src/pages/BrandPortal.jsx`

- [ ] **Step 1:** `useParams` slug → `getOffer`; missing → not found UI.
- [ ] **Step 2:** Layout per spec (tiers, sidebar, related cards, modal).
- [ ] **Step 3:** Include `PageTracker`, `GlassNav`, `Footer`.

---

### Task 8: Home rewrite + App routes

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1:** Home = nav + Hero + hot drops (search/filters/grid) + LiveFeed sidebar + HowItWorks + Trust + Footer + PageTracker.
- [ ] **Step 2:** App routes: `/offer/:slug` → BrandPortal; `*` → PageNotFound; keep privacy/terms/mojo.

---

### Task 9: QA polish

- [ ] **Step 1:** `npm run build` — zero errors.
- [ ] **Step 2:** Smoke: `/`, `/offer/costco`, modal→lead fields, `/privacy`, unknown slug.
- [ ] **Step 3:** Replace any spammy copy/icons found during pass; ensure images load or graceful fallback.

---

## Spec coverage check

| Spec item | Task |
|-----------|------|
| Multi-brand Home | 5, 8 |
| BrandPortal | 7 |
| Verification → lead → redirect | 6, 1 |
| White/navy theme | 2, all UI |
| discountglitch branding | 4, 5 |
| Mojo/legal preserved | 8 |
| No Auth/RQ | — |
| Images Unsplash | 1, 5 |
| PageNotFound | 3, 8 |
