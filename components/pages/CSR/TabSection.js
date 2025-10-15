"use client";
import { useEffect, useState } from "react";
import DropdownSelector from "./DropdownSelector";
import TabHeader from "./TabHeader";
import { csr } from "@/lib/content";
import CardTwo from "@/components/CardTwo";
import Image from "next/image";

export default function TabSection() {
  const tab = ["healthcare", "education", "environment", "social"];
  const [activeTab, setActiveTab] = useState("healthcare");
  const [tabContent, setTabContent] = useState(
    csr.filter((el) => el.type.toLowerCase() === "healthcare")
  );

  useEffect(() => {
    const filteredContent = csr.filter(
      (el) => el.type.toLowerCase() === activeTab.toLowerCase()
    );
    setTabContent(filteredContent);
  }, [activeTab]);

  return (
    <div className="relative w-full px-5 md:px-10 lg:px-20">
      <div className="flex flex-col items-start gap-4 mb-5 w-full">
        {/* Show dropdown on small/medium screens */}
        <div className="lg:hidden w-full">
          <DropdownSelector
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tab}
          />
        </div>
        
        {/* Show tab header on large screens */}
        <div className="hidden lg:block w-full">
          <TabHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tab}
          />
        </div>
        
        <h5 className="relative capitalize text-lg md:text-4xl lg:text-[40px] text-black-400 leading-[130%] font-bold mt-8 lg:hidden">
          {activeTab}
        </h5>
      </div>
      <div className="grid grid-cols-1 gap-y-6 gap-4 lg:gap-12 mb-13  md:mb-16 lg:mb-24">
        {tabContent.length > 0 ? (
          tabContent.slice(0, 1).map((data) => (
            <div
              key={data.id}
              className="relative rounded-t-lg overflow-hidden pb-2"
            >
              <div className="w-full h-[222px] md:h-[70vh] lg:h-[95vh] relative img-cont">
                <Image
                  src={data.imgUrl}
                  alt={data.title}
                  fill
                  className="relative object-cover"
                />
              </div>
              <div className="blog-content flex flex-col place-items-start gap-1 pt-3">
                <h5 className="text-[15px] md:text-[24px] lg:text-2xl font-bold uppercase text-gray-700">
                  {data.media}
                </h5>
                <div className="h-[1px] lg:h-[2px] w-9 lg:w-1/12 bg-orange-600 line lg:mt-4"></div>
                <h3 className="text-base md:text-[30px] lg:text-[32px] font-medium lg:font-semibold text-black-400 leading-[130%] my-1">
                  {data.title}
                </h3>
                <p className="text-sm  md:text-xl lg:text-lg text-gray-800  leading-[140%] w-full pr-2 tracking-[-1.1%]">
                  {data.desc}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No content available for {activeTab}.</p>
        )}
      </div>
    </div>
  );
}
