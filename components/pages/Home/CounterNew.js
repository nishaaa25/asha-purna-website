"use client";
import { counters } from "@/lib/mockData";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
export default function CountersSection() {
  const countRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const animateCounters = () => {
      if (countRefs.current.length > 0) {
        countRefs.current.forEach((counter) => {
          if (!counter) return;

          let count = 5;
          const target = Number(counter.getAttribute("data-target"));

          const increment = target / 250;

          const updateCount = () => {
            if (count < target) {
              count += increment;
              if (count > target) count = target;
              counter.innerText = Math.floor(count) + "+";
              requestAnimationFrame(updateCount);
            } else {
              counter.innerText = target + "+";
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

    return () => {
      trigger.kill();
    };
  }, []);

  useGSAP(
    () => {
      const counters = gsap.utils.toArray(".counter");
      const total = counters.length;

      counters.forEach((el, index) => {
        gsap.fromTo(
          el,
          { y:0 }, // reverse
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "bottom 70%",
              end: "+=50%",
              scrub: 1,
            },
            y: -(total - index) * 50,
            ease: "power2.out",
          }
        );
      })
    },
    { scope: containerRef }
  );
  

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 lg:flex lg:flex-between w-full lg:flex-nowrap lg:w-11/12 mx-auto"
      ref={containerRef}
    >
      {counters.map((counter, index) => (
        <div
          key={index}
          className="text-gray-800 font-semibold w-full md:min-w-1/2 lg:min-w-1/4 relative counter"
        >
          <span
            ref={(el) => {
              if (el) countRefs.current[index] = el;
            }}
            className="text-3xl lg:text-[72px] leading-[100%] counter-title"
            data-target={counter.value}
          >
            6+
          </span>
          <h4 className="text-base lg:text-lg mt-2">{counter.title}</h4>
        </div>
      ))}
    </div>
  );
}