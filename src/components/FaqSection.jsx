import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is this free?",
    a: "Starting on discountglitch is free. Finishing usually means completing sponsored deals on the partner page.",
  },
  {
    q: "Are you affiliated with these brands?",
    a: "No. Brand names identify reward categories only. We are not affiliated with those companies.",
  },
  {
    q: "What happens after I tap Show Coupon?",
    a: "You’ll see a partially revealed code, complete a short eligibility check, then continue to the partner page. Most successful claimers finish 4–5 featured deals there to unlock the full prize.",
  },
  {
    q: "Will I get a gift card for sure?",
    a: "No outcome is guaranteed. Availability and fulfillment are set by the sponsor. Completing the required partner deals is typically how the full reward unlocks.",
  },
];

export default function FaqSection() {
  return (
    <section id="help" className="scroll-mt-24 py-5 sm:py-6">
      <div className="mx-auto max-w-[980px] safe-px lg:px-6">
        <p className="text-[12px] font-semibold text-dg-blue">Help</p>
        <h2 className="as-section-title mb-3.5 text-[24px] sm:text-[28px]">Top Questions</h2>

        <div className="as-card px-4">
          <Accordion type="single" collapsible>
            {faqs.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`} className="border-black/[0.06]">
                <AccordionTrigger className="text-[15px] font-semibold text-dg-navy py-4">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] text-dg-muted pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
