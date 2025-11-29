import { amenities } from "@/lib/content";
import SectionHeader from "../../SectionHeader";
import Image from "next/image";

export default function Amenties({ project, projectAmenityData, projectAmenityImagePath }) {
  // Use API data if available, otherwise fall back to content
  const amenitiesData = projectAmenityData && projectAmenityData.length > 0
    ? projectAmenityData
    : amenities;

  return (
    <div className="w-full relative">
      <SectionHeader
        heading={project?.amenity_heading || "Infrastructures That"}
        spanText={project?.amenity_tagline || "Supports Enterprise"}
        title="amenities"
      />
      <div className="w-8/12 relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-start items-start gap-10 mx-auto mb-10 md:mb-20 lg:mb-[100px]">
        {amenitiesData.map((item, index) => (
          <div
            key={item.id || index}
            className="w-full lg:w-auto relative flex-center flex-col gap-3 lg:gap-5"
          >
            <div className="relative w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12">
              <Image
                src={item.image ? (projectAmenityImagePath + item.image) : item.imgUrl}
                alt={item.amenity || item.title || item.name || item.text1 || item.text2 || item.text3}
                fill
                className="relative object-contain"
              />
            </div>
            <div className="flex flex-col gap-1 text-center">
              {/* Display primary text */}
              <h5 className="text-sm md:text-base lg:text-base text-black-500 leading-[120%] tracking-[-1.4%] font-medium">
                {item.amenity || item.title || item.name || item.text1}
              </h5>
              {/* Display additional text fields if available */}
              {item.sub_title && (
                <p className="text-xs  text-gray-600 leading-[120%] tracking-[-1.4%]">
                  {item.sub_title}
                </p>
              )}
              {item.text3 && (
                <p className="text-xs md:text-sm text-gray-600 leading-[120%] tracking-[-1.4%]">
                  {item.text3}
                </p>
              )}
              {/* Display other possible text fields */}
              {item.description && (
                <p className="text-xs md:text-sm text-gray-600 leading-[120%] tracking-[-1.4%]">
                  {item.description}
                </p>
              )}
              {item.subtitle && (
                <p className="text-xs md:text-sm text-gray-600 leading-[120%] tracking-[-1.4%]">
                  {item.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
