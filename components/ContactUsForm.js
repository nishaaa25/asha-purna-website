"use client";
import { useState } from "react";
import ThankYouEnquirePopup from "./ThankYouEnquirePopup";
import { useAPI } from "@/lib/hooks/useAPI";
import { isValidEmail, isValidPhone, isValidName } from "@/lib/helpers/regex";
import { showErrorToast, showSuccessToast } from "@/lib/helpers/toastConfig";

export default function ContactUsForm() {
  const { post, loading } = useAPI();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

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
        // Match Pages Router API payload structure exactly
        const params = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          enquiry_type: 1,
          subject: formData.subject,
        };

        // Submit to API
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
            subject: "",
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
    <div className="relative py-15  md:py-20  text-center px-7 md:px-25 lg:px-50">
      <h2 className="text-[22px] md:text-[44px] lg:text-[3rem] leading-[130%] tracking-[-1.1px] font-playfair mb-12 text-black-400 lg:text-gray-600 font-medium">
        Connect with Us
      </h2>
      <div className="py-10 md:py-14 lg:py-16 px-8 md:px-12 lg:px-18  relative border-[0.65px] w-full md:w-11/12 lg:w-9/12 mx-auto border-black/50 rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          <div className="w-full">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`outline-none w-full py-3 md:py-4 border-b-[0.70px] lg:border-b-1 px-1 md:px-2 lg:px-4 ${errors.name ? 'border-red-500' : 'border-black-400/30'} placeholder:text-black-400/50 text-black-400/50 text-sm md:text-base lg:text-lg leading-[110%]`}
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
              placeholder="Enter your phone number"
              maxLength="10"
              className={`outline-none w-full py-3 md:py-4 border-b-[0.70px] lg:border-b-1 px-1 md:px-2 lg:px-4 ${errors.phone ? 'border-red-500' : 'border-black-400/30'} placeholder:text-black-400/50 text-black-400/50 text-sm md:text-base lg:text-lg leading-[110%]`}
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
              placeholder="Enter your email address"
              className={`outline-none w-full py-3 md:py-4 border-b-[0.70px] lg:border-b-1 px-1 md:px-2 lg:px-4 ${errors.email ? 'border-red-500' : 'border-black-400/30'} placeholder:text-black-400/50 text-black-400/50 text-sm md:text-base lg:text-lg leading-[110%]`}
            />
            {errors.email && <p className="text-red-500 text-xs text-left mt-1">{errors.email}</p>}
          </div>
          <div className="w-full">
            <select
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`outline-none w-full py-3 md:py-4  border-b-[0.70px] lg:border-b-1 px-1 md:px-2 lg:px-4 ${errors.subject ? 'border-red-500' : 'border-black-400/30'} text-black-400/50 text-sm md:text-base lg:text-lg leading-[110%] cursor-pointer bg-transparent`}
            >
              <option value="" className="text-black-400">Select Subject</option>
              <option value="Site Enquiry" className="text-black-400">Site Enquiry</option>
              <option value="Management" className="text-black-400">Management</option>
              <option value="Other" className="text-black-400">Other</option>
            </select>
            {errors.subject && <p className="text-red-500 text-xs text-left mt-1">{errors.subject}</p>}
          </div>
          <div className="w-full">
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message"
              rows="6"
              className={`outline-none w-full py-3 md:py-4 border-b-[0.70px] lg:border-b-1 px-1 md:px-2 lg:px-4 ${errors.message ? 'border-red-500' : 'border-black-400/30'} placeholder:text-black-400/50 text-black-400/50 text-sm md:text-base lg:text-lg leading-[110%]`}
            />
            {errors.message && <p className="text-red-500 text-xs text-left mt-1">{errors.message}</p>}
          </div>
          <div className="w-full relative mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-black-400 text-white font-medium capitalize text-xs md:text-base lg:text-lg py-[10px] lg:py-3 min-w-10/12 md:min-w-8/12 lg:min-w-4/12 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
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
