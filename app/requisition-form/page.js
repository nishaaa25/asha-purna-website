import HeroComponentTwo from "@/components/HeroComponentTwo";
import ChannelPartnerForm from "@/components/pages/Form/ChannelPartnerForm";
import ClientForm from "@/components/pages/Form/ClientForm";
import RequisitionForm from "@/components/RequisitionForm";
import SectionHeader from "@/components/SectionHeader";
import ThankYouPopup from "@/components/ThankYouPopup";

export const metadata = {
  title: "Requisition Form",
  description: "Fill out the requisition form to connect with our team.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <div className="w-full relative pb-10 md:pb-20 lg:pb-[100px]">
      <HeroComponentTwo imgUrl="https://d3qnldyv492i08.cloudfront.net/ashapurna/images/webimages/bp-bg.jpg" />

      {/* Requisition Form Section */}
      <section className="w-full relative lg:px-20 flex-center flex-col">
        <SectionHeader
          heading="Requisition Form"
          desc="Complete the form below, and our team will reach out to you shortly."
        />
      </section>
      <div className="px-[22px]  md:px-14 lg:px-22 mx-auto mb-6 md:mb-10 ">
        <RequisitionForm />
      </div>
    </div>
  );
}
