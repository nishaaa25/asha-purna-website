import Button from "@/components/Button";
import CardTwo from "@/components/CardTwo";
import SectionHeader from "@/components/SectionHeader";
import { recentProjects } from "@/lib/content";
import CommittedCarousel from "./CommittedCarousel";
import RecentProjectsCarousel from "../CSR/RecentProjectsCarousel";

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
        data: { getCsrSocialUpdates: [], csr_social_updates_image_path: '' },
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
        data: { getCsrSocialUpdates: [], csr_social_updates_image_path: '' },
        message: "Invalid response format",
      };
    }

    const result = await response.json();

    if (result._status) {
      return {
        status: true,
        data: result._data || { getCsrSocialUpdates: [], csr_social_updates_image_path: '' },
        message: result._message,
      };
    } else {
      return {
        status: false,
        data: { getCsrSocialUpdates: [], csr_social_updates_image_path: '' },
        message: result._message,
      };
    }
  } catch (error) {
    console.error("CSR API Error:", error);
    return {
      status: false,
      data: { getCsrSocialUpdates: [], csr_social_updates_image_path: '' },
      message: error.message,
    };
  }
}

export default async function Committed() {
  const csrData = await getCSRData();
  const csrUpdates = csrData?.data?.getCsrSocialUpdates || [];
  const imagePath = csrData?.data?.csr_social_updates_image_path || '';
  return (
    <div className="w-full relative pb-15 md:pb-20 lg:pb-[100px] flex-center flex-col">
      <SectionHeader
        spanText="Giving back"
        heading="Committed to"
        desc="Through healthcare accessibility, education support, housing for all, women empowerment, and care for the specially-abled, our CSR initiatives touch lives and build stronger communities across Rajasthan."
      />
      <div className="committed relative -top-2 mb-5 w-full">
        <RecentProjectsCarousel data={csrUpdates} imagePath={imagePath}/>
      </div>
       <Button text="Explore Our CSR Initiatives" link="/CSR"/>
    </div>
  );
}
