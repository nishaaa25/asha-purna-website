"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientPageTransition({ children }) {
  const pathname = usePathname();

  return (
    <>
      <Navbar key={`nav-${pathname}`} />
      <div key={`content-${pathname}`} className="page-fade-in">
        {children}
        <Footer />
      </div>
    </>
  );
}


