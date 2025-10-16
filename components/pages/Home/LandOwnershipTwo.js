"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Image from "next/image";
import { exclusiveCarouselData } from "@/lib/content";

export default function LandOwnershipTwo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="w-full relative pointer-events-auto hidden lg:block">
      {/* Custom Navigation Buttons */}
      <div className="hidden lg:block">
        <button
          onClick={() => swiperRef.current?.swiper?.slidePrev()}
          className="absolute left-10 top-1/2 -translate-y-1/2 z-50 cursor-pointer w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-xl hover:bg-gray-50 transition-all duration-300 group"
          aria-label="Previous testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 text-orange-600 group-hover:text-orange-700 transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.swiper?.slideNext()}
          className="absolute right-10 top-1/2 -translate-y-1/2  cursor-pointer z-50 w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-xl hover:bg-gray-50 transition-all duration-300 group"
          aria-label="Next testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 text-orange-600 group-hover:text-orange-700 transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        touchEventsTarget="container"
        slidesPerView={1.2}
        spaceBetween={20}
        loop={true}
        centeredSlides={true}
        onSlideChange={handleSlideChange}
        className="w-full relative ownership-swiper"
        breakpoints={{
          320: {
            slidesPerView: 1.1,
            spaceBetween: 15,
            centeredSlides: false,
            slidesOffsetBefore: 20,
          },
          640: {
            slidesPerView: 1.1,
            spaceBetween: 20,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 20,
            centeredSlides: true,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: false,
          },
          1280: {
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
            <SwiperSlide key={index}>
              <div
                className={
                  "relative overflow-hidden rounded-t-xl transition-all duration-500 lg:scale-100 lg:blur-0 "
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
    </div>
  );
}
