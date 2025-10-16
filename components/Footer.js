import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const categories = [
    { title: "residential", slug: "residential" },
    { title: "commercial", slug: "commercial" },
    { title: "hospitality", slug: "hospitality" },
    { title: "renewable energies", slug: "windmills" },
    { title: "education", slug: "education" },
  ];
  return (
    <footer className="w-full relative pt-6 pb-4 md:py-10 lg:py-20 bg-black-500 text-white flex-center font-helvetica">
      <div className="w-full px-[22px] md:px-10 lg:px-20 relative flex flex-col gap-8">
        <div className="relative flex flex-col gap-[10px]">
          <div className="w-27 md:w-50 h-13 lg:w-54 md:h-24 lg:h-36 relative mb-4">
            <Image
              src="/assets/main-logo.png"
              alt="main-logo"
              fill
              className="relative object-contain"
            />
          </div>
          <div className="relative flex flex-col lg:flex-row gap-7">
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
                    alt="phone"
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
                    alt="phone"
                    fill
                    className="relative object-contain"
                  />
                </div>
                <span className="text-[10px] md:text-[15px] lg:text-base ">
                  4A, East Patel Nagar, Circuit House Road, Opposite LIC office,
                  Jodhpur, Rajasthan 342011
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start relative w-full lg:w-7/12">
              <ul className="text-[10px] md:text-base lg:text-base leading-[100%] flex flex-col gap-[10px] lg:gap-4">
                <h6 className="text-orange-600 text-sm md:text-xl lg:text-xl font-bold">
                  Quick Links
                </h6>
                <Link href="/">
                  <li>Home</li>
                </Link>
                <Link href="/about">
                  <li>About us</li>
                </Link>
                <Link href="/CSR">
                  <li>CSR</li>
                </Link>
                <Link href="/careers">
                  <li>Careers</li>
                </Link>
                <Link href="/blogs">
                  <li>Blogs</li>
                </Link>
                <Link href="/#testimonials">
                  <li>Testimonials</li>
                </Link>
                <Link href="/contact/#faq">
                  <li>FAQs</li>
                </Link>
              </ul>
              <ul className="text-[10px] md:text-base lg:text-base leading-[100%] flex flex-col gap-[10px] lg:gap-4">
                <h6 className="text-orange-600 text-sm md:text-xl lg:text-xl font-bold">
                  Investors
                </h6>
                <Link href="https://d3qnldyv492i08.cloudfront.net/ashapurna/images/newsletter/Ashapurna+Corp+Profile+(Landscape).pdf">
                  <li>Corporate Profile</li>
                </Link>
                <Link href="/investor">
                  <li>Investors</li>
                </Link>
                <Link href="/NRIcorner">
                  <li>NRI Corner</li>
                </Link>
                <Link href="/rera-disclaimer">
                  <li>RERA Disclaimer</li>
                </Link>
                <Link href="/contact">
                  <li>Contact Us</li>
                </Link>
              </ul>
              <div className="flex flex-col gap-4 lg:gap-8">
                <ul className="text-[10px] md:text-base lg:text-base leading-[100%] flex flex-col gap-[10px] lg:gap-4">
                  <h6 className="text-orange-600 text-sm md:text-xl lg:text-xl font-bold">
                    Projects
                  </h6>
                  {categories.map((category) => (
                    <Link key={category?.title} href={`/${category?.slug}`}>
                      <li className="capitalize">{category?.title}</li>
                    </Link>
                  ))}
                </ul>
                <ul className="text-[10px] md:text-base lg:text-base leading-[100%] flex flex-col gap-[10px] lg:gap-4">
                  <h6 className="text-orange-600 text-sm md:text-xl lg:text-xl font-bold">
                    Others
                  </h6>
                  <Link href="/privacy-policy">
                    <li>Privacy Policy</li>
                  </Link>
                  <Link href="/terms-conditions">
                    <li>T & C</li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex justify-between relative">
          <ul className="text-[10px] leading-[100%] flex flex-col gap-[10px]">
            <h6 className="text-orange-600 text-sm font-bold">Quick Links</h6>
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="/about">
              <li>About us</li>
            </Link>
            <Link href="/CSR">
              <li>CSR</li>
            </Link>
            <Link href="/careers">
              <li>Careers</li>
            </Link>
            <Link href="/blogs">
              <li>Blogs</li>
            </Link>
            <Link href="/#testimonials">
              <li>Testimonials</li>
            </Link>
                <Link href="/contact/#faq">
                  <li>FAQs</li>
                </Link>
          </ul>
          <ul className="text-[10px] leading-[100%] flex flex-col gap-[10px]">
            <h6 className="text-orange-600 text-sm font-bold">Investors</h6>
            <Link href="/">
              <li>Corporate Profile</li>
            </Link>
            <Link href="/investor">
              <li>Investors</li>
            </Link>
            <Link href="/NRIcorner">
              <li>NRI Corner</li>
            </Link>
            <Link href="/rera-disclaimer">
              <li>RERA Disclaimer</li>
            </Link>
            <Link href="/contact">
              <li>Contact Us</li>
            </Link>
          </ul>
          <div className="flex flex-col gap-4">
            <ul className="text-[10px] leading-[100%] flex flex-col gap-[10px]">
              <h6 className="text-orange-600 text-sm font-bold">Projects</h6>
              {categories.map((category) => (
                <Link key={category} href={`/${category}`}>
                  <li className="capitalize">{category}</li>
                </Link>
              ))}
            </ul>
            <ul className="text-[10px] leading-[100%] flex flex-col gap-[10px]">
              <h6 className="text-orange-600 text-sm font-bold">Others</h6>
              <Link href="/">
                <li>Privacy Policy</li>
              </Link>
              <Link href="/">
                <li>T & C</li>
              </Link>
            </ul>
          </div>
        </div> */}
        <div className="w-full relative flex flex-col gap-3 lg:gap-5 mt-5 pb-15 lg:pb-0">
          <div className="flex justify-start items-center gap-4 pb-1">
            <Link
              className="relative w-[14px] h-[14px] lg:w-6 lg:h-6"
              target="/"
              href="https://www.facebook.com/AshapurnaBuildconLtd/"
            >
              <Image
                src="/assets/fb.svg"
                alt="facebook"
                fill
                className="object-contain"
              />
            </Link>
            <Link
              className="relative w-[14px] h-[14px] lg:w-6 lg:h-6"
              target="/"
              href="https://www.youtube.com/channel/UC5uPodt1LPA-oDbgcjuYxEA"
            >
              <Image
                src="/assets/yt.svg"
                alt="youtube"
                fill
                className="object-contain"
              />
            </Link>
            <Link
              className="relative w-[14px] h-[14px] lg:w-6 lg:h-6"
              target="/"
              href="https://www.instagram.com/ashapurnabuildconltd/?hl=en"
            >
              <Image
                src="/assets/ig.svg"
                alt="instagram"
                fill
                className="object-contain"
              />
            </Link>
            <Link
              className="relative w-[14px] h-[14px] lg:w-6 lg:h-6"
              target="/"
              href="https://www.linkedin.com/company/ashapurnabuildconltd/"
            >
              <Image
                src="/assets/linkedin.svg"
                alt="linkedin"
                fill
                className="object-contain"
              />
            </Link>
            <Link
              className="relative w-[14px] h-[14px] lg:w-6 lg:h-6"
              target="/"
              href="https://in.pinterest.com/ashapurnabuildconltd/"
            >
              <Image
                src="/assets/pinterest.svg"
                alt="pinterest"
                fill
                className="object-contain"
              />
            </Link>
            <Link
              className="relative w-[14px] h-[14px] lg:w-6 lg:h-6"
              target="/"
              href="https://x.com/ashapurnabl"
            >
              <Image
                src="/assets/twitter.svg"
                alt="twitter"
                fill
                className="object-contain"
              />
            </Link>
          </div>
          <div className="text-[8px] flex justify-between  lg:text-base items-center lg:justify-start h-full relative border-t-[0.5px] pt-3 lg:pt-5">
            <p className="py-1 pr-2  ">
              Copyright © 2025 Ashapurna Builcon Limited
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
