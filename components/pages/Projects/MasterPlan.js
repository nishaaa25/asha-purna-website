"use client";
import Button from "@/components/Button";
import Image from "next/image";
import { useState } from "react";
import ViewPlanPopup from "@/components/ViewPlanPopup";
import ThankYouViewPlanPopup from "@/components/ThankYouViewPlanPopup";
import { toast } from "react-toastify";

export default function MasterPlan({ project, masterImagePath }) {
  const [isViewPlanPopupOpen, setIsViewPlanPopupOpen] = useState(false);
  const [isThankYouPopupOpen, setIsThankYouPopupOpen] = useState(false);

  const handleViewPlanClick = () => {
    setIsViewPlanPopupOpen(true);
  };

  const handleViewPlanSubmit = async(formData) => {
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
            parma_mantra_type: "master_plan",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result._status) {
        toast.success(result._message || "Form submitted successfully!");
         if(project?.master_plan_image){
      window.location.href = masterImagePath+project?.master_plan_image;
    }else if(project?.project_master_plans?.[0]?.image){
      window.location.href = masterImagePath+project?.project_master_plans?.[0]?.image;
    }else{
      toast.error("Master Plan not available");
    }
       
        setIsViewPlanPopupOpen(false);
    setIsThankYouPopupOpen(true);
      }
  
  }catch(error){
    toast.error("There was an error submitting the form. Please try again later.");
  }
  }
  const handleCloseViewPlanPopup = () => {
    setIsViewPlanPopupOpen(false);
  };

  const handleCloseThankYouPopup = () => {
    setIsThankYouPopupOpen(false);
  };

  // Get master plan data from project
  const masterPlan = project?.project_master_plans?.[0] || project?.master_plan;
  const masterPlanImage = masterPlan?.image 
    ? (masterImagePath + masterPlan.image)
    : project?.master_plan_image
    ? (masterImagePath + project.master_plan_image)
    : "/assets/plan.jpg";

  return (
    <div className="relative w-full flex-center flex-col gap-5 md:gap-8">
      <div className="w-full relative h-[250px] md:h-[40vh] lg:h-[50vh] rounded-t-[10px] overflow-hidden border-[0.5px] border-black-400 flex-center flex-col ">
        <Image
          src={masterPlanImage}
          alt="Master Plan"
          fill
          className="relative w-full object-cover"
          quality={100}
        />
        <div className="absolute z-40">
            <Button text="View plan" onClick={handleViewPlanClick} />
        </div>
        <div className="bg-[#ffffff84] w-full h-full absolute top-0 left-0 z-10 backdrop-blur-[4px]">
        </div>
      </div>
      <div className="flex flex-col items-start gap-[10px] md:gap-1 lg:gap-1 w-full">
        <h5 className="text-lg md:text-xl lg:text-3xl font-semibold tracking-[-1.1%] text-black-400">
          {masterPlan?.title || "Master plan"}
        </h5>
        <p className="text-sm md:text-lg lg:text-2xl leading-[21px] text-gray-600">
          {masterPlan?.area || project?.area || ""}
        </p>
        <p className="text-sm md:text-base lg:text-lg text-start leading-[140%]  text-gray-800 tracking-[-1.1%] lg:w-11/12">
          {masterPlan?.description || project?.master_plan_description || ""}
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
