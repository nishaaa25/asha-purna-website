"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMediaOpen, setMobileMediaOpen] = useState(false);
  const pathname = usePathname();
  const mobileRef = useRef(null);

  // Scroll logic
  useEffect(() => {
    const alwaysScrolledPages = ["/rera-disclaimer", "/blogs"];
    if (alwaysScrolledPages.includes(pathname)) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // OPEN animation
  useEffect(() => {
    if (mobileOpen && mobileRef.current) {
      gsap.fromTo(
        mobileRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.45, ease: "power3.out" }
      );
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "unset";
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  // CLOSE animation
  const closeMobile = () => {
    if (!mobileRef.current) return;

    gsap.to(mobileRef.current, {
      y: "-100%",
      opacity: 0,
      duration: 0.45,
      ease: "power3.in",
      onComplete: () => {
        setMobileOpen(false);
        setMobileMediaOpen(false);
      },
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[120] ${
        isScrolled ? "bg-white text-white lg:text-black shadow-md" : "bg-transparent text-white"
      }`}
    >
      <div className="relative mx-auto flex justify-end items-center px-5 md:px-8 lg:px-12 py-3 lg:py-6">
        {/* LOGO */}
        <div
          className={`absolute left-5 md:left-8 lg:left-12 pt-6 -top-4 ${
            isScrolled ? "bg-white scale-110 shadow-md" : "bg-transparent scale-100"
          }`}
        >
          <Link
            href="/"
            className="relative w-24 h-18 lg:w-44 lg:h-32 flex items-center justify-center"
          >
            <Image
              key={isScrolled ? "dark" : "light"}
              src={
                isScrolled
                  ? "/assets/dark-logo.svg"
                  : "https://d3qnldyv492i08.cloudfront.net/ashapurna-new-logo.svg"
              }
              alt="main-logo"
              fill
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div
          className={`hidden lg:flex items-center transition-all ${
            isScrolled ? "pb-0" : "pb-8"
          }`}
        >
          <ul className="flex gap-[60px] items-center">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Projects", href: "/projects" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  href={item.href}
                  className="font-medium text-lg hover:opacity-70 transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Media Dropdown */}
            <li className="relative group">
              <span className="font-medium text-lg flex items-center gap-1 cursor-pointer">
                Media
                <Image src="/assets/dropdown.svg" alt="Dropdown" width={14} height={7} />
              </span>

              <ul
                className={`absolute top-full left-0 mt-2 w-40 rounded-md opacity-0 invisible translate-y-2 
                  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all 
                  ${isScrolled ? "bg-black" : "bg-black/80"}`}
              >
                {[
                  { href: "/news", label: "News" },
                  { href: "/events", label: "Events" },
                  { href: "/awards", label: "Awards" },
                  { href: "/blogs", label: "Blogs" },
                  { href: "/NRIcorner", label: "NRI Corner" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="block px-4 py-2 text-white hover:bg-gray-700 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link href="/careers" className="font-medium text-lg hover:opacity-70">
                Careers
              </Link>
            </li>

            <li>
              <Link href="/contact" className="font-medium text-lg hover:opacity-70">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-7 h-7 relative"
            aria-label="Toggle menu"
          >
            <Image
              src="/assets/menu-bar.svg"
              alt="menu"
              fill
              className={`object-contain transition ${isScrolled ? "invert" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <div
        ref={mobileRef}
        style={{ display: mobileOpen ? "block" : "none" }}
        className="fixed inset-0 z-[140] bg-black/30 backdrop-blur-2xl lg:hidden overflow-x-hidden"
      >
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex justify-between items-start p-6 w-full">
          <Link href="/" onClick={closeMobile}>
            <div className="w-25 h-22 relative">
              <Image
                src="https://d3qnldyv492i08.cloudfront.net/ashapurna-new-logo.svg"
                alt="main-logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <button onClick={closeMobile} className="w-6 h-6 relative">
            <Image src="/assets/cross.svg" alt="Close" fill className="object-contain" />
          </button>
        </div>
        {/* MOBILE LINKS */}
        <nav className="px-6 overflow-y-auto max-h-[70vh]">
          <ul className="space-y-12">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About Us" },
              { href: "/projects", label: "Projects" },
            ].map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  onClick={closeMobile}
                  className="block p-[10px] text-[15px] border-b border-white/30"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Media Dropdown */}
            <li>
              <button
                onClick={() => setMobileMediaOpen(!mobileMediaOpen)}
                className="w-full flex justify-between items-center p-[10px] text-[15px] border-b border-white/30"
              >
                <span>Media</span>
                <Image
                  src="/assets/dropdown.svg"
                  alt="Dropdown"
                  width={16}
                  height={16}
                  className={`transition ${mobileMediaOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileMediaOpen && (
                <div className="mt-4 space-y-3 pr-2">
                  {[
                    { href: "/news", label: "News" },
                    { href: "/events", label: "Events" },
                    { href: "/blogs", label: "Blogs" },
                    { href: "/awards", label: "Awards" },
                    { href: "/NRIcorner", label: "NRI Corner" },
                  ].map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      onClick={closeMobile}
                      className="block p-[10px] text-[15px]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link
                href="/careers"
                onClick={closeMobile}
                className="block p-[10px] text-[15px] border-b border-white/30"
              >
                Careers
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                onClick={closeMobile}
                className="block p-[10px] text-[15px] border-b border-white/30"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  );
}
