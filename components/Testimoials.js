import SectionHeader from "./SectionHeader";
import TestimonialsCarousel from "./pages/Home/TestimonialsCarousel";

export default function Testimoials() {
  return (
    <div className="relative w-full pb-5 md:pb-20 lg:pb-[100px]">
      <div className="w-11/12 mx-auto relative">
        <SectionHeader
          title="testimonials"
          heading="Our Excellence"
          spanText="Your words"
        />
      </div>
      <div className="w-full relative -top-6">
        <TestimonialsCarousel/>
      </div>
    </div>
  );
}
