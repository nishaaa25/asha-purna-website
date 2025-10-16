"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function AboutPageClient({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Normalize scroll behavior for the about page
    // This helps prevent scroll issues and ensures smooth scrolling
    ScrollTrigger.normalizeScroll(true);
    
    return () => {
      // Cleanup on unmount
      ScrollTrigger.normalizeScroll(false);
    };
  }, []);

  return <>{children}</>;
}