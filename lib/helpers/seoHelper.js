/**
 * SEO Helper Functions
 * Fetch and manage SEO metadata for pages
 */

/**
 * Fetch SEO content from API
 * @param {string} slug - Page slug
 * @returns {Object} SEO data
 */
export async function getSEOContent(slug) {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}${process.env.SEO_CONTENT_API}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-version': 'v1',
        },
        body: JSON.stringify({ slug }),
      }
    );

    // Check if response is ok
    if (!response.ok) {
      return {
        status: false,
        data: null,
        message: `API returned ${response.status}`,
      };
    }

    // Check content type before parsing
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return {
        status: false,
        data: null,
        message: 'Non-JSON response from API',
      };
    }

    const result = await response.json();

    if (result._status) {
      return {
        status: true,
        data: result._data,
        message: result._message,
      };
    } else {
      return {
        status: false,
        data: null,
        message: result._message || 'API returned false status',
      };
    }
  } catch (error) {
    return {
      status: false,
      data: null,
      message: error.message,
    };
  }
}

/**
 * Generate metadata object for Next.js
 * @param {Object} seoData - SEO data from API
 * @param {Object} fallback - Fallback metadata
 * @returns {Object} Metadata object
 */
export function generateMetadata(seoData, fallback = {}) {
  const title = seoData?.meta_title || fallback.title || 'Ashapurna Buildcon';
  const description = seoData?.meta_description || fallback.description || 'Leading Real Estate Developer in Rajasthan';
  const keywords = seoData?.meta_keywords || fallback.keywords || 'real estate, rajasthan, jodhpur, property';
  const ogImage = seoData?.og_image || fallback.image || '/assets/main-logo.png';
  const url = seoData?.canonical_url || fallback.url || process.env.WEBSITE_URL;

  return {
    title,
    description,
    keywords,
    
    // Open Graph
    openGraph: {
      title,
      description,
      url,
      siteName: 'Ashapurna Buildcon',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@ashapurna',
    },

    // Additional metadata
    robots: {
      index: seoData?.index !== false,
      follow: seoData?.follow !== false,
      googleBot: {
        index: seoData?.index !== false,
        follow: seoData?.follow !== false,
      },
    },

    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Other meta tags
    other: {
      'og:locale': 'en_IN',
      'og:site_name': 'Ashapurna Buildcon',
    },
  };
}

/**
 * Default fallback metadata for different page types
 */
export const defaultMetadata = {
  home: {
    title: 'Ashapurna Buildcon - Leading Real Estate Developer in Rajasthan',
    description: 'Discover premium residential, commercial, and hospitality projects by Ashapurna Buildcon. Over 30 years of trust in Jodhpur and Rajasthan.',
    keywords: 'ashapurna, real estate rajasthan, property in jodhpur, flats in jodhpur, villas in jodhpur',
  },
  
  projects: {
    title: 'Our Projects - Ashapurna Buildcon',
    description: 'Explore our premium residential, commercial, and hospitality projects across Rajasthan. Quality construction with modern amenities.',
    keywords: 'ashapurna projects, residential projects, commercial projects, jodhpur real estate',
  },

  about: {
    title: 'About Us - Ashapurna Buildcon',
    description: 'Learn about Ashapurna Buildcon\'s 30+ year journey in real estate development. Building trust, creating communities since 1996.',
    keywords: 'about ashapurna, real estate developer, rajasthan builder, jodhpur property developer',
  },

  contact: {
    title: 'Contact Us - Ashapurna Buildcon',
    description: 'Get in touch with Ashapurna Buildcon. Contact our team for property enquiries, site visits, and more.',
    keywords: 'contact ashapurna, property enquiry, real estate contact jodhpur',
  },

  careers: {
    title: 'Careers - Join Ashapurna Buildcon',
    description: 'Explore career opportunities at Ashapurna Buildcon. Join our team and build your future with us.',
    keywords: 'ashapurna careers, jobs in real estate, jodhpur jobs, rajasthan careers',
  },

  csr: {
    title: 'CSR - Corporate Social Responsibility | Ashapurna',
    description: 'Ashapurna\'s commitment to society through healthcare, education, community development, and environmental initiatives.',
    keywords: 'ashapurna csr, social responsibility, community development, education initiatives',
  },

  investor: {
    title: 'Investor Club - Ashapurna Buildcon',
    description: 'Join the Ashapurna Investor Club and explore lucrative real estate investment opportunities in Rajasthan.',
    keywords: 'investment opportunities, real estate investment, ashapurna investor club',
  },

  nri: {
    title: 'NRI Corner - Property Investment for NRIs | Ashapurna',
    description: 'Hassle-free property investment for NRIs. Invest in Rajasthan real estate with complete transparency and trust.',
    keywords: 'nri property investment, nri real estate india, property for nri, jodhpur property nri',
  },

  blogs: {
    title: 'News & Media - Ashapurna Buildcon',
    description: 'Latest news, media coverage, and updates from Ashapurna Buildcon. Stay informed about our projects and initiatives.',
    keywords: 'ashapurna news, real estate news, property updates, media coverage',
  },

  awards: {
    title: 'Awards & Recognition - Ashapurna Buildcon',
    description: 'Ashapurna Buildcon\'s awards and recognition for excellence in real estate development and customer satisfaction.',
    keywords: 'ashapurna awards, real estate awards, recognition, excellence',
  },

  rera: {
    title: 'RERA Disclaimer - Ashapurna Buildcon',
    description: 'RERA compliance and disclaimer information for Ashapurna Buildcon projects.',
    keywords: 'rera disclaimer, rera compliance, real estate regulation',
  },

  privacy: {
    title: 'Privacy Policy - Ashapurna Buildcon',
    description: 'Read our privacy policy to understand how we collect, use, and protect your personal information.',
    keywords: 'privacy policy, data protection, user privacy',
  },

  terms: {
    title: 'Terms & Conditions - Ashapurna Buildcon',
    description: 'Terms and conditions for using Ashapurna Buildcon website and services.',
    keywords: 'terms and conditions, terms of use, legal terms',
  },
};

/**
 * Generate JSON-LD structured data for better SEO
 * @param {string} type - Type of structured data
 * @param {Object} data - Data for structured markup
 * @returns {Object} JSON-LD object
 */
export function generateStructuredData(type, data = {}) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
  };

  switch (type) {
    case 'organization':
      return {
        ...baseStructuredData,
        '@type': 'Organization',
        name: 'Ashapurna Buildcon',
        url: process.env.WEBSITE_URL,
        logo: `${process.env.WEBSITE_URL}assets/main-logo.png`,
        description: 'Leading Real Estate Developer in Rajasthan',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Jodhpur',
          addressRegion: 'Rajasthan',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          telephone: '+91-XXX-XXX-XXXX',
          email: 'info@ashapurna.com',
        },
        sameAs: [
          'https://www.facebook.com/ashapurna',
          'https://www.instagram.com/ashapurna',
          'https://www.linkedin.com/company/ashapurna',
          'https://www.youtube.com/ashapurna',
        ],
      };

    case 'realestate':
      return {
        ...baseStructuredData,
        '@type': 'RealEstateAgent',
        name: data.name || 'Ashapurna Buildcon',
        description: data.description,
        address: data.address,
        priceRange: data.priceRange,
      };

    case 'breadcrumb':
      return {
        ...baseStructuredData,
        '@type': 'BreadcrumbList',
        itemListElement: data.items?.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })) || [],
      };

    case 'product':
      return {
        ...baseStructuredData,
        '@type': 'Product',
        name: data.name,
        description: data.description,
        image: data.image,
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
      };

    default:
      return baseStructuredData;
  }
}

