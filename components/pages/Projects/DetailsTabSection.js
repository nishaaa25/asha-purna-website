"use client";
import { useEffect, useRef, useLayoutEffect } from "react";
import { csr } from "@/lib/content";
import TabHeader from "../CSR/TabHeader";
import { useState } from "react";
import CountersSection from "@/components/Counter";
import List from "@/components/List";
import Gallery from "./Gallery";
import SectionHeader from "@/components/SectionHeader";
import MasterPlan from "./MasterPlan";
import FloorPlan from "./FloorPlan";
import DetailsPageCounter from "./DetailsPageCounter";

export default function DetailsTabSection({
  project,
  masterImagePath,
  floorImagePath,
  project360Data,
  viewsImagePath,
  projectVideoGalleryData,
  projectVideoGalleryImagePath,
  projectFloorsData,
  projectGalleryData,
  galleryImagePath,
}) {
  // Build tabs dynamically based on available data
  const availableTabs = [];

  console.log(projectFloorsData?.project_floor_plans[0]?.project_floor_plan_gallery[0]?.image, "floors data");
  // Always show overview if there's project description
  if (project?.description || project?.overview) {
    availableTabs.push("overview");
  }

  // Show gallery tab only if there are actual gallery images available
  const hasGalleryImages = () => {
    // Check for 360 views
    if (project360Data && project360Data.length > 0) return true;

    // Check for video gallery
    if (projectVideoGalleryData && projectVideoGalleryData.length > 0)
      return true;

    // Check for gallery categories with actual images
    if (projectGalleryData?.gallery_names?.length > 0) {
      return projectGalleryData.gallery_names.some(
        (category) =>
          category.project_gallery && category.project_gallery.length > 0
      );
    }

    return false;
  };

  if (hasGalleryImages()) {
    availableTabs.push("gallery");
  }

  // Show plans tab if there's master plan or floor plans data
  if (
    project?.master_plan_image ||
    (projectFloorsData &&
      projectFloorsData.project_floor_plans )
  ) {
    availableTabs.push("plans");
  }

  const [activeTab, setActiveTab] = useState(availableTabs[0] || "overview");
  const [selectedPlan, setSelectedPlan] = useState("master");
  const tabSectionRef = useRef(null);
  const scrollPositionRef = useRef(0);

  const tab = availableTabs;
  console.log(projectFloorsData);
  // Build counter data from project
  const data = [
    {
      title: project?.counter_1_title || "Bighas of land",
      value: project?.counter_1_value || "250",
    },
    {
      title: project?.counter_2_title || "Premium Plots",
      value: project?.counter_2_value || "245",
    },
    {
      title: project?.counter_3_title || "Security & Access",
      value: project?.counter_3_value || "24x7",
    },
    {
      title: project?.counter_4_title || "Starting Price",
      value: project?.counter_4_value || project?.starting_price || "₹28L",
    },
  ];

  // Extract features from project or use default
  const features = project?.key_features
    ? typeof project.key_features === "string"
      ? project.key_features.split(",").map((f) => f.trim())
      : project.key_features
    : [
        "250 bighas of industrial-ready plots",
        "245 plots with flexible sizing",
        "Opposite Delhi–Mumbai Industrial Corridor",
        "Minutes from RIICO Industrial Area",
      ];

  const [tabContent, setTabContent] = useState(
    csr.filter((el) => el.type.toLowerCase() === "healthcare")
  );

  useEffect(() => {
    const filteredContent = csr.filter(
      (el) => el.type.toLowerCase() === activeTab.toLowerCase()
    );
    setTabContent(filteredContent);
  }, [activeTab]);

  const handleTabChange = (tab) => {
    // Store current scroll position before changing tab
    scrollPositionRef.current = window.scrollY;
    setActiveTab(tab);
  };

  // Restore scroll position after tab content renders
  useLayoutEffect(() => {
    if (scrollPositionRef.current > 0) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: "auto",
        });
      });
    }
  }, [activeTab]);

  return (
    <div
      ref={tabSectionRef}
      className="w-full relative pt-15 pb-10 md:pb-20 lg:pb-[100px]"
    >
      <p className="text-gray-800 text-sm md:text-base lg:text-base leading-[140%] w-11/12 md:w-9/12 lg:w-8/12 relative text-center mx-auto mb-15">
        {project?.short_description || project?.tagline || ""}
      </p>
      {/* Only show tab header if there are multiple tabs */}
      {tab.length > 1 && (
        <div className="w-[90%] md:w-[80%] relative mx-auto px-2 ">
          <TabHeader
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            tabs={tab}
          />
        </div>
      )}
      {activeTab === "overview" && (
        <div className="flex-center w-full px-[22px] relative flex-col text-center pt-3 md:pt-6 lg:pt-10 gap-7">
          <h4 className="text-gray-600 font-playfair uppercase text-2xl md:text-[36px] lg:text-[42px] leading-[130%] font-semibold">
            Project Overview
          </h4>
          <div
            className="w-[90%] md:w-[80%] lg:w-[70%] relative text-gray-800 text-sm md:text-base lg:text-base leading-[140%]"
            dangerouslySetInnerHTML={{
              __html: project?.description || project?.overview || "",
            }}
          />
          {/* <div className="w-11/12 relative mb-10">
            <DetailsPageCounter data={data} />
          </div> */}
          {/* <div className="w-[95%] md:w-[80%] relative text-left bg-cream-500 rounded-xl px-4 py-6 md:py-10 md:px-8">
            <List features={features} heading="Key features" />
          </div> */}
        </div>
      )}
      {activeTab === "gallery" && (
        <Gallery
          project={project}
          project360Data={project360Data}
          viewsImagePath={viewsImagePath}
          projectVideoGalleryData={projectVideoGalleryData}
          projectVideoGalleryImagePath={projectVideoGalleryImagePath}
          projectGalleryData={projectGalleryData}
          galleryImagePath={galleryImagePath}
        />
      )}
      {activeTab === "plans" && (
        <div className="flex-center w-full px-[22px]  md:px-12 lg:px-20 relative flex-col text-center pt-3 gap-7">
          {/* Plot Layouts & Configurations Section */}
          <div className="w-full bg-white rounded-lg ">
            <div className="relative w-full md:w-10/12 lg:w-8/12 mx-auto">
              <SectionHeader
                heading={project?.plan_heading || "Plot layouts"}
                spanText={project?.plan_tagline || "Configurations"}
                desc={
                  project?.plan_description ||
                  "Choose from a range of plot sizes tailored for industries, logistics, and agri-based enterprises. Infrastructure and utilities are ready, ensuring ease of setup."
                }
              />
            </div>
            <div className="flex justify-center gap-4 w-full md:w-11/12 mx-auto">
              {/* Master Plan Button */}
              <button
                type="button"
                onClick={() => setSelectedPlan("master")}
                className={`w-[166px] lg:w-full h-[40px] py-[10px] border rounded-[5px] flex items-center justify-center gap-[10px] opacity-100 
            ${
              selectedPlan === "master"
                ? "bg-[#222222] text-white border-[#222222]"
                : "bg-white text-[#222222] border-[#222222]"
            }`}
              >
                <span className="font-['DM_Sans'] font-medium text-sm">
                  Master Plan
                </span>
              </button>

              {/* Floor Plans Button */}
              {projectFloorsData?.project_floor_plans[0]?.project_floor_plan_gallery[0]?.image && (
                <button
                  type="button"
                  onClick={() => setSelectedPlan("floor")}
                  className={`w-[166px]  lg:w-full  h-[40px] py-[10px] border rounded-[5px] flex items-center justify-center gap-[10px] opacity-100 
            ${
              selectedPlan === "floor"
                ? "bg-[#222222] text-white border-[#222222]"
                : "bg-white text-[#222222] border-[#222222]"
            }`}
                >
                  <span className="font-['DM_Sans'] font-medium text-sm">
                    Floor Plans
                  </span>
                </button>
              )}
            </div>
            <div className="mt-6 w-full md:w-11/12 mx-auto relative">
              {selectedPlan === "master" && (
                <MasterPlan
                  project={project}
                  masterImagePath={masterImagePath}
                />
              )}
              {selectedPlan === "floor" && (
                <FloorPlan
                  project={project}
                  floorImagePath={floorImagePath}
                  projectFloorsData={projectFloorsData}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
