import { notFound } from "next/navigation";
import EventDetailClient from "./EventDetailClient";

async function fetchEventDetail(slug) {
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
    console.error("Error fetching event detail:", error);
    return { status: false, data: null };
  }
}

async function fetchAllEvents() {
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
    console.error("Error fetching events:", error);
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
    console.error("Error fetching upcoming projects:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const { eventSlug } = await params;
    const result = await fetchEventDetail(eventSlug);

    if (!result.status || !result.data?.getDetails) {
      return {
        title: "Event Not Found | Ashapurna Buildcon",
        description: "The event you are looking for could not be found.",
      };
    }

    const event = result.data.getDetails;
    const imagePath = result.data.utsav_camps_image_path || "";

    return {
      title: `${event.title} | Ashapurna Buildcon`,
      description: event.short_description || event.description || "",
      openGraph: {
        title: event.title,
        description: event.short_description || event.description || "",
        images: event.image ? [imagePath + event.image] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Event | Ashapurna Buildcon",
      description: "Discover our events and celebrations",
    };
  }
}

export async function generateStaticParams() {
  try {
    const events = await fetchAllEvents();
    
    return events.map((event) => ({
      eventSlug: event.slug || `event-${event.id}`,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function EventDetailPage({ params }) {
  try {
    const { eventSlug } = await params;
    
    if (!eventSlug) {
      notFound();
    }

    // Fetch all data in parallel
    const [result, upcomingProjects] = await Promise.all([
      fetchEventDetail(eventSlug),
      fetchUpcomingProjects(),
    ]);

    if (!result.status || !result.data?.getDetails) {
      notFound();
    }

    const event = result.data.getDetails;
    const imagePath = result.data.utsav_camps_image_path || "";
    const recentEvents = result.data.getRecentEvents || [];
    
    // Gallery images from event
    const galleryImages = event.utsav_camp_images || [];

    return (
      <EventDetailClient
        event={event}
        imagePath={imagePath}
        galleryImages={galleryImages}
        recentEvents={recentEvents}
        upcomingProjects={upcomingProjects}
        slug={eventSlug}
      />
    );
  } catch (error) {
    console.error("Error in EventDetailPage:", error);
    notFound();
  }
}

