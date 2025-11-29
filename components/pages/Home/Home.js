"use client";
import HeroComponent from "@/components/HeroComponent";
import SignatureProject from "@/components/pages/Home/SignatureProject";
import OwnerShipSection from "@/components/OwnerShipSection";
import SectionHeader from "@/components/SectionHeader";
import Testimoials from "@/components/Testimoials";
import CountersSection from "@/components/Counter";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import MentionSection from "@/components/pages/Home/MentionSection";
import GetInTouch from "@/components/pages/GetInTouch";
import Link from "next/link";
import HeroBottomBar from "@/components/HeroBottomBar";
import AwardSection from "@/components/pages/Home/AwardSection";


gsap.registerPlugin(ScrollTrigger);
export default function Home({
  featuredProjects,
  imagePath,
  utsavImagePath,
  events,
}) {

  const data = [
    {
      title: "Happy Families",
      value: "30000",
    },
    {
      title: "Projects",
      value: "45",
    },
    {
      title: "sqft. developed",
      value: "4",
      sign: "Cr"
    },
    {
      title: "Years of Experience",
      value: "29",
    },
  ];

  return (
    <div className="w-full relative">
      <HeroComponent />
      <div className="relative w-full md:w-10/12 mx-auto">
        <SectionHeader
          spanText="Communities, and Legacy"
          heading="Trusted Developers of Estates,"
          title="About"
          btn="Discover our journey"
          btnLink="/about"
          desc="Since 1996, Ashapurna has transformed land into lasting opportunities building not just estates, but thriving communities. With 50+ projects and thousands of happy families, we’ve become a trusted name in land development, making ownership accessible, secure, and the first step toward a future you can shape."
        />
      </div>
      <div className="pb-5 md:pb-10 lg:pb-15 px-3">
        <CountersSection data={data} />
      </div>
      <SignatureProject projects={featuredProjects} imagePath={imagePath} />
      <div className="w-full relative flex flex-col gap-6 mx-auto pt-20  pb-5 lg:pb-20 px-[22px] md:px-12 lg:px-20">
        <Link href={`/${"residential"}`}>
          <div className="w-full h-[204px] md:h-[50vh] lg:h-[80vh] relative rounded-t-[10px] overflow-hidden">
            <Image
              src="/assets/residential-card.jpg"
              alt="Residential Projects - Ashapurna Buildcon"
              fill
              className="object-cover relative"
            />
            <div className="relative w-full h-full bg-black/40 flex items-center p-5 md:p-10 lg:p-15">
              <p className="uppercase text-2xl md:text-[34px] font-medium lg:text-[38px] leading-[110%] text-white w-1/2 lg:w-3/12">
                Residential Projects
              </p>
            </div>
          </div>
        </Link>
        <Link href={`/${"commercial"}`}>
          <div className="w-full h-[204px] md:h-[50vh] lg:h-[80vh] relative rounded-t-[10px] overflow-hidden">
            <Image
              src="/assets/agri-park.jpg"
              alt="Commercial Projects - Ashapurna Buildcon"
              fill
              className="object-cover relative"
            />
            <div className="relative w-full h-full bg-black/40 flex items-center p-5 md:p-10 lg:p-15">
              <p className="uppercase text-2xl md:text-[34px] font-medium lg:text-[38px] leading-[110%] text-white w-1/2 lg:w-3/12">
                Commercial Projects
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className=" bg-cream-600 w-full" id="testimonials">
        <Testimoials />
      </div>
      <MentionSection events={events} utsavImagePath={utsavImagePath} />
      <div className="w-full relative bg-cream-600">
        <AwardSection />
      </div>
      <div className="w-full relative ">
        <OwnerShipSection />
      </div>
      <div className="w-full relative bg-cream-600">
        <GetInTouch spanText="Begins here" heading="your next chapter" />
      </div>
    </div>
  );
}
