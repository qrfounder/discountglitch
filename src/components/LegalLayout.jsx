import { Link } from "react-router-dom";
import Header from "@/components/lander/Header";

export default function LegalLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-white safe-pb">
      <Header />
      <main className="mx-auto w-full max-w-md py-8 safe-px sm:max-w-lg md:max-w-xl">
        <Link
          to="/"
          className="inline-flex min-h-[44px] items-center text-sm font-medium text-dg-blue touch-manipulation hover:underline"
        >
          ← Back to home
        </Link>
        <h1 className="mt-3 font-display text-xl font-bold text-dg-text sm:mt-4 sm:text-2xl">
          {title}
        </h1>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-dg-muted sm:mt-6">
          {children}
        </div>
      </main>
    </div>
  );
}
