import Image from "next/image";
import Link from "next/link";

export default function NewsCard({ data, path }) {
  const eventSlug = data?.slug || `event-${data?.id}`;
  
  return (
    <Link href={`/news&events/${eventSlug}`}>
      <div
        key={data?.id}
        className="relative min-w-[270px] rounded-t-lg overflow-hidden pb-2 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      >
      <div className="w-full h-[222px] md:h-[70vh] lg:h-[95vh] relative img-cont">
        <Image
          src={path + data?.image}
           alt={data?.alt_image_text || data?.title}
          fill
          className="relative object-cover"
        />
      </div>
      <div className="blog-content flex flex-col place-items-start gap-1 pt-3 lg:pt-6">
        <h5 className="text-[15px] font-bold uppercase text-gray-700">
          {data?.media}
        </h5>
        <h3 className="text-base md:text-[30px] lg:text-[32px] font-bold text-gray-600 leading-[130%] ">
          {data?.title}
        </h3>
        <div className="h-[1px] lg:h-[2px] w-9 lg:w-1/12 bg-orange-600 line mb-2"></div>
        {data?.location && (
          <div className="flex-between relative w-full text-black-400/70 text-xs md:text-lg lg:text-lg lg:text-black-400/30 leading-[130%] mb-2">
            <p>{data?.date}</p>
            <p>{data?.location}</p>
          </div>
        )}
        <p className="text-sm lg:text-lg text-gray-600  leading-[130%] w-full pr-2">
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
