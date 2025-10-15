import { defaultMetadata } from '@/lib/helpers/seoHelper';

export const metadata = {
  title: defaultMetadata.rera.title,
  description: defaultMetadata.rera.description,
  keywords: defaultMetadata.rera.keywords,
  openGraph: {
    title: defaultMetadata.rera.title,
    description: defaultMetadata.rera.description,
    url: `${process.env.WEBSITE_URL}rera-disclaimer`,
    siteName: 'Ashapurna Buildcon',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.WEBSITE_URL}rera-disclaimer`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReraLayout({ children }) {
  return children;
}



