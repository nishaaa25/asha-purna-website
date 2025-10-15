import { testimonials } from "@/lib/content";
import CardTwo from "./CardTwo";
import SectionHeader from "./SectionHeader";
import Image from "next/image";
import TestimonialsCarousel from "./pages/Home/TestimonialsCarousel";
import ProjectsCarousel from "./pages/Home/ProjectsCarousel";

export default function Testimoials() {
  return (
    <div className="relative w-full pb-5 md:pb-20 lg:pb-[100px]">
      <div className="w-11/12 mx-auto relative">
        <SectionHeader
          title="testimonials"
          heading="Stories that"
          spanText="shaped us"
          desc="At Ashapurna, our work speaks through the experiences of those we serve. These testimonials reflect the trust, confidence, and satisfaction of clients who value excellence and thoughtful execution."
        />
      </div>
      <div className="w-full">
        <TestimonialsCarousel/>
        {/* <ProjectsCarousel/> */}
      </div>
    </div>
  );
}
