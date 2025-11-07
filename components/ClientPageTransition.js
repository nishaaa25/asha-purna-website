"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientPageTransition({ children }) {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    setShowNavbar(false); // reset when path changes
    const timer = setTimeout(() => setShowNavbar(true), 300); // delay for navbar
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <div key={`content-${pathname}`} className="page-fade-in">
        {children}
        <Footer />
      </div>
      {showNavbar && <Navbar key={`nav-${pathname}`}  />}
    </>
  );
}
