"use client";

import { useEffect, useState } from "react";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import IndividualCard from "@/components/pages/IndividualCard";
import JourneyImageCarousel from "@/components/pages/JourneyImageCarousel";
import SectionHeader from "@/components/SectionHeader";
import { awardsPageContent } from "@/lib/awards";

export default function Page() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgPath, setImgPath]= useState('');
  const [error, setError] = useState(null);

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
          setImgPath(result?._data?.image_path)
        } else {
          throw new Error(result._message || "Failed to fetch awards");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, []);

  return (
    <div className="relative w-full">
      <HeroComponentTwo imgUrl="https://d3qnldyv492i08.cloudfront.net/ashapurna/images/webimages/awards-bg.jpg" />
      <div className="our-journey bg-cream-600 w-full relative">
        <div className="w-full md:w-[90%] lg:w-[80%] mx-auto">
          <SectionHeader
            heading={awardsPageContent.journeySection.heading}
            spanText={awardsPageContent.journeySection.spanText}
            desc={awardsPageContent.journeySection.desc}
          />
        </div>

        <JourneyImageCarousel awardsData={awards} imgPath={imgPath}/>

        {loading && (
          <p className="text-center text-gray-600 mt-10">Loading awards...</p>
        )}
        {error && (
          <p className="text-center text-red-600 mt-10">
            Failed to load awards: {error}
          </p>
        )}

        <p className="w-[90%] md:w-[75%] lg:w-[60%] relative text-sm md:text-base lg:text-xl text-gray-800 mx-auto text-center pb-15 md:pb-20 lg:pb-[100px] mt-5 lg:mt-10">
          {awardsPageContent.journeySection.closingText}
        </p>
      </div>
    </div>
  );
}
