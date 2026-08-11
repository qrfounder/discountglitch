import { Link } from "react-router-dom";
import Header from "@/components/lander/Header";

export default function LegalLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-md px-5 py-8">
        <Link
          to="/"
          className="text-sm font-medium text-dg-blue hover:underline"
        >
          ← Back to home
        </Link>
        <h1 className="mt-4 font-display text-2xl font-bold text-dg-text">
          {title}
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-dg-muted">
          {children}
        </div>
      </main>
    </div>
  );
}
