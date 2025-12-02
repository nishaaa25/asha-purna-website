"use client";
import Button from "@/components/Button";
import Image from "next/image";
import { useState } from "react";
import ViewPlanPopup from "@/components/ViewPlanPopup";
import ThankYouViewPlanPopup from "@/components/ThankYouViewPlanPopup";
import { toast } from "react-toastify";

export default function PlanCard({ data, imgPath, project }) {
  const [isViewPlanPopupOpen, setIsViewPlanPopupOpen] = useState(false);
  const [isThankYouPopupOpen, setIsThankYouPopupOpen] = useState(false);
  const handleViewPlanClick = () => {
    setIsViewPlanPopupOpen(true);
  };

  const handleViewPlanSubmit = async (formData) => {
    try {
      const response = await fetch(
        "https://apiservices.ashapurna.com/api/web/enquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-version": "v1",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message || "",
            project_id: project?.id ? Number(project?.id) : 0,
            parma_mantra_type: "floor_plan",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result._status) {
        toast.success(result._message || "Form submitted successfully!");
        const gallery = Array.isArray(data?.gallery)
          ? data.gallery
          : Array.isArray(data?.project_floor_plan_gallery[2]?.image)
          ? data.project_floor_plan_gallery
          : [];

        const firstImage = gallery.find(
          (g) => g && g.image && typeof g.image === "string"
        );
        if (firstImage?.image) {
          const href = (imgPath || "") + firstImage.image;
          window.location.href = href;
        } else if (data?.imgUrl) {
          // Fallback to main image if gallery missing
          window.location.href = data.imgUrl;
        } else {
          toast.error("Floor plan not available");
        }

        setIsViewPlanPopupOpen(false);
        setIsThankYouPopupOpen(true);
      }
    } catch (error) {
      toast.error(
        "There was an error submitting the form. Please try again later."
      );
    }
  };

  const handleCloseViewPlanPopup = () => {
    setIsViewPlanPopupOpen(false);
  };

  const handleCloseThankYouPopup = () => {
    setIsThankYouPopupOpen(false);
  };

  return (
    <div className="relative w-full flex-center flex-col gap-5">
      <div className="w-full relative h-[250px] md:h-[40vh] lg:h-[50vh] rounded-t-[10px] overflow-hidden border-[0.5px] border-black-400 flex-center flex-col ">
        <Image
             src={data?.imgUrl || "/assets/plan.jpg"}
          alt={data?.title || data?.floor || "Floor Plan"}
          fill
          className="relative w-full object-cover"
          quality={100}
        />
        <div className="absolute z-40">
          <Button text="View plan" onClick={handleViewPlanClick} />
        </div>
        <div className="bg-[#ffffff84] w-full h-full absolute top-0 left-0 z-10 backdrop-blur-[4px]"></div>
      </div>
      <div className="flex flex-col items-start gap-2 w-full relative">
        <h3 className="text-base md:text-[22px] lg:text-xl capitalize font-bold leading-[130%] text-gray-600">
          {data?.title || data?.floor || "Floor Plan"}
        </h3>
        {data?.area || data?.size && <p className="text-sm md:text-base lg:text-lg leading-[130%] text-gray-600">
          {data?.area || data?.size || ""}
        </p>}
        {data?.desc || data?.description && <p className="text-sm md:text-base lg:text-lg text-start leading-[130%] text-gray-600">
          {data?.desc || data?.description || ""}
        </p>}
      </div>

      {/* View Plan Popup */}
      <ViewPlanPopup
        isOpen={isViewPlanPopupOpen}
        onClose={handleCloseViewPlanPopup}
        onSubmit={handleViewPlanSubmit}
        projectId={project?.id}
        projectName={project?.name}
      />

      {/* Thank You Popup */}
      <ThankYouViewPlanPopup
        isOpen={isThankYouPopupOpen}
        onClose={handleCloseThankYouPopup}
      />
    </div>
  );
}
