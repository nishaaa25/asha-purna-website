"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { isValidEmail, isValidPhone, isValidName } from "@/lib/helpers/regex";
import Image from "next/image";

export default function CareerModal({ isOpen, onClose, positions, qualifications, jobId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentLocation: "",
    qualification: "",
    position: "",
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, resume: "Please upload a PDF or DOC file" }));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: "File size must be less than 5MB" }));
        return;
      }
      setFormData((prev) => ({ ...prev, resume: file }));
      setErrors((prev) => ({ ...prev, resume: "" }));
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

    if (!formData.currentLocation.trim()) {
      newErrors.currentLocation = "Current location is required";
    }

    if (!formData.qualification) {
      newErrors.qualification = "Please select qualification";
    }

    if (!formData.position) {
      newErrors.position = "Please select position";
    }

    if (!formData.resume) {
      newErrors.resume = "Please upload your resume";
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
      // Step 1: Submit form data
      const response = await fetch(
        "https://apiservices.ashapurna.com/api/web/career/enquiry",
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
            current_location: formData.currentLocation,
            qualification_id: formData.qualification,
            position_id: formData.position,
            career_job_id: jobId,
          }),
        }
      );

      const result = await response.json();

      if (result._status && result._data?.career_id) {
        // Step 2: Upload resume
        const formDataResume = new FormData();
        formDataResume.append("resume_file", formData.resume);
        formDataResume.append("enquiry_id", result._data.career_id);

        const resumeResponse = await fetch(
          "https://admin.ashapurna.com/api/upload-career-resume",
          {
            method: "POST",
            headers: {
              "api-version": "v1",
            },
            body: formDataResume,
          }
        );

        const resumeResult = await resumeResponse.json();

        if (resumeResult._status) {
          toast.success(resumeResult._message || "Application submitted successfully!");
          // Reset form
          setFormData({
            name: "",
            email: "",
            phone: "",
            currentLocation: "",
            qualification: "",
            position: "",
            resume: null,
          });
          setErrors({});
          onClose();
        } else {
          toast.error(resumeResult._message || "Failed to upload resume");
        }
      } else {
        toast.error(result._message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Career form submission error:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl my-4 sm:my-8 max-h-[95vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-2 right-2 sm:absolute sm:top-4 sm:right-4 ml-auto block text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-1 cursor-pointer"
          disabled={isLoading}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="border-b px-3 py-3 sm:p-6">
          <h2 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-900 uppercase pr-8">
            Submit Your Resume Here!
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-3 sm:p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
            {/* Name */}
            <div>
              <label className="block text-[11px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-base border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-base border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[11px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                disabled={isLoading}
                className={`w-full px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-base border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{errors.phone}</p>}
            </div>

            {/* Current Location */}
            <div>
              <label className="block text-[11px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Current Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-base border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                  errors.currentLocation ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your current location"
              />
              {errors.currentLocation && <p className="text-red-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{errors.currentLocation}</p>}
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-[11px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Highest Qualification <span className="text-red-500">*</span>
              </label>
              <select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-base border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
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
              {errors.qualification && <p className="text-red-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{errors.qualification}</p>}
            </div>

            {/* Position */}
            <div>
              <label className="block text-[11px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Select Position <span className="text-red-500">*</span>
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-base border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
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
              {errors.position && <p className="text-red-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{errors.position}</p>}
            </div>

            {/* Resume Upload */}
            <div className="md:col-span-2">
              <label className="block text-[11px] sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Upload Resume <span className="text-red-500">*</span>
                <span className="block sm:inline text-[10px] sm:text-xs text-gray-500 sm:ml-2 mt-0.5 sm:mt-0">(PDF or DOC, max 5MB)</span>
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                disabled={isLoading}
                className={`w-full px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-[11px] sm:text-sm border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none ${
                  errors.resume ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formData.resume && (
                <p className="text-[10px] sm:text-sm text-gray-600 mt-0.5 sm:mt-1 truncate">Selected: {formData.resume.name}</p>
              )}
              {errors.resume && <p className="text-red-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">{errors.resume}</p>}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 text-xs sm:text-base rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
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
                  "SUBMIT"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

