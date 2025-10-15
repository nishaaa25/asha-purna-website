import SectionHeader from "@/components/SectionHeader";
import { whyChooseData } from "@/lib/content";
import Image from "next/image";

export default function WhyChoose() {
  return (
    <div className="relative w-full pb-10 lg:pb-[100px]">
      <SectionHeader heading="Why choose" spanText="Ashapurna?" />
      <div className="relative flex-center -top-7 flex-col gap-5 w-full px-[22px] mx-auto lg:w-7/12">
        {whyChooseData.map((data) => (
          <div key={data.title} className="data bg-cream-600 rounded-t-md p-4 lg:px-8 lg:py-5 w-full relative">
            <Image src={data.icon} alt={data.title} width="40" height="27" className="relative object-contain my-2"/>
            <h5 className="mb-2 text-base md:text-lg lg:text-lg font-bold leading-[130%] text-gray-600">
              {data.title}
            </h5>
            <p className="text-gray-800 text-xs md:text-sm lg:text-sm leading-[140%] tracking-[-1.1%] lg:pb-1">
              {data.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
