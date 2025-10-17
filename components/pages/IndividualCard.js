import Image from "next/image";

export default function IndividualCard({ data }) {
  return (
    <div
      key={data.id}
      className="relative min-w-[270px] rounded-t-lg overflow-hidden pb-2"
    >
      <div className="w-full h-[222px] md:h-[70vh] lg:h-[95vh] relative img-cont">
        <Image
          src={data.imgUrl}
          alt={data.title || "img"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="relative object-cover"
          quality={95}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
      <div className="blog-content flex flex-col place-items-start gap-1 pt-3 lg:pt-6">
        <h5 className="text-[15px] md:text-[24px] lg:text-2xl font-semibold uppercase text-gray-700 mb-1 lg:mb-2">
          {data.media}
        </h5>
        <div className="h-[1px] lg:h-[2px] w-9 lg:w-1/12 bg-orange-600 line mb-2"></div>
        <h3 className="text-base md:text-[30px] lg:text-[32px] font-medium lg:font-semibold  text-gray-600 leading-[130%] ">
          {data.title}
        </h3>
        {data.location && (
          <div className="flex-between relative w-full text-black-400/70 text-xs md:text-lg lg:text-lg lg:text-black-400/30 leading-[130%] mb-2">
            <p>{data.date}</p>
            <p>{data.location}</p>
          </div>
        )}
        <p className="text-sm  md:text-xl lg:text-lg text-gray-600  leading-[130%] w-full pr-2">
          {data.desc}
        </p>
        {data.date && !data.location && (
          <p className="text-[10px] md:text-base lg:text-base text-black-400/30 leading-[130%]">
            {data.date}
          </p>
        )}
      </div>
    </div>
  );
}
