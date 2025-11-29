'use client';
import { floorplans, planTabs } from "@/lib/content";
import DropdownSelector from "../CSR/DropdownSelector";
import { useEffect, useState } from "react";
import PlanCard from "./PlanCard";

export default function FloorPlan({ project, floorImagePath, projectFloorsData }) {
  // Get floor plans from API or use fallback
  // API returns: { project_floor_plans: [...] }
  const apiFloorPlans = projectFloorsData?.project_floor_plans || [];

  // Build safe tab labels with index fallback to avoid duplicates/empties
  const floorPlanTabs = apiFloorPlans.length > 0
    ? apiFloorPlans.map((plan, idx) => {
        const title = (plan && typeof plan.title === 'string' && plan.title.trim()) ? plan.title.trim() : `Plan ${idx + 1}`;
        return title;
      })
    : planTabs;

  const [activeTab, setActiveTab] = useState(floorPlanTabs[0] || planTabs[0]);
  const [tabContent, setTabContent] = useState(null);

  useEffect(() => {
    if (apiFloorPlans.length > 0) {
      // Resolve by index if titles are duplicate/empty
      const index = floorPlanTabs.indexOf(activeTab);
      const plan = index >= 0 ? apiFloorPlans[index] : apiFloorPlans[0];
      if (plan) {
        setTabContent({
          ...plan,
          imgUrl: floorImagePath ? (floorImagePath + plan.image) : plan.image,
          floor: plan.title || activeTab,
          gallery: Array.isArray(plan.project_floor_plan_gallery) ? plan.project_floor_plan_gallery : [],
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
      <PlanCard data={tabContent} project={project} imgPath={floorImagePath}/>
    </div>
  );
}
