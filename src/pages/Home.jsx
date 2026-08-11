import Hero from "@/components/lander/Hero";
import PageTracker from "@/components/PageTracker";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <PageTracker />
      <main>
        <Hero />
      </main>
    </div>
  );
}
