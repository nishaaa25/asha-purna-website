import Image from "next/image";
import Link from "next/link";

export default function NewsCard({ data, path }) {
  const eventSlug = data?.slug || `event-${data?.id}`;
  
  return (
    <Link href={`/events/${eventSlug}`}>
      <div
        key={data?.id}
        className="relative min-w-[270px] rounded-t-lg overflow-hidden pb-2 cursor-pointer transition-shadow duration-300"
      >
      <div className="w-full relative img-cont aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/2]">
        <Image
          src={path + data?.image}
           alt={data?.alt_image_text || data?.title}
          fill
          className="object-contain w-full h-full"
        />
      </div>
      <div className="blog-content flex flex-col place-items-start gap-1 pt-3 lg:pt-6">
        <h5 className="text-[15px] font-bold uppercase text-gray-700 ">
          {data?.media}
        </h5>
        <h3 className="text-base md:text-[30px] lg:text-[32px] text-justify font-bold text-gray-600 leading-[130%] mb-2 lg:mb-5">
          {data?.title}
        </h3>
        <div className="h-[1px] lg:h-[2px] w-9 lg:w-1/12 bg-orange-600 line mb-3 lg:mb-5"></div>
        {data?.location && (
          <div className="flex-between relative w-full text-gray-700 text-base gap-20 md:text-lg lg:text-lg font-bold  leading-[130%] mb-4">
            <p>{data?.date}</p>
            <p>{data?.location}</p>
          </div>
        )}
        <p className="text-sm lg:text-lg  text-gray-800  leading-[130%] w-full text-justify">
          {data?.short_description}
        </p>
        {data?.date && !data?.location && (
          <p className="text-[10px] text-black-400/30 leading-[130%]">
            {data.date}
          </p>
        )}
      </div>
    </div>
    </Link>
  );
}
