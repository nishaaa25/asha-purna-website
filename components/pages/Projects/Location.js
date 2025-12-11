import SectionHeader from "@/components/SectionHeader";
import ListTwo from "./ListTwo";

export default function Location({
  project,
  projectLocationsData,
  projectLocationsImagePath,
}) {
  // Extract location features (with fallback)
  const locationFeatures =
    projectLocationsData?.length > 0
      ? projectLocationsData.map((loc) => loc.location || loc.title || loc.name)
      : [
          "Opposite Delhi-Mumbai Industrial Corridor",
          "5 minutes to RIICO Industrial Area",
          "Direct access to National Highway",
          "15 minutes to Jodhpur Railway Station",
        ];

  // Map embed link fallback
  const mapLink =
    project?.map_link ||
    project?.location_map ||
    `<iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d457918.34401696065!2d73.037212!3d26.278306!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x35b840646df082cc!2sAshapurna%20Buildcon%20Ltd%20Corporate%20office!5e0!3m2!1sen!2sus!4v1674640627695!5m2!1sen!2sus"
      width="100%"
      height="100%"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>`;

  return (
    <section className="w-full bg-cream-600 pb-16 md:pb-24 lg:pb-28">
      {/* Section Header */}
      <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto text-center mb-4 lg:mb-8">
        <SectionHeader
          spanText={project?.location_tagline || "advantage"}
          heading={project?.location_heading || "Strategic Location"}
          title="location"
          desc={
            project?.location_description ||
            project?.location_desc ||
            "Every Ashapurna development is thoughtfully placed near key city corridors, ensuring effortless access to schools, hospitals, workplaces, and lifestyle hubs."
          }
        />
      </div>

      {/* Map + List Section */}
      <div className="w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto flex flex-col lg:flex-row-reverse items-center lg:items-start gap-12">
        {/* Google Map */}
        <div
          className="w-full lg:w-[65%] xl:w-[70%] aspect-[3/2] md:aspect-[16/9] rounded-t-2xl overflow-hidden "
          dangerouslySetInnerHTML={{ __html: project?.google_map || mapLink }}
        ></div>

        {/* Features List */}
        <ListTwo heading="Connectivity Highlights" features={locationFeatures} />
      </div>
    </section>
  );
}

// function ListTwo({ features, heading }) {
//   return (
//     <div className="w-full lg:w-[35%] xl:w-[30%]">
//       <h5 className="font-semibold text-lg md:text-2xl lg:text-[28px] uppercase text-gray-700">
//         {heading}
//       </h5>
//       <ul className="mt-4 md:mt-6 lg:mt-8 grid grid-cols-1 gap-3">
//         {features.map((feature, index) => (
//           <li
//             key={index}
//             className="text-sm md:text-base text-gray-600 flex items-start gap-3 leading-relaxed"
//           >
//             <span className="bg-orange-600 min-w-2 min-h-2 w-2 h-2 rounded-full mt-[6px]"></span>
//             <span>{feature}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
