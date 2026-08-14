import { useEffect, useState } from "react";
import { qualifyingQuestions } from "@/lib/offers";
import { goToOffer } from "@/lib/utils";
import { submitLead } from "@/lib/tracking";
import { IconCloseFill, IconShieldCheck, IconCheckSeal } from "@/components/PlatformIcons";

/**
 * Show Coupon funnel (all offers):
 * 1) 30% revealed masked code + Unlock Code
 * 2) Eligibility questions
 * 3) Email / age
 * 4) Unlocking % progress
 * 5) Deals notification (4–5 deals → big prize) then CPA
 */
export default function VerificationModal({ offer, open, onClose, selectedTier = null }) {
  const [phase, setPhase] = useState("preview");
  const [qIndex, setQIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [unlockPct, setUnlockPct] = useState(0);

  const tier = selectedTier || {
    amount: `$${offer?.rewardValue || 100} OFF`,
    title: `$${offer?.rewardValue || 100} OFF ${offer?.brand || ""}`,
  };

  const couponsLeft = offer?.supplyLeft ?? 1514;
  const maskedCode = `${(offer?.brand || "Offer").replace(/\s+/g, "")}${"*".repeat(7)}`;
  const question = qualifyingQuestions[qIndex];
  const prizeLabel = tier.amount || `$${offer?.rewardValue} OFF`;
  const socialCount = Math.max(1200, Math.floor((offer?.ratingsCount || 2000) * 0.42));

  useEffect(() => {
    if (!open) return;
    setPhase("preview");
    setQIndex(0);
    setEmail("");
    setAge("");
    setError("");
    setUnlockPct(0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, selectedTier]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape" && phase !== "unlocking") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, phase]);

  // Progress → notification step (not direct redirect)
  useEffect(() => {
    if (phase !== "unlocking" || !offer) return;
    setUnlockPct(0);
    let current = 0;
    const id = setInterval(() => {
      const bump =
        current < 30 ? 2 + Math.random() * 2 : current < 70 ? 1 + Math.random() * 2.5 : 0.8 + Math.random() * 1.8;
      current = Math.min(100, current + bump);
      setUnlockPct(Math.floor(current));
      if (current >= 100) {
        clearInterval(id);
        setTimeout(() => setPhase("notify"), 400);
      }
    }, 90);
    return () => clearInterval(id);
  }, [phase, offer]);

  if (!open || !offer) return null;

  const validate = () => {
    const trimmed = email.trim().toLowerCase();
    const ageNum = parseInt(age, 10);
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Enter a valid email";
    if (!age || Number.isNaN(ageNum) || ageNum < 18 || ageNum > 120) return "Enter age 18+";
    return null;
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }
    setError("");
    await submitLead({ email: email.trim().toLowerCase(), age: parseInt(age, 10) });
    setPhase("unlocking");
  };

  const handleContinueToDeals = () => {
    goToOffer(offer);
  };

  const circleSize = 120;
  const stroke = 10;
  const radius = (circleSize - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (unlockPct / 100) * circumference;
  const canDismiss = phase !== "unlocking";

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={() => canDismiss && onClose()}
        disabled={!canDismiss}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-h-[min(92dvh,760px)] overflow-y-auto overscroll-contain sm:max-w-md rounded-t-[28px] sm:rounded-[28px] bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.2)]"
        style={{ animation: "dg-feed-in 0.32s ease-out both" }}
      >
        <div className="flex justify-center pt-2.5 sm:hidden">
          <div className="h-1 w-9 rounded-full bg-black/15" />
        </div>

        <div className="flex items-center justify-end px-4 pt-3">
          {canDismiss && (
            <button type="button" onClick={onClose} className="as-press text-dg-muted" aria-label="Close">
              <IconCloseFill size={28} />
            </button>
          )}
        </div>

        <div className="px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-1 text-center sm:px-6 sm:pb-7">
          {(phase === "preview" || phase === "unlocking") && (
            <>
              <p className="text-[24px] font-extrabold tracking-tight text-[#7C3AED] sm:text-[28px]">{tier.amount}</p>
              <h2 className="mt-1 text-[18px] font-bold text-dg-navy sm:text-[22px]">{tier.title}</h2>

              <div className="mt-5 rounded-xl border border-dashed border-[#C45C5C] bg-[#F8E8E8] px-4 py-3">
                <p className="text-[15px] font-bold text-dg-navy">
                  Coupons Left Remaining:{" "}
                  <span className="tabular-nums">{couponsLeft.toLocaleString()}</span>
                </p>
              </div>

              <div
                className="mt-4 rounded-xl px-4 py-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
                style={{ background: "linear-gradient(90deg, #D6E8FF 0%, #F7F0D8 100%)" }}
              >
                <p className="text-[20px] font-bold tracking-wide text-dg-navy">{maskedCode}</p>
                <p className="mt-1 text-[11px] font-medium text-dg-muted">Coupon ~30% revealed</p>
              </div>
            </>
          )}

          {phase === "preview" && (
            <button
              type="button"
              onClick={() => setPhase("questions")}
              className="as-press mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-[#1D1D1F] text-[16px] font-semibold text-white hover:bg-[#2D2D2F]"
            >
              Unlock Code
            </button>
          )}

          {phase === "blocked" && (
            <div className="py-4">
              <p className="text-[15px] text-dg-muted leading-relaxed mb-5">
                This coupon may not be a fit right now. Try another offer anytime.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="as-press flex h-11 w-full items-center justify-center rounded-xl bg-[#1D1D1F] text-[15px] font-semibold text-white"
              >
                Done
              </button>
            </div>
          )}

          {phase === "questions" && question && (
            <div className="text-left pt-2">
              <div className="mb-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#7C3AED]">
                <IconShieldCheck size={14} />
                Step {qIndex + 1} of {qualifyingQuestions.length} · Unlock steps
              </div>
              <p className="text-[20px] font-bold tracking-tight text-dg-navy leading-snug mb-5">
                {question.label}
              </p>
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    if (qIndex + 1 >= qualifyingQuestions.length) setPhase("lead");
                    else setQIndex((i) => i + 1);
                  }}
                  className="as-press flex h-11 w-full items-center justify-center rounded-xl bg-[#1D1D1F] text-[15px] font-semibold text-white"
                >
                  {question.yes}
                </button>
                <button
                  type="button"
                  onClick={() => setPhase("blocked")}
                  className="as-press flex h-11 w-full items-center justify-center rounded-xl bg-black/[0.06] text-[15px] font-semibold text-dg-navy"
                >
                  {question.no}
                </button>
              </div>
              <p className="mt-4 text-center text-[11px] text-dg-muted">
                Complete steps to finish unlocking {maskedCode}
              </p>
            </div>
          )}

          {phase === "lead" && (
            <form onSubmit={handleLeadSubmit} noValidate className="text-left space-y-3.5 pt-2">
              <p className="text-[13px] text-dg-muted leading-relaxed">
                Confirm your details to continue unlocking your {offer.brand} coupon.
              </p>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-dg-canvas px-3.5 py-3 text-[16px] outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
                placeholder="Email"
              />
              <input
                type="number"
                inputMode="numeric"
                min={18}
                max={120}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-xl bg-dg-canvas px-3.5 py-3 text-[16px] outline-none focus:ring-2 focus:ring-[#7C3AED]/30"
                placeholder="Age"
              />
              {error && <p className="text-[13px] text-red-500">{error}</p>}
              <button
                type="submit"
                className="as-press flex h-12 w-full items-center justify-center rounded-xl bg-[#1D1D1F] text-[15px] font-semibold text-white"
              >
                Continue to unlock
              </button>
              <p className="text-center text-[10px] text-dg-muted">
                By continuing you agree to{" "}
                <a href="/terms" className="text-dg-blue">
                  Terms
                </a>{" "}
                &{" "}
                <a href="/privacy" className="text-dg-blue">
                  Privacy
                </a>
                .
              </p>
            </form>
          )}

          {phase === "unlocking" && (
            <div className="mt-6 flex flex-col items-center">
              <p className="text-[18px] font-bold text-dg-navy mb-5">Unlocking Code...</p>
              <div className="relative" style={{ width: circleSize, height: circleSize }}>
                <svg width={circleSize} height={circleSize} className="-rotate-90">
                  <circle
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    r={radius}
                    fill="none"
                    stroke="#E5E5EA"
                    strokeWidth={stroke}
                  />
                  <circle
                    cx={circleSize / 2}
                    cy={circleSize / 2}
                    r={radius}
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ transition: "stroke-dashoffset 0.1s linear" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[28px] font-extrabold tabular-nums text-[#7C3AED]">
                    {unlockPct}%
                  </span>
                </div>
              </div>
              <p className="mt-5 max-w-[260px] text-[13px] leading-relaxed text-dg-muted">
                Preparing your partner deal path…
              </p>
            </div>
          )}

          {/* Pre-CPA notification — finish 4–5 deals for big prize */}
          {phase === "notify" && (
            <div className="text-left pt-1">
              <div
                className="rounded-2xl border border-[#7C3AED]/20 bg-[#F5F0FF] p-4 shadow-[0_4px_20px_rgba(124,58,237,0.12)]"
                style={{ animation: "dg-feed-in 0.4s ease-out both" }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-white">
                    <IconCheckSeal size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7C3AED]">
                      Important · Before you continue
                    </p>
                    <p className="mt-1 text-[16px] font-bold leading-snug text-dg-navy">
                      Finish 4–5 featured deals to unlock the full {prizeLabel} prize
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[14px] leading-relaxed text-dg-muted">
                Your code is reserved — but the{" "}
                <span className="font-semibold text-dg-navy">full {offer.brand} reward</span> unlocks
                on the next page when you complete the sponsored deals. That’s the same path{" "}
                <span className="font-semibold text-dg-navy">
                  {socialCount.toLocaleString()}+ visitors
                </span>{" "}
                take when they successfully claim.
              </p>

              <ul className="mt-4 space-y-2.5 rounded-2xl bg-dg-canvas p-4">
                {[
                  "Open the partner page (next step)",
                  "Complete 4–5 short featured deals",
                  "Stay until each deal shows finished",
                  `Claim your full ${prizeLabel} ${offer.brand} reward`,
                ].map((line, i) => (
                  <li key={line} className="flex items-start gap-2.5 text-[13px] text-dg-navy">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/15 text-[11px] font-bold text-[#7C3AED]">
                      {i + 1}
                    </span>
                    <span className={i === 1 ? "font-semibold" : ""}>{line}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-[12px] leading-relaxed text-dg-muted">
                Tip from top claimers: don’t close the tab early — people who finish all 4–5 deals are
                the ones who report the biggest rewards.
              </p>

              <button
                type="button"
                onClick={handleContinueToDeals}
                className="as-press mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-[#7C3AED] text-[15px] font-semibold text-white hover:bg-[#6D28D9] shadow-[0_8px_24px_rgba(124,58,237,0.35)]"
              >
                Continue — finish 4–5 deals for {prizeLabel}
              </button>
              <p className="mt-2.5 text-center text-[10px] text-dg-muted">
                You’ll leave discountglitch for the partner rewards page. No payment to us.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
