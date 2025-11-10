"use client";

import Amenties from "@/components/pages/Projects/Amenties";
import FaqSection from "@/components/FaqSection";
import GetInTouch from "@/components/pages/GetInTouch";
import Testimoials from "@/components/Testimoials";
import { faqs, testimonials } from "@/lib/content";
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
  projectMasterData,
  projectGalleryData,
  slug,
}) {
  console.log("product details data", project);
  return (
    <div className="relative w-full">
      <SlugHeroSection
        project={project}
        projectImagePath={projectImagePath}
        sliderImagePath={sliderImagePath}
        glossySliderPath={glossySliderPath}
        brochureImagePath={brochureImagePath}
        projectReraNo={project?.project_other_info}
      />
      {/* Only show DetailsTabSection if there's meaningful content to display */}
      {(() => {
        // Check if there are actual gallery images
        const hasGalleryImages =
          (project360Data && project360Data.length > 0) ||
          (projectVideoGalleryData && projectVideoGalleryData.length > 0) ||
          (projectGalleryData?.gallery_names?.length > 0 &&
            projectGalleryData.gallery_names.some(
              (category) =>
                category.project_gallery && category.project_gallery.length > 0
            ));

        // Check if there are floor plans
        const hasFloorPlans =
          projectFloorsData?.project_floor_plans &&
          projectFloorsData.project_floor_plans.length > 0;

        // Check if there's project description
        const hasDescription = project?.description || project?.overview;

        return hasGalleryImages || hasFloorPlans || hasDescription;
      })() && (
        <DetailsTabSection
          project={project}
          masterImagePath={masterImagePath}
          floorImagePath={floorImagePath}
          project360Data={project360Data}
          viewsImagePath={viewsImagePath}
          projectVideoGalleryData={projectVideoGalleryData}
          projectVideoGalleryImagePath={projectVideoGalleryImagePath}
          projectMasterData={projectMasterData}
          projectFloorsData={projectFloorsData}
          projectGalleryData={projectGalleryData}
          galleryImagePath={galleryImagePath}
        />
      )}
      {/* Only show Amenities section if data is available */}
      {projectAmenityData && projectAmenityData.length > 0 && (
        <Amenties
          project={project}
          projectAmenityData={projectAmenityData}
          projectAmenityImagePath={projectAmenityImagePath}
        />
      )}
      {/* Only show Location section if data is available */}
      {projectLocationsData && projectLocationsData.length > 0 && (
        <Location
          project={project}
          projectLocationsData={projectLocationsData}
          projectLocationsImagePath={projectLocationsImagePath}
        />
      )}
      {/* Only show Construction section if data is available */}
      {projectConstructionsData?.project_constructions &&
        projectConstructionsData.project_constructions.length > 0 && (
          <Construction
            project={project}
            projectConstructionsData={projectConstructionsData}
            constructionImagePath={constructionImagePath}
          />
        )}
      {/* Only show Testimonials section if data is available */}
      <Testimoials />
      <div className="w-full relative bg-cream-600">
        <GetInTouch
          heading="get in touch"
          projectId={project?.id}
          projectName={project?.name}
        />
      </div>
      {/* Only show FAQ section if data is available */}
      <FaqSection faq={faqs} />
    </div>
  );
}
