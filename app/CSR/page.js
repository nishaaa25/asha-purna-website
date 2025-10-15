import CardTwo from "@/components/CardTwo";
import FaqSection from "@/components/FaqSection";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import RecentProjectsCarousel from "@/components/pages/CSR/RecentProjectsCarousel";
import TabSection from "@/components/pages/CSR/TabSection";
import SectionHeader from "@/components/SectionHeader";
import { faqs2, recentProjects } from "@/lib/content";

async function getCSRData() {
  try {
    const response = await fetch(
      "https://apiservices.ashapurna.com/api/web/about-us/csr-social-resposibilities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-version": "v1",
        },
        body: JSON.stringify({}),
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    // Check if response is OK and is JSON
    if (!response.ok) {
      console.error(`CSR API returned status ${response.status}`);
      return {
        status: false,
        data: { getCsrSocialUpdates: [], csr_social_updates_image_path: "" },
        message: `API Error: ${response.status}`,
      };
    }

    // Check content type before parsing
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      console.error("Non-JSON response:", textResponse);
      return {
        status: false,
        data: { getCsrSocialUpdates: [], csr_social_updates_image_path: "" },
        message: "Invalid response format",
      };
    }

    const result = await response.json();

    if (result._status) {
      return {
        status: true,
        data: result._data || {
          getCsrSocialUpdates: [],
          csr_social_updates_image_path: "",
        },
        message: result._message,
      };
    } else {
      return {
        status: false,
        data: { getCsrSocialUpdates: [], csr_social_updates_image_path: "" },
        message: result._message,
      };
    }
  } catch (error) {
    console.error("CSR API Error:", error);
    return {
      status: false,
      data: { getCsrSocialUpdates: [], csr_social_updates_image_path: "" },
      message: error.message,
    };
  }
}
export default async function CSRpage() {
  const csrData = await getCSRData();
  const csrUpdates = csrData?.data?.getCsrSocialUpdates || [];
  const imagePath = csrData?.data?.csr_social_updates_image_path || "";

  return (
    <div className="w-full relative">
      <HeroComponentTwo imgUrl="/assets/csr-bg.jpg" />
      <div className="w-full relative md:w-10/12 lg:w-9/12 lg:mx-auto">
        <SectionHeader
          spanText="
Transforming Lives"
          heading="Building Communities,"
          title="corporate social responsibility"
          desc="At Ashapurna, our commitment extends beyond construction. We believe in creating lasting impact through healthcare, education, community development, and environmental sustainability initiatives that empower lives across generations."
        />{" "}
      </div>
      {/* <TabSection /> */}
      <div className="relative bg-cream-600 w-full pb-5 lg:pb-0">
        <div className="w-full md:w-10/12 lg:w-8/12 mx-auto">
          <SectionHeader
            heading="Recent Projects"
            desc="Discover our latest CSR initiatives that are making a real difference in communities across Rajasthan."
          />
        </div>
        <RecentProjectsCarousel data={csrUpdates} imagePath={imagePath}/>
      </div>
      <div className="w-full relative bg-cream-600">
        <FaqSection faq={faqs2} />
      </div>
    </div>
  );
}
