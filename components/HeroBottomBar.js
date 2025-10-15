"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroBottomBar({
  btnOneText,
  btnTwoText,
  btnOneLink,
  btnTwoLink,
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 48) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-10/12 relative flex-center mx-auto ">
      <div className="w-full relative backdrop-blur-3xl bg-[#eeeeee]/10 p-[10px] rounded-lg flex-center gap-4 mx-auto ">
        <Link href={btnOneLink} className="w-full relative">
          <button 
            className={`text-sm w-full font-medium border-[0.5px] py-2 rounded-md flex-center gap-2 transition-all duration-500 ease-in-out cursor-pointer text-center flex-1 ${
              isScrolled 
                ? "bg-black text-white border-black hover:bg-gray-800" 
                : "bg-transparent text-white border-white hover:bg-white hover:text-black"
            }`}
          >
            <Image 
              src="/assets/call.svg" 
              alt="phone" 
              width={12} 
              height={12}
              className={`transition-all duration-500 ease-in-out ${isScrolled ? "brightness-0 invert" : ""}`}
            />
            <p>{btnOneText}</p>
          </button>
        </Link>
        <Link href={btnTwoLink} className="w-full relative">
          <button className="text-sm w-full font-medium border-[0.5px] border-white  py-2 rounded-md bg-white text-black  flex-center gap-2 transition-all duration-300 cursor-pointer text-center flex-1">
            <Image
              src="/assets/whatsapp.svg"
              alt="phone"
              width={16}
              height={16}
            />
            <p>{btnTwoText}</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
