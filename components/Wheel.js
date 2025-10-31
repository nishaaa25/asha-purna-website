"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ourJourneyProjects from "@/lib/ourjourneyproject";
gsap.registerPlugin(ScrollTrigger);

export default function Wheel() {
  const wheelRef = useRef(null);
  const pinRef = useRef(null);
  const yearWheelRef = useRef(null);
  const squareWheelRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  function filterProjectsByYearRange(startYear, endYear) {
    return ourJourneyProjects
      .filter((project) => {
        if (endYear === 9999) {
          // For the last range, include all projects from startYear onwards
          return project.year >= startYear;
        }
        // For other ranges, include projects >= startYear and < endYear
        return project.year >= startYear && project.year < endYear;
      })
      .map((project) => ({
        title: project.title,
        projectType: project.projectType,
        area: project.area,
        year: project.year,
      }));
  }

  useEffect(() => {
    const wheel = wheelRef.current;
    const pin = pinRef.current;
    const yearWheel = yearWheelRef.current;
    const squareWheel = squareWheelRef.current;

    if (!wheel || !pin || !yearWheel || !squareWheel) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: wheel,
      start: "top top",
      end: "+=500%",
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalSteps = 4;
        const newIndex = Math.round(progress * totalSteps);
        setActiveStep(newIndex);

        const angleStep = 225 / 4;
        const discreteRotation = newIndex * angleStep;

        gsap.to(yearWheel, {
          rotation: -discreteRotation,
          duration: 1.5,
          ease: "power2.out",
          transformOrigin: "50% 50%",
        });
      },
    });

    return () => scrollTrigger.kill();
  }, []);

  return (
    <div className="relative w-full ">
      <div
        ref={wheelRef}
        className="h-screen bg-white relative w-full flex items-center justify-center overflow-hidden"
      >
        <div ref={pinRef} className="absolute -left-1/2 ">
          {/* Wheel Container */}
          <div className="relative w-[1632px] h-[1632px] flex items-center justify-center">
            {/* Outer Circle */}
            <div className="absolute w-[1224px] h-[1224px] rounded-full">
              <svg className="absolute w-full h-full" style={{ zIndex: 1 }}>
                <defs>
                  <linearGradient
                    id="orangeGradient"
                    x1="100%"
                    y1="0%"
                    x2="85%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ef9566" />
                    <stop offset="30%" stopColor="#fdcfb6aa" />
                    <stop offset="60%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>
                <circle
                  cx="612"
                  cy="612"
                  r="571.2"
                  fill="none"
                  stroke="url(#orangeGradient)"
                  strokeWidth="1.8"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 10%, 100% 45%, 50% 50%)",
                  }}
                />
              </svg>

              {/* Square Wheel */}
              <div ref={squareWheelRef} className="relative w-full h-full">
                {Array.from({ length: 9 }, (_, index) => {
                  const angle = (index * 180) / 8;
                  const radius = 571.2;

                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  const isFirstSquare = index === 0;
                  let finalX = x;
                  let finalY = y;

                  if (!isFirstSquare && activeStep > 0) {
                    const rotationAngle = activeStep * 22.5;
                    const rotatedAngle = angle - rotationAngle;
                    const hasReachedFirstSquare = rotatedAngle <= 0;

                    if (hasReachedFirstSquare) {
                      finalX = Math.cos(0) * radius;
                      finalY = Math.sin(0) * radius;
                    } else {
                      finalX =
                        Math.cos((rotatedAngle * Math.PI) / 180) * radius;
                      finalY =
                        Math.sin((rotatedAngle * Math.PI) / 180) * radius;
                    }
                  }

                  let size = 9.6;
                  if (isFirstSquare) {
                    size = 16.32;
                  } else if (activeStep > 0) {
                    const rotationAngle = activeStep * 22.5;
                    const rotatedAngle = angle - rotationAngle;
                    const hasReachedFirstSquare = rotatedAngle <= 0;
                    if (hasReachedFirstSquare) {
                      size = 16.32;
                    }
                  }

                  const offset = size / 2;

                  return (
                    <div
                      key={index}
                      className={`absolute transition-all duration-700 ease-out ${(() => {
                        if (isFirstSquare) return "bg-orange-600";
                        let hasEverReachedFirstSquare = false;
                        for (let step = 1; step <= activeStep; step++) {
                          const rotationAngle = step * 22.5;
                          const rotatedAngle = angle - rotationAngle;
                          if (rotatedAngle <= 0) {
                            hasEverReachedFirstSquare = true;
                            break;
                          }
                        }
                        if (hasEverReachedFirstSquare) return "bg-orange-600";
                        const rotationAngle = activeStep * 22.5;
                        const rotatedAngle = angle - rotationAngle;
                        if (Math.abs(rotatedAngle) < 11.25)
                          return "bg-orange-600";
                        return "bg-gray-800";
                      })()}`}
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `calc(50% + ${finalX}px - ${offset}px)`,
                        top: `calc(50% + ${finalY}px - ${offset}px)`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Middle Circle */}
            <div className="absolute w-[1060px] h-[1060px] rounded-full border-[104px] border-[#d9d9d9]/20 flex items-center justify-center">
              <div className="w-[104px] h-[1px] bg-orange-600 absolute -right-[104px]"></div>
            </div>

            {/* Inner Circle */}
            <div className="absolute w-[780px] h-[780px]  rounded-full">
              <div ref={yearWheelRef} className="relative w-full h-full">
                {["1997", "2008", "2013", "2016", "2021"].map((year, index) => {
                  const angle = (index * 225) / 4;
                  const radius = 360;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  const isAtCenter = activeStep === index;

                  return (
                    <div
                      key={year}
                      className={`absolute text-[1.2rem] font-semibold ${
                        isAtCenter
                          ? "text-orange-600 opacity-100"
                          : "text-gray-800 opacity-60"
                      }`}
                      style={{
                        left: `calc(50% + ${x}px - 24px)`,
                        top: `calc(50% + ${y}px - 18px)`,
                        transform: `rotate(${angle}deg)`,
                      }}
                    >
                      {year}
                    </div>
                  );
                })}
              </div>
              <div className="w-full absolute h-full flex-center top-0 left-0 ">
                <div className="flex-center flex-col relative text-[64px] leading-[120%] tracking-[-1.1px] left-1/8 text-gray-600">
                  <h1 className="font-medium">Our </h1>
                  <h1 className="font-light">Journey</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Section */}
        {/* Right Section */}
        <div className="w-1/2 h-full relative overflow-hidden ml-auto flex items-center justify-center">
          <div
            className="absolute top-0 left-0 w-full transition-transform duration-[0.7s] ease-out"
            style={{
              transform: `translateY(-${activeStep * 100}vh)`,
            }}
          >
            {["1997", "2008", "2013", "2016", "2021"].map(
              (year, index, years) => {
                const startYear = parseInt(year);
                const endYear =
                  index < years.length - 1 ? parseInt(years[index + 1]) : 9999;

                // Filter projects for this year range
                const filteredProjects = filterProjectsByYearRange(
                  startYear,
                  endYear
                );

                // Calculate opacity based on distance from activeStep
                const opacity = Math.max(
                  0,
                  1 - Math.abs(activeStep - index) * 0.3
                );

                return (
                  <div
                    key={year}
                    className="h-screen w-full flex items-center justify-center text-[3rem] font-bold text-gray-800 transition-all duration-[1.5s] ease-out"
                    style={{ opacity }}
                  >
                    <div className="text-center">
                      {filteredProjects.length > 0 ? (
                        <div className="flex flex-col justify-center items-center max-w-[600px] mx-auto">
                          {filteredProjects.map((project, idx) => (
                            <div key={idx} className="relative w-full">
                              <h3 className="text-xl text-gray-800 font-semibold my-4">
                                {project.title}
                              </h3>
                              <div className="w-3/12 h-[1px] bg-orange-600/40 mx-auto"></div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-lg text-gray-500">
                          No projects available.
                        </p>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
