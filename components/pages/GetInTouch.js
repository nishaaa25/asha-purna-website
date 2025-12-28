"use client";
import Link from "next/link";
import { useState } from "react";
import { useAPI } from "@/lib/hooks/useAPI";
import { isValidEmail, isValidPhone, isValidName } from "@/lib/helpers/regex";
import { showErrorToast, showSuccessToast } from "@/lib/helpers/toastConfig";
import ThankYouEnquirePopup from "../ThankYouEnquirePopup";

export default function GetInTouch({heading, spanText, projectId, projectName}) {
  const { post, loading } = useAPI();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation - matching Pages Router
    if (!formData.name.trim()) {
      newErrors.name = "Please enter name";
    } else if (!isValidName(formData.name)) {
      newErrors.name = "Please enter valid name";
    }

    // Phone validation - matching Pages Router
    if (!formData.phone) {
      newErrors.phone = "Please enter phone number";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Mobile number must be 10 digits starting with 6-9";
    }

    // Email validation - matching Pages Router
    if (!formData.email.trim()) {
      newErrors.email = "Please enter email address";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter valid email";
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
        // Match Pages Router contact form payload structure
        const params = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          enquiry_type: 1, // Contact form type
        };

        // Submit to CONTACT_US_FORM API (same as Pages Router)
        const response = await post(
          process.env.CONTACT_US_FORM,
          params
        );

        if (response.status) {
          showSuccessToast(response.message || "Thank you for contacting us! We will get back to you soon.");
          setIsThankYouOpen(true);
          // Reset form
          setFormData({
            name: "",
            phone: "",
            email: "",
            message: ""
          });
          setErrors({});
        } else {
          showErrorToast(response.message || "Failed to submit form. Please try again.");
        }
      } catch (error) {
        showErrorToast("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="relative py-15 md:py-20 lg:py-[100px] text-center w-full">
       <div
          className={`whitespace-nowrap text-gray-600 capitalize text-[22px] md:text-[36px] lg:text-[42px]  mb-6`}
        >
          {heading && (
            <h2 className="font-playfair font-medium leading-[130%] tracking-[-1.1px]">{heading}</h2>
          )}
          {spanText && <h2 className="text-[20px] md:text-[38px] lg:text-[36px] leading-[130%] tracking-[-1.1%] font-light">{spanText}</h2>}
        </div>
      <div className="py-7 md:py-12 lg:py-16 px-7 md:px-13 lg:px-18 mt-5 md:mt-7 lg:mt-10 relative border-1  lg:border-[0.50px] w-10/12 md:w-9/12 lg:w-7/12 mx-auto border-black/50 rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="w-full">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className={`bg-transparent w-full outline-none py-1 md:py-4 border-b-[0.70px] lg:border-b-1 px-1 md:px-2 text-sm lg:text-base leading-[110%] lg:px-4 ${errors.name ? 'border-red-500' : 'border-black-400/30'} text-black-400/60 placeholder:text-black-400/50`}
            />
            {errors.name && <p className="text-red-500 text-xs text-left mt-1">{errors.name}</p>}
          </div>
          <div className="w-full">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              maxLength="10"
              className={`bg-transparent w-full outline-none py-1 md:py-4 border-b-[0.70px] lg:border-b-1 px-1 md:px-2 text-sm lg:text-base leading-[110%] lg:px-4 ${errors.phone ? 'border-red-500' : 'border-black-400/30'} text-black-400/60 placeholder:text-black-400/50`}
            />
            {errors.phone && <p className="text-red-500 text-xs text-left mt-1">{errors.phone}</p>}
          </div>
          <div className="w-full">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className={`bg-transparent w-full outline-none py-1 md:py-4  border-b-[0.70px] lg:border-b-1 px-1 md:px-2 text-sm lg:text-base leading-[110%] lg:px-4 ${errors.email ? 'border-red-500' : 'border-black-400/30'} text-black-400/60 placeholder:text-black-400/50`}
            />
            {errors.email && <p className="text-red-500 text-xs text-left mt-1">{errors.email}</p>}
          </div>
          <div className="w-full">
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message"
              rows="5"
              className={`bg-transparent w-full outline-none py-1 md:py-4 border-b-[0.70px] lg:border-b-1 px-1 md:px-2 text-sm lg:text-base leading-[110%] lg:px-4 ${errors.message ? 'border-red-500' : 'border-black-400/30'} text-black-400/60 placeholder:text-black-400/50 resize-none`}
            />
            {errors.message && <p className="text-red-500 text-xs text-left mt-1">{errors.message}</p>}
          </div>

          <div className="w-full relative">
            <button
              type="submit"
              disabled={loading}
              className="border border-[#cccccc]  bg-black-400 text-white font-bold text-sm md:text-lg lg:text-base py-[10px] min-w-8/12 md:min-w-1/2 lg:min-w-3/12 rounded-md mt-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
          <p className="text-sm md:text-base lg:text-base leading-[130%] text-black-400/50 text-start pb-2">
            Please visit the <Link href="/privacy-policy" className="text-orange-800 underline">Privacy Policy</Link> to understand how Ashapurna handles
            your personal data.
          </p>
        </form>
      </div>

      {/* Thank You Popup */}
      <ThankYouEnquirePopup
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
      />
    </div>
  );
}
