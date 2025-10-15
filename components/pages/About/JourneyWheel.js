"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

export default function JourneyWheel() {
  const [activeImageIndex, setActiveImageIndex] = useState(2);
  const [circleRotation, setCircleRotation] = useState(0);
  const radius = 200;
  const targetAngle = 180;
  const hasInitializedRotation = useRef(false);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);
  const designVariants = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  
  // Handle wheel click
  const handleDesignClick = useCallback((clickedIndex) => {
    const anglePerPosition = 360 / designVariants.length;
    const angleForIndex = anglePerPosition * clickedIndex;
    const desiredRotation = targetAngle - angleForIndex;

    setCircleRotation((prev) => {
      let delta = desiredRotation - prev;
      // normalize to [-180, 180]
      delta = ((((delta + 180) % 360) + 360) % 360) - 180;
      return prev + delta;
    });

    setActiveImageIndex(clickedIndex);
  }, [designVariants.length, targetAngle]);

  // Initialize rotation on mount
  useEffect(() => {
    if (hasInitializedRotation.current) return;
    const anglePerPosition = 360 / designVariants.length;
    const angleForIndex = anglePerPosition * activeImageIndex;
    const desiredRotation = targetAngle - angleForIndex;
    setCircleRotation(desiredRotation);
    hasInitializedRotation.current = true;
  }, [activeImageIndex]);

  // Handle scroll events
  useEffect(() => {
    const handleWheel = (e) => {
      // Prevent default scroll behavior
      e.preventDefault();

      // If already scrolling, ignore the event
      if (isScrolling.current) return;

      // Lock scrolling
      isScrolling.current = true;

      // Determine scroll direction and calculate next index
      const delta = e.deltaY;
      let targetIndex;
      
      if (delta > 0) {
        // Scrolling down - move to next section
        targetIndex = (activeImageIndex + 1) % designVariants.length;
      } else {
        // Scrolling up - move to previous section
        targetIndex = (activeImageIndex - 1 + designVariants.length) % designVariants.length;
      }

      // Update the wheel position
      handleDesignClick(targetIndex);

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Unlock scrolling after animation completes (1200ms + buffer)
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 1400);
    };

    const wheelElement = document.querySelector('.journey-wheel-container');
    if (wheelElement) {
      wheelElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (wheelElement) {
        wheelElement.removeEventListener('wheel', handleWheel);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [activeImageIndex, designVariants.length, handleDesignClick]);

  return (
    <div className="journey-wheel-container flex flex-col gap-4 w-[24%] h-[60vh] relative">
      <div className="-translate-y-1/2 -top-2/5 -translate-x-1/3 left-5/4 relative w-100 h-100 rounded-full bg-[#200124] flex-center">
        <div className="relative w-[65%] h-[65%] border-l-2 border-white/50  rounded-full flex items-center ">
          <div className="w-4 h-4 rounded-full bg-dark-pink-500 right-2 custom-shadow-2 relative"></div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 flex-center">
          <ul
            className="relative grid place-items-center transition-transform duration-[1200ms] ease-in-out"
            style={{ transform: `rotate(${circleRotation}deg)` }}
          >
            {designVariants.map((design, i) => {
              const angle = (360 / designVariants.length) * i;
              const liTransform = `rotate(${angle}deg) translate(${radius}px) rotate(${
                -angle - circleRotation
              }deg)`;
              const isActive = i === activeImageIndex;

              return (
                <li
                  key={i}
                  onClick={() => handleDesignClick(i)}
                  className={`${
                    isActive
                      ? "w-3 h-3 border-dark-pink-500"
                      : "w-2 h-2 border-white/5"
                  } absolute bg-[#3c3841] flex justify-center items-end rounded-full overflow-hidden border-3 transition-all duration-300 hover:scale-110 `  }
                  style={{ transform: liTransform }}
                >
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}