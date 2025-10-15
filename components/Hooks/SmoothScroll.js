"use client";

// This component is now deprecated in favor of LenisProvider
// Kept for backwards compatibility but does nothing
export default function SmoothScrollProvider({ children }) {
  // No-op - LenisProvider handles all smooth scrolling
  return <>{children}</>;
}
