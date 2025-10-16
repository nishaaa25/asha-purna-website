'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useLenisScrollTrigger() {
  useEffect(() => {
    // Only setup ScrollTrigger integration
    // Lenis instance is handled by LenisProvider in layout.js
    
    // Make ScrollTrigger use Lenis scroll position
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          // Use the global Lenis instance if available
          const lenisElement = document.querySelector('.lenis');
          if (lenisElement && window.lenis) {
            window.lenis.scrollTo(value, { immediate: true });
          } else {
            window.scrollTo(0, value);
          }
        }
        return window.scrollY;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    });

    ScrollTrigger.refresh();

    return () => {
      // No cleanup needed as we're not creating a Lenis instance here
    };
  }, []);
}