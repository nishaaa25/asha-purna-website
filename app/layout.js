import "./globals.css";
import LenisProvider from "@/components/Hooks/LenisProvider";
import ClientPageTransition from "@/components/ClientPageTransition";
import ScrollToTop from "@/components/pages/ScrollToTop";
import ContactOverlay from "@/components/ContactOverlay";
import HeroBottomBar from "@/components/HeroBottomBar";

// Note: Home page metadata is now fetched from API via getSEOContent('home')
// This is the fallback metadata for all pages
export const metadata = {
  title: "Ashapurna Buildcon - Leading Real Estate Developer in Rajasthan",
  description:
    "Ashapurna Buildcon is one of the leading real estate developers in Rajasthan, offering premium residential, commercial, and hospitality projects across Jodhpur and beyond.",
  keywords:
    "ashapurna, real estate rajasthan, property in jodhpur, flats in jodhpur, villas in jodhpur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://www.youtube.com/iframe_api" async defer></script>
      </head>
      <body className={`antialiased w-full relative overflow-x-hidden`}>
        <LenisProvider>
          <ClientPageTransition>
            <ScrollToTop />
            {children}
            <ContactOverlay />
            <div className="fixed lg:hidden bottom-9 w-full px-1 z-90">
              <HeroBottomBar
                btnOneLink="tel:9314041747"
                btnTwoLink="https://wa.me/919314041747?text=Hi%2C%20I%27m%20interested%20in%20your%20property!"
                btnOneText="Call Us"
                btnTwoText="Chat Now"
              />
            </div>
          </ClientPageTransition>
        </LenisProvider>
      </body>
    </html>
  );
}
