export default function SmsCallout() {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto max-w-lg rounded-2xl border border-zinc-200 bg-white px-5 py-6">
        <h2 className="font-display text-lg font-bold text-zinc-900">
          Who this is for
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F766E]" />
            Adults <strong className="text-zinc-800">25 and older</strong> in
            eligible locations
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F766E]" />
            Shoppers planning a Costco purchase (electronics, household, etc.)
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F766E]" />
            People willing to complete <strong className="text-zinc-800">4–5 real sponsored deals</strong> themselves
          </li>
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-zinc-500">
          Fake traffic, bots, or having friends complete surveys for you violates
          partner rules and will not pay out.
        </p>
      </div>
    </section>
  );
}
