import { useState } from "react";
import { Button } from "@/components/ui/button";
import { goToOffer } from "@/lib/utils";
import { submitLead } from "@/lib/tracking";

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
      className="mt-7 overflow-hidden rounded-xl border border-dg-border bg-white text-left"
      noValidate
    >
      <div className="border-b border-dg-border bg-dg-surface px-4 py-3">
        <p className="text-[13px] font-semibold text-dg-text">
          Confirm your details to continue
        </p>
        <p className="mt-0.5 text-[12px] text-dg-muted">
          Required before opening the partner rewards page
        </p>
      </div>

      <div className="space-y-4 px-4 py-4">
        <label className="block">
          <span className="text-[13px] font-medium text-dg-text">Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-dg-border bg-white px-3.5 py-3 text-[15px] text-dg-text outline-none transition placeholder:text-zinc-400 focus:border-dg-blue focus:ring-2 focus:ring-dg-blue/20"
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
            className="mt-1.5 w-full rounded-lg border border-dg-border bg-white px-3.5 py-3 text-[15px] text-dg-text outline-none transition placeholder:text-zinc-400 focus:border-dg-blue focus:ring-2 focus:ring-dg-blue/20"
            required
          />
        </label>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-600">
            {error}
          </p>
        )}

        <Button type="submit" size="full" disabled={loading}>
          {loading ? "Continuing…" : "Claim Reward"}
        </Button>

        <p className="text-center text-[11px] leading-relaxed text-dg-muted">
          By continuing you agree to continue to our partner page to complete
          4–5 featured deals.
        </p>
      </div>
    </form>
  );
}
