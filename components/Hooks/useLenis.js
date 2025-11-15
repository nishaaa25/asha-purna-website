"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenisScrollTrigger() {
  useEffect(() => {
    if (!window.lenis) return;

    const lenis = window.lenis;

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.scroll;
      },

      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },

      pinType: "transform",
    });

    // Update ScrollTrigger every time Lenis updates
    lenis.on("scroll", ScrollTrigger.update);

    // Refresh after everything is mounted
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, []);
}
