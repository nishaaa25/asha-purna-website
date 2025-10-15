"use client";

import Amenties from "@/components/pages/Projects/Amenties";
import FaqSection from "@/components/FaqSection";
import GetInTouch from "@/components/pages/GetInTouch";
import Testimoials from "@/components/Testimoials";
import { faqs } from "@/lib/content";
import SlugHeroSection from "@/components/pages/Projects/SlugHeroSection";
import DetailsTabSection from "@/components/pages/Projects/DetailsTabSection";
import Location from "@/components/pages/Projects/Location";
import Construction from "@/components/Construction";

export default function ProjectDetailClient({
  project,
  projectImagePath,
  brochureImagePath,
  amenitiesImagePath,
  locationImagePath,
  sliderImagePath,
  glossySliderPath,
  masterImagePath,
  videoImagePath,
  viewsImagePath,
  viewsGalleryImagePath,
  floorImagePath,
  constructionImagePath,
  galleryImagePath,
  project360Data,
  projectAmenityData,
  projectAmenityImagePath,
  projectLocationsData,
  projectLocationsImagePath,
  projectVideoGalleryData,
  projectVideoGalleryImagePath,
  projectConstructionsData,
  projectFloorsData,
  projectGalleryData,
  slug,
}) {

  console.log("product ",project);
  return (
    <div className="relative w-full">
      <SlugHeroSection
        project={project}
        projectImagePath={projectImagePath}
        sliderImagePath={sliderImagePath}
        glossySliderPath={glossySliderPath}
        brochureImagePath={brochureImagePath}
      />
      <DetailsTabSection
        project={project}
        masterImagePath={masterImagePath}
        floorImagePath={floorImagePath}
        project360Data={project360Data}
        viewsImagePath={viewsImagePath}
        projectVideoGalleryData={projectVideoGalleryData}
        projectVideoGalleryImagePath={projectVideoGalleryImagePath}
        projectFloorsData={projectFloorsData}
        projectGalleryData={projectGalleryData}
        galleryImagePath={galleryImagePath}
      />
      <Amenties
        project={project}
        projectAmenityData={projectAmenityData}
        projectAmenityImagePath={projectAmenityImagePath}
      />
      <Location
        project={project}
        projectLocationsData={projectLocationsData}
        projectLocationsImagePath={projectLocationsImagePath}
      />
      {projectConstructionsData?.project_constructions.length > 0 && <Construction
        project={project}
        projectConstructionsData={projectConstructionsData}
        constructionImagePath={constructionImagePath}
      />}
      <Testimoials />
      <div className="w-full relative bg-cream-600">
        <GetInTouch
          heading="get in touch"
          projectId={project?.id}
          projectName={project?.name}
        />
      </div>
      <FaqSection faq={faqs} />
    </div>
  );
}
