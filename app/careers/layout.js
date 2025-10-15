import { defaultMetadata } from '@/lib/helpers/seoHelper';

export const metadata = {
  title: defaultMetadata.careers.title,
  description: defaultMetadata.careers.description,
  keywords: defaultMetadata.careers.keywords,
  openGraph: {
    title: defaultMetadata.careers.title,
    description: defaultMetadata.careers.description,
    url: `${process.env.WEBSITE_URL}careers`,
    siteName: 'Ashapurna Buildcon',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.WEBSITE_URL}careers`,
  },
};

export default function CareersLayout({ children }) {
  return children;
}



