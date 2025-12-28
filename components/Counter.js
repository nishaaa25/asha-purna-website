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
      if (countRefs.current.length === 0) return;

      const duration = 1500; // total animation time (ms)
      const intervalSpeed = 30; // ~60fps
      const totalFrames = duration / intervalSpeed;
      let frame = 0;

      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;

        countRefs.current.forEach((counter) => {
          if (!counter) return;

          const target = Number(counter.getAttribute("data-target"));
          // Ease out animation: starts fast, ends slow
          const easeOutProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(easeOutProgress * target);
          counter.innerText = currentValue.toLocaleString();
        });

        if (frame >= totalFrames) {
          clearInterval(interval);
          // finally set the exact target value
          countRefs.current.forEach((counter) => {
            if (!counter) return;
            const target = Number(counter.getAttribute("data-target"));
            counter.innerText = target.toLocaleString();
          });
        }
      }, intervalSpeed);
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
      className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-3 pt-10 w-[90%] lg:w-10/12 mx-auto relative px-3"
      ref={containerRef}
    >
      {data.map((counter, index) => (
        <div
          key={index}
          className="text-gray-900 w-full relative counter flex justify-center items-center lg:justify-start flex-col"
        >
          <div className="flex items-center font-medium">
            <span
              ref={(el) => (countRefs.current[index] = el)}
              className="text-[45px] md:text-[60px] lg:text-[56px] leading-[100%] counter-title tracking-[-3%]"
              data-target={counter.value}
            >
              0
            </span>
            {counter.sign && (
              <span className="text-[45px] md:text-[44px] lg:text-[50px] ml-1 leading-[100%]">
                {counter.sign}
              </span>
            )}
            <span className="text-[43px] md:text-[60px] lg:text-[56px] leading-[100%] text-orange-600 font-[300] tracking-[-3.6px]">
              +
            </span>
          </div>
          <h4 className="text-base md:text-lg lg:text-xl leading-8 tracking-[-0.5px] font-normal mt-1 text-gray-900 lg:w-10/12 text-center">
            {counter.title}
          </h4>

          {index !== data.length - 1 && (
            <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-32 bg-orange-600/70"></span>
          )}
        </div>
      ))}
    </div>
  );
}
