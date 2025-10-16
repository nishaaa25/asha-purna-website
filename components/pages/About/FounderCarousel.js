"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { exclusiveCarouselData, founders, recentProjects } from "@/lib/content";
import CardTwo from "@/components/CardTwo";

export default function FoundersCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full relative pb-2 -top-8 ">
      <Swiper
        centeredSlides={false}
        slidesPerView={1.1}
        spaceBetween={14}
        watchSlidesProgress
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
        className="w-full relative"
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1.1,
            slidesOffsetBefore: 26,
            slidesOffsetAfter: 26,
          },
          640: {
            slidesPerView: 1.1,
            slidesOffsetBefore: 26,
            slidesOffsetAfter: 26,
          },
          768: {
            slidesPerView: 1.2,
            slidesOffsetBefore: 100,
            slidesOffsetAfter: 100,
          },
          1024: {
            slidesPerView: 2,
            slidesOffsetBefore: 200,
            slidesOffsetAfter: 200,
          },
        }}
      >
        {founders.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={index}
              className={`relative transition-transform duration-300 ease-in-out ${
                isActive ? "z-[70]" : "z-[10]"
              }`}
            >
              <div
                key={item.id}
                className="w-full relative rounded-t-[10px] px-[10px] py-5 bg-white"
              >
                <div className="w-full relative h-[320px] md:h-[380px] lg:h-[50vh] rounded-t-md overflow-hidden">
                  <Image
                    src={item.imgUrl}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="w-full relative mt-4 content flex flex-col">
                  <Image
                    src="/assets/quot.svg"
                    alt="quote"
                    width={27}
                    height={21}
                  />
                  <p className="text-sm md:text-lg lg:text-lg leading-[140%] w-11/12 relative font-normal text-black-400/70 mt-5">
                    {item.desc}
                  </p>
                  <h2 className="text-xs md:text-base lg:text-lg font-bold leading-[140%] text-black-400 mt-5 lg:mt-7">
                    {item.name}
                  </h2>
                  <h3 className="text-xs md:text-sm lg:text-base leading-[100%] font-medium text-orange-600/50 mt-[5px]">
                    {item.position}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
