import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How do I get the reward?",
    a: (
      <>
        To receive your $750 card, you must successfully complete{" "}
        <strong className="font-semibold text-dg-text">4-5 featured deals</strong>{" "}
        from our sponsors. These deals verify your eligibility and allow us to
        process your reward instantly.
      </>
    ),
  },
  {
    q: "Why 4-5 deals?",
    a: (
      <>
        Completion of{" "}
        <strong className="font-semibold text-dg-text">4-5 deals</strong> is the
        official requirement set by our partners to fund the reward program.
        Once these steps are finished, your gift card is released to your
        verified email address.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <div id="faq" className="mt-8 border-t border-dg-border pt-7 text-left sm:mt-10 sm:pt-8">
      <h2 className="text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-dg-muted sm:text-[13px]">
        Common questions
      </h2>

      <Accordion type="multiple" defaultValue={["item-0"]} className="mt-3 sm:mt-4">
        {FAQS.map((faq, i) => (
          <AccordionItem key={faq.q} value={`item-${i}`}>
            <AccordionTrigger className="min-h-[48px] text-[14px] touch-manipulation sm:text-[15px]">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent>{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
