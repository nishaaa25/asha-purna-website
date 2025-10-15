"use client";
import HeroBottomBar from "@/components/HeroBottomBar";
import BottomBar from "./BottomBar";
import Image from "next/image";
import { useState } from "react";
import BrochurePopup from "@/components/BrochurePopup";
import ThankYouPopup from "@/components/ThankYouPopup";
import { toast } from "react-toastify";

export default function SlugHeroSection({ project, projectImagePath, sliderImagePath, glossySliderPath, brochureImagePath }) {
  const [isBrochurePopupOpen, setIsBrochurePopupOpen] = useState(false);
  const [isBrochureThankYouOpen, setIsBrochureThankYouOpen] = useState(false);
  // Get the main image - prefer featured image or glossy slider, then first slider image
  const getMainImage = () => {
    // Priority 1: Glossy slider images
    if (project?.project_glossy_sliders && project.project_glossy_sliders.length > 0) {
      return glossySliderPath + project.project_glossy_sliders[0].image;
    }
    
    // Priority 2: Featured image from sliders
    if (project?.featured_image && sliderImagePath) {
      return sliderImagePath + project.featured_image;
    }
    
    // Priority 3: Regular slider images
    if (project?.project_sliders && project.project_sliders.length > 0 && sliderImagePath) {
      return sliderImagePath + project.project_sliders[0].image;
    }
    
    // Priority 4: Project logo
    if (project?.project_logo_1 && projectImagePath) {
      return projectImagePath + project.project_logo_1;
    }
    
    // Fallback
    return '/assets/project.mp4';
  };

  const mainImage = getMainImage();

  // Get brochure URL for download after form submission (same as Pages Router)
  // In Pages Router: window.open(projectImagePath + pdfUrl) where pdfUrl = projectDetailsData.brochure_file
  // NOTE: brochure file uses projectImagePath, NOT brochureImagePath
  const brochureUrl = project?.brochure_file 
    ? (projectImagePath + project.brochure_file)
    : project?.brochure_link 
    ? project.brochure_link
    : null;

  // Phone number
  const phoneNumber = project?.mobile_number || project?.ivr_number || "9314041747";

  const handleBrochureClick = () => {
    console.log("=== Brochure Download Debug ===");
    console.log("Project ID:", project?.id);
    console.log("Project Name:", project?.name || project?.project_name);
    console.log("Brochure file field:", project?.brochure_file);
    console.log("Brochure link field:", project?.brochure_link);
    console.log("Project image path (for brochure):", projectImagePath);
    console.log("Brochure image path (for slider):", brochureImagePath);
    console.log("Final Brochure URL:", brochureUrl);
    console.log("================================");
    
    // Always show the brochure popup - it will handle whether brochure exists or not
    setIsBrochurePopupOpen(true);
  };

  return (
    <section className="w-full relative h-dvh flex-center overflow-hidden ">
      {/* Use Image instead of video */}
      <Image
        src={mainImage}
        alt={project?.name || project?.project_name || "Project"}
        fill
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        priority
        quality={90}
      />
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
