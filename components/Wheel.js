"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Wheel() {
  const wheelRef = useRef(null);
  const pinRef = useRef(null);
  const yearWheelRef = useRef(null);
  const squareWheelRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const wheel = wheelRef.current;
    const pin = pinRef.current;
    const yearWheel = yearWheelRef.current;
    const squareWheel = squareWheelRef.current;

    if (!wheel || !pin || !yearWheel || !squareWheel) return;

    // Create scroll trigger for pinning and rotation
    const scrollTrigger = ScrollTrigger.create({
      trigger: wheel,
      start: "top top",
      end: "+=500%", // Pin for 500% of viewport height to allow for rotation steps
      pin: true,
      pinSpacing: true,
      scrub: 1, // Smooth scrubbing tied to scroll position
      onUpdate: (self) => {
        // Calculate rotation based on scroll progress
        const progress = self.progress;
        const totalSteps = 4; // 5 years = 4 steps
        const newIndex = Math.round(progress * totalSteps);
        
        // Update active step for square animations
        setActiveStep(newIndex);
        
        // Calculate the angle step for 5 years spread across 2.5/4 of the circle (225 degrees)
        const angleStep = 225 / 4; // 56.25 degrees between each year
        
        // Discrete steps with smooth transitions
        const discreteRotation = newIndex * angleStep;
        
        // Use GSAP animation for smooth transitions between discrete steps
        gsap.to(yearWheel, { 
          rotation: -discreteRotation,
          duration: 1.5,
          ease: "power2.out",
          transformOrigin: "50% 50%"
        });

        // No rotation for square wheel - only individual squares move
      },
      onEnter: () => {
        console.log("Wheel pinned to top");
      },
      onLeave: () => {
        console.log("Wheel unpinned");
      },
    });

    // Cleanup function
    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div className="relative">
      {/* Content that will be pinned */}
      <div ref={wheelRef} className="h-screen bg-white flex items-center justify-center">
        <div ref={pinRef} className="relative">
              {/* Wheel Container */}
              <div className="relative w-[800px] h-[800px] flex items-center justify-center">
            
            {/* Outer Circle - 9 squares in 1/2 part */}
            <div className="absolute w-[600px] h-[600px] border-2 border-gray-300 rounded-full">
              {/* Circular line following the squares' path */}
              <svg className="absolute w-full h-full" style={{ zIndex: 1 }}>
                <defs>
                  <linearGradient id="orangeGradient" x1="100%" y1="0%" x2="85%" y2="0%">
                    <stop offset="0%" stopColor="#ef9566" />
                    <stop offset="50%" stopColor="#fdcfb6" />
                    <stop offset="100%" stopColor="#fff7ed" />
                  </linearGradient>
                </defs>
                <circle
                  cx="298"
                  cy="298"
                  r="280"
                  fill="none"
                  stroke="url(#orangeGradient)"
                  strokeWidth="1"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 10%, 100% 45%, 50% 50%)'
                  }}
                />
              </svg>
              <div ref={squareWheelRef} className="relative w-full h-full">
                {Array.from({ length: 9 }, (_, index) => {
                  const angle = (index * 180) / 8; // 180 degrees spread for half circle with 9 squares
                  const radius = 280; // Distance from center
                  
                  // Calculate original square position
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  // Determine square behavior based on active step
                  const isFirstSquare = index === 0;
                  const isSecondSquare = index === 1;
                  
                  // Calculate final position
                  let finalX = x;
                  let finalY = y;
                  
                  // First square never moves - always stays at its original position
                  if (!isFirstSquare && activeStep > 0) {
                    // Calculate how far this square should move along the circular path
                    const rotationAngle = (activeStep * 22.5); // 22.5 degrees per step
                    const rotatedAngle = angle - rotationAngle;
                    
                    // Check if this square has reached or passed the first square's position
                    const firstSquareAngle = 0; // First square is at 0 degrees
                    const hasReachedFirstSquare = rotatedAngle <= firstSquareAngle;
                    
                    if (hasReachedFirstSquare) {
                      // Stick to the first square's position
                      finalX = Math.cos((firstSquareAngle * Math.PI) / 180) * radius;
                      finalY = Math.sin((firstSquareAngle * Math.PI) / 180) * radius;
                    } else {
                      // Continue moving along the circular path
                      finalX = Math.cos((rotatedAngle * Math.PI) / 180) * radius;
                      finalY = Math.sin((rotatedAngle * Math.PI) / 180) * radius;
                    }
                  }
                  
                  // Size calculation - first square is always large, squares grow when they stick
                  let size = 8; // Default size for all squares except first
                  if (isFirstSquare) {
                    size = 16; // First square is always large
                  } else if (activeStep > 0) {
                    // Check if this square has reached the first square's position
                    const rotationAngle = (activeStep * 22.5);
                    const rotatedAngle = angle - rotationAngle;
                    const hasReachedFirstSquare = rotatedAngle <= 0;
                    
                    if (hasReachedFirstSquare) {
                      size = 16; // Square grows when it sticks to the first square
                    }
                  }
                  
                  const offset = size / 2;
                  
                  return (
                    <div
                      key={index}
                      className={`absolute transition-all duration-700 ease-out ${
                        (() => {
                          if (isFirstSquare) return 'bg-orange-600'; // First square is always orange
                          
                          // Check if this square has ever reached the first square position
                          let hasEverReachedFirstSquare = false;
                          for (let step = 1; step <= activeStep; step++) {
                            const rotationAngle = (step * 22.5);
                            const rotatedAngle = angle - rotationAngle;
                            if (rotatedAngle <= 0) {
                              hasEverReachedFirstSquare = true;
                              break;
                            }
                          }
                          
                          if (hasEverReachedFirstSquare) {
                            return 'bg-orange-600'; // Stay orange once it reaches the first square
                          }
                          
                          // Check if this square is currently at the center position (0 degrees)
                          if (activeStep > 0) {
                            const rotationAngle = (activeStep * 22.5);
                            const rotatedAngle = angle - rotationAngle;
                            if (Math.abs(rotatedAngle) < 11.25) { // Within half the step angle
                              return 'bg-orange-600'; // Orange when at center
                            }
                          }
                          
                          return 'bg-gray-800'; // Gray otherwise
                        })()
                      }`}
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

            {/* Middle Circle - Static center circle */}
            <div className="absolute w-[420px] h-[420px] rounded-full border-70 border-[#d9d9d9] flex items-center justify-center">
            </div>

            {/* Inner Circle - 5 years in 2.5/4 part */}
            <div className="absolute w-[240px] h-[240px] border-2 border-gray-300 rounded-full">
              {/* Years positioned in 2.5/4 of the circle */}
              <div ref={yearWheelRef} className="relative w-full h-full">
                {['2019', '2020', '2021', '2022', '2023'].map((year, index) => {
                  // Start from 0 degrees (3 o'clock position) to align with first square
                  const angle = (index * 225) / 4; // 225 degrees spread (2.5/4), starting from 0 degrees
                  const radius = 100; // Distance from center
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                // Check if this year is currently at the center position (3 o'clock)
                const isAtCenter = activeStep === index;
                
                return (
                  <div
                    key={year}
                    className={`absolute text-sm font-semibold ${
                      isAtCenter ? 'text-orange-600' : 'text-gray-800'
                    }`}
                    style={{
                      left: `calc(50% + ${x}px - 15px)`,
                      top: `calc(50% + ${y}px - 10px)`,
                      transform: `rotate(${angle}deg)`, // Counter-rotate to keep text upright
                    }}
                  >
                    {year}
                  </div>
                );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
