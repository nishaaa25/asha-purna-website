"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CounterTwo({ data }) {
  const countRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const animateCounters = () => {
      if (countRefs.current.length > 0) {
        countRefs.current.forEach((counter, i) => {
          if (!counter) return;

          const target = counter.getAttribute("data-target");

          // Skip non-numeric targets like 24×7 or ₹28L
          if (isNaN(Number(target))) return;

          let count = 0;
          const increment = Number(target) / 160;

          const updateCount = () => {
            if (count < target) {
              count += increment;
              if (count > target) count = target;
              counter.innerText = Math.floor(count);
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target;
            }
          };

          updateCount();
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
      className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-3 pt-10  w-[90%] lg:w-9/12 mx-auto relative"
      ref={containerRef}
    >
      {data.map((counter, index) => {
        const isStatic = isNaN(Number(counter.value));

        return (
          <div
            key={index}
            className="text-gray-900 w-full relative counter flex-center flex-col lg:gap-2"
          >
            <div className="flex items-center font-medium">
              {/* Animated numeric counters */}
              {!isStatic ? (
                <>
                  <span
                    ref={(el) => {
                      if (el) countRefs.current[index] = el;
                    }}
                    className="text-[50px] md:text-[60px] lg:text-[56px] leading-[100%] counter-title tracking-[-3%]"
                    data-target={counter.value}
                  >
                    0
                  </span>
                  <span className="text-[43px] md:text-[60px] lg:text-[56px] leading-[100%] text-orange-600 font-[300] tracking-[-3.6px]">
                    +
                  </span>
                </>
              ) : (
                // Static styled text (like 24×7 or ₹28L)
                <span className="text-[50px] md:text-[60px] lg:text-[56px] leading-[100%] tracking-[-3%]">
                  {counter.value.split("").map((char, i) =>
                    char === "×" || char.toLowerCase() === "l" ? (
                      <span
                        key={i}
                        className="text-orange-600 font-[300] tracking-[-3.6px]"
                      >
                        {char}
                      </span>
                    ) : (
                      <span key={i}>{char}</span>
                    )
                  )}
                </span>
              )}
            </div>

            <h4 className="text-sm md:text-lg lg:text-xl leading-8 tracking-[-0.5px] font-normal mt-1 text-gray-900 lg:w-1/2 lg:text-center">
              {counter.title}
            </h4>
            {index !== data.length - 1 && (
              <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-32 bg-orange-600/70"></span>
            )}
          </div>
        );
      })}
    </div>
  );
}
