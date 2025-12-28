"use client";
import { useEffect, useRef, useLayoutEffect, useState } from "react";
import { csr } from "@/lib/content";
import { extractPlainText } from "@/lib/helpers/htmlParser";
import TabHeader from "../CSR/TabHeader";
import Gallery from "./Gallery";
import SectionHeader from "@/components/SectionHeader";
import MasterPlan from "./MasterPlan";
import FloorPlan from "./FloorPlan";
import DetailsPageCounter from "./DetailsPageCounter";
import CounterThree from "./CounterThree";

export default function DetailsTabSection({
  project,
  masterImagePath,
  floorImagePath,
  projectMasterData,
  project360Data,
  viewsImagePath,
  projectVideoGalleryData,
  projectVideoGalleryImagePath,
  projectFloorsData,
  projectGalleryData,
  galleryImagePath,
}) {
  // ----------------------- Tabs Setup -----------------------
  const availableTabs = [];

  if (project?.description || project?.overview) availableTabs.push("overview");

  console.log(project?.overview, "description");

  const hasGalleryImages = () => {
    if (project360Data?.length > 0) return true;
    if (projectVideoGalleryData?.length > 0) return true;
    if (projectGalleryData?.gallery_names?.length > 0) {
      return projectGalleryData.gallery_names.some(
        (cat) => cat.project_gallery?.length > 0
      );
    }
    return false;
  };
  if (hasGalleryImages()) availableTabs.push("gallery");

  if (
    project?.project_master_plans[0]?.image ||
    (projectFloorsData && projectFloorsData.project_floor_plans?.length > 0)
  ) {
    availableTabs.push("plans");
  }

  const [activeTab, setActiveTab] = useState(availableTabs[0] || "overview");
  const [selectedPlan, setSelectedPlan] = useState("master");

  const scrollPositionRef = useRef(0);
  const prevTab = useRef(activeTab);

  // ----------------------- Counter Data -----------------------
  const data = [
    { title: "Bighas of land", value: project?.bighas_of_land },
    { title: "Premium Plots", value: project?.premium_plots },
    { title: "Security & Access", value: "24x7" },
  ];

  // ----------------------- Tab Change Handling -----------------------
  const handleTabChange = (tab) => {
    scrollPositionRef.current = window.scrollY;
    setActiveTab(tab);
  };

  // ✅ Only restore scroll when switching main tabs
  useLayoutEffect(() => {
    if (prevTab.current !== activeTab && scrollPositionRef.current > 0) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: "auto",
        });
      });
    }
    prevTab.current = activeTab;
  }, [activeTab]);

  // ✅ Prevent scroll jump when switching between master/floor
  const handlePlanSwitch = (plan) => {
    const currentScroll = window.scrollY; // save exact position
    setSelectedPlan(plan);

    // restore after DOM update
    requestAnimationFrame(() => {
      window.scrollTo({
        top: currentScroll,
        behavior: "auto",
      });
    });
  };

  // ----------------------- JSX -----------------------
  return (
    <div className="w-full relative pt-15 pb-10">
      <p className="text-gray-800 text-sm md:text-base lg:text-base leading-[140%] w-11/12 md:w-9/12 lg:w-8/12 relative text-center mx-auto mb-15">
        {project?.short_description || project?.tagline || ""}
      </p>

      {/* Tabs Header */}
      {availableTabs.length > 1 && (
        <div className="w-[90%] md:w-10/12 lg:w-8/12 relative mx-auto">
          <TabHeader
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            tabs={availableTabs}
          />
        </div>
      )}

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div className="flex-center w-full px-[22px] relative flex-col text-center pt-3 md:pt-6 lg:pt-10 gap-7">
          <h4 className="text-gray-600 font-playfair uppercase text-2xl md:text-[36px] lg:text-[42px] leading-[130%] font-semibold">
            Project Overview
          </h4>

          <p className="w-[90%] md:w-[80%] lg:w-8/12 relative text-gray-800 text-sm md:text-base lg:text-base leading-[140%]">
            {extractPlainText(project?.description || project?.overview || "")}
          </p>

          <div className="w-11/12 relative mb-10">
            <CounterThree data={data} />
          </div>
        </div>
      )}

      {/* GALLERY */}
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

      {/* PLANS */}
      {activeTab === "plans" && (
        <div className="flex-center w-full px-[22px] md:px-12 lg:px-20 relative flex-col text-center pt-3">
          <div className="w-full bg-white rounded-lg ">
            <div className="relative w-full md:w-10/12 lg:w-8/12 mx-auto -top-14">
              <SectionHeader
                heading={project?.plan_heading || "layouts &"}
                spanText={project?.plan_tagline || "Configurations"}
                desc={
                  project?.plan_description ||
                  "Choose from a range of plot sizes tailored for industries, logistics, and agri-based enterprises."
                }
              />
            </div>

            {/* Plan Switch Buttons */}
            <div className="flex justify-center gap-4 w-full md:w-10/12 lg:w-9/12 mx-auto -top-14 relative">
              <button
                type="button"
                onClick={() => handlePlanSwitch("master")}
                className={`w-[166px] lg:w-full h-[40px] py-[10px] border rounded-[5px] flex items-center justify-center gap-[10px] opacity-100 cursor-pointer
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

              {projectFloorsData?.project_floor_plans?.[0]
                ?.project_floor_plan_gallery?.[0]?.image && (
                <button
                  type="button"
                  onClick={() => handlePlanSwitch("floor")}
                  className={`w-[166px] lg:w-full h-[40px] py-[10px] border rounded-[5px] flex items-center justify-center gap-[10px] opacity-100 cursor-pointer
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

            {/* Master / Floor Plan Display */}
            <div className="w-full md:w-9/12 mx-auto -top-8 relative">
              {selectedPlan === "master" ? (
                <MasterPlan
                  key="master"
                  project={project}
                  masterImagePath={masterImagePath}
                />
              ) : (
                <FloorPlan
                  key="floor"
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
