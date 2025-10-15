import { defaultMetadata } from '@/lib/helpers/seoHelper';

export const metadata = {
  title: defaultMetadata.terms.title,
  description: defaultMetadata.terms.description,
  keywords: defaultMetadata.terms.keywords,
  openGraph: {
    title: defaultMetadata.terms.title,
    description: defaultMetadata.terms.description,
    url: `${process.env.WEBSITE_URL}terms-conditions`,
    siteName: 'Ashapurna Buildcon',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.WEBSITE_URL}terms-conditions`,
  },
};

export default function TermsLayout({ children }) {
  return children;
}



