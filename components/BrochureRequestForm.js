"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { isValidEmail, isValidPhone, isValidName } from "@/lib/helpers/regex";
import Image from "next/image";

export default function BrochureRequestForm({ 
  isOpen, 
  onClose, 
  projectId, 
  projectName,
  onSuccess
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    }
  }, [isOpen]);

  // Handle scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone field, only allow numbers and limit to 10 digits
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

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
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number starting with 6-9";
    }

    // Message validation - now mandatory with minimum length
    if (!formData.message.trim()) {
      newErrors.message = "Enquiry message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Enquiry must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://apiservices.ashapurna.com/api/web/enquiry-form",
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
            message: formData.message || `Brochure request for ${projectName}`,
            project_id: projectId,
            parma_mantra_type: "brochure_request",
          }),
        }
      );

      const result = await response.json();

      if (result._status) {
        toast.success("Brochure request submitted successfully! We'll contact you soon.");
        onSuccess && onSuccess();
        onClose();
      } else {
        toast.error(result._message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Brochure request form submission error:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none bg-black bg-opacity-50 z-[9999]" suppressHydrationWarning>
      <div className={`fixed top-0 left-0 w-full h-full bg-white transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Close button */}
        <button
          type="button"
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                maxLength={10}
                className={`w-full border-b ${errors.phone ? 'border-red-500' : 'border-black-400/20'} outline-none p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400`}
                placeholder="Phone Number"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            
            <div className="w-full">
              <select
                name="project"
                value={projectName}
                className="w-full border-b border-black-400/20 outline-none p-[10px] text-[15px] leading-[110%] text-black-400 bg-transparent"
                disabled
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
                onChange={handleChange}
                className={`w-full border-b ${errors.message ? 'border-red-500' : 'border-black-400/20'} outline-none p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400`}
                placeholder="Brochure Request for Project *"
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 bg-black-400 text-white py-[14px] rounded-md text-xs font-medium hover:bg-gray-800 transition-colors duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? "Submitting..." : "Submit Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
