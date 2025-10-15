"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function EventsCard({ data, imgPath }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => setIsExpanded((prev) => !prev);

  const eventSlug = data?.slug || `event-${data?.id}`;

  return (
    <Link href={`/news&events/${eventSlug}`}>
      <div
        key={data.id}
        className="relative min-w-[270px] rounded-t-lg overflow-hidden pb-2 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      >
      <div className="w-full h-[222px] md:h-[35vh] lg:h-[40vh] relative img-cont">
        <Image
          src={imgPath + data.image}
          alt={data?.alt_image_text || data?.title}
          fill
          className="relative object-cover"
        />
      </div>

      <div className="blog-content flex flex-col place-items-start gap-1 pt-3 lg:pt-6">
        {data.media && (
          <h5 className="text-[15px] md:text-lg lg:text-lg font-bold uppercase text-gray-700">
            {data?.media}
          </h5>
        )}

        <div className="h-[1px] lg:h-[1.7px] w-9 lg:w-1/12 bg-orange-600 line "></div>

        <h3 className="text-base md:text-[22px] lg:text-xl font-bold text-gray-600 leading-[130%] my-1">
          {data?.title}
        </h3>

        {data.location && (
          <div className="flex-between relative w-full text-black-400/70 text-xs leading-[130%] mb-2">
            <p>{data?.date}</p>
            <p>{data?.location}</p>
          </div>
        )}

        <p
          className={`text-sm md:text-base lg:text-base text-gray-600 leading-[130%] w-full pr-2 transition-all duration-300 ${
            isExpanded ? "line-clamp-none" : "line-clamp-3"
          }`}
        >
          {data?.short_description}
        </p>

        {data?.short_description?.length > 100 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleReadMore();
            }}
            className="text-orange-600 text-sm font-medium mt-1 hover:underline focus:outline-none"
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
    </Link>
  );
}
