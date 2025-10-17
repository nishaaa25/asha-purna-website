"use client";
import { useState } from "react";
import CardTwo from "@/components/CardTwo";
import ContactUsForm from "@/components/ContactUsForm";
import FaqSection from "@/components/FaqSection";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import OurOffice from "@/components/OurOffice";
import ArticlesCarousel from "@/components/pages/Blogs/ArticlesCarousel";
import CustomCard from "@/components/pages/Blogs/CustomCard";
// import StayUpdated from "@/components/pages/Blogs/StayUpdated";
import IndividualCard from "@/components/pages/IndividualCard";
import SectionHeader from "@/components/SectionHeader";
import { faqs2, recentProjects } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [showAll, setShowAll] = useState(false);

  const cardData = {
    id: 1,
    imgUrl: "/assets/project.jpg",
    media: "The times of india",
    title: "Sample Title",
    desc: "This is a sample description.",
    date: "Aug 20, 2023",
  };

  const displayedProjects = showAll
    ? recentProjects
    : recentProjects.slice(0, 3);

  return (
    <div className="relative w-full">
      <HeroComponentTwo imgUrl="/assets/investor.jpg" />
      <SectionHeader
        title="media & insights"
        heading="Stories that"
        spanText="shape our journey"
        desc="Stay updated with the latest news, insights, and stories from Ashapurna Buildcon. Discover industry trends, company updates, and expert perspectives on real estate development."
      />

      {/* Today's Article */}
      <div>
        <h5 className="relative capitalize text-lg md:text-[36px] lg:text-[54px] text-black-400 leading-[130%] tracking-[-1.1%] font-bold w-full px-[22px] md:px-12 lg:px-20 mx-auto mb-5 lg:mb-10">
          Today&apos;s Article
        </h5>
        <div className="w-full px-[22px] md:px-12 lg:px-20 relative mb-10 lg:mb-15">
          <div className="relative w-full pb-7 lg:pb-13 border-b-[0.5px] border-black-400/50">
            <IndividualCard data={cardData} />
          </div>
        </div>
      </div>

      {/* More Articles Section */}
      <div className="w-full px-[22px] md:px-12 lg:px-20 relative pb-15 lg:pb-[100px]">
        <div className="relative flex-between mb-5 lg:mb-10">
          <h5 className="text-black-400 text-base md:text-[36px] lg:text-[54px] font-bold leading-[130%]">
            More Articles
          </h5>
          <button className="text-black/50 text-xs font-semibold leading-[130%] lg:hidden cursor-pointer">
            See All
          </button>
        </div>

        <div
          className={`w-full relative  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300 hidden lg:grid`}
        >
          {displayedProjects.map((item, index) => (
            <div key={index}>
              <CardTwo data={item} />
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => {
            e.preventDefault();
            setShowAll((prev) => !prev);
          }}
          className="border hidden lg:flex border-[#cccccc] mx-auto bg-black-400 text-white font-medium text-xs md:text-base lg:text-xl py-[10px] lg:py-[15px] min-w-38 lg:min-w-44 px-5 lg:px-6 rounded-md mt-10 capitalize transition-all duration-300 hover:opacity-90 cursor-pointer"
        >
          {showAll ? "Show Less Articles" : "Explore More Articles"}
        </button>
      </div>
      <ArticlesCarousel />
      {/* <StayUpdated /> */}
    </div>
  );
}
