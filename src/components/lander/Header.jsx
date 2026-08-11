export default function Header() {
  return (
    <header className="border-b border-dg-border bg-white">
      <div className="mx-auto flex h-11 max-w-md items-center px-4">
        <a href="/" className="text-[15px] font-semibold tracking-tight" aria-label="discountglitch home">
          <span className="text-dg-navy">discount</span>
          <span className="text-dg-blue">glitch</span>
        </a>
      </div>
    </header>
  );
}
