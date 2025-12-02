import Image from "next/image";

export default function CustomCard({data}) {
  return <div
    key={data.id}
    className="relative min-w-[270px] rounded-t-lg overflow-hidden pb-2"
  >
    <div className="w-full h-[222px] lg:h-[15vw] relative img-cont">
      <Image
        src={data.imgUrl}
        alt={data.title}
        fill
        className="relative object-cover"
      />
    </div>
    <div className="blog-content flex flex-col place-items-start gap-2 pt-3 lg:pt-6">
      <h5 className="text-[15px] md:text-lg lg:text-[20px] font-bold uppercase text-gray-700">
        {data.media}
      </h5>
      <div className="h-[1px] lg:h-[1.7px] w-9 lg:w-1/12 bg-orange-600 line"></div>
      <h3 className="text-base md:text-[22px] lg:text-xl font-bold text-gray-600 leading-[130%] my-1">
        {data.title}
      </h3>
      {data.location && <div className="flex-between relative w-full text-gray-600 text-sm lg:text-lg leading-[130%] mb-2">
        <p >{data.date}</p>
        <p>{data.location}</p>
      </div>}
      <p className="text-sm md:text-base lg:text-lg text-gray-600  leading-[130%] w-full pr-2">
        {data.desc}
      </p>
      {data.date&& <p className="text-xs text-black-400/70 font-mulish leading-[130%]">{data.date}</p>}
    </div>
  </div>;
}
