"use client";
import {
  galleryImages,
  galleryTabs,
  journeyImages,
  journeyYears,
} from "@/lib/content";
import DropdownSelector from "../CSR/DropdownSelector";
import SectionHeader from "@/components/SectionHeader";
import { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel";
import ProjectGalleryCarousel from "./ProjectGalleryCarousel";

export default function Gallery({ 
  project,
  project360Data,
  viewsImagePath,
  projectVideoGalleryData,
  projectVideoGalleryImagePath,
  projectGalleryData,
  galleryImagePath
}) {
  // Build gallery tabs based on available API data only
  const tabs = [];
  
  // Check for gallery categories from API
  if (projectGalleryData?.gallery_names?.length > 0) {
    // Use gallery category names as tabs
    projectGalleryData.gallery_names.forEach(category => {
      tabs.push(category.name || category.title);
    });
  }
  
  // Add other gallery types only if API data exists
  if (project360Data?.length > 0) tabs.push("360 views");
  if (projectVideoGalleryData?.length > 0) tabs.push("video");
  
  // Only use API tabs, no fallback to static content
  const availableTabs = tabs;
  
  const [activeTab, setActiveTab] = useState(availableTabs[0]);
  const [tabContent, setTabContent] = useState([]);

  useEffect(() => {
    let filteredContent = [];
    
    // Check if activeTab is a gallery category
    const galleryCategory = projectGalleryData?.gallery_names?.find(
      cat => (cat.name || cat.title) === activeTab
    );
    
    if (galleryCategory && galleryCategory.project_gallery?.length > 0) {
      // Show gallery images from this category
      filteredContent = galleryCategory.project_gallery.map((img, index) => ({
        id: img.id || index,
        imgUrl: galleryImagePath ? (galleryImagePath + img.image) : img.image,
        type: activeTab,
        title: img.alt_image_text || img.title || "",
      }));
    } else if (activeTab === "360 views" && project360Data?.length > 0) {
      // Show 360 views
      filteredContent = project360Data.map((view, index) => ({
        id: view.id || index,
        imgUrl: viewsImagePath ? (viewsImagePath + view.image) : view.image,
        type: "360 views",
        title: view.title || view.name || "",
        is360: true,
      }));
    } else if (activeTab === "video" && projectVideoGalleryData?.length > 0) {
      // Show video gallery
      filteredContent = projectVideoGalleryData.map((video, index) => ({
        id: video.id || index,
        imgUrl: projectVideoGalleryImagePath ? (projectVideoGalleryImagePath + video.image) : video.image,
        videoUrl: video.video_url || video.url,
        type: "video",
        title: video.title || video.name || "",
        isVideo: true,
      }));
    }
    
    // Only set content if we have API data, no fallback to static content
    setTabContent(filteredContent);
  }, [activeTab, project, project360Data, viewsImagePath, projectVideoGalleryData, projectVideoGalleryImagePath, projectGalleryData, galleryImagePath]);

  // Only render gallery if there are tabs and content available
  if (availableTabs.length === 0 || tabContent.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full text-center pb-10">
      <h5 className="text-orange-600 uppercase text-[30px] md:text-base lg:text-[20px] font-bold lg:font-medium   leading-[110%]">
        Project images
      </h5>
      {/* Only show dropdown if there are multiple tabs */}
      {availableTabs.length > 1 && (
        <div className="w-full  px-[22px] md:w-1/2 lg:mx-auto relative mt-8 mb-1">
          <DropdownSelector
            tabs={availableTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      )}
      <div className="relative">
        <ProjectGalleryCarousel images={tabContent} />
      </div>
    </div>
  );
}
