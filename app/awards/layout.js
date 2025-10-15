import { defaultMetadata } from '@/lib/helpers/seoHelper';

export const metadata = {
  title: defaultMetadata.awards.title,
  description: defaultMetadata.awards.description,
  keywords: defaultMetadata.awards.keywords,
  openGraph: {
    title: defaultMetadata.awards.title,
    description: defaultMetadata.awards.description,
    url: `${process.env.WEBSITE_URL}awards`,
    siteName: 'Ashapurna Buildcon',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.WEBSITE_URL}awards`,
  },
};

export default function AwardsLayout({ children }) {
  return children;
}



