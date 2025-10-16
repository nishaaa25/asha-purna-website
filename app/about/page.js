import CountersSection from "@/components/Counter";
import FaqSection from "@/components/FaqSection";
import SectionHeader from "@/components/SectionHeader";
import { faqs } from "@/lib/content";
import Image from "next/image";
import OurStrength from "@/components/pages/About/OurStrength";
import Committed from "@/components/pages/About/Committed";
import OurJourney from "@/components/pages/About/OurJourney";
import FoundersCarousel from "@/components/pages/About/FounderCarousel";
import OurJourneySmall from "@/components/pages/About/OurJourneySmall";

export default async function AboutPage() {
  const data = [
    {
      title: "Landmark Projects",
      value: "50",
    },
    {
      title: "Families",
      value: "30",
      sign: "k",
    },
    {
      title: "Lakh Sq. Ft. Delivered",
      value: "140",
    },
    {
      title: "Yours Legacy",
      value: "28",
    },
  ];

  return (
      <div className="relative w-full">
        <section className="w-full relative h-[40dvh] md:h-[70vh] lg:h-[90vh] flex-center overflow-hidden ">
          <Image
            src="/assets/about.jpg"
            alt="land-img"
            fill
            className="relative object-cover"
          />
          <div className="w-full h-full absolute top-0 left-0 about-gradient z-20"></div>
        </section>
        <div className="w-11/12 lg:w-10/12 mx-auto relative">
          <SectionHeader
            spanText="Places of belonging"
            heading="Turning Lands into,"
            title="About"
            desc="Since 1996, Ashapurna has transformed land into landmarks creating communities where families find not just homes, but heritage. With 50+ projects, 30,000+ families, and 140+ lakh sq. ft delivered, we've redefined real estate as belonging, pride, and legacy."
          />
        </div>
        <div className=" px-3 relative -top-10 pb-10 md:pb-15 lg:pb-20">
          <CountersSection data={data} />
        </div>
        <div className="relative w-full mx-auto bg-cream-600 py-20 flex-center flex-col">
          <h2 className="relative text-[22px] md:text-[40px] lg:text-[48px] leading-[130%] tracking-[-1.1px] font-medium text-center mb-8 text-gray-600">
            Our Leadership
          </h2>
          <div className="w-full relative mt-8 md:mt-10 lg:mt-13 font-mulish">
            <FoundersCarousel />
          </div>
        </div>
        <div className="w-full relative hidden lg:block">
          <OurJourney />
        </div>
         <div className="w-full relative lg:hidden">
          <OurJourneySmall/>
        </div>
        <OurStrength />
        <Committed />
        <section className="w-full relative bg-cream-600" id="faq">
          <FaqSection faq={faqs} />
        </section>
      </div>
  );
}
