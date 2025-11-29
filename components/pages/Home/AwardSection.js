"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import SectionHeader from "@/components/SectionHeader";
import { awards } from "@/lib/awards";
import { ImageConfigContext } from "next/dist/shared/lib/image-config-context.shared-runtime";
import Image from "next/image";
import EventsCarousel from "./EventsCarousel";
import CardTwo from "@/components/CardTwo";
import AwardCarousel from "./AwardCarousel";

export default function AwardSection() {
  const [awards, setAwards] = useState([]);
  const [imgPath, setImgPath] = useState("");
  const [error, setError] = useState(null);
  const displayedProjects = awards.slice(0, 3);
  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await fetch(
          "https://apiservices.ashapurna.com/api/web/media-events/awards",
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
          const awardsData = result._data?.getAwards || [];
          setAwards(awardsData);
          setImgPath(result?._data?.image_path);
        } else {
          throw new Error(result._message || "Failed to fetch awards");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAwards();
  }, []);
  return (
    <div className="w-full relative pb-10 md:pb-20 lg:pb-[100px]">
      <div className="w-full lg:w-8/12 mx-auto relative">
        <SectionHeader
          title="Awards & recognitions"
          heading="Stories Beyond"
          spanText="Structures"
          desc="Our commitment to quality and innovation has been recognized by leading industry bodies and publications across the nation."
        />
      </div>
      <div className="relative w-full -top-4 lg:hidden">
        <AwardCarousel awardsData={awards} imgPath={imgPath} />
        {error && (
          <p className="text-center text-red-600 mt-10">
            Failed to load awards: {error}
          </p>
        )}
      </div>
      <div
        className={`w-full px-20 relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300 hidden lg:grid -top-10`}
      >
        {displayedProjects.map((item, index) => (
          <div key={index}>
            <CardTwo data={item} imgPath={imgPath} />
          </div>
        ))}
      </div>
      <div className="w-full flex-center relative mb-10">
        <Button text="See more" link="/awards" />
      </div>
    </div>
  );
}
