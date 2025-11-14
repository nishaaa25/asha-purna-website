"use client";
import SectionHeader from "./SectionHeader";
import Image from "next/image";
import { useState } from "react";

export default function FaqSection({ faq }) {
  const [active, setActive] = useState("");

  const toggle = (id) => setActive(active === id ? "" : id);

  return (
    <div className="w-full relative">
      <SectionHeader heading="Frequently Asked" spanText="Questions" />

      <div className="w-full px-8 md:px-26 lg:px-50 -top-6 pb-6 md:pb-16 lg:pb-24 relative">
        {faq.map((item) => {
          const isOpen = active === item.id;

          return (
            <div key={item.id} className="mb-3 cursor-pointer">
              {/* Question Row */}
              <div
                onClick={() => toggle(item.id)}
                className="flex-between bg-gray-300 p-[10px] md:px-4 lg:px-7 md:py-4 lg:py-5 pr-8 rounded-t-md"
              >
                <h5 className="text-xs md:text-base leading-[140%] text-gray-800 w-10/12">
                  {item.question}
                </h5>

                <Image
                  src="/assets/dropdown.svg"
                  alt="dropdown"
                  width={10}
                  height={5}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Answer */}
              <div
                className={`overflow-hidden bg-white rounded-b-md transition-all duration-500 ${
                  isOpen ? "max-h-40 mt-[2px]" : "max-h-0"
                }`}
              >
                <p className="text-xs md:text-base leading-[140%] text-gray-800 p-[10px] md:px-4 lg:px-7 md:py-4 lg:py-5">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
