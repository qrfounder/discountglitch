import LegalLayout from "@/components/LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        <strong className="text-dg-text">Last updated:</strong> August 2026
      </p>
      <p>
        discountglitch.com operates a marketing bridge that links you to
        third-party partner reward pages. This policy describes how we handle
        information on this site.
      </p>
      <p>
        We do not collect personal information on this bridge page unless you
        email support. When you click Claim Reward, you leave discountglitch and
        go to a partner site with its own privacy practices.
      </p>
      <p>
        Questions:{" "}
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
