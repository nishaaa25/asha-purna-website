"use client";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import CardTwo from "@/components/CardTwo";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import NewsCard from "@/components/pages/NewsCard";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { eventsPageContent } from "@/lib/events";

export default function NewsEventspage() {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [imgPath, setImagePath] = useState("");
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://apiservices.ashapurna.com/api/web/media-events",
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
        if (result._status) {
          setEvents(result._data?.getUtsavCamps || []);
          setImagePath(result._data?.utsav_camps_image_path || "");
        } else {
          setEvents([]);
          setError(result._message || "Failed to fetch events");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const initialEventCount = isLargeScreen ? 4 : 5;
  const eventsToShow = showAllEvents
    ? events
    : events?.slice(1, initialEventCount);

  return (
    <div className="relative w-full">
      <HeroComponentTwo imgUrl="/assets/investor.jpg" />
      <div className="relative w-10/12 mx-auto">
        <SectionHeader
          title="news&events"
          heading="Celebrating"
          spanText="moments"
          desc="From corporate milestones to festive celebrations, spiritual ceremonies to community gatherings - discover the vibrant tapestry of events that bring the Ashapurna family together."
        />
      </div>

      <div className="w-[90%] mx-auto relative pb-7 lg:pb-[80px]">
        {events.length > 0 ? (
          <NewsCard data={events[0]} path={imgPath} />
        ) : (
          <p className="text-center text-gray-500">Loading news...</p>
        )}
      </div>

      <div className="relative mx-auto bg-cream-600 pb-5">
        <SectionHeader
          heading="Event"
          spanText="Timeline"
          desc="Explore our comprehensive event history and upcoming celebrations"
        />

        <div className="w-full px-[22px] h-full relative justify-start lg:px-20 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-y-10 lg:gap-x-6 mb-10">
          {eventsToShow.map((item) => {
            const eventSlug = item?.slug || `event-${item?.id}`;
            return (
              <Link href={`/news&events/${eventSlug}`} key={item.id}>
                <div className="flex items-start justify-start flex-row lg:flex-col gap-4 h-full relative cursor-pointer hover:shadow-lg transition-shadow duration-300 p-2 rounded-lg">
                  <div className="w-4/12 lg:w-full relative h-[130px] md:h-[220px] lg:h-[330px] rounded-t-lg overflow-hidden">
                    <Image
                      src={imgPath + item?.image}
                      alt={item?.alt_image_text || item?.title}
                      fill
                      className="relative object-cover"
                    />
                  </div>

                  <div className="relative w-8/12 lg:w-full flex flex-col gap-2">
                    <h3 className="text-sm md:text-lg lg:text-[22px] font-semibold text-gray-700 leading-[130%] lg:mt-2">
                      {item?.title}
                    </h3>

                    <div className="relative w-2/12 bg-orange-600 h-[1.5px] rounded-full lg:my-2"></div>

                    <div className="relative flex-between text-gray-500">
                      <p className="text-[10px] md:text-xs lg:text-sm font-medium">
                        {item?.date}
                      </p>
                      <p className="text-[10px] md:text-xs lg:text-sm font-medium">
                        {item?.location}
                      </p>
                    </div>

                    <p className="text-xs md:text-sm lg:text-base leading-[150%] text-gray-700">
                      {truncateText(item?.short_description, 130)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {events.length > initialEventCount && (
          <div className="w-full flex-center pb-10 lg:pb-[80px]">
            <Button
              text={showAllEvents ? "Show Less" : "All Events"}
              onClick={() => setShowAllEvents(!showAllEvents)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
