"use client";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import ArticlesCarousel from "@/components/pages/Blogs/ArticlesCarousel";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogSlugPage() {
  const { blogSlug } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const savedBlog = sessionStorage.getItem("selectedBlog");
    const savedAllBlogs = sessionStorage.getItem("allBlogs");

    let parsedAll = [];
    try {
      if (
        savedAllBlogs &&
        savedAllBlogs !== "undefined" &&
        savedAllBlogs !== "null"
      ) {
        parsedAll = JSON.parse(savedAllBlogs);
        setAllBlogs(parsedAll);
      }
    } catch (e) {
    }

    try {
      if (savedBlog && savedBlog !== "undefined" && savedBlog !== "null") {
        const parsedBlog = JSON.parse(savedBlog);
        if (parsedBlog.slug === blogSlug) {
          setBlog(parsedBlog);
        } else if (parsedAll.length) {
          const matched = parsedAll.find((b) => b.slug === blogSlug);
          setBlog(matched || null);
        }
      } else if (parsedAll.length) {
        const matched = parsedAll.find((b) => b.slug === blogSlug);
        setBlog(matched || null);
      }
    } catch (e) {
    }
  }, [blogSlug]);

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

  // Find current blog index
  const currentIndex = allBlogs.findIndex((b) => b.slug === blog.slug);

  // Get next 3 blogs after the current one (wrap around if needed)
  let nextBlogs = [];
  if (currentIndex !== -1 && allBlogs.length > 0) {
    nextBlogs = allBlogs.slice(currentIndex + 1, currentIndex + 4);
    if (nextBlogs.length < 3) {
      nextBlogs = [...nextBlogs, ...allBlogs.slice(0, 3 - nextBlogs.length)];
    }
  }

  const blogsToShow = nextBlogs;

  return (
    <div className="w-full relative">
      {/* Optional hero section */}
      {/* <HeroComponentTwo imgUrl={blog.imgUrl} /> */}

      {/* Banner image */}
      <div className="relative w-full h-auto overflow-hidden">
        <Image
          src={blog.imgUrl}
          alt={blog.title}
          width={800}
          height={500}
          className="w-full h-auto"
        />
        <div className="w-full h-full banner-gradient absolute top-0 left-0 z-10"></div>
      </div>

      {/* Blog content */}
      <div className="w-full px-[22px] md:px-12 lg:px-20 py-12 md:py-20 lg:py-[100px]">
        <h1 className="text-base md:text-2xl lg:text-[44px] font-bold mb-5">
          {blog.title}
        </h1>
        <div className="h-[1px] lg:h-[2px] w-9 lg:w-1/12 mb-5 bg-orange-600"></div>

        <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-5">
          {formattedDate}
        </p>

        <div
          className="prose prose-lg blog-desc max-w-none prose-headings:font-bold prose-a:text-orange-600 prose-a:no-underline hover:prose-a:text-orange-700 prose-img:rounded-xl prose-strong:text-gray-900 prose-blockquote:border-orange-600 prose-blockquote:bg-orange-50 prose-blockquote:p-4 prose-blockquote:rounded-lg prose-li:marker:text-orange-600"
          dangerouslySetInnerHTML={{ __html: blog.desc }}
        />
      </div>

    </div>
  );
}
