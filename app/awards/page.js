import HeroComponentTwo from "@/components/HeroComponentTwo";
import IndividualCard from "@/components/pages/IndividualCard";
import JourneyImageCarousel from "@/components/pages/JourneyImageCarousel";
import SectionHeader from "@/components/SectionHeader";
import { awardsPageContent, awards } from "@/lib/awards";

export default function page() {
  return (
    <div className="relative w-full">
      <HeroComponentTwo imgUrl="/assets/awards-bg.jpg" />
      <div className="our-journey bg-cream-600 w-full relative">
        <div className="w-full md:w-[90%] lg:w-[80%] mx-auto">
          <SectionHeader
            heading={awardsPageContent.journeySection.heading}
            spanText={awardsPageContent.journeySection.spanText}
            desc={awardsPageContent.journeySection.desc}
          />
        </div>
        <JourneyImageCarousel />
        <p className="w-[90%] md:w-[75%] lg:w-[60%] relative text-sm md:text-base lg:text-xl text-gray-800 mx-auto text-center pb-15 md:pb-20 lg:pb-[100px] mt-5 lg:mt-10">
          {awardsPageContent.journeySection.closingText}
        </p>
      </div>
    </div>
  );
}
