import BrandLogo from "@/components/BrandLogo";

export default function Header() {
  return (
    <header className="border-b border-dg-border bg-white">
      <div className="mx-auto flex h-12 max-w-md items-center safe-px sm:h-11 sm:max-w-lg md:max-w-xl">
        <BrandLogo size="sm" />
      </div>
    </header>
  );
}
