import HeroComponentTwo from "@/components/HeroComponentTwo";
import Wheel from "@/components/Wheel";

export default function DemoPage() {
  return (
    <div className="relative w-full">
      <HeroComponentTwo imgUrl="/assets/projects-page.jpg" />
      <Wheel />
    </div>
  );
}
