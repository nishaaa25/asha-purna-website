"use client";
import SectionHeader from "./SectionHeader";
import Image from "next/image";
import { useState } from "react";

export default function FaqSection({faq}) {
  const [activeTab, setActiveTab] = useState("");

  const handleToggle = (id) => {
    setActiveTab((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="w-full relative">
      <SectionHeader heading="Frequently Asked" spanText="Questions" />
      <div className="w-full relative px-8 md:px-26 lg:px-50 -top-6 pb-6 md:pb-16 lg:pb-24" >
        {faq.map((item) => (
          <div key={item.id} className="mb-3 cursor-pointer">
            <div
              className="flex-between w-full relative bg-gray-300 p-[10px] md:py-4 lg:py-5 md:px-4 lg:px-7 pr-8 rounded-t-md"
              onClick={() => handleToggle(item.id)}
            >
              <h5 className="text-xs md:text-base lg:text-base leading-[140%] text-gray-800 w-10/12">
                {item.question}
              </h5>
              <Image
                src="/assets/dropdown.svg"
                alt="dropdown"
                width={10}
                height={5}
                className={`relative object-contain transition-all duration-300 ${
                  activeTab === item.id ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out bg-white pr-3 mt-[2px] rounded-b-md ${
                activeTab === item.id ? "max-h-40 " : "max-h-0 "
              }`}
            >
              <p className="text-xs md:text-base lg:text-base leading-[140%] text-gray-800 p-[10px] md:py-4 lg:py-5 md:px-4 lg:px-7 ">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
