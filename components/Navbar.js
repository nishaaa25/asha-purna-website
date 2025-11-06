"use client";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[110] transition-colors duration-200 ease-in-out ${
        isScrolled
          ? "bg-white text-black shadow-md"
          : "bg-transparent text-white shadow-none"
      }`}
    >
      <div className="relative mx-auto flex justify-end items-center px-5 md:px-8 lg:px-12 py-5 lg:py-8 transition-all duration-200 ease-in-out">
        {/* LOGO */}
        <div
          className={`absolute left-3 md:left-8 lg:left-12 pt-6 -top-4   ${
            isScrolled ? "lg:bg-white  scale-[1.02] lg:shadow-md" : "bg-transparent scale-100"
          }`}
        >
          <Link
            href="/"
            className={`relative w-24 h-14 lg:w-44 lg:h-32 flex items-center justify-center  overflow-hidden transition-all duration-200 ease-in-out `}
          >
            <Image
              key={isScrolled ? "dark" : "light"} // clean re-render on swap
              src={
                isScrolled ? "/assets/logo-dark.svg" : "/assets/logo-light.svg"
              }
              alt="main-logo"
              fill
              priority
              className="object-contain transition-opacity duration-200 ease-in-out"
            />
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div
          className={`hidden ${
            isScrolled ? "pb-0" : "pb-8"
          } lg:flex items-center transition-all duration-200 ease-in-out`}
        >
          <ul className="flex gap-[60px] items-center">
            {["Home", "About Us", "Projects"].map((item, idx) => (
              <li key={idx}>
                <Link
                  href={`/${
                    item === "Home"
                      ? ""
                      : item === "About Us"
                      ? "about"
                      : item.toLowerCase().replace(/\s+/g, "")
                  }`}
                  className="font-medium text-lg leading-[100%] hover:opacity-70 transition-opacity duration-200"
                >
                  {item}
                </Link>
              </li>
            ))}

            <li className="relative group">
              <span className="font-medium text-lg flex items-center gap-1 cursor-pointer">
                Media
                <Image
                  src="/assets/dropdown.svg"
                  alt="Dropdown"
                  width={14}
                  height={7}
                />
              </span>
              <ul
                className={`absolute top-full left-0 mt-2 w-40 rounded-md overflow-hidden opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 invisible group-hover:visible transition-all duration-200 ease-in-out ${
                  isScrolled ? "bg-black" : "bg-black/80"
                }`}
              >
                {[
                  { href: "/news&events", label: "Events" },
                  { href: "/awards", label: "Awards" },
                  { href: "/blogs", label: "Blogs" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="block px-4 py-2 font-medium text-base text-white hover:bg-gray-700 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link
                href="/contact"
                className="font-medium text-lg leading-[100%] hover:opacity-70 transition-opacity duration-200"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* MOBILE NAV */}
        <MobileNav isScrolled={isScrolled} />
      </div>
    </nav>
  );
}
