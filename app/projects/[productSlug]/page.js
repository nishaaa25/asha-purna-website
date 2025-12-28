import { notFound } from "next/navigation";
import ProjectDetailClient from "./ProjectDetailClient";

const BASE_API_URL = "https://apiservices.ashapurna.com/api/web/";

// Helper function to fetch from API
async function fetchAPI(endpoint, params = {}) {
  try {
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-version": "v1",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      return {
        status: false,
        data: null,
        message: `API Error: ${response.status}`,
      };
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return { status: false, data: null, message: "Invalid response format" };
    }

    const result = await response.json();


    if (result._status && result._data) {
      return {
        status: true,
        data: result._data,
        message: result._message,
      };
    } else {
      return {
        status: false,
        data: null,
        message: result._message || "Data not found",
      };
    }
  } catch (error) {
    return {
      status: false,
      data: null,
      message: error.message,
    };
  }
}

// Fetch all project data (matching Pages Router)
async function getProjectData(slug) {
  const params = { slug };

  // Fetch all APIs in parallel
  const [
    projectDetails,
    project360,
    projectAmenity,
    projectLocations,
    projectVideoGallery,
    projectConstructions,
    projectFloors,
    projectGallery,
  ] = await Promise.all([
    fetchAPI("project/details", params),
    fetchAPI("project/360-views", params),
    fetchAPI("project/amentity", params),
    fetchAPI("project/locations", params),
    fetchAPI("project/video-gallery", params),
    fetchAPI("project/constructions", params),
    fetchAPI("project/floor-plans", params),
    fetchAPI("project/gallery", params),
  ]);

  return {
    projectDetails,
    project360,
    projectAmenity,
    projectLocations,
    projectVideoGallery,
    projectConstructions,
    projectFloors,
    projectGallery,
  };
}

export async function generateMetadata({ params }) {
  try {
    const { productSlug } = await params;
    const allData = await getProjectData(productSlug);

    if (
      !allData.projectDetails.status ||
      !allData.projectDetails.data?.getDetails
    ) {
      return {
        title: "Project Not Found - Ashapurna Buildcon",
        description: "The requested project could not be found.",
      };
    }

    const project = allData.projectDetails.data.getDetails;

    // Use meta fields from API if available (like Pages Router)
    const title =
      project.meta_title ||
      `${
        project.name || project.project_name || "Project"
      } - Ashapurna Buildcon`;
    const description =
      project.meta_description ||
      project.description ||
      project.short_description ||
      `Explore ${project.name || "this project"} by Ashapurna Buildcon. ${
        project.location || "Premium property"
      } with modern amenities.`;

    const keywords =
      project.meta_keywords ||
      `${project.name}, ${
        project.location || "jodhpur"
      }, ashapurna project, property in ${
        project.location || "rajasthan"
      }, real estate`;

    // Get featured image from project data
    const featuredImage =
      project.featured_image ||
      project.main_image ||
      `${
        process.env.WEBSITE_URL || "https://ashapurna.com/"
      }assets/projects-page.jpg`;

    // Safely truncate description
    const truncatedDescription = description
      ? description.substring(0, 160)
      : "Ashapurna Buildcon - Premium Real Estate Projects";

    return {
      title,
      description: truncatedDescription,
      keywords,
      openGraph: {
        title,
        description: truncatedDescription,
        url: `${
          process.env.WEBSITE_URL || "https://ashapurna.com/"
        }projects/${productSlug}`,
        siteName: "Ashapurna Buildcon",
        images: [
          {
            url: featuredImage,
            width: 1200,
            height: 630,
            alt: project.name || "Project Image",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: truncatedDescription,
        images: [featuredImage],
      },
      alternates: {
        canonical: `${
          process.env.WEBSITE_URL || "https://ashapurna.com/"
        }projects/${productSlug}`,
      },
      other: {
        "property:price": project.starting_price || project.price || "N/A",
        "property:location": project.location || "Jodhpur",
        "property:type":
          project.property_type || project.category || "Residential",
      },
    };
  } catch (error) {
    return {
      title: "Project - Ashapurna Buildcon",
      description:
        "Explore premium real estate projects by Ashapurna Buildcon.",
    };
  }
}

// Generate static params for all projects (optional - for static generation)
export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://apiservices.ashapurna.com/api/web/project/listing",
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
      return [];
    }

    // Check content type before parsing
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const textResponse = await response.text();
      return [];
    }

    const result = await response.json();

    if (result._status && result._data?.getNewlaunchs) {
      return result._data.getNewlaunchs.map((project) => ({
        productSlug:
          project.slug ||
          project.projectName?.toLowerCase().replace(/\s+/g, "-"),
      }));
    }

    return [];
  } catch (error) {
    return [];
  }
}

export default async function ProjectDetailPage({ params }) {
  try {
    const { productSlug } = await params;

    if (!productSlug) {
      notFound();
    }

    const allData = await getProjectData(productSlug);

    if (!allData.projectDetails.status) {
      console.error("Project details API failed:", allData.projectDetails.message);
      notFound();
    }

    // Extract all data with proper fallbacks
    const projectData = allData?.projectDetails?.data;

    // Validate that we have the required project details
    if (!projectData || !projectData.getDetails) {
      console.error("Project details data missing or invalid structure");
      notFound();
    }

    const project360Data = allData?.project360?.data?.getDetails ?? [];
    const projectAmenityData = allData?.projectAmenity?.data?.getDetails ?? [];
    const projectLocationsData =
      allData?.projectLocations?.data?.getDetails ?? [];
    const projectVideoGalleryData =
      allData?.projectVideoGallery?.data?.getDetails ?? [];
    const projectConstructionsData =
      allData?.projectConstructions?.data?.getDetails ?? {};
    const projectFloorsData = allData?.projectFloors?.data?.getDetails ?? {};
    const projectMasterData =
      allData?.projectDetails?.data?.project_master_plans;
    const projectGalleryData = allData?.projectGallery?.data?.getDetails ?? {};

    return (
      <ProjectDetailClient
        project={projectData?.getDetails}
        projectImagePath={projectData?.project_image_path ?? ""}
        brochureImagePath={projectData?.brochure_image_path ?? ""}
        amenitiesImagePath={projectData?.amenities_image_path ?? ""}
        locationImagePath={projectData?.location_image_path ?? ""}
        sliderImagePath={projectData?.slider_image_path ?? ""}
        glossySliderPath={projectData?.glossy_slider_path ?? ""}
        masterImagePath={projectData?.master_plan_image_path ?? ""}
        videoImagePath={projectData?.video_gallery_image_path ?? ""}
        viewsImagePath={allData?.project360?.data?.views_360_image_path ?? ""}
        viewsGalleryImagePath={projectData?.gallery_views_360_image_path ?? ""}
        floorImagePath={
          allData?.projectFloors?.data?.floor_plan_gallery_image_path ?? ""
        }
        constructionImagePath={
          allData?.projectConstructions?.data
            ?.construction_gallery_image_path ?? ""
        }
        galleryImagePath={
          allData?.projectGallery?.data?.gallery_image_path ?? ""
        }
        project360Data={project360Data}
        projectAmenityData={projectAmenityData}
        projectAmenityImagePath={
          allData?.projectAmenity?.data?.amenities_image_path ?? ""
        }
        projectLocationsData={projectLocationsData}
        projectLocationsImagePath={
          allData?.projectLocations?.data?.location_image_path ?? ""
        }
        projectVideoGalleryData={projectVideoGalleryData}
        projectVideoGalleryImagePath={
          allData?.projectVideoGallery?.data?.video_gallery_image_path ?? ""
        }
        projectConstructionsData={projectConstructionsData}
        projectFloorsData={projectFloorsData}
        projectMasterData={projectMasterData}
        projectGalleryData={projectGalleryData}
        slug={productSlug}
      />
    );
  } catch (error) {
    console.error(`Error loading project ${productSlug}:`, error);
    notFound();
  }
}
