"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { exclusiveCarouselData } from "@/lib/content";

export default function LandOwnershipCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full relative pb-2 lg:hidden">
      <Swiper
        modules={[Navigation, Pagination]}
        centeredSlides={true}
        slidesPerView={1.25}
        spaceBetween={-8}
        loop={true}
        watchSlidesProgress
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
        className="w-full ownership-swiper"
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1.3 ,  centeredSlides: true,},
          640: { slidesPerView: 1.3 },
          768: { slidesPerView: 1.25 },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesOffsetBefore: 30,
            slidesOffsetAfter: 30,
            centeredSlides: false,
          },
        }}
      >
        {exclusiveCarouselData.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={index}
              className={`!h-auto relative py-5 ${
                isActive ? "z-[70]" : "z-[10]"
              }`}
              style={{ zIndex: isActive ? 70 : 10 }}
            >
              <div
                className={
                  "relative overflow-hidden rounded-t-xl transition-all duration-500 lg:scale-100 lg:blur-0 " +
                  (isActive
                    ? "scale-[1.05] z-[80] blur-0"
                    : "scale-[0.95] z-[15] blur-[2px] lg:z-[70] lg:blur-none")
                }
              >
                <div className="h-[440px] md:h-[500px] lg:h-[600px] w-full relative">
                  <Image
                    src={item.src}
                    alt={
                      item.title
                        ? `${item.title} - Land Ownership at Ashapurna`
                        : "Land Ownership Showcase"
                    }
                    fill
                    className={`object-cover ${
                      index === 2 || index === 5
                        ? "object-left"
                        : "object-center"
                    }`}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
                    quality={85}
                    priority={index < 2}
                  />
                </div>
                <div className="w-full h-full absolute top-0 left-0 z-50 img-gradient"></div>
                <p className="text-lg font-medium text-white absolute bottom-3 left-3 z-50">
                  {item.title}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation Arrows - Only visible on large screens */}
      <button className="swiper-button-prev-custom hidden cursor-pointer lg:flex absolute left-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-orange-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button className="swiper-button-next-custom hidden lg:flex absolute right-10 top-1/2 cursor-pointer -translate-y-1/2 z-50 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-orange-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
