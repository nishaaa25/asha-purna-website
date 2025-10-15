
import HeroComponentTwo from "@/components/HeroComponentTwo";
import JobOpening from "@/components/pages/Careers/JobOpening";
import WhyChoose from "@/components/pages/Careers/WhyChoose";
import CounterTwo from "@/components/pages/CounterTwo";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

export default function CareersPage() {
  const data = [
    {
      title: "Yeaers Legacy",
      value: "28",
    },
    {
      title: "Team Members",
      value: "500",
    },
    {
      title: "Departments",
      value: "15",
    },
    {
      title: "Retentiton Rate",
      value: "95",
    },
  ];
  return (
    <div className="relative w-full">
   <HeroComponentTwo imgUrl="/assets/careers-bg.jpg"/>
      <SectionHeader
        spanText="Excellence"
        title="Careers"
        heading="A Culture that shapes"
        desc='At Ashapurna, we believe a "can-do" spirit comes from trust and empowerment at every level. Our people get the freedom to innovate, the space to perform, and the opportunity to grow faster. From day one, structured induction ensures new colleagues are aligned with our vision and culture, while ongoing training - spanning both technical and leadership skills - keeps careers moving forward with confidence.'
      />
      <div className="w-full px-[22px] lg:px-20 h-[200px] md:h-[70vh] lg:h-[95vh] relative lg:pt-15">
        <div className="relative w-full h-full overflow-hidden rounded-t-[10px]">
          <Image
            src="/assets/project.jpg"
            alt="location-map"
            fill
            className="relative object-cover"
          />
        </div>
      </div>
      <div className="mb-15 lg:mb-[100px] mt-5 relative w-full px-[40px]">
        <CounterTwo data={data} />
      </div>
      <JobOpening />
      <WhyChoose />
      <div className="w-full relative bg-cream-600 lg:px-[15vw]">
        <SectionHeader
          spanText="begins here"
          btn="Contact us"
          btnLink="/contact"
          heading="Your next chapter "
          desc="Ready to build your future with us? Connect with our HR team to explore opportunities that match your aspirations."
        />
      </div>
    </div>
  );
}
