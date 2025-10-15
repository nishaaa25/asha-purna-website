"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ThankYouEnquirePopup({ isOpen, onClose, buttonText = "Explore Projects", buttonLink = "/projects" }) {
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Lock the scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Get the scroll position
      const scrollY = document.body.style.top;
      
      // Restore scroll
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Restore scroll position
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 lg:backdrop-blur-md z-[99999] flex items-center justify-center" suppressHydrationWarning>
      <div
        className={`fixed lg:relative top-0 left-0 w-full h-full lg:w-[80vw] lg:h-[80vh] bg-white transform transition-transform duration-500 ease-in-out lg:rounded-lg ${
          isOpen ? "translate-y-0" : "-translate-y-full lg:translate-y-0 lg:scale-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-12 right-6 text-red-500 hover:text-red-700 text-2xl font-bold w-8 h-8 flex items-center justify-center z-10"
        >
          <Image
            src="/assets/cross.svg"
            alt="cross"
            width={24}
            height={24}
            className="relative object-contain"
          />
        </button>

        <div className="w-full h-full flex flex-col items-center justify-center px-8">
          <div className="text-center max-w-md">
            <h2 className="text-[22px] font-medium leading-[130%] tracking-[-1.1px] mb-6 text-gray-600">Thank You</h2>
            <p className="text-sm text-gray-800 leading-[140%] tracking-[-1.1%] mb-12">
              Your enquiry has been received successfully. We will be in touch
              and contact you soon!
            </p>

            {buttonLink ? (
              <Link href={buttonLink}>
                <button
                  onClick={onClose}
                  className="bg-black-400 text-white py-[14px] px-10 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors duration-200"
                >
                  {buttonText}
                </button>
              </Link>
            ) : (
              <button
                onClick={onClose}
                className="bg-black-400 text-white py-[14px] px-10 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

