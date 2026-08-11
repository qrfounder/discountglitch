import { Button } from "@/components/ui/button";
import { goToOffer } from "@/lib/utils";

export default function DealsSection() {
  return (
    <section className="bg-[#F7F8F6] px-5 py-12">
      <div className="mx-auto max-w-lg">
        <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900">
          About the deals
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Featured deals may include apps, games, subscriptions, or free trials
          from partner advertisers.{" "}
          <strong className="text-zinc-800">
            Many deals require payment
          </strong>{" "}
          for a product or service — always read the terms on the partner page
          before you continue.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          discountglitch does not charge a fee to send you there. We are a
          bridge page that explains the offer before you enter the partner
          claim flow.
        </p>
        <Button className="mt-8" onClick={goToOffer}>
          Continue to partner offers
        </Button>
      </div>
    </section>
  );
}
