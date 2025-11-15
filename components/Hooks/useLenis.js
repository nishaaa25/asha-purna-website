"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenisScrollTrigger() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
    });

    // Make Lenis globally accessible (optional)
    window.lenis = lenis;

    // GSAP ScrollTrigger proxy setup
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: "transform",
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // RAF loop (MOST IMPORTANT)
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Refresh once everything loads
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, []);
}
