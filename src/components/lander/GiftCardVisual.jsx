export default function GiftCardVisual({ amount = 750 }) {
  return (
    <div className="relative mx-auto w-[min(100%,300px)]" aria-hidden="true">
      <div className="absolute -inset-3 rounded-3xl bg-black/40 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
        <div
          className="relative flex aspect-[1.55/1] flex-col items-center justify-center px-4 pb-3 pt-6"
          style={{
            backgroundColor: "#1B5FAF",
            backgroundImage:
              "repeating-linear-gradient(-42deg, transparent, transparent 16px, rgba(255,255,255,0.14) 16px, rgba(255,255,255,0.14) 32px)",
          }}
        >
          <p className="font-display text-[4.5rem] font-extrabold leading-none tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
            <span className="text-[2.5rem] align-top relative top-1">$</span>
            {amount}
          </p>
          <p
            className="mt-3 text-[1.55rem] font-black tracking-wide text-[#E31837]"
            style={{
              WebkitTextStroke: "1.5px #fff",
              paintOrder: "stroke fill",
              fontFamily: "Arial Black, Helvetica Neue, sans-serif",
            }}
          >
            COSTCO
          </p>
        </div>
        <div className="bg-[#E6E6E6] px-3 py-1.5 text-center text-[9px] font-medium leading-tight text-zinc-700">
          Offer not sponsored or endorsed by this brand.
        </div>
      </div>
    </div>
  );
}
