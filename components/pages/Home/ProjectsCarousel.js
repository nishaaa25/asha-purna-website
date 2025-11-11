"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsCarousel({ projects, imagePath }) {
  const [activeIndex, setActiveIndex] = useState(0);

    const displayProjects = [...projects, ...projects];

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation]}
        loop={true}
        centeredSlides={true}
        slidesPerView={1.5}
        spaceBetween={10}
        watchSlidesProgress
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
        className="w-full ownership-swiper -top-10 relative"
        breakpoints={{
          320: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 1.3,
          },
          768: {
            slidesPerView: 1.4,
            slidesOffsetBefore: 26,
            slidesOffsetAfter: 26,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesOffsetBefore: 30,
            slidesOffsetAfter: 30,
            centeredSlides: false,
          },
        }}
      >
        {displayProjects.map((project, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={index}
              className={`!h-auto relative pt-6 transition-transform duration-300 ease-in-out lg:pt-0 ${
                isActive ? "z-[70]" : "z-[10]"
              }`}
            >
              <Link href={`/projects/${project?.slug}`} className="block">
                <div
                  key={project?.id}
                  className={`project-card relative h-[445px] flex justify-start items-end text-white px-5 pb-8 rounded-t-xl overflow-hidden transition-transform duration-500 ease-in-out lg:scale-100 lg:blur-0 ${
                    isActive
                      ? "scale-102 z-[80] blur-0"
                      : "scale-95 z-[15] blur-[1px] lg:z-[70] lg:blur-none"
                  }`}
                >
                  <div className="w-full h-full absolute top-0 left-0 z-10 rounded-t-xl overflow-hidden">
                    <Image
                      src={
                        imagePath + (project?.project_logo_1 || project?.project_logo_2)
                      }
                      alt={
                        project?.project_logo_1_link ||
                        project?.project_logo_2_link ||
                        project?.name
                      }
                      fill
                      className="relative object-cover"
                    />
                  </div>
                  <div className="w-full h-full absolute top-0 left-0 z-20 gradient-2"></div>
                  <div className="project-content relative z-30 w-10/12 flex flex-col gap-3">
                    <div className="flex items-center justify-start gap-2">
                      <Image
                        src="/assets/location.svg"
                        alt="location-icon"
                        width={10}
                        height={12}
                        className="relative object-contain"
                      />
                      <span className="text-[11px] font-medium">
                        {project?.address}
                      </span>
                    </div>
                    <h3 className="text-[28px] font-medium leading-[100%]">
                      {project?.name}
                    </h3>
                    <p className="text-[11px] leading-[140%] font-medium text-white-600">
                      {project?.category?.name}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation Arrows - Only visible on large screens */}
      <button className="swiper-button-prev-custom  cursor-pointer flex absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
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

      <button className="swiper-button-next-custom flex absolute right-6 lg:right-10 top-1/2 cursor-pointer -translate-y-1/2 z-50 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
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
