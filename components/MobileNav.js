"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MobileNav() {
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

    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      document.body.style.overflow = "unset";
    }, 300); // Match animation duration
  };

  const toggleMediaDropdown = () => {
    setMediaDropdownOpen(!mediaDropdownOpen);
  };

  // Cleanup effect to restore body scroll on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={toggleNav}
          className="w-7 h-7 relative focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <Image
            src="/assets/menu-bar.svg"
            alt="menu"
            fill
            className="relative object-contain"
          />
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-110 lg:hidden">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 mobile-nav-overlay ${
              isClosing ? "animate-fade-out" : "animate-fade-in"
            }`}
            onClick={closeNav}
          />

          {/* Navigation Panel */}
          <div
            className={`absolute top-0 left-0 h-full w-full bg-white mobile-nav-panel ${
              isClosing ? "animate-slide-out-top" : "animate-slide-in-top"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 ">
              <Link href="/" onClick={closeNav}>
                <div className="w-24 h-11 relative">
                  <Image
                    src="/assets/main-logo.svg"
                    alt="Ashapurna Logo"
                    fill
                    className="relative object-contain"
                  />
                </div>
              </Link>
              <button
                onClick={closeNav}
                className="w-6 h-6 flex items-center justify-center top-5 relative"
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
              <ul className="space-y-12 w-11/12 mx-auto">
                {/* Home */}
                <li>
                  <Link
                    href="/"
                    onClick={closeNav}
                    className="block p-[10px] font-mulish text-[15px] leading-[110%] text-black-400 border-b border-black-400/10 transition-colors"
                  >
                    Home
                  </Link>
                </li>

                {/* About Us */}
                <li>
                  <Link
                    href="/about"
                    onClick={closeNav}
                    className="block p-[10px] font-mulish text-[15px] leading-[110%] text-black-400 border-b border-black-400/10 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    onClick={closeNav}
                    className="block p-[10px] text-[15px] leading-[110%]  text-black-400 border-b border-black-400/10 transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                {/* Media with Dropdown */}
                <li>
                  <button
                    onClick={toggleMediaDropdown}
                    className="flex items-center justify-between w-full p-[10px] text-[15px] leading-[110%]  text-black-400 border-b border-black-400/10 transition-colors"
                  >
                    <span>Media</span>
                    <div className="flex items-center">
                      <Image
                        src="/assets/dropdown.svg"
                        alt="Dropdown"
                        width={16}
                        height={16}
                        className={`media-dropdown-icon ${
                          mediaDropdownOpen ? "open" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Media Dropdown */}
                  {mediaDropdownOpen && (
                    <div className="mt-4 space-y-3 animate-fade-in">
                      <Link
                        href="/news&events"
                        onClick={closeNav}
                        className="block p-[10px] text-[15px] leading-[110%]  text-black-400 transition-colors"
                      >
                        Events
                      </Link>
                      <Link
                        href="/https://ashapurna.com/blog/"
                        onClick={closeNav}
                        className="block p-[10px] text-[15px] leading-[110%]  text-black-400  transition-colors"
                      >
                        Blogs
                      </Link>
                      <Link
                        href="/awards"
                        onClick={closeNav}
                        className="block p-[10px] text-[15px] leading-[110%]  text-black-400  transition-colors"
                      >
                        Awards
                      </Link>
                    </div>
                  )}
                </li>

                {/* Projects */}

                {/* Contact */}
                <li>
                  <Link
                    href="/contact"
                    onClick={closeNav}
                    className="block p-[10px] text-[15px] leading-[110%]  text-black-400 border-b border-black-400/10 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
