"use client";
import HorizontalForm from "./HorizontalForm";
import { useState, useEffect, useRef } from "react";

export default function HeroComponent() {
  const [desktopLoaded, setDesktopLoaded] = useState(false);
  const [mobileLoaded, setMobileLoaded] = useState(false);
  const mobileVideoRef = useRef(null);

  // Desktop video with fallback timeout
  useEffect(() => {
    // Set a timeout fallback in case onLoad doesn't fire (common with iframes)
    const timeoutId = setTimeout(() => {
      setDesktopLoaded(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Lazy load mobile video when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && mobileVideoRef.current && !mobileVideoRef.current.src) {
            mobileVideoRef.current.src =
              "https://player.vimeo.com/video/1141020698?autoplay=1&mute=1&controls=0&loop=1&playsinline=1";
          }
        });
      },
      { threshold: 0.1 }
    );

    if (mobileVideoRef.current) {
      observer.observe(mobileVideoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full relative h-screen flex-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2">
          {/* Desktop Video */}
          <div className="hidden lg:flex w-full h-full relative">
            <iframe
              id="bg-video-desktop"
              fetchPriority="high"
              loading="eager"
              className={`w-full h-full pointer-events-none object-cover scale-120 xl:scale-140 transition-opacity duration-700 ${
                desktopLoaded ? "opacity-100" : "opacity-0"
              }`}
              src="https://player.vimeo.com/video/1141020580?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&quality=auto"
              title="Background Video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              playsInline
              onLoad={() => setDesktopLoaded(true)}
            ></iframe>
          </div>

          {/* Mobile Video - Lazy loaded */}
          <div className="lg:hidden w-full h-full relative">
            <iframe
              ref={mobileVideoRef}
              id="bg-video-mobile"
              fetchPriority="low"
              loading="lazy"
              className={`w-full h-full pointer-events-none object-cover scale-130 xl:scale-140 transition-opacity duration-700 ${
                mobileLoaded ? "opacity-100" : "opacity-0"
              }`}
              title="Background Video"
              allow="autoplay; fullscreen; picture-in-picture"
              playsInline
              onLoad={() => setMobileLoaded(true)}
            ></iframe>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full gradient z-10"></div>

      {/* Hero Text */}
      <div className="w-[95%] mx-auto relative text-center text-white flex-center flex-col gap-[6px] z-20">
        <h1 className="text-4xl md:text-[60px] lg:text-[56px] leading-[100%] whitespace-nowrap drop-shadow-lg font-medium tracking-[-1.4px]">
          Living Landscapes,
        </h1>
        <span className="text-[28px] md:text-[48px] lg:text-[48px] leading-[100%] drop-shadow-lg font-[300] tracking-[-1.3px]">
          that last generations
        </span>
      </div>

      {/* Form */}
      <div className="w-10/12 mx-auto absolute bottom-10 z-20">
        <HorizontalForm />
      </div>
    </section>
  );
}
