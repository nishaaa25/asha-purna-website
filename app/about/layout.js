import { getSEOContent, generateMetadata as generateSEOMeta, defaultMetadata } from '@/lib/helpers/seoHelper';

export async function generateMetadata() {
  const seoData = await getSEOContent('about-us');
  
  if (seoData.status && seoData.data) {
    return generateSEOMeta(seoData.data, {
      ...defaultMetadata.about,
      url: `${process.env.WEBSITE_URL}about`,
    });
  }
  
  // Fallback to default
  return {
    title: defaultMetadata.about.title,
    description: defaultMetadata.about.description,
    keywords: defaultMetadata.about.keywords,
    alternates: {
      canonical: `${process.env.WEBSITE_URL}about`,
    },
  };
}

export default function AboutLayout({ children }) {
  return children;
}

