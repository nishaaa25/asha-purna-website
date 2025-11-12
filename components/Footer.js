"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Footer() {
  const router = useRouter();

  // ✅ Smooth scroll effect for cross-page hash links
  useEffect(() => {
    const hash = sessionStorage.getItem("scrollToHash");
    if (hash) {
      const scrollToTarget = () => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          sessionStorage.removeItem("scrollToHash");
        }
      };
      // wait for DOM to load
      setTimeout(scrollToTarget, 400);
    }
  }, []);

  const categories = [
    { title: "residential", slug: "residential" },
    { title: "commercial", slug: "commercial" },
    { title: "hospitality", slug: "hospitality" },
    { title: "renewable energies", slug: "windmills" },
    { title: "education", slug: "education" },
  ];

  // ✅ Handles all link clicks including cross-page hash scrolls
  const handleLinkClick = (href, e) => {
    if (href.startsWith("http")) return;
    e.preventDefault();

    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      sessionStorage.setItem("scrollToHash", hash);

      if (window.location.pathname === path || path === "") {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        router.push(path);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <footer className="w-full relative pt-6 pb-4 md:py-10 lg:py-20 bg-black-500 text-white flex-center font-helvetica">
      <div className="w-full px-[22px] md:px-10 lg:px-20 relative flex flex-col gap-8">
        <div className="relative flex flex-col gap-[10px]">
          <div className="w-27 md:w-50 h-13 lg:w-54 md:h-24 lg:h-36 relative mb-10">
            <div className="w-28 h-22 lg:w-50 lg:h-38 relative">
              <Image
                src="https://d3qnldyv492i08.cloudfront.net/ashapurna-new-logo.svg"
                alt="main-logo"
                fill
                className="relative object-contain"
              />
            </div>
          </div>

          <div className="relative flex flex-col lg:flex-row gap-7">
            {/* Contact Info */}
            <div className="relative flex flex-col gap-[10px] lg:gap-5 w-full lg:w-5/12">
              <Link
                href="tel:+919314041747"
                className="flex justify-start items-center gap-3"
              >
                <div className="w-3 h-3 lg:w-6 lg:h-6 relative">
                  <Image
                    src="/assets/phone.svg"
                    alt="phone"
                    fill
                    className="relative object-contain"
                  />
                </div>
                <span className="text-[10px] md:text-[15px] lg:text-base">
                  9314041747, 0291-2514747
                </span>
              </Link>
              <hr className="text-orange-800 w-2/12" />
              <Link
                href="mailto:marketing@ashapurna.com"
                className="flex justify-start items-center gap-3"
              >
                <div className="w-4 h-3 lg:w-7 lg:h-6 relative">
                  <Image
                    src="/assets/mail.svg"
                    alt="mail"
                    fill
                    className="relative object-contain"
                  />
                </div>
                <span className="text-[10px] md:text-[15px] lg:text-base">
                  marketing@ashapurna.com
                </span>
              </Link>
              <hr className="text-orange-800 w-2/12" />
              <div className="flex justify-start items-start gap-3 w-8/12">
                <div className="w-6 h-6 lg:w-8 lg:h-8 relative">
                  <Image
                    src="/assets/location-1.svg"
                    alt="location"
                    fill
                    className="relative object-contain"
                  />
                </div>
                <Link
                  href="https://maps.app.goo.gl/FeF5XZYqBRymEDMH9"
                  target="_blank"
                  className="text-[10px] md:text-[15px] lg:text-base"
                >
                  4A, East Patel Nagar, Circuit House Road, Opposite LIC office,
                  Jodhpur, Rajasthan 342011
                </Link>
              </div>
            </div>

            {/* Footer Links */}
            <div className="flex justify-between items-start relative w-full lg:w-7/12">
              {/* Quick Links */}
              <ul className="text-[10px] md:text-base lg:text-base flex flex-col gap-[10px] lg:gap-4">
                <h6 className="text-orange-600 text-sm md:text-xl font-bold">
                  Quick Links
                </h6>
                <Link href="/" onClick={(e) => handleLinkClick("/", e)}>
                  <li>Home</li>
                </Link>
                <Link href="/about" onClick={(e) => handleLinkClick("/about", e)}>
                  <li>About us</li>
                </Link>
                <Link href="/CSR" onClick={(e) => handleLinkClick("/CSR", e)}>
                  <li>CSR</li>
                </Link>
                <Link href="/careers" onClick={(e) => handleLinkClick("/careers", e)}>
                  <li>Careers</li>
                </Link>
                <Link href="/blogs" onClick={(e) => handleLinkClick("/blogs", e)}>
                  <li>Blogs</li>
                </Link>
                <Link
                  href="/#testimonials"
                  onClick={(e) => handleLinkClick("/#testimonials", e)}
                >
                  <li>Testimonials</li>
                </Link>
                <Link
                  href="/contact/#faq"
                  onClick={(e) => handleLinkClick("/contact/#faq", e)}
                >
                  <li>FAQs</li>
                </Link>
              </ul>

              {/* Investors */}
              <ul className="text-[10px] md:text-base lg:text-base flex flex-col gap-[10px] lg:gap-4">
                <h6 className="text-orange-600 text-sm md:text-xl font-bold">
                  Investors
                </h6>
                <Link
                  href="https://d3qnldyv492i08.cloudfront.net/ashapurna/images/newsletter/Ashapurna+Corp+Profile+(Landscape).pdf"
                  target="_blank"
                >
                  <li>Corporate Profile</li>
                </Link>
                <Link
                  href="/investor"
                  onClick={(e) => handleLinkClick("/investor", e)}
                >
                  <li>Investors</li>
                </Link>
                <Link
                  href="/NRIcorner"
                  onClick={(e) => handleLinkClick("/NRIcorner", e)}
                >
                  <li>NRI Corner</li>
                </Link>
                <Link
                  href="/rera-disclaimer"
                  onClick={(e) => handleLinkClick("/rera-disclaimer", e)}
                >
                  <li>RERA Disclaimer</li>
                </Link>
                <Link
                  href="/become-a-partner"
                  onClick={(e) => handleLinkClick("/become-a-partner", e)}
                >
                  <li>Become a Partner</li>
                </Link>
                <Link
                  href="/contact"
                  onClick={(e) => handleLinkClick("/contact", e)}
                >
                  <li>Contact Us</li>
                </Link>
              </ul>

              {/* Projects + Others */}
              <div className="flex flex-col gap-4 lg:gap-8">
                <ul className="text-[10px] md:text-base lg:text-base flex flex-col gap-[10px] lg:gap-4">
                  <h6 className="text-orange-600 text-sm md:text-xl font-bold">
                    Projects
                  </h6>
                  {categories.map((category) => (
                    <Link
                      key={category?.title}
                      href={`/${category?.slug}`}
                      onClick={(e) =>
                        handleLinkClick(`/${category?.slug}`, e)
                      }
                    >
                      <li className="capitalize">{category?.title}</li>
                    </Link>
                  ))}
                </ul>
                <ul className="text-[10px] md:text-base lg:text-base flex flex-col gap-[10px] lg:gap-4">
                  <h6 className="text-orange-600 text-sm md:text-xl font-bold">
                    Others
                  </h6>
                  <Link
                    href="/privacy-policy"
                    onClick={(e) => handleLinkClick("/privacy-policy", e)}
                  >
                    <li>Privacy Policy</li>
                  </Link>
                  <Link
                    href="/terms-conditions"
                    onClick={(e) => handleLinkClick("/terms-conditions", e)}
                  >
                    <li>T & C</li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="w-full flex flex-col gap-3 lg:gap-5 mt-5 pb-15 lg:pb-0">
          <div className="flex justify-start items-center gap-4 pb-1">
            {[
              { href: "https://www.facebook.com/AshapurnaBuildconLtd/", icon: "fb" },
              { href: "https://www.youtube.com/channel/UC5uPodt1LPA-oDbgcjuYxEA", icon: "yt" },
              { href: "https://www.instagram.com/ashapurnabuildconltd/?hl=en", icon: "ig" },
              { href: "https://www.linkedin.com/company/ashapurnabuildconltd/", icon: "linkedin" },
              { href: "https://in.pinterest.com/ashapurnabuildconltd/", icon: "pinterest" },
              { href: "https://x.com/ashapurnabl", icon: "twitter" },
            ].map((social) => (
              <Link
                key={social.icon}
                className="relative w-[14px] h-[14px] lg:w-6 lg:h-6"
                href={social.href}
                target="_blank"
              >
                <Image
                  src={`/assets/${social.icon}.svg`}
                  alt={social.icon}
                  fill
                  className="object-contain"
                />
              </Link>
            ))}
          </div>

          <div className="text-[8px] flex justify-between lg:text-base items-center lg:justify-start border-t-[0.5px] pt-3 lg:pt-5">
            <p>Copyright © 2025 Ashapurna Buildcon Limited</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
