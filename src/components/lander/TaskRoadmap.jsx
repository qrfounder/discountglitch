const STEPS = [
  {
    n: "01",
    title: "Continue to the partner page",
    body: "Tap the button to open the rewards partner site where the Costco offer is hosted.",
  },
  {
    n: "02",
    title: "Enter your email & basic info",
    body: "Use a real email you check — that’s where reward updates are sent.",
  },
  {
    n: "03",
    title: "Finish 4–5 featured deals",
    body: "Complete the required sponsored offers (apps, trials, or services). Doing all 4–5 is what unlocks the higher reward tier.",
  },
  {
    n: "04",
    title: "Verify & receive your reward",
    body: "If asked, finish ID verification. After partners confirm your deals, the Costco reward is processed to your email.",
  },
];

export default function TaskRoadmap() {
  return (
    <section className="border-y border-zinc-200/80 bg-white px-5 py-12">
      <div className="mx-auto max-w-lg">
        <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900">
          How it works
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Clear steps — no surprises. The partner page explains each deal before
          you accept it.
        </p>

        <ol className="mt-8 space-y-6">
          {STEPS.map((step) => (
            <li key={step.n} className="flex gap-4">
              <span className="font-display text-sm font-bold tabular-nums text-[#0F766E]">
                {step.n}
              </span>
              <div>
                <p className="font-semibold text-zinc-900">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
