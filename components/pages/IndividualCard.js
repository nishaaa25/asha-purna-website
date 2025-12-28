import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify"; // make sure you installed it: npm install dompurify

export default function IndividualCard({ data }) {
  // Clean and sanitize HTML description
  const cleanHTML = data?.desc ? data.desc.split("<div")[0].trim() : "";
  const safeHTML = DOMPurify.sanitize(cleanHTML);

  // Format date
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
  };

  return (
    <Link
      href={`/blogs/${data?.slug}`}
      onClick={handleClick}
      className="block relative min-w-[270px] rounded-t-lg overflow-hidden pb-4"
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
      <div className="blog-content flex flex-col place-items-start gap-2 lg:gap-1 pt-4 lg:pt-6">
        {data.media && (
          <h5 className="text-[15px] md:text-lg lg:text-lg  font-bold uppercase text-gray-700">
            {data.media}
          </h5>
        )}
        <div className="h-[1px] lg:h-[1.7px] w-9 lg:w-1/12 mb-2 bg-orange-600 line"></div>
        <h3 className="text-lg md:text-3xl lg:text-[43px] font-bold text-gray-600 leading-[130%] my-1">
          {data.title}
        </h3>
        {/* Description with HTML */}
        <div
          className="custom-desc text-sm md:text-base lg:text-xl  text-gray-600 leading-[130%] w-full pr-2 line-clamp-2 tracking-[-1.1%]"
          dangerouslySetInnerHTML={{ __html: safeHTML }}
        ></div>{" "}
        {formattedDate && (
          <p className="text-sm md:text-xl lg:text-[30px] text-black-400/30 leading-[130%]">
            {formattedDate}
          </p>
        )}
      </div>
    </Link>
  );
}
