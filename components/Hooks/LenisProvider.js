'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    // Add lenis class to HTML element
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    // Initialize Lenis with optimized settings for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.08,           // Lower value = smoother, slower scroll (0.08 is a sweet spot)
      duration: 1.5,        // Duration of the scroll animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing function
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for smoother mouse wheel scrolling
      smoothTouch: false,   // Disable on touch devices for better performance
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after a short delay to ensure proper initialization
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      // Cleanup
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    // Also use native scroll as fallback
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}