"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Instantly jump to the top whenever the route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
