"use client";
import { useState, useRef, useEffect } from "react";

export default function DropdownSelector({ activeTab, setActiveTab, tabs }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full z-50" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-[10px] md:p-[14px] lg:p-5 rounded-t-[5px] bg-[#f1f1f1] text-black-400 focus:outline-none transition-all duration-200 cursor-pointer  mx-auto"
      >
        <span className="text-base md:text-sm lg:text-base lg:font-medium leading-[110%] capitalize">
          {activeTab}
        </span>
        <svg
          className={`w-5 h-5 text-orange-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-black-400 rounded-lg shadow-lg">
          {tabs.map((tab, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handleTabSelect(tab)}
              className={`w-full text-left px-4 py-3 text-sm font-medium capitalize transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg cursor-pointer ${
                activeTab === tab
                  ? "bg-black-400 text-white border-l-4 border-black-400"
                  : "text-black-400 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
