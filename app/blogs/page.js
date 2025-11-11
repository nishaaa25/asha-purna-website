"use client";
import { useEffect, useState } from "react";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import IndividualCard from "@/components/pages/IndividualCard";
import SectionHeader from "@/components/SectionHeader";
import ArticlesCarousel from "@/components/pages/Blogs/ArticlesCarousel";
import BlogsCard from "@/components/pages/Blogs/BlogsCard";

export default function Page() {
  const [blogs, setBlogs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://apiservices.ashapurna.com/api/web/media-events/blogs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-version": "v1",
            },
            next: { revalidate: 3600 },
          }
        );

        if (!response.ok)
          throw new Error(`API returned status ${response.status}`);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format");
        }

        const result = await response.json();
        console.log(result, "blogs");
        if (result._status) {
          const blogsData = result._data?.getblogs || [];
          setBlogs([...blogsData].reverse()); // latest first
        } else {
          throw new Error(result._message );
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 9);
    setTimeout(() => window.scrollBy({ top: 400, behavior: "smooth" }), 200);
  };

  // Separate first blog for “Today’s Article”
  const firstBlog = blogs[0];
  const otherBlogs = blogs.slice(1);
  const visibleBlogs = otherBlogs.slice(0, visibleCount);

  return (
    <div className="relative w-full pt-[5vh]">
      {/* Hero Section */}
      {/* <HeroComponentTwo imgUrl="/assets/investor.jpg" /> */}

      {/* Section Header */}
      <SectionHeader
        title="media & insights"
        heading="Stories that"
        spanText="shape our journey"
        desc="Stay updated with the latest news, insights, and stories from Ashapurna Buildcon. Discover industry trends, company updates, and expert perspectives on real estate development."
      />

      {/* Today's Article */}
      {firstBlog && (
        <div>
          <h5 className="relative capitalize text-lg md:text-[36px] lg:text-[54px] text-black-400 leading-[130%] tracking-[-1.1%] font-bold w-full px-[22px] md:px-12 lg:px-20 mx-auto mb-5 lg:mb-10">
            Today&apos;s Article
          </h5>
          <div className="w-full px-[22px] md:px-12 lg:px-20 relative mb-10 lg:mb-15">
            <div className="relative w-full pb-7 lg:pb-13 border-b-[0.5px] border-black-400/50">
              <IndividualCard
                data={{
                  id: firstBlog.id,
                  slug: firstBlog.slug,
                  imgUrl: firstBlog.post_image,
                  media: firstBlog.source_name,
                  title: firstBlog.title,
                  desc: firstBlog.content,
                  date: firstBlog.published_at,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* More Articles Section */}
      <div className="w-full relative pb-15 lg:pb-[100px]">
        <div className="relative flex-between mb-5 lg:mb-10 px-[22px] md:px-12 lg:px-20">
          <h5 className="text-black-400 text-base md:text-[36px] lg:text-[54px] font-bold leading-[130%]">
            More Articles
          </h5>
          {/* ✅ Toggle Button for Mobile */}
          <p
            onClick={() => setShowAll(true)}
            className="lg:hidden text-sm text-orange-600 font-medium underline text-center cursor-pointer"
          >
            {showAll ? "Show Less" : "Show All"}
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">{error}</p>
        ) : (
          <>
            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300 lg:mb-10 md:px-12 lg:px-20">
              {visibleBlogs.map(
                (item, index) =>
                  item?.post_image && (
                    <div key={item.id || index}>
                      <BlogsCard
                        data={{
                          id: item.id,
                          slug: item.slug,
                          imgUrl: item.post_image,
                          media: item.source_name,
                          title: item.title,
                          desc: item.content,
                          date: item.published_at,
                        }}
                        allBlogs={blogs}
                      />
                    </div>
                  )
              )}
            </div>

            {/* Mobile Section */}
            <div className="lg:hidden relative">
              {!showAll ? (
                <ArticlesCarousel data={visibleBlogs} />
              ) : (
                <div className="grid grid-cols-1 gap-5 transition-all duration-300 px-5 mt-5">
                  {otherBlogs.map(
                    (item, index) =>
                      item?.post_image && (
                        <div key={item.id || index}>
                          <BlogsCard
                            data={{
                              id: item.id,
                              slug: item.slug,
                              imgUrl: item.post_image,
                              media: item.source_name,
                              title: item.title,
                              desc: item.content,
                              date: item.published_at,
                            }}
                          />
                        </div>
                      )
                  )}
                  <p
                    onClick={() => setShowAll(false)}
                    className="text-sm text-orange-600 font-medium underline text-center mt-4 cursor-pointer"
                  >
                    Show Less
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ✅ Show More Button (only if not showing all and not loading) */}
        {!loading && !showAll && visibleCount < otherBlogs.length && (
          <button
            onClick={handleShowMore}
            className="border hidden lg:flex border-[#cccccc] mx-auto bg-black-400 text-white font-medium text-xs md:text-base lg:text-xl py-[10px] lg:py-[15px] min-w-38 lg:min-w-44 px-5 lg:px-6 rounded-md mt-10 capitalize transition-all duration-300 hover:opacity-90 cursor-pointer"
          >
            Show More Articles
          </button>
        )}
      </div>
    </div>
  );
}
