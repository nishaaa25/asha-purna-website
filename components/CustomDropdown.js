"use client";
import { useState, useRef, useEffect } from "react";

export default function CustomDropdown({ 
  options = [], 
  value = "", 
  onChange, 
  placeholder = "Select option",
  className = "",
  error = false,
  disabled = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected option
  const selectedOption = options.find(option => option.id.toString() === value.toString());

  const handleOptionClick = (option) => {
    onChange({
      target: {
        name: "project_id",
        value: option.id.toString()
      }
    });
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleInputClick();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
    } else if (e.key === "ArrowDown" && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Custom Input */}
      <div
        className={`
          w-full border-b pt-1 pb-1.5 text-sm xl:text-[15px] outline-none cursor-pointer
          flex items-center justify-between
          ${error ? 'border-red-500' : 'border-b-white'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={placeholder}
      >
        <span className={`${selectedOption ? 'text-white' : 'text-white/80'}`}>
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-white transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
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
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20 max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-gray-200/50">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm text-gray-800 border border-gray-300/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 bg-white/80 backdrop-blur-sm"
              autoFocus
            />
          </div>

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className={`
                    px-4 py-3 text-sm text-gray-800 cursor-pointer transition-all duration-200
                    hover:bg-blue-50/80 hover:shadow-sm flex items-center justify-between
                    ${selectedOption?.id === option.id ? 'bg-blue-100/80 text-blue-700 font-medium' : ''}
                  `}
                  onClick={() => handleOptionClick(option)}
                  role="option"
                  aria-selected={selectedOption?.id === option.id}
                >
                  <span className="truncate">{option.name}</span>
                  {selectedOption?.id === option.id && (
                    <svg
                      className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                {searchTerm ? "No properties found" : "No properties available"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
