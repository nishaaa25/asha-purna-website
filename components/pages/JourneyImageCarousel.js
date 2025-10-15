"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { awardsGallery } from "@/lib/awards";

export default function JourneyImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation]}
        centeredSlides={false}
        slidesPerView={1.5}
        spaceBetween={15}
        watchSlidesProgress
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
        className="w-full -top-10 relative"
        breakpoints={{
          320: { slidesPerView: 1.2,  slidesOffsetBefore: 26, slidesOffsetAfter: 26 },
          640: { slidesPerView: 1.3 ,  slidesOffsetBefore: 26, slidesOffsetAfter: 26 },
          768: { slidesPerView: 1.5 ,  slidesOffsetBefore: 26, slidesOffsetAfter: 26 },
          1024: { slidesPerView: 3,   slidesOffsetBefore: 80, slidesOffsetAfter: 80},
        }}
      >
        {awardsGallery.map((award, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={index}
              className={`!h-auto relative pt-6 transition-transform duration-300 ease-in-out ${
                isActive ? "z-[70]" : "z-[10]"
              } `}
            >
              <div className="relative h-[202px] md:h-[280px] lg:h-[350px] w-full rounded-t-xl overflow-hidden">
                <Image
                  src={award.imgUrl}
                  alt={award.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}
