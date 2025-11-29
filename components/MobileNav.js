"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MobileNav({ isScrolled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);

  const toggleNav = () => {
    if (!isOpen) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      closeNav();
    }
  };

  const closeNav = () => {
    setIsClosing(true);
    setMediaDropdownOpen(false);

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      document.body.style.overflow = "unset";
    }, 500);
  };

  const toggleMediaDropdown = () => {
    setMediaDropdownOpen(!mediaDropdownOpen);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-[140] lg:hidden w-screen h-screen transition-all duration-700 backdrop-blur-3xl bg-white/30 ${
            isClosing ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          {/* Navigation Panel */}
          {/* Header */}
          <div className="flex justify-between items-start p-6">
            <Link href="/" onClick={closeNav}>
              <div className="w-28 h-24 lg:w-44 lg:h-32 relative">
                <Image
                  src="https://d3qnldyv492i08.cloudfront.net/ashapurna-new-logo.svg"
                  alt="main-logo"
                  fill
                  className="relative object-contain"
                />
              </div>
            </Link>

            <button
              onClick={closeNav}
              className="w-6 h-6 relative"
              aria-label="Close menu"
            >
              <Image
                src="/assets/cross.svg"
                alt="Close"
                width={24}
                height={24}
                className="object-contain"
              />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-6 mt-4">
            <ul className="space-y-12 w-full mx-auto">
              <li>
                <Link
                  href="/"
                  onClick={closeNav}
                  className="block p-[10px] font-mulish text-[15px] leading-[110%] text-black-400 border-b border-black-400/10"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  onClick={closeNav}
                  className="block p-[10px] font-mulish text-[15px] leading-[110%] text-black-400 border-b border-black-400/10"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/projects"
                  onClick={closeNav}
                  className="block p-[10px] text-[15px] leading-[110%] text-black-400 border-b border-black-400/10"
                >
                  Projects
                </Link>
              </li>

              {/* Media Dropdown */}
              <li>
                <button
                  onClick={toggleMediaDropdown}
                  className="flex items-center justify-between w-full p-[10px] text-[15px] leading-[110%] text-black-400 border-b border-black-400/10"
                >
                  <span>Media</span>
                  <Image
                    src="/assets/dropdown.svg"
                    alt="Dropdown"
                    width={16}
                    height={16}
                    className={`transition-transform duration-300 ${
                      mediaDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {mediaDropdownOpen && (
                  <div className="mt-4 space-y-3 transition-all duration-300">
                    <Link
                      href="/events"
                      onClick={closeNav}
                      className="block p-[10px] text-[15px] leading-[110%] text-black-400"
                    >
                      Events
                    </Link>

                    <Link
                      href="/blogs"
                      onClick={closeNav}
                      className="block p-[10px] text-[15px] leading-[110%] text-black-400"
                    >
                      Blogs
                    </Link>

                    <Link
                      href="/awards"
                      onClick={closeNav}
                      className="block p-[10px] text-[15px] leading-[110%] text-black-400"
                    >
                      Awards
                    </Link>

                    <Link
                      href="/NRIcorner"
                      onClick={closeNav}
                      className="block p-[10px] text-[15px] leading-[110%] text-black-400"
                    >
                      NRI Corner
                    </Link>
                  </div>
                )}
              </li>

              <li>
                <Link
                  href="/careers"
                  onClick={closeNav}
                  className="block p-[10px] text-[15px] leading-[110%] text-black-400 border-b border-black-400/10"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  onClick={closeNav}
                  className="block p-[10px] text-[15px] leading-[110%] text-black-400 border-b border-black-400/10"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
