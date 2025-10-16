import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import { awards } from "@/lib/awards";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";
import Image from "next/image";
import EventsCarousel from "./EventsCarousel";
import CardTwo from "@/components/CardTwo";
import AwardCarousel from "./AwardCarousel";

export default function AwardSection() {
  const displayedProjects = awards.slice(0, 4);
  return (
    <div className="w-full relative pb-10 md:pb-20 lg:pb-[100px]">
      <SectionHeader
        title="Awards & recognitions"
        heading="Stories Beyond"
        spanText="Structures"
        desc="Our commitment to quality and innovation has been recognized by leading industry bodies and publications across the nation."
      />
      <div className="relative w-full -top-4 lg:hidden">
        <AwardCarousel />
      </div>
      <div
        className={`w-full px-20 relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300 hidden lg:grid -top-10`}
      >
        {displayedProjects.map((item, index) => (
          <div key={index}>
            <CardTwo data={item} />
          </div>
        ))}
      </div>
      <div className="w-full flex-center relative mb-15 md:mb-20 lg:mb-[100px]">
        <Button text="See more" link="/awards" />
      </div>
    </div>
  );
}
