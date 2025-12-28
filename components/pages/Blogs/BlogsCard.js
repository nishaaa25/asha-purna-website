"use client";
import Image from "next/image";
import Link from "next/link";

export default function BlogsCard({ data, allBlogs }) {
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

  const handleClick = () => {
    sessionStorage.setItem("selectedBlog", JSON.stringify(data));

    // Only store allBlogs if it's a valid array
    if (allBlogs && Array.isArray(allBlogs)) {
      sessionStorage.setItem("allBlogs", JSON.stringify(allBlogs));
    }
  };

  return (
    <div
      key={data.id}
      className="relative min-w-[270px] rounded-t-lg overflow-hidden pb-4"
    >
      {/* Image */}
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
      <div className="blog-content flex flex-col place-items-start gap-2 pt-4 lg:pt-6">
        {data.media && (
          <h5 className="text-[15px] md:text-lg lg:text-[20px] font-bold uppercase text-gray-700">
            {data.media}
          </h5>
        )}
        <div className="h-[1px] lg:h-[1.7px] w-9 lg:w-1/12 bg-orange-600 line"></div>
        {formattedDate && (
          <p className="text-[10px] md:text-xs lg:text-sm text-gray-600 leading-[140%] mt-2 lg:mt-1">
            {formattedDate}
          </p>
        )}
        <h3 className="text-base md:text-[22px] lg:text-xl font-semibold text-gray-600 leading-[130%] my-1">
          {data.title}
        </h3>

        <div className="custom-desc text-justify text-sm md:text-base lg:text-base text-gray-600 leading-[130%] w-full pr-2 line-clamp-4">
          {data?.desc?.replace(/<[^>]+>/g, "")}
        </div>

        <Link
          href={`/blogs/${data.slug}`}
          onClick={handleClick}
          className="text-sm font-semibold text-orange-600 underline mt-1 hover:text-orange-800 transition-colors duration-200"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
