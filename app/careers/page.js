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
      value: "29",
    },
    {
      title: "Team Members",
      value: "100",
    },
    {
      title: "Departments",
      value: "10",
    },
    {
      title: "Retention Rate",
      value: "95",
    },
  ];
  return (
    <div className="relative w-full">
      <HeroComponentTwo imgUrl="https://d3qnldyv492i08.cloudfront.net/ashapurna/images/webimages/careers-bg.jpg" />
      <div className="w-full lg:w-8/12 mx-auto relative">
        <SectionHeader
          spanText="Excellence"
          title="Careers"
          heading="A Culture that shapes"
          desc='At Ashapurna, we believe a "can-do" spirit comes from trust and empowerment at every level. Our people get the freedom to innovate, the space to perform, and the opportunity to grow faster. From day one, structured induction ensures new colleagues are aligned with our vision and culture, while ongoing training - spanning both technical and leadership skills - keeps careers moving forward with confidence.'
        />
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
