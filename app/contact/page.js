import ContactUsForm from "@/components/ContactUsForm";
import FaqSection from "@/components/FaqSection";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import OurOffice from "@/components/OurOffice";
import SectionHeader from "@/components/SectionHeader";
import { faqs2 } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="relative w-full">
      <HeroComponentTwo imgUrl="https://d3qnldyv492i08.cloudfront.net/ashapurna/images/webimages/contact-bg.jpg" />
      <div className="w-full md:w-[80%] lg:w-[65%] mx-auto relative">
        <SectionHeader
          title="contact"
          heading="Get in Touch"
          desc="We're here to help you find your perfect home or answer any questions about our projects. Reach out to us through any of the channels below."
        />
      </div>
      <div className="flex flex-col md:flex-row gap-6 w-9/12 lg:w-10/12 mx-auto relative mb-10 md:mb-16 lg:mb-24">
        <div className="w-full relative border lg:border-2 border-orange-600/20 py-5 lg:py-7 px-8 lg:px-24 rounded-lg flex-center flex-col ">
          <div className="relative w-[17px] h-[17px] md:w-6 md:h-6 lg:h-10 lg:w-10 flex-center">
            <Image
              src="/assets/phone-red.svg"
              alt="contact-us"
              fill
              className="object-contain"
            />
          </div>
          <h5 className="capitalize text-sm md:text-xl lg:text-xl leading-[130%] font-semibold text-gray-600 mb-2 mt-4">
            Call us
          </h5>
          <p className="text-sm md:text-base lg:text-base leading-[140%] text-gray-800 mb-2 tracking-[-1.1%]">
            Speak directly with our team
          </p>
          <div className="text-sm md:text-base lg:text-lg leading-[100%] text-orange-600 font-medium text-center">
            <a href="tel:9314041747" className="block mb-[6px] hover:underline">
              9314041747
            </a>
            <a href="tel:02912514747" className="block hover:underline">
              0291-2514747
            </a>
          </div>
        </div>
        <div className="w-full relative border lg:border-2 border-orange-600/20 py-5 px-8 rounded-lg flex-center flex-col ">
          <div className="relative w-[17px] h-[17px] md:w-6 md:h-6 lg:h-10 lg:w-10 flex-center">
            <Image
              src="/assets/mail-red.svg"
              alt="contact-us"
              fill
              className="object-contain"
            />
          </div>
          <h5 className="capitalize text-sm md:text-xl lg:text-xl leading-[130%] font-semibold text-gray-600 mb-2 mt-4">
            Email us
          </h5>
          <p className="text-sm md:text-base lg:text-base leading-[140%] text-gray-800 mb-2 tracking-[-1.1%]">
            Send us your queries
          </p>
          <div className="text-sm md:text-base lg:text-lg leading-[100%] text-orange-600 font-medium text-center">
            <p className="mb-[6px]">
              <Link
                href="mailto:contact@ashapurna.com"
                className="hover:underline hover:text-[#e63946] transition-colors duration-200"
              >
                marketing@ashapurna.com
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ContactUsForm />
      <OurOffice />
      <section id="faq" className="w-full relative">
        <FaqSection faq={faqs2} />
      </section>
    </div>
  );
}
