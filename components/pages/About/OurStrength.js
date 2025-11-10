import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import { features } from "@/lib/content";
import Image from "next/image";

export default function OurStrength(params) {
  return (
    <div className="w-full relative bg-cream-600 flex-center flex-col pb-18 md:pb-20 lg:pb-[100px]">
      <div className="relative w-10/12 lg:w-9/12 mx-auto">
        <SectionHeader
          spanText="Our strength"
          heading="Our people,"
          desc="Behind every township is a team that brings more than skill - they bring passion. What unites them is not just the ambition to build, but the belief that every project must carry integrity, care, and pride."
        />
      </div>
      <div className="w-11/12 md:w-9/12 lg:w-[50%] mx-auto relative pb-10">
        <div className="w-full h-[220px] md:h-[40vh] lg:h-[50vh] relative mb-15 overflow-hidden">
          <Image
            src="/assets/team.jpg"
            alt="team"
            fill
            className="object-cover object-center relative"
          />
        </div>
        <p className=" text-center relative text-sm lg:text-base leading-[140%] tracking-[-1.1%] text-gray-800 lg:w-8/12 lg:mx-auto ">
    It is this collective spirit that has transformed Ashapurna from a Jodhpur-born dream into a trusted name across Rajasthan, and the same spirit will guide us as we expand across India.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 relative w-9/12 mx-auto pt-5 lg:pt-10 pb-15 md:pb-20 items-start">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex-center w-full flex-col text-center gap-1 md:gap-3 lg:gap-4"
          >
            <div className="relative w-7 h-7 md:h-9 md:w-9 lg:h-12 lg:w-12 flex-center">
              <Image
                src={feature.imgUrl}
                alt={feature.title}
                fill
                className="object-contain relative"
              />
            </div>
            <h5 className="font-mulish text-sm md:text-base lg:text-lg font-bold leading-[130%] tracking-[-1.3%] text-gray-600 w-9/12 lg:w-1/2">
              {feature.title}
            </h5>
            <p className="font-mulish text-xs md:text-sm lg:text-sm leading-[140%] tracking-[-1.1%] font-normal text-gray-800 px-1">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
      <Button text="Careers" link="/careers"/>
    </div>
  );
}
