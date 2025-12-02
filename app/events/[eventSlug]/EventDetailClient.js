"use client";

import HeroComponentTwo from "@/components/HeroComponentTwo";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function EventDetailClient({
  event,
  imagePath,
  galleryImages = [],
  recentEvents = [],
  upcomingProjects = [],
  slug,
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Prepare lightbox slides
  const lightboxSlides = galleryImages.map((item) => ({
    src: imagePath + item.image,
    alt: item.alt_image_text || "Event Highlight",
  }));

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="relative w-full">
      <div className="relative w-full h-auto overflow-hidden  mb-10 lg:mb-20">
        <Image
          src={imagePath + event.image}
          alt={event.alt_image_text || event.title}
          width={800}
          height={500}
          className="w-full h-auto "
        />
        <div className="w-full h-full banner-gradient absolute top-0 left-0 z-10"></div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-[22px] md:px-12 lg:px-20 py-12 md:py-20 lg:py-[100px]">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-semibold text-gray-900 mb-8 md:mb-12 lg:mb-16">
          Ashapurna Events
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6 lg:p-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm p-6">
              {/* Event Details */}
              <div className="">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
                  {event.title}
                </h2>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {event.date && event.date !== "1970-01-01" && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm md:text-base">{event.date}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm md:text-base">
                        {event.location}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {event.description && (
                  <div className="text-gray-600 text-sm md:text-base lg:text-lg leading-[130%] mb-6">
                    {/<\/?[a-z][\s\S]*>/i.test(event.description) ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: event.description }}
                      />
                    ) : (
                      <p className="whitespace-pre-line">{event.description}</p>
                    )}
                  </div>
                )}

                {/* Highlights/Gallery Section */}
                {galleryImages.length > 0 && (
                  <div className="pt-6 md:pt-8">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 md:mb-6">
                      Highlights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2  gap-4 md:gap-6">
                      {galleryImages.map((item, index) => (
                        <div
                          key={index}
                          className="relative group overflow-hidden rounded-lg cursor-pointer w-full bg-gray-600/5"
                          onClick={() => openLightbox(index)}
                        >
                          <div className="w-full relative  img-cont aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/2]">
                            <Image
                              src={imagePath + item.image}
                              alt={item.alt_image_text || "Event Highlight"}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-4 space-y-6">
            {/* Recent Events Sidebar */}
            {recentEvents.length > 0 && (
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Recent Events
                </h2>
                <ul className="space-y-3">
                  {recentEvents.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <Link
                        href={`/events/${item.slug}`}
                        className="text-sm md:text-base lg:text-lg text-gray-600 hover:text-orange-600 transition-colors leading-[130%]"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Upcoming Projects Sidebar */}
            {upcomingProjects.length > 0 && (
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Upcoming Projects
                </h2>
                <ul className="space-y-3">
                  {upcomingProjects.slice(0, 5).map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <Link
                        href={`/projects/${
                          item.slug ||
                          item.projectName?.toLowerCase().replace(/\s+/g, "-")
                        }`}
                        className="text-sm md:text-base lg:text-lg text-gray-600 hover:text-orange-600 transition-colors leading-[130%]"
                      >
                        {item.projectName || item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxSlides}
          index={lightboxIndex}
        />
      )}
    </div>
  );
}
