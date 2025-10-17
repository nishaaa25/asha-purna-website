"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientChrome({ children }) {
  const pathname = usePathname();
  const isBlogsRoute = pathname?.startsWith("/blogs");

  return (
    <>
      {!isBlogsRoute && <Navbar />}
      <div>{children}</div>
      {!isBlogsRoute && <Footer />}
    </>
  );
}


