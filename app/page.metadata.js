// Metadata for home page
import { defaultMetadata } from '@/lib/helpers/seoHelper';

export const metadata = {
  title: defaultMetadata.home.title,
  description: defaultMetadata.home.description,
  keywords: defaultMetadata.home.keywords,
  openGraph: {
    title: defaultMetadata.home.title,
    description: defaultMetadata.home.description,
    url: process.env.WEBSITE_URL,
    siteName: 'Ashapurna Buildcon',
    images: [
      {
        url: `${process.env.WEBSITE_URL}assets/main-logo.png`,
        width: 1200,
        height: 630,
        alt: 'Ashapurna Buildcon - Leading Real Estate Developer',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultMetadata.home.title,
    description: defaultMetadata.home.description,
    images: [`${process.env.WEBSITE_URL}assets/main-logo.png`],
  },
  alternates: {
    canonical: process.env.WEBSITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};



