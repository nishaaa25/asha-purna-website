"use client";
import { useEffect, useState } from "react";
import DropdownSelector from "./DropdownSelector";
import TabHeader from "./TabHeader";
import { csr } from "@/lib/content";
import CardTwo from "@/components/CardTwo";
import Image from "next/image";
import FilterContent from "./FilterContentCarousel";
import FilterContentCarousel from "./FilterContentCarousel";

export default function TabSection({ data, imagePath }) {
  const tab = ["healthcare", "education", "environment", "social"];
  const [activeTab, setActiveTab] = useState("healthcare");
  const [tabContent, setTabContent] = useState(
    csr.filter((el) => el.type.toLowerCase() === "healthcare")
  );

  useEffect(() => {
    const filteredContent = data.filter(
      (el) => el.category.toLowerCase() === activeTab.toLowerCase()
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

        <h5 className="relative capitalize text-lg md:text-4xl lg:text-[40px] text-black-400 leading-[130%] font-bold mt-8 mb-10 lg:hidden">
          {activeTab}
        </h5>
      </div>
      <div className="grid grid-cols-1 gap-y-6 gap-4 lg:gap-12 mb-13  md:mb-15">
        {tabContent.length > 0 ? (
          <FilterContentCarousel events={tabContent} imagePath={imagePath}/>
        ) : (
          <p className="text-black-400 text-center text-xl mt-10 ">
            No content available for {activeTab}.
          </p>
        )}
      </div>
    </div>
  );
}
