"use client";
import Image from "next/image";
import Link from "next/link";

export default function EventsCard({ data, imgPath }) {
  const eventSlug = data?.slug || `event-${data?.id}`;

  return (
    <div
      key={data.id}
      className="relative min-w-[270px] rounded-t-lg overflow-hidden pb-2 "
    >
      <div className="w-full relative img-cont aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/2]">
        <Image
          src={imgPath + data.image}
          alt={data?.alt_image_text || data?.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain w-full h-full"
        />
      </div>
{/* 
      <div className="w-full h-[200px] md:h-[35vh] lg:h-[30vh] relative img-cont">
        <Image
          src={imgPath + data.image}
          alt={data?.alt_image_text || data?.title}
          fill
          className="relative object-scale-down p-2"
        />
      </div> */}

      <div className="blog-content flex flex-col place-items-start gap-2 pt-3 lg:pt-6">
        {data.media && (
          <h5 className="text-[15px] md:text-lg lg:text-lg font-bold uppercase text-gray-700">
            {data?.media}
          </h5>
        )}

        <div className="h-[1px] lg:h-[1.7px] w-9 lg:w-1/12 bg-orange-600 line "></div>

        <h3 className="text-base md:text-[22px] lg:text-xl font-bold text-gray-600 leading-[130%] my-1 text-justify">
          {data?.title}
        </h3>

        {data.location && (
          <div className="flex-between relative w-full text-gray-600 text-xs  leading-[130%] mb-2 ">
            <p>{data?.date}</p>
            <p>{data?.location}</p>
          </div>
        )}

        <p
          className={
            "text-sm md:text-base lg:text-base text-gray-600 leading-[130%] w-full pr-2 text-justify"
          }
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {data?.short_description}
        </p>

        <Link
          href={`/events/${eventSlug}`}
          className="mt-2 text-orange-600 text-sm font-semibold underline cursor-pointer "
          aria-label="Read more about this event"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}
