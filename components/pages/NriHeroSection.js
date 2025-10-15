export default function NriHeroSection() {
  return (
    <section className="w-full relative h-[40dvh] md:h-[60vh] lg:h-[90vh] flex-center overflow-hidden ">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover  -z-10 pointer-events-none transform-gpu will-change-transform"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/assets/home-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="w-full h-full absolute top-0 left-0 gradient"></div>
    </section>
  );
}
