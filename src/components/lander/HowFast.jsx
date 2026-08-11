import { Button } from "@/components/ui/button";
import { goToOffer } from "@/lib/utils";

export default function HowFast() {
  return (
    <section className="bg-[#F7F8F6] px-5 py-12">
      <div className="mx-auto max-w-lg">
        <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900">
          What to expect on timing
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-zinc-600">
          <p>
            Most people finish the required <strong className="text-zinc-800">4–5 deals</strong> over
            several days. Some partner offers can take longer (up to about 60
            days), depending on the offer terms.
          </p>
          <p>
            After deals are credited, an ID check (if required) usually takes
            1–3 days. Many members receive their reward within roughly{" "}
            <strong className="text-zinc-800">6–10 days</strong> of completing
            requirements — timelines vary and are not guaranteed.
          </p>
          <p>
            Tip: finishing all featured deals (not just one or two) is what
            qualifies you for the higher Costco reward levels on the partner
            page.
          </p>
        </div>
        <Button className="mt-8" onClick={goToOffer}>
          Continue to partner offers
        </Button>
      </div>
    </section>
  );
}
