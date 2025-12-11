"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";


export default function ThankYouViewPlanPopup({ isOpen, onClose }) {
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
    <div className="fixed inset-0 bg-black/50 lg:backdrop-blur-md z-[9999] flex items-center justify-center" suppressHydrationWarning>
      <div
        className={`fixed lg:relative top-0 left-0 w-full h-full lg:w-[70vw] lg:h-[70vh] bg-white transform transition-transform duration-500 ease-in-out lg:rounded-lg ${
          isOpen ? "translate-y-0" : "-translate-y-full lg:translate-y-0 lg:scale-0"
        }`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-12 right-6 text-red-500 hover:text-red-700 text-2xl font-bold w-8 h-8 flex items-center justify-center z-10 cursor-pointer"
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
              Your request has been received successfully. We will share the plan details with you soon!
            </p>

            <Link href="/projects">
              <button
                type="button"
                onClick={onClose}
                className="bg-black-400 text-white py-[14px] px-10 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
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

