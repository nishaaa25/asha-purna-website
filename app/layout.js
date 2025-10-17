import "./globals.css";
import LenisProvider from "@/components/Hooks/LenisProvider";
import AppProviders from "@/contexts/AppProviders";
import ClientPageTransition from "@/components/ClientPageTransition";

// Note: Home page metadata is now fetched from API via getSEOContent('home')
// This is the fallback metadata for all pages
export const metadata = {
  title: "Ashapurna Buildcon - Leading Real Estate Developer in Rajasthan",
  description: "Ashapurna Buildcon is one of the leading real estate developers in Rajasthan, offering premium residential, commercial, and hospitality projects across Jodhpur and beyond.",
  keywords: "ashapurna, real estate rajasthan, property in jodhpur, flats in jodhpur, villas in jodhpur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased w-screen relative overflow-x-hidden`}>
        <AppProviders>
          <LenisProvider>
            <ClientPageTransition>
              {children}
            </ClientPageTransition>
          </LenisProvider>
        </AppProviders>
      </body>
    </html>
  );
}
