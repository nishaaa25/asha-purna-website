"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/Button";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import TabHeader from "@/components/pages/CSR/TabHeader";
import ProjectCard from "@/components/pages/Projects/ProjectCard";
import SectionHeader from "@/components/SectionHeader";

export default function ProjectsPage() {
  const tabs = ["residential", "commercial", "hospitality"];
  const [activeTab, setActiveTab] = useState("residential");
  const [projects, setProjects] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollPositionRef = useRef(0);
  const isSwitchingTabRef = useRef(false);

  const handleTabChange = (tab) => {
    // Preserve current scroll position and mark that a tab switch is happening
    if (typeof window !== "undefined") {
      scrollPositionRef.current = window.scrollY || 0;
      isSwitchingTabRef.current = true;
    }
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://apiservices.ashapurna.com/api/web/project/listing",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-version": "v1",
            },
            body: JSON.stringify({ slug: activeTab }),
            next: { revalidate: 3600 },
          }
        );

        if (!response.ok) throw new Error(`API returned status ${response.status}`);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format");
        }

        const result = await response.json();

        if (result._status) {
          setProjects(result._data.getNewlaunchs || []);
          setImagePath(result._data.project_image_path || "");
        } else {
          setProjects([]);
          setError(result._message || "Failed to fetch projects");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
        setProjects([]);
      } finally {
        setLoading(false);
        setIsExpanded(false); // reset expand on tab change
        // Restore scroll position after content updates if we switched tabs
        if (typeof window !== "undefined" && isSwitchingTabRef.current) {
          requestAnimationFrame(() => {
            window.scrollTo({ top: scrollPositionRef.current, behavior: "auto" });
            isSwitchingTabRef.current = false;
          });
        }
      }
    };

    fetchProjects();
  }, [activeTab]);

  const initialProjects = useMemo(() => projects.slice(0, 9), [projects]);
  const additionalProjects = useMemo(() => projects.slice(9), [projects]);
  const canToggle = projects.length > 9;

  return (
    <div className="w-full relative">
      <HeroComponentTwo imgUrl="/assets/project-bg.jpg" />

      <div className="w-full relative md:w-[90%] lg:w-[80%] mx-auto">
        <SectionHeader
          spanText="Building Communities"
          heading="Transforming Landscapes,"
          title="our portfolio"
          desc="Ashapurna’s portfolio reflects a vision that goes beyond building homes. From landmark residential townships and commercial hubs to schools, hotels, and renewable energy initiatives, every project is a step toward creating self-sustaining ecosystems. Together, they form a legacy of progress rooted in trust, innovation, and long-term value."
        />
      </div>

      <div className="w-full relative pt-10 md:pt-15 lg:pt-20 pb-20 lg:pb-[100px] bg-cream-600 flex-center flex-col">
        <h3 className="text-[22px] md:text-[34px] lg:text-[42px] leading-[130%] tracking-[-1.1px] uppercase text-black-400 font-medium text-center mb-10">
          Our Projects
        </h3>

        {/* Tabs */}
        <div className="w-full px-[22px] md:px-12 lg:px-20 relative mx-auto">
          <TabHeader activeTab={activeTab} setActiveTab={handleTabChange} tabs={tabs} />
        </div>

        {/* Loading */}
        {loading && (
          <div className="w-full px-[22px] md:px-12 lg:px-20 text-center py-10">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="w-full px-[22px] md:px-12 lg:px-20 text-center py-10">
            <p className="text-red-500">Error: {error}</p>
          </div>
        )}

        {/* Projects */}
        {!loading && !error && (
          <>
            {/* Initial Projects */}
            <div className="w-full px-[22px] md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {initialProjects.map((project) => (
                <div key={project.id}>
                  <ProjectCard data={project} hideActions={false} imagePath={imagePath} />
                </div>
              ))}
            </div>

            {/* More/Less Button */}
            {canToggle && (
              <Button
                text={isExpanded ? "Less Projects" : "More Projects"}
                onClick={() => setIsExpanded((prev) => !prev)}
              />
            )}

            {/* Additional Projects - always mounted */}
            <div
              className={`w-full px-[22px] md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 ${
                isExpanded ? "block" : "hidden"
              }`}
            >
              {additionalProjects.map((project) => (
                <div key={project.id}>
                  <ProjectCard data={project} hideActions={false} imagePath={imagePath} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
