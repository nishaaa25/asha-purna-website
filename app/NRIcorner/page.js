import HeroComponentTwo from "@/components/HeroComponentTwo";
import SectionHeader from "@/components/SectionHeader";
import CountersSection from "@/components/Counter";
import FaqSection from "@/components/FaqSection";
import Button from "@/components/Button";
import LandOwnershipCarousel from "@/components/pages/Home/LandOwnershipCarousel";

import { faqs, blogs, projects } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/pages/Projects/ProjectCard";
import CounterTwo from "@/components/pages/CounterTwo";
import NriHeroSection from "@/components/pages/NriHeroSection";
import FeaturedCarousel from "@/components/pages/FeaturedCarousel";
import RecognizedCarousel from "@/components/pages/Blogs/RecognizedCarousel";
import CardTwo from "@/components/CardTwo";
import { getHomeData } from "@/lib/services/homeService";
import ContactUsForm from "@/components/ContactUsForm";
import GetInTouch from "@/components/pages/GetInTouch";
import LandOwnershipTwo from "@/components/pages/Home/LandOwnershipTwo";

async function getAboutData() {
  try {
    const response = await fetch(
      "https://apiservices.ashapurna.com/api/web/about-us",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-version": "v1",
        },
        body: JSON.stringify({}),
      }
    );

    // Check if response is OK and is JSON
    if (!response.ok) {
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
    return {
      status: false,
      data: { getCsrSocialUpdates: [], csr_social_updates_image_path: '' },
      message: error.message,
    };
  }
}

export default async function page() {
  const result = await getHomeData();
    const aboutData = await getAboutData();
  const displayedProjects = blogs.slice(0, 3);
  const data = [
    {
      title: "Years of trust",
      value: "30",
    },
    {
      title: "Delivered Projects",
      value: "45",
    },
    {
      title: "Happy Families",
      value: "30",
      sign: "k",
    },
    {
      title: "RERA Registered",
      value: "100",
    },
  ];

  return (
    <div className="w-full relative ">
      <HeroComponentTwo imgUrl="https://d3qnldyv492i08.cloudfront.net/ashapurna/images/webimages/nri-bg.jpg"/>
      <SectionHeader
        spanText="for NRIs"
        heading="Ownership Made Simple"
        title="NRI INVESTMENTS"
        desc="Distance doesn’t lessen belonging. Ashapurna makes it effortless for NRIs to invest with trust and transparency. With a legacy of award-winning townships, prime locations, and meticulous planning, we create communities that aren’t just homes but enduring assets for generations. "
      />

      {/* why Nri choose Ashapurna */}
      <div className="w-full relative pb-10 md:pb-20 lg:pb-[100px] flex-col flex-center bg-cream-600">
        <SectionHeader heading="Why NRIs choose" spanText="Ashapurna?" />
        <div className="relative -top-10 px-[22px] w-full mx-auto">
          <LandOwnershipCarousel/>
          <LandOwnershipTwo />
        </div>
        <div className="relative -top-6 w-full">
          <CounterTwo data={data} />
        </div>
      </div>

      {/* Featured Projects */}
      <div className="relative px-[22px] w-full">
        <SectionHeader heading="Featured" spanText="Projects" />
        {/* <div className="relative -top-6 lg:hidden">
          {result?.data?.getFeaturedProjects.slice(0, 1).map((project, index) => (
            <ProjectCard data={project} key={index} imagePath={result?.data?.project_image_path}/>
          ))}
        </div> */}
        <div className="relative -top-6 flex flex-col justify-center items-center gap-15">
          <FeaturedCarousel featuredProjects={result?.data?.getFeaturedProjects} imagePath={result?.data?.project_image_path }/>
          <Button link="/projects" text="View all projects" />
        </div>
      </div>
      {/* <div className="relative py-10 flex-center flex-col ">
        <SectionHeader
          spanText="Leading Media"
          heading="Recognized by"
          title="BLOGS"
        />
        <div className="relative w-full -top-4 lg:hidden">
          <RecognizedCarousel />
        </div>
        <div
          className={`w-full px-20 relative mb-5  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300 hidden lg:grid -top-10`}
        >
          {displayedProjects.map((item, index) => (
            <div key={index}>
              <CardTwo data={item} />
            </div>
          ))}
        </div>
        <Button text={"Read More"} link="/blogs" />
      </div> */}

      {/* connect with us */}

      <div className="relative py-15 md:py-20 text-center w-full">
        <GetInTouch heading="connect with us" />
      </div>

      {/* Faq */}

      <div className="relative bg-cream-600 w-full">
        <FaqSection faq={faqs} />
      </div>
    </div>
  );
}
