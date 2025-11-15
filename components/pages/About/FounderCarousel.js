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
    <div className="w-full relative pb-2 -top-8">
      <Swiper
        centeredSlides={false}
        slidesPerView={1.1}
        spaceBetween={14}
        watchSlidesProgress
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
        className="w-full relative h-full "
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
              className={`relative !h-auto transition-transform duration-300 ease-in-out ${
                isActive ? "z-[70]" : "z-[10]"
              }`}
            >
              <div
                key={item.id}
                className="w-full h-full flex flex-col rounded-t-[10px] px-[10px] py-5 bg-white"
              >
                <div className="w-full relative img-cont aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/2] h-[40vh] lg:h-[50vh]">
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
                    <p className="text-xs lg:text-base leading-[140%] w-11/12 font-normal text-black-400/70 mt-5">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-sm md:text-base lg:text-lg font-bold text-black-400">
                      {item.name}
                    </h2>
                    <h3 className="text-xs md:text-sm lg:text-base font-medium text-orange-600/50 mt-[5px]">
                      {item.position}
                    </h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
