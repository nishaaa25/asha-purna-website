"use client";
import React from "react";
import Image from "next/image";
import { founders } from "@/lib/content";

export default function FoundersCarousel() {
  return (
    <div className="relative pb-2 -top-8">
      <div className="flex flex-row justify-start lg:justify-center items-stretch w-full snap-x snap-mandatory lg::overflow-x-visible no-scrollbar">
        {founders.slice(0, 2).map((item) => (
          <div
            key={item.id}
            className="w-[85vw] lg:w-[450px] mx-4 flex-shrink-0 lg:flex-shrink flex flex-col rounded-t-[10px] px-[10px] py-5 bg-white snap-center"
          >
            <div className="w-full relative img-cont aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/2] h-100 lg:h-110">
              <Image
                src={item.imgUrl}
                alt={item.name}
                fill
                className="object-cover object-top"
              />
            </div>

            <div className="w-full mt-4 flex flex-col flex-1 justify-between">
              <div>
                <Image
                  src="/assets/quot.svg"
                  alt="quote"
                  width={27}
                  height={21}
                />
                <p className="text-xs lg:text-base leading-[140%] w-11/12 font-normal text-black-400/70 mt-5 text-justify">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6">
                <h2 className="text-sm md:text-base lg:text-lg font-bold text-black-400">
                  {item.name}
                </h2>
                <h3 className="text-xs md:text-sm lg:text-base font-medium text-orange-600/50 mt-[5px] ">
                  {item.position}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
