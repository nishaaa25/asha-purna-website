"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAPI } from "@/lib/hooks/useAPI";
import { createPortal } from "react-dom";
import { isValidEmail, isValidPhone, isValidName } from "@/lib/helpers/regex";
import { showErrorToast, showSuccessToast } from "@/lib/helpers/toastConfig";

export default function EnquireNowPopup({ isOpen, onClose, onSubmit, projectId, projectName }) {
  const { post, loading } = useAPI();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation - matching Pages Router logic
    if (!formData.name.trim()) {
      newErrors.name = "Please enter name";
    } else if (!isValidName(formData.name)) {
      newErrors.name = "Please enter valid name";
    }

    // Phone validation - matching Pages Router logic
    if (!formData.phone) {
      newErrors.phone = "Please enter phone number";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Mobile number must be 10 digits starting with 6-9";
    }

    // Email validation - matching Pages Router logic
    if (!formData.email.trim()) {
      newErrors.email = "Please enter email address";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter valid email";
    }

    // Message validation - matching Pages Router logic
    if (!formData.message.trim()) {
      newErrors.message = "Please enter message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

// useEffect(() => {
//   if (isOpen) {
//     const scrollY = window.scrollY;
//     document.body.style.position = 'fixed';
//     document.body.style.top = `-${scrollY}px`;
//     document.body.style.width = '100%';
//     document.body.style.overflow = 'hidden';
//   } else {
//     const scrollY = document.body.style.top;
//     document.body.style.position = '';
//     document.body.style.top = '';
//     document.body.style.width = '';
//     document.body.style.overflow = '';

//     // ✅ restore correctly (remove minus confusion)
//     if (scrollY) window.scrollTo(0, -parseInt(scrollY));
//   }

//   return () => {
//     document.body.style.position = '';
//     document.body.style.top = '';
//     document.body.style.width = '';
//     document.body.style.overflow = '';
//   };
// }, [isOpen]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For phone field, only allow numbers and limit to 10 digits
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else if (name === 'name' || name === 'message') {
      // Trim leading spaces and multiple consecutive spaces
      const trimmedValue = value.trimStart().replace(/  +/g, ' ');
      setFormData(prev => ({
        ...prev,
        [name]: trimmedValue
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Match Pages Router API payload structure exactly
        const params = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          project_id: projectId,
          parma_mantra_type: 'getInTouch',
        };

        // Submit to API
        const response = await post(
          process.env.ENQUIRY_FORM,
          params
        );

        if (response.status) {
          showSuccessToast(response.message || "Thank you for your enquiry! We will contact you soon.");
          
          // Reset form
          setFormData({
            name: "",
            phone: "",
            email: "",
            message: ""
          });
          setErrors({});
          
          // Call onSubmit callback to show Thank You popup
          if (onSubmit) {
            onSubmit(formData);
          }
        } else {
          showErrorToast(response.message || "Failed to submit enquiry. Please try again.");
        }
      } catch (error) {
        showErrorToast("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50  z-[9999]" suppressHydrationWarning>
      <div className={`fixed top-0 left-0 w-full h-full bg-white transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-red-500 hover:text-red-700 text-2xl font-bold w-8 h-8 flex items-center justify-center z-10 cursor-pointer"
        >
          <Image src="/assets/cross.svg" alt="cross" width={24} height={24} className="relative object-contain"/>
        </button>
        
        <div className="w-full h-full flex flex-col  items-center justify-center px-8">
          <div className="text-center mb-6 mt-5">
            <h2 className="text-[22px] md:text-2xl font-semibold leading-[130%] tracking-[-1.1px] mb-2 text-gray-600">
              {projectName ? `Enquire About ${projectName}` : 'Get in Touch'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8 flex-center flex-col">
            <div className="w-full">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full border-b ${errors.name ? 'border-red-500' : 'border-black-400/20'} outline-none p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400/70`}
                placeholder="Name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 text-left">{errors.name}</p>}
            </div>
            
            <div className="w-full">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                maxLength="10"
                className={`w-full border-b ${errors.phone ? 'border-red-500' : 'border-black-400/20'} outline-none p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400/70`}
                placeholder="Mobile Number"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1 text-left">{errors.phone}</p>}
            </div>
            
            <div className="w-full">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full border-b ${errors.email ? 'border-red-500' : 'border-black-400/20'} outline-none p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400/70`}
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 text-left">{errors.email}</p>}
            </div>
            
            <div className="w-full">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className={`w-full border-b ${errors.message ? 'border-red-500' : 'border-black-400/20'} outline-none p-[10px] text-[15px] leading-[110%] text-black-400 placeholder:text-black-400/70 resize-none`}
                placeholder="Message"
              />
              {errors.message && <p className="text-red-500 text-xs mt-1 text-left">{errors.message}</p>}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="px-10 bg-black-400 text-white py-[14px] rounded-md text-xs font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer"
            >
              {loading ? "Submitting..." : "Enquire Now"}
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}

