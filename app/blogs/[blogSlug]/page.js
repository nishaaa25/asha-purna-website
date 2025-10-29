"use client";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import ArticlesCarousel from "@/components/pages/Blogs/ArticlesCarousel";
import BlogsCard from "@/components/pages/Blogs/BlogsCard";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogSlugPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const savedBlog = sessionStorage.getItem("selectedBlog");
    const savedAllBlogs = sessionStorage.getItem("allBlogs");

    if (savedBlog) setBlog(JSON.parse(savedBlog));
    if (savedAllBlogs) setAllBlogs(JSON.parse(savedAllBlogs));
  }, []);

  if (!blog)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  const formattedDate = blog.date
    ? new Date(blog.date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  // find current blog index
  const currentIndex = allBlogs.findIndex((b) => b.slug === blog.slug);

  // get next 20 blogs after this one
  const nextBlogs = allBlogs.slice(currentIndex + 1, currentIndex + 21);

  // if not enough blogs remain at end, wrap around to the start
  const blogsToShow =
    nextBlogs.length < 20
      ? [
          ...nextBlogs,
          ...allBlogs.slice(0, 20 - nextBlogs.length),
        ]
      : nextBlogs;

  return (
    <div className="w-full relative">
      <HeroComponentTwo imgUrl="/assets/investor.jpg" />

      <div className="w-full px-[22px] md:px-12 lg:px-20 py-12 md:py-20 lg:py-[100px]">
        <h1 className="text-base md:text-2xl lg:text-[44px] font-bold mb-5">
          {blog.title}
        </h1>
        <div className="h-[1px] lg:h-[2px] w-9 lg:w-1/12 mb-5 bg-orange-600"></div>

        <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-5">
          {formattedDate}
        </p>

        <div className="relative w-full h-auto overflow-hidden rounded-t-3xl mb-10 lg:mb-20">
          <Image
            src={blog.imgUrl}
            alt={blog.title}
            width={800}
            height={500}
            className="w-full h-auto rounded-t-2xl"
          />
        </div>

        <div
          className="prose prose-lg blog-desc max-w-none prose-headings:font-bold prose-a:text-orange-600 prose-a:no-underline hover:prose-a:text-orange-700 prose-img:rounded-xl prose-strong:text-gray-900 prose-blockquote:border-orange-600 prose-blockquote:bg-orange-50 prose-blockquote:p-4 prose-blockquote:rounded-lg prose-li:marker:text-orange-600"
          dangerouslySetInnerHTML={{ __html: blog.desc }}
        />
      </div>

      <div className="w-full relative pb-15 lg:pb-[100px]">
        <div className="relative flex-between mb-5 px-[22px] md:px-12 lg:px-20">
          <h5 className="text-black-400 text-base md:text-[30px] lg:text-[40px] font-bold leading-[130%]">
            More Articles
          </h5>
        </div>
        <div className="relative  px-[22px] md:px-12 lg:px-20">
          <ArticlesCarousel data={blogsToShow} />
        </div>
      </div>
    </div>
  );
}
