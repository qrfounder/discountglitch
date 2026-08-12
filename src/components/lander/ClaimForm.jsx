import { useState } from "react";
import { Button } from "@/components/ui/button";
import { goToOffer } from "@/lib/utils";
import { submitLead } from "@/lib/tracking";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-dg-border bg-white px-3.5 py-3 text-base text-dg-text outline-none transition placeholder:text-zinc-400 focus:border-dg-blue focus:ring-2 focus:ring-dg-blue/20";

export default function ClaimForm() {
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const trimmed = email.trim().toLowerCase();
    const ageNum = parseInt(age, 10);

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return "Enter a valid email address";
    }
    if (!age || Number.isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      return "Enter your age";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = validate();
    if (message) {
      setError(message);
      return;
    }

    setError("");
    setLoading(true);

    const trimmed = email.trim().toLowerCase();
    const ageNum = parseInt(age, 10);

    await submitLead({ email: trimmed, age: ageNum });
    goToOffer();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 overflow-hidden rounded-xl border border-dg-border bg-white text-left shadow-sm sm:mt-8"
      noValidate
    >
      <div className="border-b border-dg-border bg-dg-surface px-4 py-3 sm:px-5">
        <p className="text-[13px] font-semibold text-dg-text sm:text-sm">
          Confirm your details to continue
        </p>
        <p className="mt-0.5 text-[12px] leading-relaxed text-dg-muted">
          Required before opening the partner rewards page
        </p>
      </div>

      <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
        <div className="grid gap-4 sm:grid-cols-[1fr_7.5rem]">
          <label className="block min-w-0">
            <span className="text-[13px] font-medium text-dg-text">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />
          </label>

          <label className="block">
            <span className="text-[13px] font-medium text-dg-text">Age</span>
            <input
              type="number"
              name="age"
              inputMode="numeric"
              min={1}
              max={120}
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={inputClass}
              required
            />
          </label>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-600">
            {error}
          </p>
        )}

        <Button type="submit" size="full" disabled={loading} className="min-h-[52px] touch-manipulation">
          {loading ? "Continuing…" : "Claim Reward"}
        </Button>

        <p className="text-center text-[11px] leading-relaxed text-dg-muted sm:text-xs">
          By continuing, you agree to open our partner page and complete 4–5
          featured deals.
        </p>
      </div>
    </form>
  );
}
