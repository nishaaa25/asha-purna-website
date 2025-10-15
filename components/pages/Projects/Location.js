import List from "@/components/List";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import ListTwo from "./ListTwo";

export default function Location({ project, projectLocationsData, projectLocationsImagePath }) {
  // Get location data from API or fallback
  const locationFeatures = projectLocationsData && projectLocationsData.length > 0
    ? projectLocationsData.map(loc => loc.location || loc.title || loc.name)
    : [
      "Opposite Delhi-Mumbai Industrial Corridor",
      "5 minutes to RIICO Industrial Area",
      "Direct access to National Highway",
      "15 minutes to Jodhpur Railway Station",
    ];

  // Get map link - could be from project data or use default
  const mapLink = project?.map_link || project?.location_map || 
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d457918.34401696065!2d73.037212!3d26.278306!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x35b840646df082cc!2sAshapurna%20Buildcon%20Ltd%20Corporate%20office!5e0!3m2!1sen!2sus!4v1674640627695!5m2!1sen!2sus";

  return (
    <div className="w-full relative bg-cream-600 pb-15 md:pb-20 lg:pb-[100px]">
      <div className="relative w-full md:w-10/12 lg:w-8/12 mx-auto">
        <SectionHeader
          spanText={project?.location_tagline || "advantage"}
          heading={project?.location_heading || "Strategic Location"}
          title="location"
          desc={project?.location_description || project?.location_desc || "Located across from the Delhi–Mumbai Industrial Corridor, Agri Park offers immediate access to national highways, rail networks, and Jodhpur city."}
        />
      </div>
      <div className="w-10/12 relative mx-auto lg:flex lg:flex-row-reverse lg:gap-10">
        <div className="w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-t-[10px] relative mb-10"     dangerouslySetInnerHTML={{ __html: project?.google_map || mapLink }}>
        </div>
        <ListTwo heading="Connectivity Highlights" features={locationFeatures} />
      </div>
    </div>
  );
}
