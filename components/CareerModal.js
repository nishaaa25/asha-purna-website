"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { isValidEmail, isValidPhone, isValidName } from "@/lib/helpers/regex";

export default function CareerModal({ isOpen, onClose, positions, qualifications, jobId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentLocation: "",
    qualification: "",
    position: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!isValidName(formData.name)) newErrors.name = "Please enter a valid name";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email)) newErrors.email = "Please enter a valid email";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!isValidPhone(formData.phone)) newErrors.phone = "Please enter a valid 10-digit phone number";

    if (!formData.currentLocation.trim()) newErrors.currentLocation = "Current location is required";
    if (!formData.qualification) newErrors.qualification = "Please select qualification";
    if (!formData.position) newErrors.position = "Please select position";

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
      const response = await fetch("https://apiservices.ashapurna.com/api/web/career/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-version": "v1",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          current_location: formData.currentLocation,
          qualification_id: formData.qualification,
          position_id: formData.position,
          career_job_id: jobId,
        }),
      });

      const result = await response.json();

      if (result._status) {
        toast.success("Your application has been submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          currentLocation: "",
          qualification: "",
          position: "",
        });
        setErrors({});
        onClose();
      } else {
        toast.error(result._message || "Something went wrong. Please try again later.");
      }
    } catch (error) {
      toast.error("Failed to submit application. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] w-full h-screen bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-50 flex items-center justify-between p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 uppercase">
          Submit Your Application
        </h2>
        <button
          onClick={onClose}
          disabled={isLoading}
          className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Form */}
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              disabled={isLoading}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 outline-none ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Current Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="currentLocation"
              value={formData.currentLocation}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 outline-none ${
                errors.currentLocation ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your current location"
            />
            {errors.currentLocation && (
              <p className="text-red-500 text-xs mt-1">{errors.currentLocation}</p>
            )}
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Highest Qualification <span className="text-red-500">*</span>
            </label>
            <select
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 outline-none ${
                errors.qualification ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Qualification</option>
              {qualifications.map((qual) => (
                <option key={qual.id} value={qual.id}>
                  {qual.name}
                </option>
              ))}
            </select>
            {errors.qualification && (
              <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Position <span className="text-red-500">*</span>
            </label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 outline-none ${
                errors.position ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Position</option>
              {positions.map((pos) => (
                <option key={pos.id} value={pos.id}>
                  {pos.name}
                </option>
              ))}
            </select>
            {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 sm:py-3 rounded-md transition disabled:bg-gray-400 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "SUBMIT"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
