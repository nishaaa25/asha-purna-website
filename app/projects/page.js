"use client";

import { useEffect, useMemo, useState } from "react";
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

  // Fetch projects based on active tab
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
            next: { revalidate: 3600 }, // Revalidate every hour
          }
        );

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format");
        }

        const result = await response.json();
        // console.log("API Response:", result?.data);

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
      }
    };

    fetchProjects();
  }, [activeTab]);

  const [visibleCount, setVisibleCount] = useState(9);
  const initialProjects = useMemo(() => projects.slice(0, 9), [projects]);
  const extendedProjects = useMemo(
    () => projects.slice(9, visibleCount),
    [projects, visibleCount]
  );
  const hasMore = visibleCount < projects.length;
  const canToggle = projects.length > 9; // show button if there are more than 9 total
  const isExpanded = visibleCount >= projects.length && canToggle;

  useEffect(() => {
    setVisibleCount(9);
  }, [activeTab]);

  return (
    <div className="w-full relative">
      <HeroComponentTwo imgUrl="/assets/project-bg.jpg" />
      <div className="w-full relative md:w-[90%] lg:w-[80%] lg:mx-auto">
        <SectionHeader
          spanText="Building Communities"
          heading="Transforming Landscapes,"
          title="our portfolio"
          desc="Ashapurna’s portfolio reflects a vision that goes beyond building homes. From landmark residential townships and commercial hubs to schools, hotels, and renewable energy initiatives, every project is a step toward creating self-sustaining ecosystems. Together, they form a legacy of progress rooted in trust, innovation, and long-term value."
        />
      </div>

      <div className="w-full relative pt-10 md:pt-15 lg:pt-20 pb-20 lg:pb-[100px] bg-cream-600 flex-center flex-col ">
        <h3 className="text-[22px] md:text-[34px] lg:text-[42px] leading-[130%] tracking-[-1.1px] uppercase whitespace-nowrap text-black-400 font-medium text-center mb-10">
          Our Projects
        </h3>

        {/* Tabs */}
        <div className="w-full px-[22px] md:px-12 lg:px-20 relative mx-auto ">
          <TabHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="w-full px-[22px] md:px-12 lg:px-20 text-center py-10">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="w-full px-[22px] md:px-12 lg:px-20 text-center py-10">
            <p className="text-red-500">Error: {error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <>
            {/* Initial 9 projects */}
            <div className="w-full px-[22px] md:px-12 lg:px-20 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {initialProjects.length > 0 ? (
                initialProjects.map((project) => (
                  <div key={project.id}>
                    <ProjectCard
                      data={project}
                      hideActions={false}
                      imagePath={imagePath}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-5 col-span-full">
                  No projects available for {activeTab}
                </p>
              )}
            </div>

            {/* More/Less Projects Button */}
            {canToggle && (
              <Button
                text={isExpanded ? "Less projects" : "More projects"}
                onClick={(e) => {
                  e.preventDefault();
                  const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
                  if (isExpanded) {
                    setVisibleCount(9);
                  } else {
                    setVisibleCount((c) => Math.min(c + 9, projects.length));
                  }
                  // Restore scroll immediately after DOM updates paint
                  if (typeof window !== "undefined") {
                    requestAnimationFrame(() => {
                      window.scrollTo({ top: currentScrollY });
                    });
                  }
                }}
              />
            )}

            {/* Extended projects (after button) without action buttons */}
            {extendedProjects.length > 0 && (
              <div className="w-full px-[22px] md:px-12 lg:px-20 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {extendedProjects.map((project) => (
                  <div key={project.id}>
                    <ProjectCard
                      data={project}
                      hideActions={true}
                      imagePath={imagePath}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
