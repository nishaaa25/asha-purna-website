"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BlogsCard from "./BlogsCard";

export default function ArticlesCarousel({ data = [], allBlogs = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full relative top-5">
      <Swiper
        modules={[Pagination]}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        onSlideChange={(sw) => setActiveIndex(sw.realIndex)}
        breakpoints={{
          320: { slidesPerView: 1.1 },
          480: { slidesPerView: 1.2 },
          768: { slidesPerView: 1.4 },
          1024: { slidesPerView: 3, centeredSlides: false },
        }}
        className="w-full ownership-swiper"
      >
        {data.map((blog, index) => (
          <SwiperSlide
            key={blog.id || index}
            className={`transition-transform duration-300 ease-in-out ${
              index === activeIndex ? "z-[70]" : "z-[10]"
            }`}
          >
            <BlogsCard
              data={{
                id: blog.id,
                slug: blog.slug,
                imgUrl: blog.post_image,
                media: blog.source_name,
                title: blog.title,
                desc: blog.content,
                date: blog.published_at,
              }}
              allBlogs={allBlogs}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
