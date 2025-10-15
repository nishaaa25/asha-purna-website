'use client';
import { floorplans, planTabs } from "@/lib/content";
import DropdownSelector from "../CSR/DropdownSelector";
import { useEffect, useState } from "react";
import PlanCard from "./PlanCard";

export default function FloorPlan({ project, floorImagePath, projectFloorsData }) {
  // Get floor plans from API or use fallback
  // API returns: { project_floor_plans: [...] }
  const apiFloorPlans = projectFloorsData?.project_floor_plans || [];
  
  // Extract unique floor types/names for tabs using the title field
  const floorPlanTabs = apiFloorPlans.length > 0
    ? apiFloorPlans.map(plan => plan.title).filter(Boolean)
    : planTabs;

  const [activeTab, setActiveTab] = useState(floorPlanTabs[0] || planTabs[0]);
  const [tabContent, setTabContent] = useState(null);

  useEffect(() => {
    if (apiFloorPlans.length > 0) {
      // Find floor plan from API data by title
      const filteredContent = apiFloorPlans.find(
        (el) => el.title === activeTab
      );
      
      // Transform to match PlanCard format
      if (filteredContent) {
        setTabContent({
          ...filteredContent,
          imgUrl: floorImagePath ? (floorImagePath + filteredContent.image) : filteredContent.image,
          floor: filteredContent.title,
          gallery: filteredContent.project_floor_plan_gallery || [],
        });
      }
    } else {
      // Fallback to static content
      const filteredContent = floorplans.find(
        (el) => el.floor.toLowerCase() === activeTab.toLowerCase()
      );
      setTabContent(filteredContent);
    }
  }, [activeTab, apiFloorPlans, floorImagePath]);

  return (
    <div className="w-full relative flex flex-col gap-4 md:gap-8">
      <DropdownSelector
        tabs={floorPlanTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <PlanCard data={tabContent} project={project} />
    </div>
  );
}
