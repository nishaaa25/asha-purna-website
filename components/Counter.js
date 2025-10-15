"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CountersSection({ data }) {
  const countRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const animateCounters = () => {
      if (countRefs.current.length > 0) {
        countRefs.current.forEach((counter) => {
          if (!counter) return;

          const target = Number(counter.getAttribute("data-target"));
          const hasSign = counter.getAttribute("data-sign");
          const duration = 1800; // Animation duration in milliseconds (1.8 seconds)
          const startTime = performance.now();

          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation (easeOutQuart)
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            // For small numbers with "k" sign (like 1k), animate in hundreds
            if (target < 10 && hasSign === 'k' && progress < 1) {
              const scaledValue = Math.floor(easeProgress * target * 100);
              counter.innerText = scaledValue;
            } else {
              const currentValue = Math.floor(easeProgress * target);
              counter.innerText = currentValue;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target;
            }
          };

          requestAnimationFrame(updateCount);
        });
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      once: true,
      onEnter: animateCounters,
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-3 pt-10 w-[90%] lg:w-9/12 mx-auto relative"
      ref={containerRef}
    >
      {data.map((counter, index) => (
        <div
          key={index}
          className="text-gray-900 w-full relative counter flex justify-center items-center lg:justify-start flex-col"
        >
          <div className="flex items-center font-medium">
            <span
              ref={(el) => {
                if (el) countRefs.current[index] = el;
              }}
              className="text-[50px] md:text-[60px] lg:text-[56px] leading-[100%] counter-title tracking-[-3%]"
              data-target={counter.value}
              data-sign={counter.sign || ''}
            >
              0
            </span>
            {counter.sign && (
              <span className="text-[50px] md:text-[60px] lg:text-[56px] leading-[100%]">{counter.sign}</span>
            )}
            <span className="text-[43px] md:text-[60px] lg:text-[56px] leading-[100%] text-orange-600 font-[300] tracking-[-3.6px]">
              +
            </span>
          </div>
          <h4 className="text-sm md:text-lg lg:text-xl leading-8 tracking-[-0.5px] font-normal mt-1 text-gray-900 lg:w-8/12 text-center">
            {counter.title}
          </h4>

          {/* vertical divider line */}
          {index !== data.length - 1 && (
            <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-32 bg-orange-600/70"></span>
          )}
        </div>
      ))}
    </div>
  );
}
