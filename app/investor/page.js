"use client";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { isValidEmail, isValidPhone, isValidName } from "@/lib/helpers/regex";

export default function InvestorPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState([]);

  // Fetch property types on component mount
  useEffect(() => {
    fetchPropertyTypes();
  }, []);

  const fetchPropertyTypes = async () => {
    try {
      const response = await fetch(
        "https://apiservices.ashapurna.com/api/web/enquiries/property-types",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-version": "v1",
          },
          body: JSON.stringify({}),
        }
      );

      const result = await response.json();
      if (result._status && result._data?.getPropertyTypes) {
        setPropertyTypes(result._data.getPropertyTypes);
      }
    } catch (error) {}
  };

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
    } else if (!isValidName(formData.name)) {
      newErrors.name = "Please enter a valid name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select your interest";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
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
      const response = await fetch("/enquiries/contact", {
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
          enquiry_type: 4,
          subject: formData.subject,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result._status) {
        toast.success(result._message || "Form submitted successfully!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        toast.error(
          result._message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      <HeroComponentTwo imgUrl="https://d3qnldyv492i08.cloudfront.net/ashapurna/images/webimages/investor-bg.png" />
      <div className="w-full lg:w-8/12 mx-auto relative">
        <SectionHeader
          spanText="Investor Club"
          heading="Ashapurna"
          desc="The Ashapurna Investors Club helps you make research-backed, tailored real estate investments. With a wide portfolio of residential and commercial projects, we guide investors across all segments to secure future-ready opportunities with confidence."
        />
      </div>

      <div className="relative py-15 md:px-20 lg:py-[100px] text-center bg-cream-600 px-[22px] w-full">
        <h2 className="text-[22px] md:text-3xl lg:text-5xl leading-[130%] tracking-[-1.1px] mb-5 lg:mb-7 text-black-400 lg:text-gray-600 font-medium">
          Want to take it further
        </h2>
        <p className="mb-6 lg:mb-10 text-sm md:text-base lg:text-[22px] leading-[140%] text-gray-800 tracking-[-1.1%]">
          Please fill in the form and we would contact you at the earliest.
        </p>
        <div className="py-10 md:py-[70px] lg:py-[100px] px-8 md:px-20 lg:px-28 w-full lg:w-10/12 relative border-[0.65px]  border-black/50 rounded-xl lg:mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 md:gap-8 lg:gap-10"
          >
            <div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                className={`outline-none lg:py-4 py-3 px-1 lg:px-[10px] text-sm md:text-base lg:text-[22px] placeholder:text-black-400/50 border-b-[0.70px] bg-transparent border-black-400/30 lg:border-b-1 lg:border-gray-600/50 text-black-400 w-full ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Contact"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                disabled={isLoading}
                className={`outline-none lg:py-4 py-3 px-1 lg:px-[10px] text-sm md:text-base lg:text-[22px] placeholder:text-black-400/50 border-b-[0.70px] bg-transparent border-black-400/30 lg:border-b-1 lg:border-gray-600/50 text-black-400 w-full ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`outline-none lg:py-4 py-3 px-1 lg:px-[10px] text-sm md:text-base lg:text-[22px] placeholder:text-black-400/50 border-b-[0.70px] bg-transparent border-black-400/30 lg:border-b-1 lg:border-gray-600/50 text-black-400 w-full ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="relative w-full">
                <select
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full bg-transparent outline-none lg:py-4 py-3 text-sm md:text-base lg:text-[22px] placeholder:text-black-400/50 border-b-[0.70px] border-black-400/30 lg:border-b-1 lg:border-gray-600/50 text-black-400 appearance-none pr-8 pl-2 ${
                    errors.subject ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select your interest</option>
                  {propertyTypes.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 w-[10px] h-[5px] lg:w-5 lg:h-[10px]">
                  <Image src="/assets/down.svg" alt="down" fill />
                </div>
              </div>
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <textarea
                name="message"
                id="message"
                placeholder="Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
                className={`outline-none lg:py-4 py-3 px-1 lg:px-[10px] text-sm md:text-base lg:text-[22px] placeholder:text-black-400/50 border-b-[0.70px] bg-transparent border-black-400/30 lg:border-b-1 lg:border-gray-600/50 text-black-400 w-full ${
                  errors.message ? "border-red-500" : ""
                }`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="w-full relative mt-14 lg:mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="border border-[#cccccc] bg-black-400 text-white font-medium text-sm md:text-base lg:text-xl py-[10px] lg:min-w-3/12 min-w-10/12 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
