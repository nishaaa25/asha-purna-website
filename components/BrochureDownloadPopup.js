"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { validateEmail, validatePhone, validateName } from "@/lib/helpers/regex";

export default function BrochureDownloadPopup({ 
  isOpen, 
  onClose, 
  projectId, 
  projectName,
  brochureUrl,
  brochureImages = []
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate brochure images
  useEffect(() => {
    if (brochureImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % brochureImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [brochureImages.length]);

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      newErrors.name = "Please enter a valid name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Message validation - now mandatory
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
            message: formData.message,
            project_id: projectId,
            parma_mantra_type: "brochure",
          }),
        }
      );

      const result = await response.json();

      if (result._status) {
        toast.success(result._message || "Form submitted successfully!");
        
        // Download the brochure
        if (brochureUrl) {
          window.open(brochureUrl, "_blank");
        }
        
        // Close popup
        onClose();
        
        // Reset form
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(result._message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Brochure form submission error:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999]  flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        {/* Left side - Brochure Images */}
        <div className="hidden md:block md:w-1/2 bg-gray-100 relative overflow-hidden">
          {brochureImages.length > 0 ? (
            <div className="w-full h-full">
              {brochureImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
              {/* Dots indicator */}
              {brochureImages.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {brochureImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div
              className="w-full h-full"
              style={{
                backgroundImage: "url(/assets/brochure-default.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
        </div>

        {/* Right side - Form */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 cursor-pointer"
            disabled={isLoading}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Form Header */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 uppercase">
              Download Brochure
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Feel free to connect with us. We will contact you shortly.
            </p>
            {projectName && (
              <p className="text-sm font-medium text-orange-600 mt-1">
                {projectName}
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your name"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your phone number"
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-2.5 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your message"
                disabled={isLoading}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Download Brochure"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

