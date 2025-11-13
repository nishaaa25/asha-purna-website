"use client";
import HeroBottomBar from "@/components/HeroBottomBar";
import BottomBar from "./BottomBar";
import Image from "next/image";
import { useState } from "react";
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
  const [isReraExpanded, setIsReraExpanded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // ✅ Get RERA number
  const reraNo =
    project?.rera_number ||
    projectReraNo?.find((item) => {
      const title = item?.title?.toUpperCase() || "";
      const value = item?.value?.toUpperCase() || "";
      return (
        title.includes("RERA") ||
        value.startsWith("RAJ/") ||
        title.startsWith("RAJ/")
      );
    })?.value ||
    projectReraNo?.find((item) => {
      const title = item?.title?.toUpperCase() || "";
      return title.startsWith("RAJ/");
    })?.title ||
    "";

  // ✅ Fallback image
  const fallbackImage =
    project?.project_logo_1
      ? projectImagePath + project.project_logo_1
      : projectImagePath + project.project_logo_2;

  // ✅ Brochure download URL
  const brochureUrl = project?.brochure_file
    ? projectImagePath + project.brochure_file
    : project?.brochure_link
    ? project.brochure_link
    : null;

  const phoneNumber =
    project?.mobile_number || project?.ivr_number || "9314041747";

  const handleBrochureClick = () => setIsBrochurePopupOpen(true);

  // ✅ Handle YouTube embed URL
  const getYouTubeEmbed = (url) => {
    const videoId =
      url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return url
      .replace("watch?v=", "embed/")
      .replace("youtu.be/", "www.youtube.com/embed/") +
      `?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  };

  // ✅ Main Render
  return (
    <section className="w-full relative h-dvh flex-center overflow-hidden">
      {/* 🎥 Video or Fallback Image */}
      {project?.page_full_video && !videoError ? (
        project.page_full_video.includes("youtube.com") ||
        project.page_full_video.includes("youtu.be") ? (
          <iframe
            src={getYouTubeEmbed(project.page_full_video)}
            className="absolute top-0 left-0 w-full h-full object-cover -z-10 scale-400 lg:scale-120"
            title="YouTube video"
            frameBorder="0"
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            onError={() => setVideoError(true)}
          />
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
      <div className="w-full h-full absolute top-0 left-0 bg-black/40"></div>

      {/* Text Content */}
      <div className="w-[86%] mx-auto relative flex flex-col gap-2 lg:gap-3 justify-end h-full items-start mb-[35vh] lg:mb-[45vh] text-white">
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

      {/* RERA Button */}
      {reraNo && (
        <button
          onClick={() => setIsReraExpanded(!isReraExpanded)}
          className={`${
            isReraExpanded
              ? "w-3/12 md:w-2/12 lg:w-[10%]"
              : "w-7/12 md:w-5/12 lg:w-[20%]"
          } absolute right-0 top-[15vh] ml-auto flex flex-col gap-2 cursor-pointer z-[100] transition-all duration-200`}
        >
          {isReraExpanded ? (
            <p className="p-[10px] md:p-[14px] lg:p-5 text-[10px] md:text-xs text-center lg:text-sm bg-white/20 text-white font-medium relative">
              Click here for RERA details
            </p>
          ) : (
            <div className="p-[10px] md:p-[14px] lg:p-5 bg-white/20 text-white relative text-[10px] md:text-xs lg:text-sm flex-between">
              <div className="flex-col flex justify-start items-start">
                <p>RERA Number</p>
                <p className="text-sm font-medium">{reraNo}</p>
                <Link
                  href="https://rera.rajasthan.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline break-all text-white mt-3"
                >
                  Link
                </Link>
              </div>
              <div className="w-3/12 h-full bg-white border border-gray-300 rounded flex items-center justify-center">
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=20x20&data=${encodeURIComponent(
                    reraNo
                  )}`}
                  alt={`QR Code for RERA: ${reraNo}`}
                  width={20}
                  height={20}
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </button>
      )}

      {/* Bottom Buttons */}
      <div className="absolute bottom-9 w-full px-1">
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
