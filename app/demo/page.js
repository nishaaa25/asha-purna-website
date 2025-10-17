import HeroComponentTwo from "@/components/HeroComponentTwo";
import OurJourneyDemo from "@/components/OurJourneyDemo";

export default function DemoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroComponentTwo imgUrl="/assets/projects-page.jpg" />
      
      {/* Demo Journey Section */}
      <OurJourneyDemo />
    </main>
  );
}
