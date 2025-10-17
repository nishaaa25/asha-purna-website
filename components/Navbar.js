"use client";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[110] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isScrolled
          ? "bg-white/90 text-black shadow-md"
          : "bg-transparent text-white shadow-none"
      }`}
    >
      <div className=" mx-auto flex justify-between items-center px-5 md:px-8 lg:px-12 py-4 transition-all duration-700 ease-in-out">
        {/* LOGO */}
        <Link
          href="/"
          className={`relative transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isScrolled
              ? "w-28 h-12 lg:w-28 lg:h-16 scale-95"
              : "w-28 h-12 lg:w-44 lg:h-32 scale-100"
          }`}
        >
          <Image
            src={
              isScrolled ? "/assets/logo-dark.svg" : "/assets/logo-light.svg"
            }
            alt="main-logo"
            fill
            className="object-contain transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
          />
        </Link>

        {/* DESKTOP NAV */}
        <div
          className={`hidden ${
            isScrolled ? "pb-0" : "pb-8"
          } lg:flex items-center transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]`}
        >
          <ul className="flex gap-[60px] items-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
            {["Home", "About Us", "Projects"].map((item, idx) => (
              <li key={idx}>
                <Link
                  href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
                  className="font-medium text-lg leading-[100%] hover:opacity-70 transition-opacity duration-300"
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
                className={`absolute top-full left-0 mt-2 w-40 rounded-md overflow-hidden opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 invisible group-hover:visible transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isScrolled ? "bg-black" : "bg-black/80"
                }`}
              >
                {[
                  { href: "/news&events", label: "Events" },
                  { href: "/awards", label: "Awards" },
                  { href: "https://ashapurna.com/blog/", label: "Blogs" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="block px-4 py-2 font-medium text-base text-white hover:bg-gray-700 transition-colors duration-300"
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
                className="font-medium text-lg leading-[100%] hover:opacity-70 transition-opacity duration-300"
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
