"use client";
import Image from "next/image";
import { useState, useMemo } from "react";

export default function CsrCard({ data, imagesPath }) {
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(data?.description);
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldShowToggle = useMemo(() => {
    if (!data?.description) return false;
    // Heuristic: show toggle if description is longer than ~160 chars
    return String(data.description).replace(/<[^>]*>/g, "").trim().length > 160;
  }, [data?.description]);

  const clampStyles = isExpanded
    ? {}
    : {
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      };

  return (
    <div
      key={data.id}
      className="relative min-w-[270px] rounded-t-lg overflow-hidden pb-2"
    >
      <div className="w-full h-[222px] md:h-[35vh] lg:h-[40vh] relative img-cont">
        <Image
          src={imagesPath + data.image}
          alt={data.title}
          fill
          className="relative object-cover"
        />
      </div>
      <div className="blog-content flex flex-col place-items-start gap-1 pt-3 lg:pt-6">
        <h3 className="text-base md:text-[22px] lg:text-xl font-bold text-gray-600 leading-[130%] my-1">
          {data?.title}
        </h3>
        {data?.media ||
          (data?.tagline && (
            <h5 className="text-[15px] md:text-lg lg:text-lg font-bold uppercase text-gray-700">
              {data?.tagline}
            </h5>
          ))}
        {data.location && (
          <div className="flex-between relative w-full text-black-400/70 text-xs leading-[130%] mb-2">
            <p>{data?.date}</p>
            <p>{data?.location}</p>
          </div>
        )}
        {isHTML ? (
          <div
            className="text-gray-700 text-sm"
            style={clampStyles}
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
        ) : (
          <p className="text-gray-700 text-sm" style={clampStyles}>
            {data?.description}
          </p>
        )}

        {shouldShowToggle && (
          <button
            type="button"
            className="mt-2 text-orange-600 text-sm font-medium hover:underline cursor-pointer"
            onClick={() => setIsExpanded((v) => !v)}
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}
