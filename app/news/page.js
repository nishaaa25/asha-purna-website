"use client";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import CardTwo from "@/components/CardTwo";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import NewsCard from "@/components/pages/NewsCard";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  const [showAllNews, setShowAllNews] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [imgPath, setImagePath] = useState("");
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://apiservices.ashapurna.com/api/web/media-events/news",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok)
          throw new Error(`API returned status ${response.status}`);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format");
        }

        const result = await response.json();
        console.log(result);
        if (result._status) {
          setNews(result._data?.getNews);
          setImagePath(result._data?.image_path);
        } else {
          setNews([]);
          setError(result._message || "Failed to fetch news");
        }
      } catch (err) {
        setError(err.message);
        setNews([]);
      }
    };

    fetchNews();
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const initialNewsCount = isLargeScreen ? 3 : 4;
  const newsToShow = showAllNews ? news : news?.slice(1, initialNewsCount);

  return (
    <div className="relative w-full">
      <HeroComponentTwo imgUrl="https://d3qnldyv492i08.cloudfront.net/ashapurna/images/webimages/events-bg.jpg" />

      <div className="relative mx-auto bg-cream-600 pb-5">
        <SectionHeader
          heading="News"
          spanText="Articles"
          desc="Explore our comprehensive news archive and stay updated"
        />

        <div className="w-full px-[22px] h-full relative justify-start lg:px-20 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-y-10 lg:gap-x-6 mb-10 -top-6 lg:-top-10">
          {newsToShow.map((item) => {
            return (
              <div
                key={item?.id}
                className="flex items-start justify-start flex-col gap-4 h-full relative cursor-pointer  transition-shadow duration-300 p-2 rounded-lg overflow-hidden"
              >
                <div className="w-full relative img-cont h-[358px] p-2 bg-white shadow-xs aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/2] rounded-lg overflow-hidden hidden lg:block">
                  <Image
                    src={imgPath + item?.image}
                    alt={item?.alt_image_text || item?.title}
                    fill
                    className="object-contain w-full h-full rounded-lg overflow-hidden"
                  />
                </div>
                <div className="w-full relative img-cont h-[259px] p-2 bg-white shadow-xs aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/2] rounded-lg overflow-hidden lg:hidden">
                  <Image
                    src={imgPath + item?.mobile_image}
                    alt={item?.alt_image_text || item?.title}
                    fill
                    className="object-contain w-full h-full rounded-lg overflow-hidden"
                  />
                </div>
                <div className="relative lg:w-full flex flex-col gap-2">
                  <h3 className="text-sm md:text-lg lg:text-[22px] font-semibold text-gray-700 leading-[130%] my-1">
                    {item?.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {news.length > initialNewsCount && (
          <div className="w-full flex-center pb-6 lg:pb-12 -top-6 lg:-top-10 relative">
            <Button
              text={showAllNews ? "Show Less" : "All News"}
              onClick={() => setShowAllNews(!showAllNews)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
