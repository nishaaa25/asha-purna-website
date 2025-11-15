"use client";
import HeroBottomBar from "@/components/HeroBottomBar";
import BottomBar from "./BottomBar";
import Image from "next/image";
import { useEffect, useState } from "react";
import BrochurePopup from "@/components/BrochurePopup";
import ThankYouPopup from "@/components/ThankYouPopup";
import Link from "next/link";

export default function SlugHeroSection({
  project,
  projectImagePath,
  sliderImagePath,
  glossySliderPath,
  brochureImagePath,
  projectReraNo,
}) {
  const [isBrochurePopupOpen, setIsBrochurePopupOpen] = useState(false);
  const [isBrochureThankYouOpen, setIsBrochureThankYouOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const fallbackImage = project?.project_logo_1
    ? projectImagePath + project.project_logo_1
    : projectImagePath + project.project_logo_2;

  const brochureUrl = project?.brochure_file
    ? projectImagePath + project.brochure_file
    : project?.brochure_link
    ? project.brochure_link
    : null;

  const phoneNumber = project?.mobile_number || project?.ivr_number || "9314041747";

  const handleBrochureClick = () => setIsBrochurePopupOpen(true);

  const getYouTubeEmbed = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${videoId}&iv_load_policy=3&disablekb=1&playsinline=1&autohide=1`;
  };

  const reraNo =
    project?.rera_number ||
    projectReraNo?.find((item) => {
      const title = item?.title?.toUpperCase() || "";
      const value = item?.value?.toUpperCase() || "";
      return title.includes("RERA") || value.startsWith("RAJ/") || title.startsWith("RAJ/");
    })?.value ||
    projectReraNo?.find((item) => {
      const title = item?.title?.toUpperCase() || "";
      return title.startsWith("RAJ/");
    })?.title ||
    "";

  return (
    <section className="w-full relative h-dvh flex-center overflow-hidden">
      {/* 🎥 Video or Fallback Image */}
      {project?.page_full_video && !videoError ? (
        project.page_full_video.includes("youtube.com") ||
        project.page_full_video.includes("youtu.be") ? (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-1/2 left-1/2 w-[400%] h-[400%] md:w-[120%] md:h-[120%] -translate-x-1/2 -translate-y-1/2">
              <iframe
                id="bg-video"
                className="w-full h-full"
                src={getYouTubeEmbed(project.page_full_video)}
                title="Background Video"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : project.page_full_video.endsWith(".mp4") ? (
          <video
            src={process.env.PROJECT_VIDEO_PATH + project.page_full_video}
            className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
          />
        ) : (
          <Image
            src={fallbackImage}
            alt={project?.name || project?.project_name || "Project"}
            fill
            className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            priority
            quality={100}
          />
        )
      ) : (
        <Image
          src={fallbackImage}
          alt={project?.name || project?.project_name || "Project"}
          fill
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          priority
          quality={100}
        />
      )}

      {/* Overlay */}
      <div className="w-full h-full absolute top-0 left-0 bg-black/40 z-20 pointer-events-none"></div>

      {/* Text Content */}
      <div className="w-[86%] mx-auto relative pointer-events-none flex flex-col gap-2 z-30 lg:gap-3 justify-end h-full items-start mb-[35vh] lg:mb-[45vh] text-white">
        <h1 className="text-[36px] md:text-5xl lg:text-6xl xl:text-7xl leading-[120%] tracking-[-1.1%] font-semibold drop-shadow-lg">
          {project?.name || project?.project_name || "Project"}
        </h1>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl font-medium leading-[140%]">
          {project?.location || project?.address || ""}
        </p>
        {project?.size && (
          <p className="text-sm md:text-base lg:text-lg xl:text-xl font-medium leading-[140%]">
            {project.size}
          </p>
        )}
      </div>

      {/* RERA Slide Out */}
      <ReraSlideOut reraNo={reraNo} />

      {/* Bottom Buttons */}
      <div className="absolute bottom-9 w-full px-1 z-40">
        <BottomBar
          btnOneLink="#"
          btnTwoLink={`tel:${phoneNumber}`}
          btnOneText="Brochure"
          btnTwoText="Call Now"
          onBrochureClick={handleBrochureClick}
        />
      </div>

      {/* Popups */}
      <BrochurePopup
        isOpen={isBrochurePopupOpen}
        onClose={() => setIsBrochurePopupOpen(false)}
        onSuccess={() => setIsBrochureThankYouOpen(true)}
        projectId={project?.id}
        projectName={project?.name || project?.project_name}
        brochureUrl={brochureUrl}
      />

      <ThankYouPopup
        isOpen={isBrochureThankYouOpen}
        onClose={() => setIsBrochureThankYouOpen(false)}
        onDownload={() => {
          if (brochureUrl) window.open(brochureUrl, "_blank");
          setIsBrochureThankYouOpen(false);
        }}
      />
    </section>
  );
}

export function ReraSlideOut({ reraNo }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-1/4 transform -translate-y-1/2 transition-all duration-500 z-100 bg-white/75 p-3 flex items-center justify-center rounded-l-md shadow-md ${
        open ? "right-0" : "-right-[321px]"
      } w-[321px]`}
    >
      <div
        onClick={() => setOpen(!open)}
        className={`absolute left-[-90px] w-[90px] bg-white/75 text-black text-center font-jost text-[12px] leading-[15px] p-2 rounded-l-sm cursor-pointer shadow-sm transition-opacity duration-300 ${
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        Click here for <br />
        RERA details
      </div>
      <div className="flex items-start justify-between w-full px-2 text-black">
        <div className="text-[12px] font-jost">
          <p className="mb-1">
            RERA Number
            <br />
            {reraNo}
          </p>
          <Link
            href="https://rera.rajasthan.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9d7f19] hover:underline text-[12px]"
          >
            https://rera.rajasthan.gov.in/
          </Link>
        </div>
        <Image
          src={`https://api.qrserver.com/v1/create-qr-code/?size=20x20&data=${encodeURIComponent(reraNo)}`}
          alt="RERA"
          width={80}
          height={80}
          className="ml-3"
        />
      </div>
    </div>
  );
}
