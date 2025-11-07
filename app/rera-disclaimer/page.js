import HeroComponentTwo from "@/components/HeroComponentTwo";
import SectionHeader from "@/components/SectionHeader";
import { disclaimer } from "@/lib/content";
// import Disclaimer from "@/components/pages/Rera/Disclaimer";

export default function ReraDisclaimerpage() {
  return (
    <div className="w-full relative pt-[10vh] ">
      <SectionHeader
        spanText="Disclaimer"
        heading="Rera"
        title="Legal"
        desc="Important information regarding regulatory compliance and website content."
      />
      <div className="w-full bg-[#f6f6f6]  relative px-[22px] py-[50px] lg:py-[100px] lg:px-20  flex-center flex-col gap-12 ">
        {disclaimer.map((item) => (
          <div className="flex flex-col gap-5" key={item.id}>
            <h2 className="text-black-400 text-base md:text-2xl lg:text-3xl font-semibold leading-[130%] tracking-[-1.1%]">
              {item.title}
            </h2>
            <p className="text-gray-800 text-sm md:text-lg lg:text-xl leading-[140%] tracking-[-1.1%] lg:w-10/12">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <SectionHeader
        spanText="Notice"
        heading="Important"
        desc="For any queries or clarifications regarding our projects, please contact our authorized representatives directly."
        btn="Contact us"
        btnLink="/contact"
      />
    </div>
  );
}
