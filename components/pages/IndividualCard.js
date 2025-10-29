import Image from "next/image";

export default function IndividualCard({ data }) {
  const cleanText = data?.desc?.split("<div")[0].trim();
  const formattedDate = data.date
    ? new Date(data.date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";
  return (
   <div
      key={data.id}
      className="relative min-w-[270px] rounded-t-lg overflow-hidden pb-4"
    >
      {/* Image */}
      {/* <div className="w-full relative img-cont aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/2]">
        <Image
          src={data.imgUrl}
          alt={data.media ? `${data.title} - ${data.media}` : data.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover w-full h-full"
        />
      </div> */}
      <div className="relative w-full h-auto overflow-hidden rounded-t-2xl">
        <Image
          src={data.imgUrl}
          alt={data.title}
          width={800}
          height={500}
          className="w-full h-auto rounded-t-2xl"
        />
      </div>

      {/* Content */}
      <div className="blog-content flex flex-col place-items-start gap-1 pt-4 lg:pt-6">
        {data.media && (
          <h5 className="text-[15px] md:text-lg lg:text-lg font-bold uppercase text-gray-700">
            {data.media}
          </h5>
        )}
        <div className="h-[1px] lg:h-[1.7px] w-9 lg:w-1/12 mb-2 bg-orange-600 line"></div>
        {formattedDate && (
          <p className="text-[10px] md:text-xs lg:text-base text-black-400/80 leading-[130%] mt-1">
            {formattedDate}
          </p>
        )}
        <h3 className="text-base md:text-xl lg:text-4xl font-semibold text-black-400 leading-[130%] my-1">
          {data.title}
        </h3>
        {/* Description (4-line limit) */}
        <div className="custom-desc text-sm md:text-base lg:text-xl text-gray-800 leading-[130%] w-full pr-2 line-clamp-3 tracking-[-1.1%]">
          {cleanText}
        </div>
      </div>
    </div>
  );
}
