"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { exclusiveCarouselData, recentProjects } from "@/lib/content";
import CardTwo from "@/components/CardTwo";
import CSRpage from "@/app/CSR/page";
import CsrCard from "./CsrCard";

export default function RecentProjectsCarousel({data, imagePath}) {
  const [activeIndex, setActiveIndex] = useState(0);
  

  return (
    <div className="w-full relative pb-10 lg:pb-[100px]">
      <Swiper
        modules={[Navigation]}
        centeredSlides={false}
        slidesPerView={1.1}
        spaceBetween={16}
        watchSlidesProgress
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
        className="w-full relative"
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1.1,
            slidesOffsetBefore: 30,
            slidesOffsetAfter: 30,
          },
          640: {
            slidesPerView: 1.1,
            slidesOffsetBefore: 30,
            slidesOffsetAfter: 30,
          },
          768: {
            slidesPerView: 2,
            slidesOffsetBefore: 26,
            slidesOffsetAfter: 26,
          },
          1024: {
            slidesPerView: 3,
            slidesOffsetBefore: 80,
            slidesOffsetAfter: 80,
          },
        }}
      >
        {data.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={index}
              className={`relative transition-transform duration-300 ease-in-out ${
                isActive ? "z-[70]" : "z-[10]"
              }`}
            >
              <CsrCard key={item.id} data={item} imagesPath={imagePath} />
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
