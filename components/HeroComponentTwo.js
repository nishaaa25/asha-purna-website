import Image from "next/image";
import HeroBottomBar from "./HeroBottomBar";

export default function HeroComponentTwo({ imgUrl }) {
  return (
    <section
      className="w-full relative h-[40dvh] md:h-[70vh] lg:h-[90vh] flex-center overflow-hidden"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Image
        src={imgUrl ? imgUrl : "/assets/projects-page.jpg"}
        alt="land-img"
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 50vw"
        quality={85}
        className="relative object-cover"
      />
      <div className="w-full h-full absolute top-0 left-0 gradient"></div>
    </section>
  );
}
