import { getSEOContent, generateMetadata as generateSEOMeta, defaultMetadata } from '@/lib/helpers/seoHelper';

export async function generateMetadata() {
  const seoData = await getSEOContent('contact-us');
  
  if (seoData.status && seoData.data) {
    return generateSEOMeta(seoData.data, {
      ...defaultMetadata.contact,
      url: `${process.env.WEBSITE_URL}contact`,
    });
  }
  
  // Fallback to default
  return {
    title: defaultMetadata.contact.title,
    description: defaultMetadata.contact.description,
    keywords: defaultMetadata.contact.keywords,
    alternates: {
      canonical: `${process.env.WEBSITE_URL}contact`,
    },
  };
}

export default function ContactLayout({ children }) {
  return children;
}

