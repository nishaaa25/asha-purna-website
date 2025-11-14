"use client";
import { useEffect, useState } from "react";
import HorizontalForm from "./HorizontalForm";

export default function HeroComponent() {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Detect Safari (desktop + iOS)
    const ua = navigator.userAgent.toLowerCase();
    const safari = ua.includes("safari") && !ua.includes("chrome") && !ua.includes("android");
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
          },
        },
      });
    };
  }, []);

  return (
    <section className="w-full relative h-screen flex-center overflow-hidden">
      {/* Background Video */}
      <div className={`absolute top-0 left-0 w-full h-full overflow-hidden  ${isSafari ? "z-10" : "-z-10"}`}>
        <div className="absolute top-1/2 left-1/2 w-[400%] h-[400%] md:w-[120%] md:h-[120%] -translate-x-1/2 -translate-y-1/2">
          <iframe
            id="bg-video"
            fetchPriority="high"
            className="w-full h-full pointer-events-auto"
            src={`https://www.youtube.com/embed/yMOk_HcPunk?${isSafari ? "autoplay=0&controls=1&mute=0" : "autoplay=1&mute=1&controls=0"}&showinfo=0&modestbranding=1&rel=0&loop=1&playlist=yMOk_HcPunk&start=0&iv_load_policy=3&disablekb=1&fs=1&playsinline=1&autohide=1&enablejsapi=1`}
            title="Background Video"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Overlay */}
      <div className="w-full h-full absolute top-0 left-0 gradient"></div>

      {/* Hero text */}
      <div className="w-[95%] mx-auto relative text-center text-white flex-center flex-col gap-[6px] realtive z-20">
        <h1 className="text-4xl md:text-[60px] lg:text-[56px] leading-[100%] whitespace-nowrap drop-shadow-lg font-medium tracking-[-1.4px]">
          Living Landspaces,
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
