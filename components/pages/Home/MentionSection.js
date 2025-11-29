import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import { events, eventsPageContent } from "@/lib/events";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";
import Image from "next/image";
import EventsCarousel from "./EventsCarousel";
import CardTwo from "@/components/CardTwo";
import EventsCard from "./EventsCard";

export default function MentionSection({events, utsavImagePath}) {
  const displayedProjects = events.slice(0, 3);
  return (
    <div className="w-full relative ">
      <SectionHeader
        title="Events"
        heading="Celebrating Culture"
        spanText="& Community"
      />
      <div className="relative w-full -top-4 lg:hidden">
        <EventsCarousel events={events} imagePath={utsavImagePath}/>
      </div>
      <div
        className={`w-full px-20 relative mb-5  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300 hidden lg:grid -top-10`}
      >
        {displayedProjects.map((item, index) => (
          <div key={index}>
            <EventsCard data={item} imgPath={utsavImagePath}/>
          </div>
        ))}
      </div>
      <div className="w-full flex-center relative mb-15 md:mb-20 lg:mb-[100px]">
        <Button text="Read more" link="/events" />
      </div>
    </div>
  );
}
