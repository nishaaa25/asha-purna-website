"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ProjectCard from "./Projects/ProjectCard";

export default function FeaturedCarousel({ featuredProjects, imagePath }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full relative pb-2">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1.1}
        spaceBetween={20}
        watchSlidesProgress
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
        className="w-full relative"
        breakpoints={{
          320: { slidesPerView: 1.1, centeredSlides: true },
          640: { slidesPerView: 1.1, centeredSlides: true },
          768: { slidesPerView: 1.1, centeredSlides: true },
          1024: {
            slidesPerView: 3,
            slidesOffsetBefore: 40,
            slidesOffsetAfter: 40,
            centeredSlides: false,
          },
        }}
      >
        {featuredProjects.map((project, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={index}
              className={`relative transition-transform duration-300 ease-in-out flex items-stretch ${
                isActive ? "z-[70]" : "z-[10]"
              }`}
            >
              <div className="w-full h-full flex">
                <ProjectCard
                  data={project}
                  key={index}
                  imagePath={imagePath}
                  className="h-full flex flex-col"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation Arrows */}
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
