"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Footer() {
  const router = useRouter();

  // Smooth scroll
  useEffect(() => {
    const hash = sessionStorage.getItem("scrollToHash");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          sessionStorage.removeItem("scrollToHash");
        }
      }, 300);
    }
  }, []);

  const categories = [
    { title: "residential", slug: "residential" },
    { title: "commercial", slug: "commercial" },
    { title: "hospitality", slug: "hospitality" },
    { title: "renewable energies", slug: "windmills" },
    { title: "education", slug: "education" },
  ];

  const handleLinkClick = (href, e) => {
    if (href.startsWith("http")) return;
    e.preventDefault();

    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      sessionStorage.setItem("scrollToHash", hash);

      if (window.location.pathname === path || path === "") {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(path);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <footer className="w-full relative pt-6 pb-3 md:py-8 lg:py-12 bg-black-500 text-white flex-center font-helvetica">
      <div className="w-full px-5 md:px-10 lg:px-16 flex flex-col gap-6">

        {/* Logo */}
        <div className="w-24 md:w-40 h-14 md:h-24 relative mb-4">
          <Image
            src="https://d3qnldyv492i08.cloudfront.net/ashapurna-new-logo.svg"
            alt="main-logo"
            fill
            className="object-contain"
          />
        </div>

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Contact Info */}
          <div className="flex flex-col gap-3 w-full lg:w-5/12 text-xs md:text-sm lg:text-base">
            <Link href="tel:+919314041747" className="flex items-center gap-3">
              <Image src="/assets/phone.svg" alt="phone" width={16} height={16} />
              <span>9314041747, 0291-2514747</span>
            </Link>
            <hr className="text-orange-800 w-2/12" />

            <Link href="mailto:marketing@ashapurna.com" className="flex items-center gap-3">
              <Image src="/assets/mail.svg" alt="mail" width={18} height={16} />
              <span>marketing@ashapurna.com</span>
            </Link>
            <hr className="text-orange-800 w-2/12" />

            <div className="flex items-start gap-3 w-10/12">
              <Image src="/assets/location-1.svg" alt="location" width={22} height={22} />
              <Link
                href="https://maps.app.goo.gl/FeF5XZYqBRymEDMH9"
                target="_blank"
                className="text-xs md:text-sm lg:text-base"
              >
                4A, East Patel Nagar, Circuit House Road, Opposite LIC office,
                Jodhpur, Rajasthan 342011
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="flex justify-between w-full lg:w-7/12">

            {/* Quick Links */}
            <ul className="text-xs md:text-sm lg:text-base flex flex-col gap-2">
              <h6 className="text-orange-600 text-sm md:text-lg font-bold">Quick Links</h6>

              {[
                ["/", "Home"],
                ["/about", "About us"],
                ["/CSR", "CSR"],
                ["/careers", "Careers"],
                ["/blogs", "Blogs"],
                ["/#testimonials", "Testimonials"],
                ["/contact/#faq", "FAQs"],
              ].map(([href, label]) => (
                <Link key={label} href={href} onClick={(e) => handleLinkClick(href, e)}>
                  <li>{label}</li>
                </Link>
              ))}
            </ul>

            {/* Investors */}
            <ul className="text-xs md:text-sm lg:text-base flex flex-col gap-2">
              <h6 className="text-orange-600 text-sm md:text-lg font-bold">Investors</h6>

              <Link
                href="https://d3qnldyv492i08.cloudfront.net/ashapurna/images/newsletter/Ashapurna+Corp+Profile+(Landscape).pdf"
                target="_blank"
              >
                <li>Corporate Profile</li>
              </Link>

              {[
                ["/investor", "Investors"],
                ["/NRIcorner", "NRI Corner"],
                ["/rera-disclaimer", "RERA Disclaimer"],
                ["/become-a-partner", "Become a Partner"],
                ["/contact", "Contact Us"],
              ].map(([href, label]) => (
                <Link key={label} href={href} onClick={(e) => handleLinkClick(href, e)}>
                  <li>{label}</li>
                </Link>
              ))}
            </ul>

            {/* Projects + Others */}
            <div className="flex flex-col gap-4">
              {/* Projects */}
              <ul className="text-xs md:text-sm lg:text-base flex flex-col gap-2">
                <h6 className="text-orange-600 text-sm md:text-lg font-bold">Projects</h6>

                {categories.map((cat) => (
                  <Link
                    key={cat.title}
                    href={`/${cat.slug}`}
                    onClick={(e) => handleLinkClick(`/${cat.slug}`, e)}
                  >
                    <li className="capitalize">{cat.title}</li>
                  </Link>
                ))}
              </ul>

              {/* Others */}
              <ul className="text-xs md:text-sm lg:text-base flex flex-col gap-2">
                <h6 className="text-orange-600 text-sm md:text-lg font-bold">Others</h6>
                <Link href="/privacy-policy" onClick={(e) => handleLinkClick("/privacy-policy", e)}>
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

        {/* Social + Copyright */}
        <div className="flex flex-col gap-3 mt-3 border-t border-white/20 pt-5">
          <div className="flex items-center gap-4">
            {["fb", "yt", "ig", "linkedin", "pinterest", "twitter"].map((icon) => (
              <Link key={icon} href="#" className="relative w-4 h-4 lg:w-5 lg:h-5">
                <Image src={`/assets/${icon}.svg`} alt={icon} fill className="object-contain" />
              </Link>
            ))}
          </div>

          <p className="text-[10px] md:text-sm">© 2025 Ashapurna Buildcon Limited</p>
        </div>
      </div>
    </footer>
  );
}
