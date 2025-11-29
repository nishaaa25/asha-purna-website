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
  const scrollPos = useRef(0);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;

    // save scroll position (non-blocking)
    scrollPos.current = window.scrollY;

    setLoading(true);
    setActiveTab(tab);
  };

  useEffect(() => {
    let canceled = false;

    const fetchData = async () => {
      try {
        setError(null);

        const res = await fetch(
          "https://apiservices.ashapurna.com/api/web/project/listing",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-version": "v2",
            },
            body: JSON.stringify({ slug: activeTab }),
            next: { revalidate: 3600 },
          }
        );

        if (!res.ok) throw new Error(`API returned status ${res.status}`);

        const data = await res.json();
        if (!data._status) throw new Error(data._message);

        if (canceled) return;

        const d = data._data;

        const merge = (arr, type) =>
          (arr || []).map((p) => ({ ...p, _listType: type }));

        const combined = [
          ...merge(d.getNewlaunchs),
          ...merge(d.getResidentialFlats),
          ...merge(d.getResidentialTownships),
        ].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        setProjects(combined);

        setImagePath(d.project_image_path || "");
      } catch (err) {
        if (!canceled) {
          setError(err.message);
          setProjects([]);
        }
      } finally {
        if (!canceled) {
          // allow React to paint first → avoid lag
          requestAnimationFrame(() => {
            requestIdleCallback
              ? requestIdleCallback(() =>
                  window.scrollTo({ top: scrollPos.current, behavior: "instant" })
                )
              : window.scrollTo({ top: scrollPos.current, behavior: "instant" });
          });

          setLoading(false);
          setIsExpanded(false);
        }
      }
    };

    fetchData();
    return () => {
      canceled = true;
    };
  }, [activeTab]);

  const initialProjects = useMemo(() => projects.slice(0, 9), [projects]);
  const additionalProjects = useMemo(() => projects.slice(9), [projects]);
  const canToggle = projects.length > 9;

  return (
    <div className="w-full relative">
      <HeroComponentTwo imgUrl="https://d3qnldyv492i08.cloudfront.net/ashapurna/images/webimages/project-herobg.jpg" />

      <div className="w-full relative md:w-[90%] lg:w-[80%] mx-auto">
        <SectionHeader
          spanText="Building Communities"
          heading="Transforming Landscapes,"
          title="our portfolio"
          desc="Ashapurna’s portfolio reflects a vision that goes beyond building homes. From landmark residential townships and commercial hubs to schools, hotels, and renewable energy initiatives, every project is a step toward creating self-sustaining ecosystems. Together, they form a legacy of progress rooted in trust, innovation, and long-term value."
        />
      </div>

      <div className="w-full pt-10 pb-20 bg-cream-600 flex-center flex-col">
        <h3 className="text-[24px] md:text-[50px] lg:text-[70px] text-black-400 font-medium text-center mb-10">
          Our Projects
        </h3>

        <div className="w-full px-[22px] md:px-12 lg:px-20 relative mx-auto">
          <TabHeader activeTab={activeTab} setActiveTab={handleTabChange} tabs={tabs} />
        </div>

        {loading && (
          <div className="w-full text-center py-10">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black-400" />
              <p className="text-gray-500">Loading {activeTab} projects...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="w-full text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="w-full flex-center flex-col">
            {/* First 9 */}
            <div className="w-full px-[22px] md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {initialProjects.map((p) => (
                <ProjectCard key={p.id} data={p} imagePath={imagePath} />
              ))}
            </div>

            {canToggle && (
              <Button
                text={isExpanded ? "Less Projects" : "More Projects"}
                onClick={() => setIsExpanded((prev) => !prev)}
              />
            )}

            {/* Rest */}
            {isExpanded && (
              <div className="w-full px-[22px] md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                {additionalProjects.map((p) => (
                  <ProjectCard key={p.id} data={p} imagePath={imagePath} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
