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
import AboutPageClient from "@/components/pages/About/AboutPageClient";

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
    <AboutPageClient>
      <div className="relative w-full">
        <section className="w-full relative h-[40dvh] md:h-[70vh] lg:h-[90vh] flex-center overflow-hidden ">
          <Image
            src="/assets/about-bg.jpg"
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
            desc="Founded in 1996, Ashapurna Buildcon Limited has emerged as one of Rajasthan’s most trusted and progressive real estate developers. From its early beginnings to becoming a limited entity within a year, the company has continuously expanded its footprint with a focus on quality, transparency, and long-term value. Over 28 years, Ashapurna has delivered 45 landmark projects spanning 140+ lakh sq. ft., housing more than 30,000 families and redefining community living across categories - residential, commercial, hospitality, and education. As the first ISO 9001:2000 certified developer in Western Rajasthan, Ashapurna’s philosophy remains rooted in integrity, craftsmanship, and innovation - creating spaces that turn aspirations into lasting legacies."
          />
        </div>
        <div className=" px-3 relative -top-10 pb-10 md:pb-15 lg:pb-20">
          <CountersSection data={data} />
        </div>
        <div className="relative w-full mx-auto bg-cream-600 py-20 flex-center flex-col">
          <h2 className="relative text-[22px] md:text-[40px] lg:text-[48px] leading-[130%] tracking-[-1.1px] font-medium text-center mb-8 text-gray-600">
            Our Leadership
          </h2>
          <div className="w-full mx-auto relative mt-8 md:mt-10 lg:mt-13 font-mulish">
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
    </AboutPageClient>
  );
}
