"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ourJourneyProjects from "@/lib/ourjourneyproject";

gsap.registerPlugin(ScrollTrigger);

// Fixed years to display on the wheel
const FIXED_YEARS = [1997, 2007, 2010, 2013, 2015, 2020, 2023, 2025];

// Helper function to filter projects by year range
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

export default function OurJourney({ journeyData }) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMediumScreen, setMediumScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(true);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [yearsData, setYearsData] = useState([]);

  // Enhanced size calculation based on screen size for better responsiveness
  const size = isLargeScreen ? 800 : isMediumScreen ? 580 : isSmallScreen ? 450 : 350;

  const center = size / 2;
  const radius = isLargeScreen ? size / 3.5 : isMediumScreen ? size / 3 : isSmallScreen ? size / 2.8 : size / 2.2;
  const angleStep = isLargeScreen
    ? 270 / Math.max(FIXED_YEARS.length - 1, 1)
    : -270 / Math.max(FIXED_YEARS.length - 1, 1);

  const yearRef = useRef(null);
  const journeyRef = useRef(null);
  const squareRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Process Journey projects data with fixed years
  useEffect(() => {
    // Create year ranges with the fixed years
    const yearRangesData = FIXED_YEARS.map((year, index) => {
      const startYear = year;
      const isLastYear = index === FIXED_YEARS.length - 1;
      const endYear = isLastYear ? 9999 : FIXED_YEARS[index + 1]; // Use 9999 for last year to include all future projects

      // Get all projects between this year and the next year
      const projectsInRange = filterProjectsByYearRange(startYear, endYear);

      console.log(
        `Year Range ${startYear}-${isLastYear ? "Present" : endYear}:`,
        projectsInRange.length,
        "projects"
      );

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
      setIsLargeScreen(width >= 1024); // lg breakpoint is 1024px
      setMediumScreen(width >= 768 && width < 1024); // md breakpoint is 768px
      setIsSmallScreen(width >= 640 && width < 768); // sm breakpoint is 640px
      setIsSmallMobile(width < 480); // Very small mobile screens
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Scroll-driven setup (pin + progress controls animation)
  useEffect(() => {
    if (!journeyRef.current || yearsData.length === 0) return;

    const totalSteps = FIXED_YEARS.length - 1;
    
    // For very small screens, use pinning to keep section at top until animation completes
    if (isSmallMobile) {
      const st = ScrollTrigger.create({
        trigger: journeyRef.current,
        start: "top 0",
        end: "+=" + FIXED_YEARS.length * 250, // Shorter scroll distance for small mobile
        pin: true,
        scrub: 0.3,
        markers: false,
        anticipatePin: 1,
        snap: {
          snapTo: (value) => {
            const step = Math.round(value * totalSteps);
            return step / totalSteps;
          },
          duration: { min: 0.1, max: 0.2 },
          delay: 0.05,
          directional: false,
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.round(progress * totalSteps);
          setActiveIndex(newIndex);
          
          // Track animation completion
          if (progress >= 0.99) {
            setAnimationCompleted(true);
          }
          
          // Simple animation with pinning
          if (yearRef.current) {
            gsap.to(yearRef.current, {
              rotation: -newIndex * angleStep,
              duration: 0.3,
              ease: "power1.out",
              force3D: true,
            });
          }
          
          // Update square markers
          squareRefs.current.forEach((el, i) => {
            if (el) {
              if (i === newIndex) {
                gsap.to(el, { 
                  scale: 2.5, 
                  backgroundColor: "#E84600",
                  duration: 0.2,
                  force3D: true 
                });
              } else {
                gsap.to(el, { 
                  scale: 1, 
                  backgroundColor: "#374151",
                  duration: 0.2,
                  force3D: true 
                });
              }
            }
          });
        },
      });
      return () => st.kill();
    }
    
    const st = ScrollTrigger.create({
      trigger: journeyRef.current,
      start: "top 0",
      end: "+=" + ((!isLargeScreen && !isMediumScreen) ? FIXED_YEARS.length * 400 : FIXED_YEARS.length * 1000), // Adjusted scroll distance for mobile
      pin: true, // Always enable pinning for all screen sizes
      scrub: (!isLargeScreen && !isMediumScreen) ? 0.3 : true, // Even less aggressive scrubbing on mobile
      markers: false,
      anticipatePin: 1, // Better mobile performance
      snap: {
        snapTo: (value) => {
          const step = Math.round(value * totalSteps);
          return step / totalSteps;
        },
        duration: { min: 0.1, max: (!isLargeScreen && !isMediumScreen) ? 0.3 : 0.5 }, // Faster snap on mobile
        delay: (!isLargeScreen && !isMediumScreen) ? 0.05 : 0,
        directional: false, // Don't snap based on scroll direction on mobile
      },
      onUpdate: (self) => {
        const progress = self.progress;
        const newIndex = Math.round(progress * totalSteps);

        // Track animation completion
        if (progress >= 0.99) {
          setAnimationCompleted(true);
        }

        setActiveIndex((prevIndex) => {
          if (newIndex === prevIndex) return prevIndex;

          const tl = gsap.timeline();

          // Rotate years wheel with mobile optimization
          tl.to(
            yearRef.current,
            {
              rotation: -newIndex * angleStep,
              transformOrigin: "50% 50%",
              ease: (!isLargeScreen && !isMediumScreen) ? "power1.out" : "power2.out",
              duration: (!isLargeScreen && !isMediumScreen) ? 0.4 : 0.8,
              force3D: true, // Hardware acceleration
            },
            0
          );

          const prevEl = squareRefs.current[prevIndex];
          const currentEl = squareRefs.current[newIndex];

          if (prevEl) {
            tl.to(prevEl, { 
              scale: 1, 
              duration: (!isLargeScreen && !isMediumScreen) ? 0.2 : 0.3, 
              ease: "power2.out",
              force3D: true 
            }, 0);
            tl.to(prevEl, { 
              backgroundColor: "#374151", 
              duration: 0.2 
            }, 0);
          }

          if (currentEl) {
            tl.to(
              currentEl,
              { 
                scale: 1, 
                duration: 0.1, 
                ease: "power1.out",
                force3D: true 
              },
              0
            );
            tl.to(
              currentEl,
              { 
                scale: (!isLargeScreen && !isMediumScreen) ? 2.5 : 2, 
                duration: (!isLargeScreen && !isMediumScreen) ? 0.2 : 0.25, 
                ease: "power1.out",
                force3D: true 
              },
              ">"
            );
            tl.to(
              currentEl,
              { 
                scale: (!isLargeScreen && !isMediumScreen) ? 3.5 : 3, 
                duration: (!isLargeScreen && !isMediumScreen) ? 0.3 : 0.6, 
                ease: "power2.out",
                force3D: true 
              },
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
        force3D: true, // Hardware acceleration
      });
    }

    squareRefs.current.forEach((el) => {
      if (el) gsap.set(el, { 
        scale: 1, 
        transformOrigin: "50% 50%",
        force3D: true 
      });
    });

    const activeEl = squareRefs.current[activeIndex];
    if (activeEl) {
      gsap.set(activeEl, { 
        scale: 1.8, 
        backgroundColor: "#ee6400",
        force3D: true 
      });
    }
  }, []);

  // Add touch event handling for better mobile interaction
  useEffect(() => {
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      const deltaY = touchStartY - touchEndY;
      const deltaTime = touchEndTime - touchStartTime;
      
      // Only handle quick swipes, not scrolls
      if (deltaTime < 300 && Math.abs(deltaY) > 50) {
        e.preventDefault();
        
        if (deltaY > 0 && activeIndex < FIXED_YEARS.length - 1) {
          // Swipe up - next item
          setActiveIndex(prev => prev + 1);
        } else if (deltaY < 0 && activeIndex > 0) {
          // Swipe down - previous item
          setActiveIndex(prev => prev - 1);
        }
      }
    };

    if (journeyRef.current && (!isLargeScreen && !isMediumScreen)) {
      journeyRef.current.addEventListener('touchstart', handleTouchStart, { passive: true });
      journeyRef.current.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    return () => {
      if (journeyRef.current) {
        journeyRef.current.removeEventListener('touchstart', handleTouchStart);
        journeyRef.current.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [activeIndex, isLargeScreen, isMediumScreen]);

  // Handle manual index changes for mobile swipe navigation
  useEffect(() => {
    if (yearRef.current) {
      gsap.to(yearRef.current, {
        rotation: -activeIndex * angleStep,
        duration: 0.5,
        ease: "power2.out",
        force3D: true,
      });
    }

    // Update square markers
    squareRefs.current.forEach((el, i) => {
      if (el) {
        if (i === activeIndex) {
          gsap.to(el, { 
            scale: 2.5, 
            backgroundColor: "#E84600",
            duration: 0.3,
            force3D: true 
          });
        } else {
          gsap.to(el, { 
            scale: 1, 
            backgroundColor: "#374151",
            duration: 0.3,
            force3D: true 
          });
        }
      }
    });
  }, [activeIndex, angleStep]);

  // Hide swipe indicator after a few seconds on mobile
  useEffect(() => {
    if ((!isLargeScreen && !isMediumScreen) && showSwipeIndicator) {
      const timer = setTimeout(() => {
        setShowSwipeIndicator(false);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isLargeScreen, isMediumScreen, showSwipeIndicator]);

  // Refresh ScrollTrigger on mount and resize for mobile compatibility
  useEffect(() => {
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    // Initial refresh
    setTimeout(refreshScrollTrigger, 100);

    // Refresh on resize
    window.addEventListener('resize', refreshScrollTrigger);
    window.addEventListener('orientationchange', refreshScrollTrigger);

    return () => {
      window.removeEventListener('resize', refreshScrollTrigger);
      window.removeEventListener('orientationchange', refreshScrollTrigger);
    };
  }, []);

  // Use yearsData if available, otherwise show years with empty projects
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
      className="our-journey-container relative w-full h-screen text-center py-6 overflow-hidden flex flex-col items-center lg:flex-row lg:justify-start"
      style={{ 
        minHeight: '100vh',
        minHeight: '100dvh' // Use dynamic viewport height for better mobile support
      }}
    >
      {/* Section Heading */}
      <div className="flex lg:flex-col lg:pl-10 xl:pl-16">
        <h2 className="font-playfair font-semibold whitespace-nowrap text-gray-600 capitalize text-[6vw] sm:text-[5vw] md:text-[4.5vw] lg:text-[3.5vw] xl:text-[3vw] leading-[8vw] lg:leading-[5vw]">
          Our
        </h2>
        <h2 className="whitespace-nowrap tracking-tighter text-gray-600 capitalize text-[6vw] sm:text-[5vw] md:text-[4.5vw] lg:text-[3.5vw] xl:text-[3vw] leading-[8vw] lg:leading-[5vw]">
          Journey
        </h2>
      </div>
      
       {/* Mobile swipe indicator */}
       {(!isLargeScreen && !isMediumScreen) && showSwipeIndicator && (
         <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50 text-xs text-gray-500 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm animate-pulse">
           Swipe up/down to navigate
         </div>
       )}
       
       {/* Animation completion indicator */}
       {(!isLargeScreen && !isMediumScreen) && animationCompleted && (
         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-xs text-gray-500 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
           Continue scrolling to see more
         </div>
       )}

      {/* Outer Circle */}
      <div className="circle absolute -top-4 -left-3/5 -translate-y-1/2 translate-x-3/5 w-[99vw] h-[99vw] scale-[1.2] rounded-full border-[25px] mx-auto border-[#d9d9d9]/20 sm:scale-[1.15] sm:w-[90vw] sm:h-[90vw] sm:border-[30px] md:scale-[1.1] md:w-[75vw] md:h-[75vw] md:border-[40px] lg:scale-[1.05] lg:top-1/2 lg:w-[55vw] lg:h-[55vw] lg:border-[50px] xl:scale-100 xl:w-[900px] xl:h-[900px] xl:border-[60px]">
        <div className="absolute top-1/2 -translate-y-1/2 h-[25px] sm:h-[30px] md:h-[40px] lg:h-[50px] xl:h-[60px] rotate-90 w-[0.5px] -right-[4%] bg-orange-600"></div>
      </div>

      {/* Rotating Wheel */}
      <div className="absolute grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 w-full h-full px-4 md:px-6 lg:px-10 xl:px-20 py-10 lg:py-0">
        <div className="z-50 flex items-center justify-center absolute 
          -top-6 -left-1/2 translate-x-1/2
          sm:-top-4 sm:-left-1/2 sm:translate-x-1/2
          md:-top-3 md:-left-2/5 md:translate-x-2/5
          lg:top-1/2 lg:-left-3/7 lg:-translate-y-1/2 lg:translate-x-3/7
          xl:top-1/2 xl:-left-1/3 xl:-translate-y-1/2 xl:translate-x-1/3">
          <div className="relative flex items-center justify-center rounded-full lg:-rotate-90">
            <div
              ref={yearRef}
              className="our-journey-wheel relative rounded-full"
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

                // Enhanced scaling for square radius based on screen size
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
        <div className="our-journey-touch-area px-4 sm:px-6 md:px-8 text-center mt-[6rem] sm:mt-[7rem] md:mt-[6rem] lg:mt-0 flex flex-col h-full items-center justify-center gap-3 w-full">
          {/* Mobile progress indicator */}
          {(!isLargeScreen && !isMediumScreen) && (
            <div className="mb-4 flex gap-2 justify-center">
              {FIXED_YEARS.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === activeIndex ? 'bg-orange-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
          
          <div className="flex flex-col text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl overflow-y-auto px-4 md:px-6 lg:pl-16 xl:pl-20 w-full max-h-[45vh] lg:max-h-[90vh] no-scrollbar">
            {currentYearData.projects && currentYearData.projects.length > 0 ? (
              currentYearData.projects.map((project, idx) => (
                <div
                  key={idx}
                  className="w-full flex flex-col items-center py-2 md:py-3"
                >
                  <h3 className="text-gray-800 font-semibold leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl mb-1">
                    {project.title}
                  </h3>
                  <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm lg:text-base text-gray-800">
                    <span>Project Type - {project.projectType}</span>
                    <span>Area - {project.area} Acre</span>
                  </div>
                  {idx < currentYearData.projects.length - 1 && (
                    <div className="w-3/12 sm:w-2/12 h-[1px] bg-orange-600/60 mt-4 md:mt-6"></div>
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