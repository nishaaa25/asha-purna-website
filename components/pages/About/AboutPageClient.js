"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function AboutPageClient({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Refresh ScrollTrigger after component mounts
    ScrollTrigger.refresh();
  }, []);

  return <>{children}</>;
}

