"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ViewPlanPopup({ isOpen, onClose, onSubmit, projectName }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    project: projectName || ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // message validation
    if (!formData.message.trim()) {
      newErrors.message = "message is required";
    } else if (formData.message.trim().length < 2) {
      newErrors.message = "message must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        project: projectName || ""
      });
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999]" suppressHydrationWarning>
      <div className={`fixed top-0 left-0 w-full h-full bg-white transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-12 right-6 text-red-500 hover:text-red-700 text-2xl font-bold w-8 h-8 flex items-center justify-center z-10"
        >
          <Image src="/assets/cross.svg" alt="cross" width={24} height={24} className="relative object-contain"/>
        </button>
        
        <div className="w-full h-full flex flex-col items-center justify-center px-8">
          
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-12 flex-center flex-col mt-10">
            <div className="w-full">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full border-b ${errors.name ? 'border-red-500' : 'border-black-400/20'} outline-none p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400`}
                placeholder="Name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div className="w-full">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full border-b ${errors.email ? 'border-red-500' : 'border-black-400/20'} outline-none p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400`}
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div className="w-full">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full border-b ${errors.phone ? 'border-red-500' : 'border-black-400/20'} outline-none  p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400`}
                placeholder="Phone Number"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            
            <div className="w-full">
              <select
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                className="w-full border-b border-black-400/20 outline-none p-[10px] text-[15px] leading-[110%] text-black-400 bg-transparent"
              >
                <option value={projectName} className="text-black-400">
                  {projectName}
                </option>
              </select>
            </div>
            
            <div className="w-full">
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full border-b ${errors.message ? 'border-red-500' : 'border-black-400/20'} outline-none  p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400`}
                placeholder="Explain Your Query"
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            
            <button
              type="submit"
              className="px-10 bg-black-400 text-white py-[14px] rounded-md text-xs font-medium hover:bg-gray-800 transition-colors duration-200  mt-2"
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

