import { defaultMetadata } from '@/lib/helpers/seoHelper';

export const metadata = {
  title: defaultMetadata.nri.title,
  description: defaultMetadata.nri.description,
  keywords: defaultMetadata.nri.keywords,
  openGraph: {
    title: defaultMetadata.nri.title,
    description: defaultMetadata.nri.description,
    url: `${process.env.WEBSITE_URL}NRIcorner`,
    siteName: 'Ashapurna Buildcon',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.WEBSITE_URL}NRIcorner`,
  },
};

export default function NRICornerLayout({ children }) {
  return children;
}



