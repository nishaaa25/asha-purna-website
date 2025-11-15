"use client";
import { journeyImages, journeyYears } from "@/lib/content";
import DropdownSelector from "./pages/CSR/DropdownSelector";
import SectionHeader from "./SectionHeader";
import { useState, useEffect } from "react";
import ImageCarousel from "./pages/Projects/ImageCarousel";

export default function Construction({ project, projectConstructionsData, constructionImagePath }) {
  // Get construction updates from API data (separate API call)
  // API returns: { project_constructions: [...] }
  const constructionUpdates = projectConstructionsData?.project_constructions || [];
  
  // Extract timeline options from construction data (using title as the month/year)
  const timelineOptions = constructionUpdates.length > 0
    ? constructionUpdates.map(item => item.title).filter(Boolean)
    : journeyYears;

  const [activeTab, setActiveTab] = useState(timelineOptions[0] || journeyYears[0]);
  const [tabContent, setTabContent] = useState([]);

  useEffect(() => {
    if (constructionUpdates.length > 0) {
      // Find the construction update matching the active tab (by title)
      const selectedUpdate = constructionUpdates.find(
        (item) => item.title === activeTab
      );
      
      if (selectedUpdate && selectedUpdate.project_construction_gallery) {
        // Transform the gallery images to match ImageCarousel format
        const transformedContent = selectedUpdate.project_construction_gallery.map((img, index) => ({
          id: img.id || index,
          imgUrl: constructionImagePath ? (constructionImagePath + img.image) : img.image,
          year: selectedUpdate.title,
          title: img.alt_image_text || img.title || "",
        }));
        
        setTabContent(transformedContent);
      } else {
        setTabContent([]);
      }
    } else {
      // Fallback to static content
      const filteredContent = journeyImages.filter(
        (el) => el.year.toLowerCase() === activeTab.toLowerCase()
      );
      setTabContent(filteredContent);
    }
  }, [activeTab, constructionUpdates, constructionImagePath]);

  // Don't render if no construction updates
  if (constructionUpdates.length === 0 && journeyImages.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <SectionHeader
        title="construction updates"
        heading={project?.construction_heading || "project progress"}
        spanText={project?.construction_tagline || "timeline"}
        desc={project?.construction_description || "Track the real-time progress of our construction milestones and witness your dream home taking shape month by month."}
      />
      <div className="w-full px-[22px] md:w-1/2 lg:mx-auto relative">
        <DropdownSelector
          tabs={timelineOptions}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="relative mt-6 md:mt-4 lg:mt-0">
        <ImageCarousel images={tabContent} />
      </div>
    </div>
  );
}
