"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { isValidEmail, isValidPhone, isValidName } from "@/lib/helpers/regex";

export default function BrochurePopup({ 
  isOpen, 
  onClose, 
  projectId, 
  projectName,
  brochureUrl,
  onSuccess
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    project: projectName || ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

 
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!isValidName(formData.name)) {
      newErrors.name = "Please enter a valid name (letters and spaces only)";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://apiservices.ashapurna.com/api/web/enquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-version": "v1",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message || "",
            project_id: projectId ? Number(projectId) : 0,
            parma_mantra_type: "brochure",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result._status) {
        // Always show success - try to open brochure if available
        if (brochureUrl) {
          console.log("Opening brochure URL:", brochureUrl);
          window.location.href = brochureUrl;
        } else {
          console.log("No brochure URL provided - showing thank you page");
        }
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          project: projectName || ""
        });
        setErrors({});
        
        // Close popup and trigger success callback for thank you page
        onClose();
        onSuccess && onSuccess();
      } else {
        // Even if API fails, show thank you page
        console.log("API returned false status, but showing thank you page");
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          project: projectName || ""
        });
        setErrors({});
        
        // Close popup and trigger success callback for thank you page
        onClose();
        onSuccess && onSuccess();
      }
    } catch (error) {
      console.error("Brochure form submission error:", error);
      
      // Even if there's an error, show thank you page
      console.log("Network error occurred, but showing thank you page");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        project: projectName || ""
      });
      setErrors({});
      
      // Close popup and trigger success callback for thank you page
      onClose();
      onSuccess && onSuccess();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;
  console.log("project name in brochure popup:", brochureUrl);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999]" suppressHydrationWarning>
      <div className={`fixed top-0 left-0 w-full h-full bg-white transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-12 right-6 text-red-500 hover:text-red-700 text-2xl font-bold w-8 h-8 flex items-center justify-center z-10 cursor-pointer"
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
                disabled={isLoading}
                className={`w-full border-b ${errors.name ? 'border-red-500' : 'border-black-400/20'} outline-none p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400 disabled:opacity-50`}
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
                disabled={isLoading}
                className={`w-full border-b ${errors.email ? 'border-red-500' : 'border-black-400/20'} outline-none p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400 disabled:opacity-50`}
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
                maxLength={10}
                disabled={isLoading}
                className={`w-full border-b ${errors.phone ? 'border-red-500' : 'border-black-400/20'} outline-none  p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400 disabled:opacity-50`}
                placeholder="Phone"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

             <div className="w-full">
              <select
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full border-b border-black-400/20 outline-none p-[10px] text-[15px] leading-[110%] text-black-400 bg-transparent disabled:opacity-50"
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
                disabled={isLoading}
                className={`w-full border-b border-black-400/20 outline-none  p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400 disabled:opacity-50`}
                placeholder="Explain Your Query"
              />
            </div>
            
           
            
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 bg-black-400 text-white py-[14px] rounded-md text-xs font-medium hover:bg-gray-800 transition-colors duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Now'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
