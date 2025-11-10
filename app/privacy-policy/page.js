import HeroComponentTwo from "@/components/HeroComponentTwo";
import SectionHeader from "@/components/SectionHeader";
import { privacyPolicyContent } from "@/lib/content";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full relative">
      <HeroComponentTwo imgUrl="https://d3qnldyv492i08.cloudfront.net/ashapurna/images/webimages/pp-bg.png" />
      <SectionHeader
        spanText="Your Data, Our Commitment"
        heading="Privacy Policy"
        title="Legal"
        desc="At Ashapurna Buildcon, we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data."
      />
      <div className="w-full bg-[#f6f6f6] relative px-[22px] py-[50px] lg:py-[100px] lg:px-20 flex-center flex-col gap-12">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
          {privacyPolicyContent.map((item) => (
            <div className="flex flex-col gap-5" key={item.id}>
              <h2 className="text-black-400 text-base md:text-2xl lg:text-3xl font-semibold leading-[130%] tracking-[-1.1%]">
                {item.title}
              </h2>
              <p className="text-gray-800 text-sm md:text-base lg:text-lg leading-[140%] tracking-[-1.1%]">
                {item.desc}
              </p>
            </div>
          ))}
          <div className="flex flex-col gap-3 mt-8">
            <p className="text-gray-800 text-sm md:text-base lg:text-lg leading-[140%] tracking-[-1.1%] font-semibold">
              Last Updated: October 2025
            </p>
            <p className="text-gray-800 text-sm md:text-base lg:text-lg  leading-[140%] tracking-[-1.1%]">
              If you have any questions about this Privacy Policy, please contact us at{" "}
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
            <p className="text-gray-800 text-sm md:text-base lg:text-lg leading-[140%] tracking-[-1.1%] ">
              4A, East Patel Nagar, Circuit House Road, Opposite LIC Office, Jodhpur, Rajasthan, 342011
            </p>
          </div>
        </div>
      </div>

      <SectionHeader
        spanText="We're here to help"
        heading="Have Questions?"
        desc="For any queries or clarifications regarding our privacy practices, please contact our team directly."
        btn="Contact us"
        btnLink="/contact"
      />
    </div>
  );
}

