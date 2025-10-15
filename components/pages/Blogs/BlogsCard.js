import Image from "next/image";

export default function BlogsCard({data}) {
  return <div
    key={data.id}
    className="relative min-w-[270px] rounded-t-lg overflow-hidden pb-2"
  >
    <div className="w-full h-[198px] lg:h-[15vw] relative img-cont">
      <Image
        src={data.imgUrl}
        alt={data.title}
        fill
        className="relative object-cover"
      />
    </div>
    <div className="blog-content flex flex-col place-items-start gap-1 pt-3">
      <h5 className="text-xs font-bold uppercase text-gray-700">
        {data.media}
      </h5>
      <div className="h-[1px] w-9 bg-orange-600 line"></div>
      <h3 className="text-base font-medium text-gray-600 leading-[130%] my-1">
        {data.title}
      </h3>
      {data.location && <div className="flex-between relative w-full text-black-400/70 text-xs leading-[130%] mb-2">
        <p >{data.date}</p>
        <p>{data.location}</p>
      </div>}
      <p className="text-sm text-gray-800  leading-[140%] tracking-[-1.1%] w-full pr-2">
        {data.desc}
      </p>
      {data.date&& <p className="text-xs text-black-400/70 font-mulish leading-[130%]">{data.date}</p>}
    </div>
  </div>;
}
