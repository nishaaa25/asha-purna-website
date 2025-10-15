import { defaultMetadata } from '@/lib/helpers/seoHelper';

export const metadata = {
  title: defaultMetadata.investor.title,
  description: defaultMetadata.investor.description,
  keywords: defaultMetadata.investor.keywords,
  openGraph: {
    title: defaultMetadata.investor.title,
    description: defaultMetadata.investor.description,
    url: `${process.env.WEBSITE_URL}investor`,
    siteName: 'Ashapurna Buildcon',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.WEBSITE_URL}investor`,
  },
};

export default function InvestorLayout({ children }) {
  return children;
}



