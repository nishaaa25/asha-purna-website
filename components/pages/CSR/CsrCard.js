"use client";
import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";

export default function CsrCard({ data, imagesPath }) {
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(data?.description);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);

  // Measure actual overflow in the collapsed state to decide whether to show the toggle
  useEffect(() => {
    if (!contentRef.current) {
      setShouldShowToggle(false);
      return;
    }
    // Wait a tick to ensure layout is settled with images/fonts
    const id = setTimeout(() => {
      const el = contentRef.current;
      const hasOverflow = el.scrollHeight > el.clientHeight + 1; // +1 to avoid rounding issues
      setShouldShowToggle(hasOverflow);
    }, 0);
    return () => clearTimeout(id);
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
      <div className="w-full relative img-cont aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/2]">
        <Image
          src={imagesPath + data.image}
          alt={data.title}
          fill
          className="object-cover w-full h-full"
          quality={90}
        />
      </div>
      {/* <div className="w-full relative img-cont aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/2]">
        <Image
          src={imgPath + data.image}
          alt={data?.alt_image_text || data?.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain w-full h-full"
        />
      </div> */}
      <div className="blog-content flex flex-col place-items-start gap-2 pt-3 lg:pt-6">
        <h3 className="text-base md:text-[22px] lg:text-xl font-bold text-gray-600 leading-[130%] my-1">
          {data?.title}
        </h3>
        {data?.media ||
          (data?.tagline && (
            <h5 className="text-[15px] md:text-lg lg:text-lg font-bold uppercase text-gray-600">
              {data?.tagline}
            </h5>
          ))}
        {data.location && (
          <div className="flex-between relative w-full text-gray-600 text-sm lg:text-lg leading-[130%] mb-2">
            <p>{data?.date}</p>
            <p>{data?.location}</p>
          </div>
        )}
        {isHTML ? (
          <div
            ref={contentRef}
            className="text-gray-600 text-sm "
            style={clampStyles}
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
        ) : (
          <p
            ref={contentRef}
            className="text-gray-600 text-sm md:text-base lg:text-lg"
            style={clampStyles}
          >
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
