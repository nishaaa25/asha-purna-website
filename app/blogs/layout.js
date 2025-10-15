import { defaultMetadata } from '@/lib/helpers/seoHelper';

export const metadata = {
  title: defaultMetadata.blogs.title,
  description: defaultMetadata.blogs.description,
  keywords: defaultMetadata.blogs.keywords,
  openGraph: {
    title: defaultMetadata.blogs.title,
    description: defaultMetadata.blogs.description,
    url: `${process.env.WEBSITE_URL}blogs`,
    siteName: 'Ashapurna Buildcon',
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.WEBSITE_URL}blogs`,
  },
};

export default function BlogsLayout({ children }) {
  return children;
}



