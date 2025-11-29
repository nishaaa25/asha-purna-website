import { notFound } from "next/navigation";
import NewsDetailClient from "./NewsDetailClient";

async function fetchNewsDetail(slug) {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}${process.env.MEDIA_EVENT_DETAIL_API}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-version": "v1",
        },
        body: JSON.stringify({ slug }),
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return { status: false, data: null };
    }

    const result = await response.json();
    return {
      status: result._status || false,
      data: result._data || null,
    };
  } catch (error) {
    return { status: false, data: null };
  }
}

async function fetchAllNews() {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}${process.env.MEDIA_EVENT_API}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-version": "v1",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    return result._data?.getUtsavCamps || [];
  } catch (error) {
    return [];
  }
}

async function fetchUpcomingProjects() {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}project/listing`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-version": "v1",
        },
        body: JSON.stringify({}),
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    return result._data?.getUpcomingProjects || [];
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const { newsSlug } = await params;
    const result = await fetchNewsDetail(newsSlug);

    if (!result.status || !result.data?.getDetails) {
      return {
        title: "News Not Found | Ashapurna Buildcon",
        description: "The news article you are looking for could not be found.",
      };
    }

    const newsItem = result.data.getDetails;
    const imagePath = result.data.utsav_camps_image_path || "";

    return {
      title: `${newsItem.title} | Ashapurna Buildcon`,
      description: newsItem.short_description || newsItem.description || "",
      openGraph: {
        title: newsItem.title,
        description: newsItem.short_description || newsItem.description || "",
        images: newsItem.image ? [imagePath + newsItem.image] : [],
      },
    };
  } catch (error) {
    return {
      title: "News | Ashapurna Buildcon",
      description: "Discover our latest news and updates",
    };
  }
}

export async function generateStaticParams() {
  try {
    const newsItems = await fetchAllNews();

    return newsItems.map((news) => ({
      newsSlug: news.slug || `news-${news.id}`,
    }));
  } catch (error) {
    return [];
  }
}

export default async function NewsDetailPage({ params }) {
  try {
    const { newsSlug } = await params;

    if (!newsSlug) {
      notFound();
    }

    // Fetch all data in parallel
    const [result, upcomingProjects] = await Promise.all([
      fetchNewsDetail(newsSlug),
      fetchUpcomingProjects(),
    ]);

    if (!result.status || !result.data?.getDetails) {
      notFound();
    }

    const newsItem = result.data.getDetails;
    const imagePath = result.data.utsav_camps_image_path || "";
    const recentNews = result.data.getRecentEvents || [];

    // Gallery images from news
    const galleryImages = newsItem.utsav_camp_images || [];

    return (
      <NewsDetailClient
        news={newsItem}
        imagePath={imagePath}
        galleryImages={galleryImages}
        recentNews={recentNews}
        upcomingProjects={upcomingProjects}
        slug={newsSlug}
      />
    );
  } catch (error) {
    notFound();
  }
}
