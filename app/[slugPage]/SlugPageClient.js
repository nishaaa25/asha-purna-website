"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/pages/Projects/ProjectCard";
import { headerContent } from "@/lib/content";

export default function SlugPageClient({ initialData, imagePath, slug }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const apiData = initialData || [];

  const initialProjects = useMemo(() => apiData.slice(0, 12), [apiData]);
  const additionalProjects = useMemo(() => apiData.slice(12), [apiData]);

  const canToggle = apiData.length > 12;

  const headerData = headerContent.find(
    (p) =>
      p.type.toLowerCase().replace(/\s+/g, "-") === slug?.toLowerCase()
  );

  // ✅ Conditionally set hero image based on slug
  const heroImage =
    slug === "windmills"
      ? "/assets/windmills.png" // <-- make sure this path exists in your public folder
      : null;

  return (
    <div className="w-full relative">
      {/* ✅ Pass heroImage only when available */}
      <HeroComponentTwo imgUrl={heroImage} />

      <SectionHeader
        spanText={headerData?.spanText}
        heading={headerData?.heading}
        title="OUR PORTFOLIO"
        desc={headerData?.desc}
      />

      {initialProjects.length > 0 && <div className="w-full relative py-15 lg:py-[100px] bg-cream-600 flex-center flex-col gap-10">
        <h2 className="text-[22px] md:text-[38px] lg:text-[54px] leading-[130%] tracking-[-1.1px] mb-5 text-black-400 font-medium uppercase">
          {headerData?.type || slug} Projects
        </h2>

        {/* Initial Projects Grid */}
        <div className="w-full px-[22px] lg:px-[100px] relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-10">
          {initialProjects.length > 0 && (
            initialProjects.map((project) => {
              const projectSlug =
                project.slug ||
                project.projectName?.toLowerCase().replace(/\s+/g, "-");

              return (
                <Link key={project.id} href={`/projects/${projectSlug}`}>
                  <ProjectCard
                    data={project}
                    hideActions={false}
                    imagePath={imagePath}
                  />
                </Link>
              );
            })
          )}
        </div>

        {/* More/Less Projects Button */}
        {canToggle && (
          <button
            className="border border-[#cccccc] bg-black-400 text-white font-medium text-xs md:text-base lg:text-xl py-[10px] lg:py-[15px] min-w-38 lg:min-w-44 px-5 lg:px-6 rounded-md mt-2 capitalize"
            onClick={() => {
              const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
              setIsExpanded(!isExpanded);
              if (typeof window !== "undefined") {
                requestAnimationFrame(() => {
                  window.scrollTo({ top: currentScrollY });
                });
              }
            }}
          >
            {isExpanded ? "Less Projects" : "More Projects"}
          </button>
        )}

        {/* Additional Projects Grid - Shows after button when expanded */}
        {isExpanded && additionalProjects.length > 0 && (
          <div className="w-full px-[22px] lg:px-[100px] relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-10">
            {additionalProjects.map((project) => {
              const projectSlug =
                project.slug ||
                project.projectName?.toLowerCase().replace(/\s+/g, "-");

              return (
                <Link key={project.id} href={`/projects/${projectSlug}`}>
                  <ProjectCard
                    data={project}
                    hideActions={false}
                    imagePath={imagePath}
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>}
    </div>
  );
}
