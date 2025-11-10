"use client";
import HeroBottomBar from "@/components/HeroBottomBar";
import BottomBar from "./BottomBar";
import Image from "next/image";
import { useState } from "react";
import BrochurePopup from "@/components/BrochurePopup";
import ThankYouPopup from "@/components/ThankYouPopup";
import { toast } from "react-toastify";
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
  console.log("project rera data", project?.rera_number);
  // console.log("projectReraNo ", projectReraNo);
  const reraNo =
    project?.rera_number ||
    projectReraNo?.find((item) => {
      const title = item?.title?.toUpperCase() || "";
      const value = item?.value?.toUpperCase() || "";

      return (
        title.includes("RERA") || // title explicitly mentions "RERA"
        value.startsWith("RAJ/") || // value begins with RAJ/...
        title.startsWith("RAJ/") // or title itself is the RERA number
      );
    })?.value ||
    projectReraNo?.find((item) => {
      const title = item?.title?.toUpperCase() || "";
      return title.startsWith("RAJ/"); // fallback if only in title
    })?.title ||
    "";

  // Get the main image - prefer featured image or glossy slider, then first slider image
  const getMainImage = () => {
    // Priority 1: Glossy slider images
    if (
      project?.project_glossy_sliders &&
      project.project_glossy_sliders.length > 0
    ) {
      return glossySliderPath + project.project_glossy_sliders[0].image;
    }

    // Priority 2: Featured image from sliders
    if (project?.featured_image && sliderImagePath) {
      return sliderImagePath + project.featured_image;
    }

    // Priority 3: Regular slider images
    if (
      project?.project_sliders &&
      project.project_sliders.length > 0 &&
      sliderImagePath
    ) {
      return sliderImagePath + project.project_sliders[0].image;
    }

    // Priority 4: Project logo
    if (project?.project_logo_1 && projectImagePath) {
      return projectImagePath + project.project_logo_1;
    }

    // Fallback
    return "/assets/project.mp4";
  };

  const mainImage = getMainImage();

  // Get brochure URL for download after form submission (same as Pages Router)
  // In Pages Router: window.open(projectImagePath + pdfUrl) where pdfUrl = projectDetailsData.brochure_file
  // NOTE: brochure file uses projectImagePath, NOT brochureImagePath
  const brochureUrl = project?.brochure_file
    ? projectImagePath + project.brochure_file
    : project?.brochure_link
    ? project.brochure_link
    : null;

  // Phone number
  const phoneNumber =
    project?.mobile_number || project?.ivr_number || "9314041747";

  const handleBrochureClick = () => {
    // Always show the brochure popup - it will handle whether brochure exists or not
    setIsBrochurePopupOpen(true);
  };

  console.log(
    process.env.PROJECT_VIDEO_PATH + project?.page_full_video,
    "video path"
  );
  return (
    <section className="w-full relative h-dvh flex-center overflow-hidden ">
      {/* Use Image instead of video */}
      {project?.page_full_video ? (
        <video
          src={process.env.PROJECT_VIDEO_PATH + project?.page_full_video}
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <Image
          src={projectImagePath + project?.project_logo_1}
          alt={project?.name || project?.project_name || "Project"}
          fill
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          priority
          quality={100}
        />
      )}
      <div className="w-full h-full absolute top-0 left-0 bg-black/40"></div>
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
      {reraNo && (
        <button
          onClick={() => setIsReraExpanded(!isReraExpanded)}
          className={`${
            isReraExpanded
              ? "w-3/12 md:w-2/12 lg:w-[10%]"
              : "w-7/12 md:w-5/12 lg:w-[20%]"
          } absolute right-0 top-[15vh] flex flex-col gap-2 cursor-pointer z-[100] transition-all duration-200 `}
        >
          {isReraExpanded ? (
            <p
              className={`p-[10px] md:p-[14px] lg:p-5 text-[10px] md:text-xs text-center lg:text-sm bg-white/20 text-white  font-medium relative`}
            >
              <span className={`relative`}>Click here for RERA details</span>
            </p>
          ) : (
            <div className="p-[10px] md:p-[14px] lg:p-5 bg-white/20 text-white relative text-[10px] md:text-xs lg:text-sm flex-between">
              <div className="flex-col flex justify-start items-start ">
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
      <div className="absolute bottom-9 w-full px-1">
        <BottomBar
          btnOneLink="#"
          btnTwoLink={`tel:${phoneNumber}`}
          btnOneText="Brochure"
          btnTwoText="Call Now"
          onBrochureClick={handleBrochureClick}
        />
      </div>

      {/* Brochure Popup */}
      <BrochurePopup
        isOpen={isBrochurePopupOpen}
        onClose={() => setIsBrochurePopupOpen(false)}
        onSuccess={() => setIsBrochureThankYouOpen(true)}
        projectId={project?.id}
        projectName={project?.name || project?.project_name}
        brochureUrl={brochureUrl}
      />

      {/* Thank You Popup for Brochure Download */}
      <ThankYouPopup
        isOpen={isBrochureThankYouOpen}
        onClose={() => setIsBrochureThankYouOpen(false)}
        onDownload={() => {
          // Try to download brochure if available
          if (brochureUrl) {
            window.open(brochureUrl, "_blank");
          }
          setIsBrochureThankYouOpen(false);
        }}
      />
    </section>
  );
}
