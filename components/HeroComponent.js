"use client";
import HorizontalForm from "./HorizontalForm";

export default function HeroComponent() {

  return (
    <section className="w-full relative h-screen flex-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2">
          <iframe
            id="bg-video-desktop"
            fetchPriority="high"
            className="w-full h-full pointer-events-none object-cover hidden  scale-120 xl:scale-140  lg:flex"
            src="https://player.vimeo.com/video/1141020580?autoplay=1&mute=1&controls=0&loop=1&playsinline=1"
            title="Background Video"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            playsInline
          ></iframe>
          <iframe
            id="bg-video-mobile"
            fetchPriority="high"
            className="w-full h-full pointer-events-none object-cover scale-130 xl:scale-140 lg:hidden"
            src="https://player.vimeo.com/video/1141020698?autoplay=1&mute=1&controls=0&loop=1&playsinline=1"
            title="Background Video"
            frameBorder="0"
            allow="autoplay; fullscreen;  picture-in-picture"
            playsInline
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
      <div className="w-10/12 mx-auto absolute bottom-10 z-20">
        <HorizontalForm />
      </div>
    </section>
  );
}
