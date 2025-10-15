"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import ourJourneyProjects from "@/lib/ourjourneyproject";

gsap.registerPlugin(ScrollTrigger);

// Use the same fixed years and project bucketing as the main OurJourney component
const FIXED_YEARS = [1997, 2007, 2010, 2013, 2015, 2020, 2023, 2025];

function filterProjectsByYearRange(startYear, endYear) {
  return ourJourneyProjects
    .filter((project) => {
      if (endYear === 9999) {
        return project.year >= startYear;
      }
      return project.year >= startYear && project.year < endYear;
    })
    .map((project) => ({
      title: project.title,
      projectType: project.projectType,
      area: project.area,
      year: project.year,
    }));
}

export default function OurJourneySmall() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMediumScreen, setMediumScreen] = useState(false);
  const [yearsData, setYearsData] = useState([]);

  var size = isLargeScreen ? 400 : 290;
  var size = isMediumScreen ? 390 : 290;

  const center = size / 2;
  const radius = isLargeScreen ? size / 1.4 : size / 2;
  const angleStep = isLargeScreen
    ? 270 / Math.max(FIXED_YEARS.length, 1)
    : -270 / Math.max(FIXED_YEARS.length, 1);

  const yearRef = useRef(null);
  const journeyRef = useRef(null);
  const squareRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Build year buckets from shared data
  useEffect(() => {
    const yearRangesData = FIXED_YEARS.map((year, index) => {
      const startYear = year;
      const isLastYear = index === FIXED_YEARS.length - 1;
      const endYear = isLastYear ? 9999 : FIXED_YEARS[index + 1];
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
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint is 1024px
      setMediumScreen(window.innerWidth >= 768); // lg breakpoint is 1024px
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Scroll-driven setup (pin + progress controls animation)
  useEffect(() => {
    if (!journeyRef.current) return;

    const totalSteps = FIXED_YEARS.length - 1;
    const st = ScrollTrigger.create({
      trigger: journeyRef.current,
      start: "top 0",
      end: "+=" + FIXED_YEARS.length * 300,
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
      gsap.set(activeEl, { scale: 1.8, backgroundColor: "#a78bfa" });
    }
  }, []);

  // Removed wheel handler for better mobile support; scrolling now controls the animation
  const displayData =
    yearsData.length > 0
      ? yearsData
      : FIXED_YEARS.map((year, index) => {
          const isLastYear = index === FIXED_YEARS.length - 1;
          return {
            year: year.toString(),
            yearNum: year,
            startYear: year,
            endYear: isLastYear ? "Present" : FIXED_YEARS[index + 1],
            title: isLastYear
              ? `Projects ${year}-Present`
              : `Projects ${year}-${FIXED_YEARS[index + 1]}`,
            projects: [],
          };
        });

  const currentYearData = displayData[activeIndex] || displayData[0];

  return (
    <div
      ref={journeyRef}
      className="relative w-full h-screen text-center py-6 overflow-hidden flex flex-col items-center  lg:flex-row lg:justify-start "
    >
      {/* Section Heading */}
      <div className="flex flex-col relative">
        <h2 className="font-playfair font-semibold whitespace-nowrap text-gray-600 capitalize text-[6vw] leading-[8vw]">
          Our
        </h2>
        <h2 className="whitespace-nowrap text-gray-600 capitalize text-[6vw] leading-[8vw]">
          Journey
        </h2>
      </div>

      {/* Outer Circle */}
      <div className="circle absolute -top-1/4 w-[99vw] h-[99vw] scale-[1.4] rounded-full border-[40px] mx-auto border-[#d9d9d9]/20 md:w-[75vw] md:h-[75vw] md:-top-[20rem] lg:w-[50vw] lg:h-[50vw] lg:top-0 lg:-left-1/5 lg:border-[65px]  ">
        <div className="w-[0.5px] h-4 bg-orange-600"></div>
      </div>

      {/* Rotating Wheel */}
      <div className="relative flex  flex-col items-center justify-center gap-1 lg:flex-row lg:items-start lg:justify-between lg:gap-15 ">
        <div className="z-50 flex items-center justify-center ">
          <div className="relative -top-[20rem] flex h-[30rem] w-[30rem] items-center justify-center rounded-full lg:top-5 lg:-left-[24rem] lg:-rotate-90 ">
            <div
              ref={yearRef}
              className="relative rounded-full"
              style={{ width: `${size}px`, height: `${size}px` }}
            >
              {displayData.map((data, i) => {
                const angle = i * angleStep - 270;

                const yearX =
                  center + radius * Math.cos((angle * Math.PI) / 180);
                const yearY =
                  center + radius * Math.sin((angle * Math.PI) / 180);

                const angleDiff =
                  Math.abs(i - activeIndex) * Math.abs(angleStep);
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
                      className="absolute w-1 h-1  "
                      style={{
                        left: `${squareX}px`,
                        top: `${squareY}px`,
                        transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                        backgroundColor: (
                          <div className="w-3 h-3 z-10 -mt-[14.1rem] bg-[#E84600] "></div>
                        ),
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className=" w-3 h-3 z-10 -mt-[14.5rem] bg-[#E84600] md:-mt-[10.3rem] lg:w-3 lg:h-3 lg:mt-[34.8vh] lg:-ml-[12.9rem]  "></div>

        {/* Dynamic Content */}
        <div className="px-6 text-center mt-[10rem] flex flex-col  items-center justify-center gap-3 md:mt-[6rem] lg:mt-[13rem] lg:ml-20">
          <h2 className="mb-2 text-xl font-semibold text-[#7c7c7c] lg:text-3xl">
            {currentYearData.title}
          </h2>
          <div className="flex flex-col items-center gap-3 lg:text-xl lg:gap-15">
            {currentYearData.projects && currentYearData.projects.length > 0 ? (
              currentYearData.projects.map((project, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <h3 className="font-semibold text-gray-800">
                    {project.title}
                  </h3>
                  <div className="flex gap-4 text-sm text-gray-800">
                    <span>Project Type - {project.projectType}</span>
                    <span>Area - {project.area} Acre</span>
                  </div>
                  {idx < currentYearData.projects.length - 1 && (
                    <div className="w-1/4 h-[0.5px] mt-4 bg-orange-600/60"></div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600 italic text-sm">
                No projects found for this period
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Static Ashapurna Timeline */}
      {/* <div className="relative flex flex-col gap-4 justify-center text-sm leading-[130%] font-semibold text-black-400/50 top-[20vh]">
        <p>Ashapurna Township Uchiyarda</p>
        <div className="w-2/12 relative mx-auto bg-orange-600 h-[0.5px]" />
        <p>Ashapurna Township Jalore</p>
        <div className="w-2/12 relative mx-auto bg-orange-600 h-[0.5px]" />
        <p>Ashapurna Township Sanchore</p>
        <div className="w-2/12 relative mx-auto bg-orange-600 h-[0.5px]" />
        <p>Ashapurna Nagar</p>
        <div className="w-2/12 relative mx-auto bg-orange-600 h-[0.5px]" />
        <p>Ashapurna City</p>
      </div> */}
    </div>
  );
}
