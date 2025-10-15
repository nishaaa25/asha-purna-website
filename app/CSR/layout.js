import { defaultMetadata } from '@/lib/helpers/seoHelper';

export const metadata = {
  title: defaultMetadata.csr.title,
  description: defaultMetadata.csr.description,
  keywords: defaultMetadata.csr.keywords,
  openGraph: {
    title: defaultMetadata.csr.title,
    description: defaultMetadata.csr.description,
    url: `${process.env.WEBSITE_URL}CSR`,
    siteName: 'Ashapurna Buildcon',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.WEBSITE_URL}CSR`,
  },
};

export default function CSRLayout({ children }) {
  return children;
}



