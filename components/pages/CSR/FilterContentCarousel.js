"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

export default function FilterContentCarousel({ events, imagePath }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Navigation]}
        loop={true}
        centeredSlides={true}
        slidesPerView={1}
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
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}
      >
        {events.map((data, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={index}
              className={`!h-auto relative  transition-transform duration-300 ease-in-out`}
            >
              <div
                key={data.id}
                className="relative rounded-t-lg overflow-hidden pb-2"
              >
                <div className="w-full h-[222px] md:h-[40vh] lg:h-[60vh] relative img-cont">
                  <Image
                    src={imagePath + data?.image}
                    alt={data.title}
                    fill
                    className="relative object-cover"
                  />
                </div>
                <div className="blog-content flex flex-col place-items-start gap-1 pt-5">
                  <h5 className="text-[15px] md:text-lg lg:text-xl font-bold uppercase text-gray-700">
                    {data.title}
                  </h5>
                  <div className="h-[1px] lg:h-[2px] w-9 lg:w-1/12 bg-orange-600 line lg:mt-3"></div>
                  <h3 className="text-base md:text-2xl lg:text-3xl font-medium lg:font-semibold text-black-400 leading-[130%] my-1">
                    {data.tagline}
                  </h3>
                  <p
                    className="text-sm  md:text-xl lg:text-lg  text-gray-800  leading-[140%] w-full pr-2 tracking-[-1.1%]"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></p>
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
