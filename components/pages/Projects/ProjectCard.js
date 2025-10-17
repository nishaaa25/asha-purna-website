"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import EnquireNowPopup from "../../EnquireNowPopup";
import ThankYouEnquirePopup from "../../ThankYouEnquirePopup";

export default function ProjectCard({ data, hideActions = false, imagePath }) {
  const [isMounted, setIsMounted] = useState(false);
  // console.log(imagePath + data.project_logo_1);
  const [isEnquirePopupOpen, setIsEnquirePopupOpen] = useState(false);
  const [isThankYouPopupOpen, setIsThankYouPopupOpen] = useState(false);
  // console.log(data, "project data");

  useEffect(() => {
    setIsMounted(true);
    setImagePath(imagePath);
  }, []);

  const setImagePath = (path) => {
    localStorage.setItem("imagePath", path);
  };

  const handleEnquireClick = () => {
    setIsEnquirePopupOpen(true);
  };

  const handleEnquireSubmit = (formData) => {
    console.log("Enquiry form submitted:", formData);
    setIsEnquirePopupOpen(false);
    setIsThankYouPopupOpen(true);
  };

  const handleCloseEnquirePopup = () => {
    setIsEnquirePopupOpen(false);
  };

  const handleCloseThankYouPopup = () => {
    setIsThankYouPopupOpen(false);
  };

  if (!isMounted) {
    // Prevents hydration mismatch
    return null;
  }

  const tag = data?.tag?.toLowerCase() || "";

  const tagColor =
    data.current_status === "Few Units Left"
      ? "bg-red-400"
      : data.current_status === "Booking Open"
      ? "bg-green-400"
      : data.current_status === "Ready To Move"
      ? "bg-green-400"
      : data.current_status === "Possession Soon"
      ? "bg-blue-400"
      : data.current_status === "Ready To Occupy" ||
        data.current_status === "Ready to Occupy"
      ? "bg-blue-400"
      : "";

  const projectSlug = data?.projectName
    ? data.projectName.toLowerCase().replace(/\s+/g, "-")
    : "";

  console.log("Image path", imagePath);
  return (
    <div className="w-full h-full relative bg-white border-[0.3px] border-black-400/50 rounded-t-[10px] p-[10px] flex flex-col">
      <div className="w-full h-[250px] md:h-[284px] lg:h-[327px] relative rounded-t-md overflow-hidden">
        {data?.project_logo_1 && (
          <Image
            src={imagePath + data?.project_logo_1}
            alt={imagePath + data?.project_logo_1_link}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}

        <div
          className={`absolute right-2 top-2 py-[3px] px-3 rounded-full font-medium text-[10px] uppercase ${tagColor} text-white`}
        >
          {data?.current_status}
        </div>
      </div>

      <div className="content-card pt-4 text-black-400 flex flex-col flex-1">
        <div className="flex gap-3 relative">
          {data?.project_logo_2 && (
            <div className="w-13 h-13 flex-shrink-0 mt-1 overflow-hidden relative flex-center">
              <Image
                src={imagePath + data?.project_logo_2}
                alt={imagePath + data?.project_logo_2_link}
                width={52}
                height={52}
                className="object-cover"
                sizes="48px"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="flex-between relative">
              <h3 className="text-2xl lg:text-2xl font-semibold leading-[120%]">
                {data?.name}
              </h3>
              <p className="text-xs md:text-sm lg:text-sm leading-[140%] capitalize">
                {(data?._listType || data?.property_type || data?.category || data?.projectType || data?.project_type || data?.type || "").toString()}
              </p>
            </div>
            <div className="flex-between mt-[2px] mb-3 relative">
              {data?.address && (
                  <div className="flex items-center gap-1 leading-[140%] pt-1">
                    <Image
                      src="/assets/location-red.svg"
                      alt="location-icon"
                      width={12}
                      height={12}
                      className="object-contain"
                    />
                    <span className="text-xs leading-[140%]">
                      {data?.address || data?.location}
                    </span>
                  </div>
                )}
              <p className="text-sm md:text-base lg:text-base font-bold">
                {data?.size}
              </p>
            </div>
          </div>
        </div>

        {!hideActions && (
          <>
            <div className="w-8/12 mx-auto h-[0.5px] bg-[#272727]/10 mt-auto mb-2" />
            <div className="grid grid-cols-2 relative w-full gap-4">
              <Link
                href={`/projects/${data?.slug}`}
                className="border-[0.5px] border-[#cccccc] bg-black-400 text-white whitespace-nowrap font-medium text-sm md:text-base lg:text-base py-[7px] w-full rounded-md mt-2 text-center relative"
              >
                View Details
              </Link>
              <button
                onClick={handleEnquireClick}
                className="border-[0.5px] border-black text-black-400 font-medium whitespace-nowrap text-sm md:text-base lg:text-base py-[7px]  w-full rounded-md mt-2 relative cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </>
        )}
      </div>

      {/* Enquire Now Popup */}
      <EnquireNowPopup
        isOpen={isEnquirePopupOpen}
        onClose={handleCloseEnquirePopup}
        onSubmit={handleEnquireSubmit}
        projectId={data?.id}
        projectName={data?.name}
      />

      {/* Thank You Popup */}
      <ThankYouEnquirePopup
        isOpen={isThankYouPopupOpen}
        onClose={handleCloseThankYouPopup}
      />
    </div>
  );
}
