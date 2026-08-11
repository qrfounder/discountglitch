import LegalLayout from "@/components/LegalLayout";

export default function Terms() {
  return (
    <LegalLayout title="Terms & Conditions">
      <p>
        <strong className="text-dg-text">Last updated:</strong> August 2026
      </p>
      <p>
        By using discountglitch.com you agree to these terms. If you do not
        agree, do not use this site.
      </p>

      <h2 className="font-display text-lg font-bold text-dg-text">
        What this site is
      </h2>
      <p>
        discountglitch is an independent marketing bridge. We explain how
        partner-sponsored reward programs work and link you to third-party offer
        pages. We are not a bank, retailer, or gift card issuer.
      </p>

      <h2 className="font-display text-lg font-bold text-dg-text">
        No guarantee of rewards
      </h2>
      <p>
        Reward amounts (including up to $750) depend on completing partner
        deals, eligibility, verification, and program rules. Timelines vary.
        Nothing on this site guarantees a specific reward or delivery date.
      </p>

      <h2 className="font-display text-lg font-bold text-dg-text">
        Eligibility & conduct
      </h2>
      <p>
        Programs are generally for adults 25+ with accurate information. Bot
        traffic, fake identities, and having others complete offers for you
        violate partner rules and may void rewards.
      </p>

      <h2 className="font-display text-lg font-bold text-dg-text">
        Partner deals & payments
      </h2>
      <p>
        Many partner deals require payment for trials, subscriptions, or
        services. You are responsible for reading and accepting each offer’s
        terms before continuing.
      </p>

      <h2 className="font-display text-lg font-bold text-dg-text">
        No affiliation
      </h2>
      <p>
        discountglitch is not affiliated with, endorsed by, or sponsored by
        Costco Wholesale Corporation, Apple Inc., or other brands mentioned for
        illustrative shopping context.
      </p>

      <h2 className="font-display text-lg font-bold text-dg-text">
        Limitation of liability
      </h2>
      <p>
        This site is provided “as is.” We are not liable for partner offer
        outcomes, payment disputes, or reward delivery handled by third parties.
      </p>

      <h2 className="font-display text-lg font-bold text-dg-text">Contact</h2>
      <p>
        <a
          href="mailto:support@discountglitch.com"
          className="text-dg-blue hover:underline"
        >
          support@discountglitch.com
        </a>
      </p>
    </LegalLayout>
  );
}
