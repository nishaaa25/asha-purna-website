import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";

export default function Navbar() {
  return (
    <nav className="w-full px-5 md:px-6 lg:px-13 pt-3 lg:pt-3  pb-3 absolute top-0 left-0 flex-between z-110 navbar-animate">
      <div className="relative">
        <Link href="/">
          <div className="w-22 h-16 lg:w-44 lg:h-32 relative">
            <Image
              src="/assets/logo-light.svg"
              alt="main-logo"
              fill
              className="relative object-contain"
            />
          </div>
        </Link>
      </div>
      <div className="hidden lg:flex items-center text-white pb-6">
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
              <ul className="absolute top-full left-0 mt-2 w-40 bg-black shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                <li>
                  <Link
                    href="/news&events"
                    className="block px-4 py-2 hover:bg-black-400 font-medium text-lg leading-[100%] cursor-pointer text-white"
                  >
                    Events
                  </Link>
                </li>{" "}
                <li>
                  <Link
                    href="/awards"
                    className="block px-4 py-2 hover:bg-black-400 font-medium text-lg leading-[100%] cursor-pointer text-white"
                  >
                    Awards
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://ashapurna.com/blog/"
                    className="block px-4 py-2 hover:bg-black-400 font-medium text-lg leading-[100%] cursor-pointer text-white"
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
      <MobileNav />
    </nav>
  );
}
