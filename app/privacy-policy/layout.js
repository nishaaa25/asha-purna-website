import { defaultMetadata } from '@/lib/helpers/seoHelper';

export const metadata = {
  title: defaultMetadata.privacy.title,
  description: defaultMetadata.privacy.description,
  keywords: defaultMetadata.privacy.keywords,
  openGraph: {
    title: defaultMetadata.privacy.title,
    description: defaultMetadata.privacy.description,
    url: `${process.env.WEBSITE_URL}privacy-policy`,
    siteName: 'Ashapurna Buildcon',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.WEBSITE_URL}privacy-policy`,
  },
};

export default function PrivacyLayout({ children }) {
  return children;
}



