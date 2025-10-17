import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 150);
      }, 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <nav className={`w-full px-5 md:px-8 lg:px-13 pt-2 pb-3 flex-between z-110 transition-all duration-300 ${
      isScrolled ? 'fixed top-0 left-0 bg-white shadow-lg pt-3' : 'absolute top-0 left-0 bg-transparent pt-2 pb-3 '
    }`}>
      <div className="relative">
        <Link href="/">
          <div className={`relative transition-all duration-500 ease-in-out ${
            isScrolled ? 'w-18 h-14 lg:w-22 lg:h-18' : 'w-22 h-16 lg:w-44 lg:h-32'
          }`}>
            <Image
              src={isScrolled ? "/assets/logo-dark.svg" : "/assets/logo-light.svg"}
              alt="main-logo"
              fill
              className="relative object-contain"
            />
          </div>
        </Link>
      </div>
      <div className={`hidden lg:flex items-center transition-colors duration-300 ${
        isScrolled ? 'text-black-400 pb-0 text-xs' : 'text-white pb-8 text-base'
      }`}>
        <ul className="flex-center gap-[70px] ">
          <li>
            <Link
              href="/"
              className="font-medium text-lg leading-[100%] cursor-pointer"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="font-medium text-lg leading-[100%] cursor-pointer"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="font-medium text-lg leading-[100%] cursor-pointer"
            >
              Projects
            </Link>
          </li>
          <li className="relative group">
            <span className="font-medium text-lg leading-[100%] flex items-center gap-1 cursor-pointer">
              Media
              <Image
                src="/assets/dropdown.svg"
                alt="Dropdown"
                width={14}
                height={7}
                className="ml-1"
              />
              {/* Dropdown */}
              <ul className={`absolute top-full left-0 mt-2 w-40 shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all ${
                isScrolled ? 'bg-white' : 'bg-black'
              }`}>
                <li>
                  <Link
                    href="/news&events"
                    className={`block px-4 py-2 font-medium text-lg leading-[100%] cursor-pointer transition-colors duration-300 ${
                      isScrolled 
                        ? 'text-gray-800 hover:bg-gray-100' 
                        : 'text-white hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Events
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    href="/awards"
                    className={`block px-4 py-2 font-medium text-lg leading-[100%] cursor-pointer transition-colors duration-300 ${
                      isScrolled 
                        ? 'text-gray-800 hover:bg-gray-100' 
                        : 'text-white hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Awards
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://ashapurna.com/blog/"
                    className={`block px-4 py-2 font-medium text-lg leading-[100%] cursor-pointer transition-colors duration-300 ${
                      isScrolled 
                        ? 'text-gray-800 hover:bg-gray-100' 
                        : 'text-white hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </span>
          </li>
          <li>
            <Link
              href="/contact"
              className="font-medium text-lg leading-[100%] cursor-pointer"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <MobileNav isScrolled={isScrolled} />
    </nav>
  );
}
