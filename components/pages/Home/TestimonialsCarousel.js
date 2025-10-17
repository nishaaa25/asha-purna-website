"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { testimonials } from "@/lib/content";

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [interactiveVideoIndex, setInteractiveVideoIndex] = useState(null);
  const swiperRef = useRef(null);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";

    // Handle youtu.be format
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0&showinfo=0&autoplay=0&mute=1`;
    }

    // Handle youtube.com format
    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0&showinfo=0&autoplay=0&mute=1`;
    }

    return url;
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    setInteractiveVideoIndex(null);
  };

  return (
    <div className="w-full relative py-8 pointer-events-auto">
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
        className="w-full relative"
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
            slidesPerView: 1.5,
            spaceBetween: 20,
            centeredSlides: true,
          },
          1280: {
            slidesPerView: 1.5,
            spaceBetween: 20,
             slidesOffsetBefore: 30,
             slidesOffsetAfter: 30,
            centeredSlides: true,
          },
        }}
      >
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={`testimonial-${testimonial.id}-${index}`}
            >
              <div className="relative group">
                {/* Video Container - fixed 50vh, no thumbnail downscaling */}
                <div className="relative h-[180px] md:h-[250px] lg:h-[380px] xl:h-[540px] w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-3xl bg-black">
                  {/* Play Overlay (mobile/tablet): enable video interaction when tapped) */}
                  {interactiveVideoIndex !== index && (
                    <button
                      type="button"
                      onClick={() => setInteractiveVideoIndex(index)}
                      className="md:hidden absolute inset-0 z-20 flex items-center justify-center bg-black/30 active:bg-black/40 transition-colors"
                      aria-label="Play video"
                    >
                    </button>
                  )}
                  <iframe
                    src={getYouTubeEmbedUrl(testimonial.videoUrl)}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className={`w-full h-full rounded-2xl object-contain ${interactiveVideoIndex === index ? "pointer-events-auto" : "pointer-events-none md:pointer-events-auto"}`}
                    title={`Testimonial from ${testimonial.name}`}
                    loading="lazy"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
