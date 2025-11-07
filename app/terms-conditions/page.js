import HeroComponentTwo from "@/components/HeroComponentTwo";
import SectionHeader from "@/components/SectionHeader";
import { termsConditionsContent } from "@/lib/content";

export default function TermsConditionsPage() {
  return (
    <div className="w-full relative">
      <HeroComponentTwo imgUrl="/assets/tc-bg.png" />
      <SectionHeader
        spanText="Guidelines for Using Our Services"
        heading="Terms & Conditions"
        title="Legal"
        desc="Please read these terms and conditions carefully before using our website or services. By accessing our website, you agree to be bound by these terms."
      />
      <div className="w-full bg-[#f6f6f6] relative px-[22px] py-[50px] lg:py-[100px] lg:px-20 flex-center flex-col gap-12">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
          {termsConditionsContent.map((item) => (
            <div className="flex flex-col gap-5" key={item.id}>
              <h2 className="text-black-400 text-base md:text-xl lg:text-3xl font-semibold leading-[130%] tracking-[-1.1%]">
                {item.title}
              </h2>
              <p className="text-gray-800 text-sm md:text-base lg:text-xl leading-[140%] tracking-[-1.1%]">
                {item.desc}
              </p>
              {item.list && (
                <div className="mt-3">
                  {item.listTitle && (
                    <p className="text-gray-800 text-sm md:text-base lg:text-xl leading-[140%] tracking-[-1.1%] font-semibold mb-3">
                      {item.listTitle}
                    </p>
                  )}
                  <ul className="list-disc pl-6 md:pl-8 lg:pl-10 space-y-2">
                    {item.list.map((listItem, index) => (
                      <li key={index} className="text-gray-800 text-sm md:text-base lg:text-lg leading-[140%] tracking-[-1.1%]">
                        {listItem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          <div className="flex flex-col gap-3 mt-8">
            <p className="text-gray-800 text-sm md:text-lg leading-[140%] tracking-[-1.1%] font-semibold">
              Effective Date: October 2025
            </p>
            <p className="text-gray-800 text-sm md:text-base leading-[140%] tracking-[-1.1%]">
              For any questions regarding these terms, please reach out to us at{" "}
              <a href="mailto:marketing@ashapurna.com" className="text-orange-600 hover:underline">
                marketing@ashapurna.com
              </a>{" "}
              or call{" "}
              <a href="tel:9314041747" className="text-orange-600 hover:underline">
                9314041747
              </a>{" "}
              /{" "}
              <a href="tel:02912514747" className="text-orange-600 hover:underline">
                0291-2514747
              </a>
            </p>
            <p className="text-gray-800 text-sm md:text-base leading-[140%] tracking-[-1.1%]">
              4A, East Patel Nagar, Circuit House Road, Opposite LIC Office, Jodhpur, Rajasthan, 342011
            </p>
          </div>
        </div>
      </div>

      <SectionHeader
        spanText="Need Assistance?"
        heading="Get in Touch"
        desc="Our team is ready to answer any questions you may have about our terms and services."
        btn="Contact us"
        btnLink="/contact"
      />
    </div>
  );
}

