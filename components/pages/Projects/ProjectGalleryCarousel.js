"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ProjectGalleryCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Don't render if no images
  if (!images || images.length === 0) return null;

  // Prepare lightbox slides
  const slides = images.map((item) => ({
    src: item.imgUrl,
    alt: item.title || "Project Image",
  }));

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const galleryImages = [...images, ...images];
  return (
    <div className="w-full relative top-10 px-[5vw] lg:px-0">
      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination]}
        centeredSlides={true}
        slidesPerView={1.5}
        spaceBetween={15}
        watchSlidesProgress
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={true}
        pagination={{ clickable: true }}
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
        className="w-full relative ownership-swiper"
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 1.3 },
          768: { slidesPerView: 1.5 },
          1024: { slidesPerView: 2 },
        }}
      >
        {galleryImages.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <SwiperSlide
              key={index}
              className={`!h-auto relative transition-transform duration-300 ease-in-out ${
                isActive ? "z-[70] scale-[1.2] lg:scale-100" : "z-[10] scale-[1.0] lg:scale-[0.9]"
              }`}
            >
              <div
                className="w-full relative aspect-[2/1] lg:aspect-[3/2] group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={item.imgUrl}
                  alt={item.title || ""}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                    View
                  </button>
                </div>
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

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={lightboxIndex}
        />
      )}
    </div>
  );
}
