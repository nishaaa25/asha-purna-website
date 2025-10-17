"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Demo years data
const DEMO_YEARS = [2020, 2021, 2022, 2023, 2024, 2025];

// Demo projects data
const demoProjects = [
  {
    title: "Demo Project Alpha",
    year: 2020,
    type: "Innovation",
    description: "First major breakthrough"
  },
  {
    title: "Demo Project Beta",
    year: 2021,
    type: "Development",
    description: "Advanced features launch"
  },
  {
    title: "Demo Project Gamma",
    year: 2022,
    type: "Expansion",
    description: "Market expansion initiative"
  },
  {
    title: "Demo Project Delta",
    year: 2023,
    type: "Integration",
    description: "System integration milestone"
  },
  {
    title: "Demo Project Epsilon",
    year: 2024,
    type: "Optimization",
    description: "Performance optimization phase"
  },
  {
    title: "Demo Project Zeta",
    year: 2025,
    type: "Future",
    description: "Next generation platform"
  }
];

// Helper function to filter projects by year range
function filterProjectsByYearRange(startYear, endYear) {
  return demoProjects
    .filter((project) => {
      if (endYear === 9999) {
        return project.year >= startYear;
      }
      return project.year >= startYear && project.year < endYear;
    })
    .map((project) => ({
      title: project.title,
      type: project.type,
      description: project.description,
      year: project.year,
    }));
}

export default function OurJourneyDemo() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMediumScreen, setMediumScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [yearsData, setYearsData] = useState([]);

  // Enhanced size calculation based on screen size for better responsiveness
  const size = isLargeScreen ? 800 : isMediumScreen ? 580 : isSmallScreen ? 450 : 350;

  const center = size / 2;
  const radius = isLargeScreen ? size / 3.5 : isMediumScreen ? size / 3 : isSmallScreen ? size / 2.8 : size / 2.2;
  const angleStep = isLargeScreen
    ? 270 / Math.max(DEMO_YEARS.length - 1, 1)
    : -270 / Math.max(DEMO_YEARS.length - 1, 1);

  const yearRef = useRef(null);
  const journeyRef = useRef(null);
  const squareRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Process Demo projects data with fixed years
  useEffect(() => {
    const yearRangesData = DEMO_YEARS.map((year, index) => {
      const startYear = year;
      const isLastYear = index === DEMO_YEARS.length - 1;
      const endYear = isLastYear ? 9999 : DEMO_YEARS[index + 1];

      const projectsInRange = filterProjectsByYearRange(startYear, endYear);

      return {
        year: year.toString(),
        yearNum: year,
        startYear: startYear,
        endYear: isLastYear ? "Present" : endYear,
        title: isLastYear
          ? `Projects ${startYear}-Present`
          : `Projects ${startYear}-${endYear}`,
        projects: projectsInRange,
      };
    });

    setYearsData(yearRangesData);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsLargeScreen(width >= 1024);
      setMediumScreen(width >= 768 && width < 1024);
      setIsSmallScreen(width >= 640 && width < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Scroll-driven setup (pin + progress controls animation)
  useEffect(() => {
    if (!journeyRef.current || yearsData.length === 0) return;

    const totalSteps = DEMO_YEARS.length - 1;
    const st = ScrollTrigger.create({
      trigger: journeyRef.current,
      start: "top 0",
      end: "+=" + DEMO_YEARS.length * 1500,
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
            tl.to(
              currentEl,
              { scale: 1, duration: 0.2, ease: "power1.out" },
              0
            );
            tl.to(
              currentEl,
              { scale: 2, duration: 0.25, ease: "power1.out" },
              ">"
            );
            tl.to(
              currentEl,
              { scale: 3, duration: 0.6, ease: "power2.out" },
              ">"
            );
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
      gsap.set(activeEl, { scale: 1.8, backgroundColor: "#ee6400" });
    }
  }, []);

  // Use yearsData if available, otherwise show years with empty projects
  const displayData =
    yearsData.length > 0
      ? yearsData
      : DEMO_YEARS.map((year, index) => {
          const isLastYear = index === DEMO_YEARS.length - 1;
          return {
            year: year.toString(),
            yearNum: year,
            startYear: year,
            endYear: isLastYear ? "Present" : DEMO_YEARS[index + 1],
            title: isLastYear
              ? `Projects ${year}-Present`
              : `Projects ${year}-${DEMO_YEARS[index + 1]}`,
            projects: [],
          };
        });

  const currentYearData = displayData[activeIndex] || displayData[0];

  return (
    <div
      ref={journeyRef}
      className="relative w-full h-screen text-center py-6 overflow-hidden flex flex-col items-center lg:flex-row lg:justify-start"
    >
      {/* Section Heading */}
      <div className="flex lg:flex-col lg:pl-10 xl:pl-16">
        <h2 className="font-playfair font-semibold whitespace-nowrap text-gray-600 capitalize text-[6vw] sm:text-[5vw] md:text-[4.5vw] lg:text-[3.5vw] xl:text-[3vw] leading-[8vw] lg:leading-[5vw]">
          Demo
        </h2>
        <h2 className="whitespace-nowrap tracking-tighter text-gray-600 capitalize text-[6vw] sm:text-[5vw] md:text-[4.5vw] lg:text-[3.5vw] xl:text-[3vw] leading-[8vw] lg:leading-[5vw]">
          Journey
        </h2>
      </div>

      {/* Outer Circle */}
      <div className="circle absolute  -top-4 -left-3/5 -translate-y-1/2 translate-x-3/5 w-[99vw] h-[99vw] scale-[1.3] rounded-full border-[35px] mx-auto border-[#d9d9d9]/20 sm:scale-[1.25] sm:w-[90vw] sm:h-[90vw] md:scale-[1.15] md:w-[75vw] md:h-[75vw] md:border-[50px] lg:scale-[1.1] lg:top-1/2 lg:w-[55vw] lg:h-[55vw] lg:border-[80px] xl:scale-100 xl:w-[900px] xl:h-[900px] xl:border-[100px]">
        <div className="absolute top-1/2 -translate-y-1/2 h-[35px] md:h-[60px] lg:h-[80px] xl:h-[100px] rotate-90 w-[0.5px] -right-[7%] bg-orange-600"></div>
      </div>

      {/* Rotating Wheel */}
      <div className="absolute grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 w-full h-full px-4 md:px-6 lg:px-10 xl:px-20 py-10 lg:py-0">
        <div className="z-50 flex items-center justify-center absolute 
          -top-8 -left-1/2 sm:-top-6 sm:-left-1/2 
          md:-top-4 md:-left-2/5 
          lg:top-1/2 lg:-left-3/7 lg:-translate-y-1/2 lg:translate-x-3/7
          xl:top-1/2 xl:-left-1/3 xl:-translate-y-1/2 xl:translate-x-1/3">
          <div className="relative flex items-center justify-center rounded-full lg:-rotate-90">
            <div
              ref={yearRef}
              className="relative rounded-full"
              style={{ width: `${size}px`, height: `${size}px` }}
            >
              {displayData.map((data, i) => {
                const angle = i * angleStep - 270;

                const angleDiff =
                  Math.abs(i - activeIndex) * Math.abs(angleStep);
                const opacity = Math.max(0, 1 - angleDiff / 90);

                const yearX =
                  center + radius * Math.cos((angle * Math.PI) / 180);
                const yearY =
                  center + radius * Math.sin((angle * Math.PI) / 180);

                const squareRadius = radius + (isLargeScreen ? 205 : isMediumScreen ? 170 : isSmallScreen ? 150 : 120);
                const squareX =
                  center + squareRadius * Math.cos((angle * Math.PI) / 180);
                const squareY =
                  center + squareRadius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div key={i}>
                    {/* Year Text */}
                    <div
                      className={`absolute font-bold transition-colors duration-300 pointer-events-none ${
                        isSmallScreen ? 'text-xs' : 
                        isMediumScreen ? 'text-sm' : 
                        isLargeScreen ? 'text-base' : 'text-lg'
                      }`}
                      style={{
                        left: `${yearX}px`,
                        top: `${yearY}px`,
                        transform: `translate(-50%, -50%) rotate(${+angle}deg)`,
                        opacity: opacity,
                        color: i === activeIndex ? "#E84600" : "#7c7c7c",
                      }}
                    >
                      {data.year}
                    </div>

                    {/* Square markers */}
                    <div
                      ref={(el) => (squareRefs.current[i] = el)}
                      className={`absolute ${
                        isSmallScreen ? 'w-0.5 h-0.5' : 
                        isMediumScreen ? 'w-1 h-1' : 
                        isLargeScreen ? 'w-1.5 h-1.5' : 'w-2 h-2'
                      }`}
                      style={{
                        left: `${squareX}px`,
                        top: `${squareY}px`,
                        transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                        backgroundColor:
                          i === activeIndex ? "#E84600" : "#374151",
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative w-full h-full"></div>
        {/* Dynamic Content - Fixed width on right side */}
        <div className="px-4 sm:px-6 md:px-8 text-center mt-[8rem] sm:mt-[9rem] md:mt-[7rem] lg:mt-0 flex flex-col h-full items-center justify-center gap-3 w-full">
          <div className="flex flex-col text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl overflow-y-auto px-4 md:px-6 lg:pl-16 xl:pl-20 w-full max-h-[50vh] lg:max-h-[90vh] no-scrollbar">
            {currentYearData.projects && currentYearData.projects.length > 0 ? (
              currentYearData.projects.map((project, idx) => (
                <div
                  key={idx}
                  className="w-full flex flex-col items-center py-2 md:py-3 gap-4"
                >
                  <h3 className="text-black-400/50 font-semibold text-sm sm:text-base md:text-lg lg:text-[22px] leading-[130%] tracking-[-1.1%]">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                    {project.description}
                  </p>
                  <span className="text-orange-600 text-xs sm:text-sm font-medium">
                    {project.type}
                  </span>
                  {idx < currentYearData.projects.length - 1 && (
                    <div className="w-3/12 sm:w-2/12 h-[1px] bg-orange-600/60"></div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600 italic text-sm sm:text-base md:text-lg">
                No projects found for this period
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
