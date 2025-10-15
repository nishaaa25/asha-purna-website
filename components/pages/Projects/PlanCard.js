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
  console.log(data, "floor plan data");
  const handleViewPlanClick = () => {
    setIsViewPlanPopupOpen(true);
  };

  const handleViewPlanSubmit = async (formData) => {
    console.log("View Plan form submitted:", formData);

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
            parma_mantra_type: "brochure",
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

        const firstImage = gallery.find((g) => g && g.image && typeof g.image === "string");
        if (firstImage?.image) {
          const href = (imgPath || "") + firstImage.image;
          window.location.href = href;
          console.log(href + " floorpath");
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
    <div className="relative w-full flex-center flex-col gap-5 md:gap-8">
      <div className="w-full relative h-[250px] md:h-[50vh] lg:h-[90vh] rounded-t-[10px] overflow-hidden border-[0.5px] border-black-400 flex-center flex-col ">
        <Image
          src={data?.imgUrl || "/assets/plan.jpg"}
          alt={data?.title || data?.floor || "Floor Plan"}
          fill
          className="relative w-full object-cover"
        />
        <div className="absolute z-40">
          <Button text="View plan" onClick={handleViewPlanClick} />
        </div>
        <div className="bg-[#ffffff84] w-full h-full absolute top-0 left-0 z-10 backdrop-blur-[4px]"></div>
      </div>
      <div className="flex flex-col items-start gap-[10px] md:gap-3 lg:gap-4 w-full relative">
        <h5 className="text-lg md:text-3xl lg:text-[43px] capitalize font-semibold tracking-[-1.1%] text-black-400">
          {data?.title || data?.floor || "Floor Plan"}
        </h5>
        <p className="text-sm  md:text-[22px] lg:text-[30px] leading-[21px] text-gray-600">
          {data?.area || data?.size || ""}
        </p>
        <p className="text-sm  md:text-base lg:text-[22px] text-start leading-[140%]  text-gray-800 tracking-[-1.1%]">
          {data?.desc || data?.description || ""}
        </p>
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
