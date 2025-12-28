/**
 * Home Page Data Service
 * Fetches all homepage data including featured projects
 */

/**
 * Fetch complete home page data
 * @returns {Object} Home page data
 */
export async function getHomeData() {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}${process.env.HOME_API}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-version': 'v1',
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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
        message: result._message || 'Failed to fetch home data',
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
 * Extract featured projects from home data
 * @param {Object} homeData - Complete home data
 * @returns {Object} Featured projects with image paths
 */
export function getFeaturedProjects(homeData) {
  if (!homeData) return null;

  return {
    projects: homeData.getFeaturedProjects || [],
    projectImagePath: homeData.project_image_path || '',
    amenityImagePath: homeData.amenities_image_path || '',
    homePage: homeData.getHomePage || {},
  };
}

/**
 * Extract all projects from home data
 * @param {Object} homeData - Complete home data
 * @returns {Object} All projects with image path
 */
export function getAllProjects(homeData) {
  if (!homeData) return null;

  return {
    projects: homeData.getProjects || [],
    projectImagePath: homeData.project_image_path || '',
    homePage: homeData.getHomePage || {},
  };
}

/**
 * Extract testimonials from home data
 * @param {Object} homeData - Complete home data
 * @returns {Object} Testimonials with image path
 */
export function getTestimonials(homeData) {
  if (!homeData) return null;

  return {
    testimonials: homeData.getTestimonials || [],
    imagePath: homeData.testimonial_image_path || '',
    homePage: homeData.getHomePage || {},
  };
}

/**
 * Extract about us content from home data
 * @param {Object} homeData - Complete home data
 * @returns {Object} About us content with image path
 */
export function getAboutUs(homeData) {
  if (!homeData) return null;

  return {
    aboutUs: homeData.aboutUs || {},
    imagePath: homeData.about_us_image_path || '',
    features: homeData.getHomePage || {},
    featureImagePath: homeData.home_page_image_path || '',
  };
}

/**
 * Extract why choose us content from home data
 * @param {Object} homeData - Complete home data
 * @returns {Object} Why choose us content with image path
 */
export function getWhyChooseUs(homeData) {
  if (!homeData) return null;

  return {
    whyChooseUs: homeData.getWhyChooseUs || [],
    imagePath: homeData.why_choose_us_image_path || '',
    homePage: homeData.getHomePage || {},
  };
}

/**
 * Extract sliders/banners from home data
 * @param {Object} homeData - Complete home data
 * @returns {Object} Sliders with image path
 */
export function getSliders(homeData) {
  if (!homeData) return null;

  return {
    sliders: homeData.getSliders || [],
    imagePath: homeData.slider_image_path || '',
  };
}

/**
 * Extract media/events from home data
 * @param {Object} homeData - Complete home data
 * @returns {Object} Media events with image path
 */
export function getMediaEvents(homeData) {
  if (!homeData) return null;

  return {
    events: homeData.getUtsavCamps || [],
    imagePath: homeData.utsav_camps_image_path || '',
  };
}



