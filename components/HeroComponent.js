"use client";
import { useEffect, useState } from "react";
import HorizontalForm from "./HorizontalForm";

export default function HeroComponent() {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Detect Safari (desktop + iOS)
    const ua = navigator.userAgent.toLowerCase();
    const safari =
      ua.includes("safari") &&
      !ua.includes("chrome") &&
      !ua.includes("android");
    setIsSafari(safari);

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    let player;

    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player("bg-video", {
        events: {
          onReady: (event) => {
            if (!safari) {
              event.target.mute();
              event.target.playVideo();
            }

            // Force highest quality based on screen width
            const width = window.innerWidth;
            if (width >= 1920) {
              event.target.setPlaybackQuality("highres"); // 1080p+
            } else if (width >= 1280) {
              event.target.setPlaybackQuality("hd1080");
            } else if (width >= 854) {
              event.target.setPlaybackQuality("hd720");
            } else {
              event.target.setPlaybackQuality("large"); // 480p fallback
            }
          },
        },
      });
    };
  }, []);

  return (
    <section className="w-full relative h-screen flex-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 w-[400%] h-[400%] md:w-[120%] md:h-[120%] -translate-x-1/2 -translate-y-1/2">
          <iframe
            id="bg-video"
            fetchPriority="high"
            className="w-full h-full pointer-events-none object-cover"
            src={`https://www.youtube.com/embed/yMOk_HcPunk?
      autoplay=1
      &mute=1
      &controls=0
      &modestbranding=1
      &rel=0
      &loop=1
      &playlist=yMOk_HcPunk
      &playsinline=1
      &enablejsapi=1
  `.replace(/\s+/g, "")}
            title="Background Video"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
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
      <div className="w-10/12 mx-auto absolute bottom-10">
        <HorizontalForm />
      </div>
    </section>
  );
}
