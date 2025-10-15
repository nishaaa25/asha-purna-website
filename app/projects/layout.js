import { defaultMetadata } from '@/lib/helpers/seoHelper';

export const metadata = {
  title: defaultMetadata.projects.title,
  description: defaultMetadata.projects.description,
  keywords: defaultMetadata.projects.keywords,
  openGraph: {
    title: defaultMetadata.projects.title,
    description: defaultMetadata.projects.description,
    url: `${process.env.WEBSITE_URL}projects`,
    siteName: 'Ashapurna Buildcon',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultMetadata.projects.title,
    description: defaultMetadata.projects.description,
  },
  alternates: {
    canonical: `${process.env.WEBSITE_URL}projects`,
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}



