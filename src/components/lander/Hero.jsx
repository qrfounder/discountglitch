import ClaimForm from "@/components/lander/ClaimForm";
import ClaimCounter from "@/components/lander/ClaimCounter";
import ActivityToast from "@/components/lander/ActivityToast";
import Faq from "@/components/lander/Faq";

const STEPS = [
  "Enter your email and age",
  "Tap Claim Reward",
  "Finish 4-5 featured deals",
  "Receive your $750 gift card",
];

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-md safe-px pb-12 pt-7 text-center sm:max-w-lg sm:pt-10 sm:pb-14 md:max-w-xl md:pt-12">
        <h1 className="font-display text-[1.75rem] font-bold leading-snug tracking-tight text-dg-text text-balance sm:text-[2rem] md:text-[2.15rem]">
          Claim up to a $750 Gift Card
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-dg-muted sm:text-[15px]">
          4 steps on our partner rewards page
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border border-dg-border bg-white text-left shadow-sm sm:mt-8">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className={`flex items-start gap-3 px-4 py-3.5 sm:items-center sm:gap-3.5 sm:px-5 sm:py-4 ${
                i < STEPS.length - 1 ? "border-b border-dg-border" : ""
              }`}
            >
              <span className="mt-0.5 w-5 shrink-0 text-center text-base font-bold text-dg-blue sm:mt-0 sm:w-4">
                {i + 1}
              </span>
              <span className="text-[14px] font-semibold leading-snug text-dg-text sm:text-[15px]">
                {step}
              </span>
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
