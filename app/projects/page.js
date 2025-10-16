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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollPositionRef = useRef(0);
  const projectSectionRef = useRef(null);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return; // Prevent unnecessary re-fetch
    
    // Save scroll position before switching
    scrollPositionRef.current = window.scrollY;
    setActiveTab(tab);
    setIsTransitioning(true);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        // Add 3-second delay for smooth transition effect
        const delayPromise = new Promise(resolve => setTimeout(resolve, 100));
        
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

        // Wait for both API call and delay to complete
        await delayPromise;

        if (!response.ok)
          throw new Error(`API returned status ${response.status}`);

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
        setIsExpanded(false);
        setIsTransitioning(false);

        // Restore scroll position after projects update
        requestAnimationFrame(() => {
          window.scrollTo({
            top: scrollPositionRef.current,
            behavior: "instant",
          });
        });
      }
    };

    fetchProjects();
  }, [activeTab]);

  const initialProjects = useMemo(() => projects.slice(0, 9), [projects]);
  const additionalProjects = useMemo(() => projects.slice(9), [projects]);
  const canToggle = projects.length > 9;

  return (
    <div className="w-full relative" ref={projectSectionRef}>
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
          <TabHeader
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            tabs={tabs}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="w-full px-[22px] md:px-12 lg:px-20 text-center py-10">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black-400"></div>
              <p className="text-gray-500">
                {isTransitioning ? `Loading ${activeTab} projects...` : "Loading projects..."}
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="w-full px-[22px] md:px-12 lg:px-20 text-center py-10">
            <p className="text-red-500">Error: {error}</p>
          </div>
        )}

        {/* Projects */}
        <div className="min-h-screen relative w-full  mx-auto ">
          {!loading && !error && (
            <div className="animate-fade-in w-full flex-center flex-col">
              {/* Initial Projects */}
              <div className="w-full px-[22px] md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 ">
                {initialProjects.map((project) => (
                  <div key={project.id} className="animate-slide-up h-full">
                    <ProjectCard
                      data={project}
                      hideActions={false}
                      imagePath={imagePath}
                    />
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

              {/* Additional Projects */}
              <div
                className={`w-full px-[22px] md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 transition-all duration-300 ${
                  isExpanded ? "block" : "hidden"
                }`}
              >
                {additionalProjects.map((project) => (
                  <div key={project.id} className="animate-slide-up h-full">
                    <ProjectCard
                      data={project}
                      hideActions={false}
                      imagePath={imagePath}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
