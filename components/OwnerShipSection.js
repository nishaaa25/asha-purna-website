import Button from "./Button";
import LandOwnershipCarousel from "./pages/Home/LandOwnershipCarousel";
import LandOwnershipTwo from "./pages/Home/LandOwnershipTwo";
import SectionHeader from "./SectionHeader";

export default function OwnerShipSection() {
  return (
    <div className="w-full relative pb-10 md:pb-20 lg:pb-[100px] flex-col flex-center">
      <div className="w-full lg:w-8/12 mx-auto relative">
        <SectionHeader
          title="Land ownership"
          heading="Lasting value,"
          spanText="limitless posibilties."
          desc="Owning land isn’t just a transaction. It’s the foundation of stability, freedom, and generational growth. At Ashapurna, we’ve made land ownership accessible and trustworthy for thousands of families."
        />
      </div>
      <div className="relative -top-5 px-6 w-full mx-auto">
        <LandOwnershipCarousel />
        <LandOwnershipTwo />
      </div>
    </div>
  );
}
