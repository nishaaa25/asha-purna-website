import { notFound } from "next/navigation";
import SlugPageClient from "./SlugPageClient";
import { headerContent } from "@/lib/content";

async function getData(slug) {
  try {
    const response = await fetch(
      "https://apiservices.ashapurna.com/api/web/project/listing",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-version": "v1",
        },
        body: JSON.stringify({ slug }),
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    // Check if response is OK and is JSON
    if (!response.ok) {
      console.error(`API returned status ${response.status}`);
      return {
        status: false,
        data: [],
        imagePath: "",
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
        data: [],
        imagePath: "",
        message: "Invalid response format",
      };
    }

    const result = await response.json();

    if (result._status) {
      return {
        status: true,
        data: result._data?.getNewlaunchs || [],
        imagePath: result._data?.project_image_path || "",
        message: result._message,
      };
    } else {
      return {
        status: false,
        data: [],
        imagePath: "",
        message: result._message,
      };
    }
  } catch (error) {
    console.error("API Error:", error);
    return {
      status: false,
      data: [],
      imagePath: "",
      message: error.message,
    };
  }
}

export async function generateMetadata({ params }) {
  const { slugPage } = await params;
  const slug = slugPage;
  
  // Find header content for this slug
  const key = slug === "renewable" ? "windmills" : slug?.toLowerCase();
  const headerData = headerContent.find(
    (item) => item.type.toLowerCase().replace(/\s+/g, "-") === key
  );

  if (!headerData) {
    return {
      title: 'Page Not Found - Ashapurna Buildcon',
    };
  }

  const title = `${headerData.type} Projects - Ashapurna Buildcon`;
  const description = headerData.desc || `Explore our premium ${headerData.type} projects in Rajasthan. Quality construction with modern amenities by Ashapurna Buildcon.`;
  const keywords = `${headerData.type} projects, ashapurna ${slug}, property in jodhpur, real estate rajasthan`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${process.env.WEBSITE_URL}${slug}`,
      siteName: 'Ashapurna Buildcon',
      images: [
        {
          url: `${process.env.WEBSITE_URL}assets/projects-page.jpg`,
          width: 1200,
          height: 630,
          alt: `${headerData.type} Projects`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${process.env.WEBSITE_URL}assets/projects-page.jpg`],
    },
    alternates: {
      canonical: `${process.env.WEBSITE_URL}${slug}`,
    },
  };
}

export default async function SlugPage({ params }) {
  const { slugPage } = await params;
  const slug = slugPage;
  
  // Validate slug
  const key = slug === "renewable" ? "windmills" : slug?.toLowerCase();
  const headerData = headerContent.find(
    (item) => item.type.toLowerCase().replace(/\s+/g, "-") === key
  );

  if (!headerData) {
    notFound();
  }

  // Fetch data
  const result = await getData(slug);

  return (
    <SlugPageClient
      initialData={result.data}
      imagePath={result.imagePath}
      slug={slug}
    />
  );
}
