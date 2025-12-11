"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function BrochureRequestThankYou({ isOpen, onClose, projectName }) {
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

  return createPortal(
    <div className="fixed inset-0 bg-black/50 lg:backdrop-blur-md z-[9999] flex items-center justify-center p-4" suppressHydrationWarning>
      <div
        className={`fixed lg:relative top-0 left-0 w-full h-full lg:w-[70vw] lg:h-[70vh] lg:max-w-lg  bg-white transform transition-transform duration-500 ease-in-out lg:rounded-lg ${
          isOpen ? "translate-y-0" : "-translate-y-full lg:translate-y-0 lg:scale-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center z-10 cursor-pointer"
        >
          <Image
            src="/assets/cross.svg"
            alt="close"
            width={24}
            height={24}
            className="relative object-contain"
          />
        </button>

        <div className="w-full h-full flex flex-col items-center justify-center px-8 py-12">
          <div className="text-center max-w-md">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl lg:text-3xl font-semibold leading-[130%] tracking-[-1.1px] mb-4 text-gray-800">
              Thank You!
            </h2>
            
            <p className="text-sm lg:text-base text-gray-600 leading-[140%] tracking-[-1.1%] mb-6">
              Your brochure request for <strong>{projectName}</strong> has been submitted successfully.
            </p>

            <p className="text-sm lg:text-base text-gray-600 leading-[140%] tracking-[-1.1%] mb-8">
              Our team will contact you shortly with the brochure and any additional information you may need.
            </p>

            <Link href="/projects">
              <button
                onClick={onClose}
                className="bg-orange-600 text-white py-3 px-8 rounded-lg text-base font-medium hover:bg-orange-700 transition-colors duration-200 cursor-pointer"
              >
                Explore Projects
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
