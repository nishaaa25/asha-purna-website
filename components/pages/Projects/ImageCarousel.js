"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { recentProjects, testimonials } from "@/lib/content";

export default function ImageCarousel({images}) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Don't render if no images
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation]}
        centeredSlides={true}
        slidesPerView={1.5}
        spaceBetween={15}
        watchSlidesProgress
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
        className="w-full relative"
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 1.3 },
          768: { slidesPerView: 1.5},
          1024: { slidesPerView: 1.5 },
        }}
      >
        {images.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={index}
              className={`!h-auto relative pt-6 transition-transform duration-300 ease-in-out ${
                isActive ? "z-[70] scale-[1]" : "z-[10] scale-[0.95]"
              }`}
            >
              <div className="relative h-[202px] md:h-[40vh] lg:h-[70vh] w-full rounded-t-xl overflow-hidden">
                <Image
                  src={item.imgUrl}
                  alt={item.title || ""}
                  fill
                  className="object-cover"
                  quality={100}
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
