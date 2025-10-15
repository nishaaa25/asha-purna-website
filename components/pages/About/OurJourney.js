"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Fixed years to display on the wheel
const FIXED_YEARS = [1997, 2006, 2009, 2012, 2014, 2018, 2022, 2025];

// Helper function to extract year from title (e.g., "1996", "1996-2000", etc.)
function extractYear(title) {
  if (!title) return null;
  const yearMatch = title.match(/\d{4}/);
  return yearMatch ? parseInt(yearMatch[0]) : null;
}

// Helper function to parse HTML and extract project details
function parseProjectsFromDescription(description) {
  if (!description) return [];
  
  // Remove HTML tags but keep line breaks
  let cleanText = description
    .replace(/<br\s*\/?>/gi, '\n')  // Convert <br> to newlines
    .replace(/<\/p>/gi, '\n')       // Convert closing </p> to newlines
    .replace(/<\/li>/gi, '\n')      // Convert closing </li> to newlines
    .replace(/<[^>]*>/g, '');       // Remove all other HTML tags
  
  // Split by newlines, bullet points, or list markers
  const projects = cleanText
    .split(/[\n•●◦▪▫■□]/)
    .map(p => p.trim())
    .filter(p => {
      // Filter out empty strings, very long strings, and common non-project text
      if (!p || p.length === 0 || p.length > 200) return false;
      // Filter out common HTML entities or leftover tags
      if (p.match(/^[\s\-,.:;]+$/)) return false;
      return true;
    });
  
  return projects;
}

export default function OurJourney({ journeyData }) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMediumScreen, setMediumScreen] = useState(false);
  const [yearsData, setYearsData] = useState([]);

  var size = isLargeScreen ? 400 : 290;
  var size = isMediumScreen ? 390 : 290;

  const center = size / 2;
  const radius = isLargeScreen ? size / 1.4 : size / 1.5;
  const angleStep = isLargeScreen
    ? 270 / Math.max(FIXED_YEARS.length - 1, 1)
    : -270 / Math.max(FIXED_YEARS.length - 1, 1);

  const yearRef = useRef(null);
  const journeyRef = useRef(null);
  const squareRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Process Journey API data with fixed years
  useEffect(() => {
    if (journeyData && journeyData.status && journeyData.data?.getOurJournies) {
      const journies = journeyData.data.getOurJournies;
      
      // Extract all projects from API with their years
      const allProjects = journies
        .map(item => {
          const year = extractYear(item.title);
          const projects = parseProjectsFromDescription(item.description);
          
          // Log for debugging
          console.log(`Year ${year}:`, projects);
          
          return projects.map(projectName => ({
            year: year,
            projectName: projectName,
            title: item.title,
            description: item.description,
          }));
        })
        .flat()
        .filter(item => item.year); // Only keep items with valid years
      
      console.log('All projects with years:', allProjects);

      // Create year ranges with the fixed years
      const yearRangesData = FIXED_YEARS.map((year, index) => {
        const startYear = year;
        const isLastYear = index === FIXED_YEARS.length - 1;
        const endYear = isLastYear ? 9999 : FIXED_YEARS[index + 1]; // Use 9999 for last year to include all future projects
        
        // Get all projects between this year and the next year
        const projectsInRange = allProjects
          .filter(p => p.year >= startYear && p.year < endYear)
          .map(p => p.projectName);

        // Remove duplicates
        const uniqueProjects = [...new Set(projectsInRange)];
        
        console.log(`Year Range ${startYear}-${endYear}:`, uniqueProjects.length, 'projects');

        return {
          year: year.toString(),
          yearNum: year,
          startYear: startYear,
          endYear: isLastYear ? 'Present' : endYear,
          title: isLastYear ? `Projects ${startYear}-Present` : `Projects ${startYear}-${endYear}`,
          projects: uniqueProjects,
        };
      });

      setYearsData(yearRangesData);
    } else {
      // If no API data, still show the years with empty projects
      const emptyYearRanges = FIXED_YEARS.map((year, index) => {
        const startYear = year;
        const isLastYear = index === FIXED_YEARS.length - 1;
        const endYear = isLastYear ? 'Present' : FIXED_YEARS[index + 1];
        
        return {
          year: year.toString(),
          yearNum: year,
          startYear: startYear,
          endYear: endYear,
          title: isLastYear ? `Projects ${startYear}-Present` : `Projects ${startYear}-${endYear}`,
          projects: [],
        };
      });
      
      setYearsData(emptyYearRanges);
    }
  }, [journeyData]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint is 1024px
      setMediumScreen(window.innerWidth >= 768); // md breakpoint is 768px
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Scroll-driven setup (pin + progress controls animation)
  useEffect(() => {
    if (!journeyRef.current || yearsData.length === 0) return;

    const totalSteps = FIXED_YEARS.length - 1;
    const st = ScrollTrigger.create({
      trigger: journeyRef.current,
      start: "top 0",
      end: "+=" + FIXED_YEARS.length * 1000,
      pin: true,
      scrub: true,
      markers: false,
      snap: {
        snapTo: (value) => {
          const step = Math.round(value * totalSteps);
          return step / totalSteps;
        },
        duration: { min: 0.2, max: 0.6 },
        delay: 0,
      },
      onUpdate: (self) => {
        const progress = self.progress;
        const newIndex = Math.round(progress * totalSteps);

        setActiveIndex((prevIndex) => {
          if (newIndex === prevIndex) return prevIndex;

          const tl = gsap.timeline();

          // Rotate years wheel
          tl.to(
            yearRef.current,
            {
              rotation: -newIndex * angleStep,
              transformOrigin: "50% 50%",
              ease: "power2.out",
              duration: 0.8,
            },
            0
          );

          const prevEl = squareRefs.current[prevIndex];
          const currentEl = squareRefs.current[newIndex];

          if (prevEl) {
            tl.to(prevEl, { scale: 1, duration: 0.3, ease: "power2.out" }, 0);
            tl.to(prevEl, { backgroundColor: "#374151", duration: 0.2 }, 0);
          }

          if (currentEl) {
            tl.to(currentEl, { scale: 1, duration: 0.2, ease: "power1.out" }, 0);
            tl.to(currentEl, { scale: 2, duration: 0.25, ease: "power1.out" }, ">");
            tl.to(currentEl, { scale: 3, duration: 0.6, ease: "power2.out" }, ">");
            tl.to(currentEl, { backgroundColor: "#E84600", duration: 0.2 }, 0);
          }

          return newIndex;
        });
      },
    });

    return () => st.kill();
  }, [angleStep]);

  // Initial setup
  useEffect(() => {
    if (yearRef.current) {
      gsap.set(yearRef.current, {
        rotation: -activeIndex * angleStep,
        transformOrigin: "50% 50%",
      });
    }

    squareRefs.current.forEach((el) => {
      if (el) gsap.set(el, { scale: 1, transformOrigin: "50% 50%" });
    });

    const activeEl = squareRefs.current[activeIndex];
    if (activeEl) {
      gsap.set(activeEl, { scale: 1.8, backgroundColor: "#a78bfa" });
    }
  }, []);

  // Use yearsData if available, otherwise show years with empty projects
  const displayData = yearsData.length > 0 ? yearsData : FIXED_YEARS.map((year, index) => {
    const isLastYear = index === FIXED_YEARS.length - 1;
    return {
      year: year.toString(),
      yearNum: year,
      startYear: year,
      endYear: isLastYear ? 'Present' : FIXED_YEARS[index + 1],
      title: isLastYear ? `Projects ${year}-Present` : `Projects ${year}-${FIXED_YEARS[index + 1]}`,
      projects: [],
    };
  });

  const currentYearData = displayData[activeIndex] || displayData[0];

  return (
    <div
      ref={journeyRef}
      className="relative w-full min-h-screen text-center py-6 overflow-hidden flex flex-col items-center lg:flex-row lg:justify-start"
    >
      {/* Section Heading */}
      <div className="flex lg:flex-col">
        <h2 className="font-playfair font-semibold whitespace-nowrap text-gray-600 capitalize text-[6vw] leading-[8vw]">
          Our
        </h2>
        <h2 className="whitespace-nowrap tracking-tighter text-gray-600 capitalize text-[6vw] leading-[8vw]">
          Journey
        </h2>
      </div>

      {/* Outer Circle */}
      <div className="circle absolute -top-1/4 w-[99vw] h-[99vw] scale-[1.4] rounded-full border-[40px] mx-auto border-[#d9d9d9]/20 md:w-[75vw] md:h-[75vw] md:-top-[20rem] lg:w-[50vw] lg:h-[50vw] lg:top-0 lg:-left-1/5 lg:border-[65px]">
        <div className="w-[0.5px] h-4 bg-orange-600"></div>
      </div>

      {/* Rotating Wheel */}
      <div className="relative flex flex-col items-center justify-center gap-1 lg:flex-row lg:items-start lg:justify-between lg:gap-15">
        <div className="z-50 flex items-center justify-center">
          <div className="relative -top-[20rem] flex h-[30rem] w-[30rem] items-center justify-center rounded-full lg:top-5 lg:-left-[24rem] lg:-rotate-90">
            <div
              ref={yearRef}
              className="relative rounded-full"
              style={{ width: `${size}px`, height: `${size}px` }}
            >
              {displayData.map((data, i) => {
                const angle = i * angleStep - 270;

                const yearX = center + radius * Math.cos((angle * Math.PI) / 180);
                const yearY = center + radius * Math.sin((angle * Math.PI) / 180);

                const angleDiff = Math.abs(i - activeIndex) * Math.abs(angleStep);
                const opacity = Math.max(0, 1 - angleDiff / 90);

                const squareRadius = radius + (isLargeScreen ? 205 : 145);
                const squareX =
                  center + squareRadius * Math.cos((angle * Math.PI) / 180);
                const squareY =
                  center + squareRadius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div key={i}>
                    {/* Year Text */}
                    <div
                      className="absolute text-md font-bold transition-colors duration-300 pointer-events-none lg:text-xl"
                      style={{
                        left: `${yearX}px`,
                        top: `${yearY}px`,
                        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                        opacity: opacity,
                        color: i === activeIndex ? "#E84600" : "#7c7c7c",
                      }}
                    >
                      {data.year}
                    </div>

                    {/* Square markers */}
                    <div
                      ref={(el) => (squareRefs.current[i] = el)}
                      className="absolute w-1 h-1"
                      style={{
                        left: `${squareX}px`,
                        top: `${squareY}px`,
                        transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                        backgroundColor: i === activeIndex ? "#E84600" : "#374151",
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-3 h-3 z-10 -mt-[14.5rem] bg-[#E84600] md:-mt-[10.3rem] lg:w-3 lg:h-3 lg:mt-[34.8vh] lg:-ml-[12.9rem]"></div>

        {/* Dynamic Content */}
        <div className="px-6 text-center mt-[10rem] flex flex-col items-center justify-center gap-3 md:mt-[6rem] lg:mt-[13rem] lg:ml-20 max-w-2xl">
          <div className="flex flex-col text-center lg:text-lg max-h-[40vh] overflow-y-auto px-4 w-full">
            {currentYearData.projects && currentYearData.projects.length > 0 ? (
              currentYearData.projects.map((project, idx) => (
                <div key={idx} className="w-full flex flex-col items-center">
                  <p className="text-gray-700 leading-relaxed py-4 block w-full text-lg md:text-xl lg:text-2xl">
                    {project}
                  </p>
                  {idx < currentYearData.projects.length - 1 && (
                    <div className="w-2/12 h-[0.5px] bg-orange-600 mx-auto"></div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600 italic">
                No projects found for this period
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
