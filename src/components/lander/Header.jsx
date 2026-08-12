export default function Header() {
  return (
    <header className="border-b border-dg-border bg-white">
      <div className="mx-auto flex h-12 max-w-md items-center safe-px sm:h-11 sm:max-w-lg md:max-w-xl">
        <a
          href="/"
          className="inline-flex min-h-[44px] items-center text-[15px] font-semibold tracking-tight touch-manipulation"
          aria-label="discountglitch home"
        >
          <span className="text-dg-navy">discount</span>
          <span className="text-dg-blue">glitch</span>
        </a>
      </div>
    </header>
  );
}
