import ClaimForm from "@/components/lander/ClaimForm";
import ClaimCounter from "@/components/lander/ClaimCounter";
import ActivityToast from "@/components/lander/ActivityToast";
import Faq from "@/components/lander/Faq";

const STEPS = [
  "Enter your email and age (25+)",
  "Tap Claim Reward",
  "Finish 4-5 featured deals",
  "Receive your $750 gift card",
];

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-md px-5 pb-10 pt-8 text-center">
        <h1 className="font-display text-[1.95rem] font-bold leading-snug tracking-tight text-dg-text text-balance">
          Claim up to a $750 Gift Card
        </h1>

        <p className="mt-3 text-sm text-dg-muted">
          4 steps on our partner rewards page
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border border-dg-border bg-white text-left">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className={`flex items-center gap-3.5 px-4 py-3.5 ${
                i < STEPS.length - 1 ? "border-b border-dg-border" : ""
              }`}
            >
              <span className="w-4 shrink-0 text-center text-base font-bold text-dg-blue">
                {i + 1}
              </span>
              <span className="text-[15px] font-semibold text-dg-text">{step}</span>
            </div>
          ))}
        </div>

        <ClaimForm />

        <ClaimCounter />
        <ActivityToast />
        <Faq />
      </div>
    </section>
  );
}
