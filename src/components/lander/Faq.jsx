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
    <div id="faq" className="mt-10 border-t border-dg-border pt-8 text-left">
      <h2 className="text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-dg-muted">
        Common questions
      </h2>

      <Accordion type="multiple" defaultValue={["item-0"]} className="mt-4">
        {FAQS.map((faq, i) => (
          <AccordionItem key={faq.q} value={`item-${i}`}>
            <AccordionTrigger className="text-[15px]">{faq.q}</AccordionTrigger>
            <AccordionContent>{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
