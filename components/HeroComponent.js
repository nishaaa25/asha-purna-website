"use client";
import { useEffect, useRef } from "react";
import HorizontalForm from "./HorizontalForm";

export default function HeroComponent() {
  const playerRef = useRef(null);

  useEffect(() => {
    // Initialize player only if API is ready
    function initPlayer() {
      if (playerRef.current) return;
      if (!window.YT) return; // API not loaded yet

      playerRef.current = new window.YT.Player("yt-player", {
        videoId: "Dc79jBuqnc8",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          start: 10,
          loop: 1,
          playlist: "Dc79jBuqnc8",
        },
        events: {
          onReady: (event) => event.target.playVideo(),
        },
      });
    }

    // If API is already loaded, init immediately
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Wait for the API to load
      window.onYouTubeIframeAPIReady = initPlayer;
    }
  }, []);

  return (
    <section className="w-full relative h-dvh flex-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div
          id="yt-player"
          className="absolute top-0 scale-[1.2] left-0 w-[300%] h-[300%] md:w-full md:h-full -translate-x-[33%] -translate-y-[33%] md:translate-x-0 md:translate-y-0 pointer-events-none"
        ></div>
      </div>

      <div className="w-full h-full absolute top-0 left-0 gradient"></div>
      <div className="w-[95%] mx-auto relative text-center text-white flex-center flex-col gap-[6px]">
        <h1 className="text-4xl md:text-[60px] lg:text-[56px] leading-[100%] whitespace-nowrap drop-shadow-lg font-medium tracking-[-1.4px]">
          Living Landspaces,
        </h1>
        <span className="text-[28px] md:text-[48px] lg:text-[48px] leading-[100%] drop-shadow-lg font-[300] tracking-[-1.3px]">
          that last generations
        </span>
      </div>
      <div className="w-10/12 mx-auto absolute bottom-10">
        <HorizontalForm />
      </div>
    </section>
  );
}
