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
      <div className="w-[90%] relative flex flex-wrap lg:flex-row justify-start items-start gap-10 mx-auto mb-10 md:mb-20 lg:mb-[100px]">
        {amenitiesData.map((item, index) => (
          <div
            key={item.id || index}
            className="w-full lg:w-auto relative flex-center flex-col gap-3 lg:gap-5"
          >
            <div className="relative w-10 h-10 md:w-13 md:h-13 lg:w-15 lg:h-15">
              <Image
                src={item.image ? (projectAmenityImagePath + item.image) : item.imgUrl}
                alt={item.amenity || item.title}
                fill
                className="relative object-contain"
              />
            </div>
            <h5 className="text-sm md:text-base lg:text-base text-center text-gray-800 leading-[120%] tracking-[-1.4%] font-medium">
              {item.amenity || item.title}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}
