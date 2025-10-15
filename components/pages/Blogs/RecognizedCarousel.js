"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { blogs } from "@/lib/content";

export default function RecognizedCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full relative -top-4">
      <Swiper
        modules={[Navigation]}
        centeredSlides={true}
        slidesPerView={1.3}
        spaceBetween={20}
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
          768: { slidesPerView: 1.3 },
          1024: { slidesPerView: 1.5 },
        }}
      >
        {blogs.map((blog, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={index}
              className={`relative transition-transform duration-300 ease-in-out ${
                isActive ? "z-[70]" : "z-[10]"
              }`}
            >
              <div className="relative rounded-t-lg overflow-hidden">
                <div className="w-full h-[222px] relative">
                  <Image
                    src={blog.imgUrl}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="blog-content flex flex-col place-items-start gap-1 pt-5">
                  <h5 className="text-[15px] font-bold uppercase text-gray-700">
                    {blog.media}
                  </h5>
                  <div className="h-[1px] w-9 bg-orange-600"></div>
                  <h3 className="text-lg font-bold text-gray-600 leading-[130%] my-1">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-800 leading-[140%] tracking-[-1%]">
                    {blog.desc}
                  </p>
                </div>
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
