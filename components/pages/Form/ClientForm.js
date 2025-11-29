"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { isValidEmail, isValidPhone, isValidName } from "@/lib/helpers/regex";

export default function ClientForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    source: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Basic Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!isValidName(formData.name))
      newErrors.name = "Enter a valid name (letters only)";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email))
      newErrors.email = "Enter a valid email address";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!isValidPhone(formData.phone))
      newErrors.phone = "Enter a valid 10-digit phone number";

    if (!formData.project) newErrors.project = "Select a project";
    if (!formData.source) newErrors.source = "Select a source";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
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
            phone: formData.phone,
            email: formData.email,
            project_id: formData.project ? Number(formData.project) : 0,
            parma_mantra_type: "client",
            message: `Source: ${formData.source}`,
          }),
        }
      );

      const result = await response.json();

      // ✅ Toast for both possible success responses
      if (result?._status) {
        toast.success("Form submitted successfully!");
      } else {
        toast.info("Thank you! We have received your enquiry.");
      }

      // ✅ Always reset form and trigger popup
      setFormData({
        name: "",
        phone: "",
        email: "",
        project: "",
        source: "",
      });

      onSuccess?.();

    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-10 md:py-13 lg:py-16 px-8 md:px-16 lg:px-20 w-full lg:w-8/12 relative border-[0.65px] border-black/50 rounded-xl lg:mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 md:gap-8 lg:gap-10"
      >
        {/* Name */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className={`outline-none py-2 px-1 lg:px-[10px] text-sm md:text-base lg:text-lg 
              placeholder:text-black-400/50 border-b-[0.70px] bg-transparent 
              border-black-400/30 lg:border-b-1 lg:border-gray-600/50 text-black-400 w-full 
              ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 text-left">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            disabled={isLoading}
            className={`outline-none py-2 px-1 lg:px-[10px] text-sm md:text-base lg:text-lg 
              placeholder:text-black-400/50 border-b-[0.70px] bg-transparent 
              border-black-400/30 lg:border-b-1 lg:border-gray-600/50 text-black-400 w-full 
              ${errors.phone ? "border-red-500" : ""}`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 text-left">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className={`outline-none py-2 px-1 lg:px-[10px] text-sm md:text-base lg:text-lg 
              placeholder:text-black-400/50 border-b-[0.70px] bg-transparent 
              border-black-400/30 lg:border-b-1 lg:border-gray-600/50 text-black-400 w-full 
              ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 text-left">{errors.email}</p>
          )}
        </div>

        {/* Project Dropdown */}
        <div>
          <select
            name="project"
            value={formData.project}
            onChange={handleChange}
            disabled={isLoading}
            className={`outline-none py-2 px-1 lg:px-[10px] text-sm md:text-base lg:text-lg 
              placeholder:text-black-400/50 border-b-[0.70px] bg-transparent 
              border-black-400/30 lg:border-b-1 lg:border-gray-600/50 text-black-400 w-full 
              ${errors.project ? "border-red-500" : ""}`}
          >
            <option value="">Select Project</option>
            <option value="1">Ashapurna Empire</option>
            <option value="2">Ashapurna Valley</option>
            <option value="3">Ashapurna Greens</option>
          </select>
          {errors.project && (
            <p className="text-red-500 text-xs mt-1 text-left">{errors.project}</p>
          )}
        </div>

        {/* Source Dropdown */}
        <div>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            disabled={isLoading}
            className={`outline-none py-2 px-1 lg:px-[10px] text-sm md:text-base lg:text-lg 
              placeholder:text-black-400/50 border-b-[0.70px] bg-transparent 
              border-black-400/30 lg:border-b-1 lg:border-gray-600/50 text-black-400 w-full 
              ${errors.source ? "border-red-500" : ""}`}
          >
            <option value="">Select Source</option>
            <option value="Google">Google</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
          {errors.source && (
            <p className="text-red-500 text-xs mt-1 text-left">{errors.source}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-black text-white py-3 rounded-md hover:bg-gray-800 transition disabled:opacity-60"
        >
          {isLoading ? "Submitting..." : "Submit Now"}
        </button>
      </form>
    </div>
  );
}
