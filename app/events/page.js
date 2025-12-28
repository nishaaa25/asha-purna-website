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
        setError(err.message);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const initialEventCount = isLargeScreen ? 3 : 4;
  const eventsToShow = showAllEvents
    ? events
    : events?.slice(1, initialEventCount);

  return (
    <div className="relative w-full">
      <HeroComponentTwo imgUrl="https://d3qnldyv492i08.cloudfront.net/ashapurna/images/webimages/events-bg.jpg" />
      <div className="relative w-10/12 mx-auto">
        <SectionHeader
          title="news & events"
          heading="Celebrating"
          spanText="moments"
          desc="From corporate milestones to festive celebrations, spiritual ceremonies to community gatherings - discover the vibrant tapestry of events that bring the Ashapurna family together."
        />
      </div>

      <div className="w-[90%] mx-auto relative pb-7 lg:pb-[80px] ">
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

        <div className="w-full px-[22px] h-full relative justify-start lg:px-20 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-y-10 lg:gap-x-6 mb-10 -top-6 lg:-top-10">
          {eventsToShow.map((item) => {
            const eventSlug = item?.slug || `event-${item?.id}`;
            return (
              <Link href={`/events/${eventSlug}`} key={item.id}>
                <div className="flex items-start justify-start flex-col gap-4 h-full relative cursor-pointer  transition-shadow duration-300 p-2 rounded-lg overflow-hidden">
                  <div className="w-full relative img-cont aspect-[16/9] md:aspect-[2/1] lg:aspect-[3/2] rounded-lg overflow-hidden">
                    <Image
                      src={imgPath + item?.image}
                      alt={item?.alt_image_text || item?.title}
                      fill
                      className="object-contain w-full h-full rounded-lg overflow-hidden"
                    />
                  </div>
                  <div className="relative lg:w-full flex flex-col gap-2">
                    <h3 className="text-sm md:text-lg lg:text-[22px] font-semibold text-gray-700 leading-[130%] my-1">
                      {item?.title}
                    </h3>

                    <div className="relative h-[1px] lg:h-[1.7px] w-9 lg:w-1/12 bg-orange-600 line"></div>

                    <div className="relative flex-between text-gray-600">
                      <p className="text-[10px] md:text-xs lg:text-sm font-medium">
                        {item?.date}
                      </p>
                      <p className="text-[10px] md:text-xs lg:text-sm font-medium">
                        {item?.location}
                      </p>
                    </div>

                    <p className="text-xs md:text-sm lg:text-base leading-[150%] text-gray-600 text-justify -tracking-[1.1%]">
                      {truncateText(item?.short_description, 130)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {events.length > initialEventCount && (
          <div className="w-full flex-center pb-6 lg:pb-12 -top-6 lg:-top-10 relative">
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
