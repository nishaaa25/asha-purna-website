"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { testimonials } from "@/lib/content";

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [interactiveVideoIndex, setInteractiveVideoIndex] = useState(null);
  const swiperRef = useRef(null);
  const [error, setError] = useState(null);

  // -------------------------------
  // API Call (Only if needed later)
  // -------------------------------
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          "https://apiservices.ashapurna.com/api/web/testimonials",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-version": "v1",
            },
          }
        );

        if (!response.ok)
          throw new Error(`API returned status ${response.status}`);

        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          throw new Error("Invalid response format");
        }

        const result = await response.json();
        if (!result._status) {
          throw new Error(result._message || "Failed to fetch testimonials");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTestimonials();
  }, []);

  // -------------------------------
  // Memoized YouTube URL formatter
  // -------------------------------
  const getYouTubeEmbedUrl = useCallback((url) => {
    if (!url) return "";

    let videoId = "";

    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com/watch")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    }

    if (!videoId) return url;

    return `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0&showinfo=0&autoplay=0&mute=1`;
  }, []);

  // -------------------------------
  // Swiper slide change
  // -------------------------------
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    setInteractiveVideoIndex(null); // reset mobile interaction
  };

  return (
    <div className="w-full relative py-8 pointer-events-auto">
      {/* Custom Navigation Buttons */}
      <div className="hidden lg:block">
        <button
          onClick={() => swiperRef.current?.swiper?.slidePrev()}
          className="absolute left-10 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white rounded-full shadow-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group"
          aria-label="Previous testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={2.5}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-orange-600 group-hover:text-orange-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.swiper?.slideNext()}
          className="absolute right-10 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white rounded-full shadow-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group"
          aria-label="Next testimonial"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={2.5}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-orange-600 group-hover:text-orange-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1.2}
        spaceBetween={20}
        loop
        centeredSlides
        onSlideChange={handleSlideChange}
        className="w-full"
        breakpoints={{
          320: { slidesPerView: 1.1, spaceBetween: 15, centeredSlides: false, slidesOffsetBefore: 20 },
          640: { slidesPerView: 1.1, centeredSlides: true },
          768: { slidesPerView: 1.5 },
          1024: { slidesPerView: 1.5 },
          1280: { slidesPerView: 1.5, slidesOffsetBefore: 30, slidesOffsetAfter: 30 },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={testimonial.id || index}>
            <div className="relative group">
              <div className="relative h-[180px] md:h-[250px] lg:h-[380px] xl:h-[540px] rounded-2xl overflow-hidden shadow-2xl bg-black transition-all duration-500 group-hover:shadow-3xl">

                {/* Mobile tap overlay */}
                {interactiveVideoIndex !== index && (
                  <button
                    onClick={() => setInteractiveVideoIndex(index)}
                    className="md:hidden absolute inset-0 z-20 bg-black/30 active:bg-black/40 flex items-center justify-center"
                  />
                )}

                {/* YouTube Iframe */}
                <iframe
                  src={getYouTubeEmbedUrl(testimonial.videoUrl)}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  loading="lazy"
                  title={testimonial.name}
                  className={`w-full h-full rounded-2xl object-contain ${
                    interactiveVideoIndex === index
                      ? "pointer-events-auto"
                      : "pointer-events-none md:pointer-events-auto"
                  }`}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
