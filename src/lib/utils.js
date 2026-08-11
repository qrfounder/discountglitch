import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** CPA / partner offer URL — set in .env as VITE_OFFER_URL */
export const OFFER_URL =
  import.meta.env.VITE_OFFER_URL || "https://example.com/offer";

/** Bridge CTAs redirect to the partner CPA page */
export function goToOffer() {
  window.location.assign(OFFER_URL);
}

const FIRST = [
  "Jordan",
  "Priya",
  "Chris",
  "Maya",
  "Alex",
  "Sam",
  "Riley",
  "Taylor",
  "Casey",
  "Morgan",
  "Nicole",
  "David",
];
const LAST = ["M.", "S.", "L.", "R.", "T.", "K.", "H.", "P.", "W.", "B.", "N.", "D."];
const CITIES = [
  "Austin",
  "Seattle",
  "Denver",
  "Miami",
  "Chicago",
  "Phoenix",
  "Atlanta",
  "Portland",
  "Dallas",
  "Boston",
  "Nashville",
  "San Diego",
];
const ACTIONS = [
  "just finished deal 4 of 5",
  "just finished deal 3 of 5",
  "started a reward claim",
  "passed deal verification",
  "submitted deal 5 of 5",
  "unlocked a reward tier",
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomRelativeTime() {
  const roll = Math.random();
  if (roll < 0.5) {
    const m = 3 + Math.floor(Math.random() * 52);
    return `${m} min ago`;
  }
  if (roll < 0.85) {
    const h = 1 + Math.floor(Math.random() * 4);
    return h === 1 ? "1 hr ago" : `${h} hrs ago`;
  }
  const h = 5 + Math.floor(Math.random() * 12);
  return `${h} hrs ago`;
}

export function randomActivityEvent() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: `${pick(FIRST)} ${pick(LAST)}`,
    city: pick(CITIES),
    action: pick(ACTIONS),
    time: randomRelativeTime(),
  };
}

/** Session-stable claim count — realistic daily band */
export function randomClaimCount() {
  return 1420 + Math.floor(Math.random() * 95);
}
