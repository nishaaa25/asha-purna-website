"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ThankYouPopup from "./ThankYouPopup";

export default function RequisitionForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    locality: "",
    city: "",
    youAre: "",
    professionalType: "",
    hearAbout: "",
    subSource: "",
    otherSubSource: "",
    propertyType: "",
    interestedIn: [],
    budget: "",
    possessionTimeline: [],
    lookingFor: [],
    fundPlan: "",
    finalizeTimeline: "",
    project: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [projectOptions, setProjectOptions] = useState([]);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://apiservices.ashapurna.com/api/web/home/properties",
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

        if (result._status && result._data?.getProperties) {
          setProjectOptions(result._data.getProperties);
        } else {
          setProjectOptions([
            { id: 1, name: "Plots" },
            { id: 2, name: "Townships/Villas" },
            { id: 3, name: "Commercial" },
            { id: 4, name: "Residential" },
            { id: 5, name: "Hospitality" },
          ]);
        }
      } catch (error) {
        setProjectOptions([
          { id: 1, name: "Plots" },
          { id: 2, name: "Townships/Villas" },
          { id: 3, name: "Commercial" },
          { id: 4, name: "Residential" },
          { id: 5, name: "Hospitality" },
        ]);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const arr = prev[name];
        if (checked) return { ...prev, [name]: [...arr, value] };
        else return { ...prev, [name]: arr.filter((i) => i !== value) };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email))
      newErrors.email = "Invalid email address";

    // Phone validation (10 digit Indian number)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone))
      newErrors.phone = "Invalid phone number";

    // Conditional validations
    if (formData.youAre === "Professional" && !formData.professionalType)
      newErrors.professionalType = "Please select professional type";

    if (!formData.propertyType) newErrors.propertyType = "Property type is required";
    if (!formData.project) newErrors.project = "Please select a project";
    if (!formData.budget) newErrors.budget = "Please select your budget";
    if (!formData.finalizeTimeline)
      newErrors.finalizeTimeline = "Please select finalize timeline";
    if (!formData.hearAbout) newErrors.hearAbout = "Please select how you heard about us";

    if (formData.hearAbout === "Channel Partner" && !formData.subSource)
      newErrors.subSource = "Please select a channel partner";
    if (formData.subSource === "Others" && !formData.otherSubSource.trim())
      newErrors.otherSubSource = "Please specify other partner name";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://apiservices.ashapurna.com/api/web/enquiries/requist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setShowThankYou(true);
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          locality: "",
          city: "",
          youAre: "",
          professionalType: "",
          hearAbout: "",
          subSource: "",
          otherSubSource: "",
          propertyType: "",
          interestedIn: [],
          budget: "",
          possessionTimeline: [],
          lookingFor: [],
          fundPlan: "",
          finalizeTimeline: "",
          project: "",
        });
      } else {
        toast.error(data.message || "Failed to submit form");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "outline-none custom-placeholder lg:py-2 py-2 px-1 lg:px-[10px] text-sm md:text-base lg:text-lg  border-b-[0.70px] bg-transparent border-black-400/30 lg:border-b-1 lg:border-gray-600/50 text-black-400 w-full";

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
            className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
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
            disabled={isLoading}
            className={`${inputClass} ${errors.phone ? "border-red-500" : ""}`}
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
            className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 text-left">{errors.email}</p>
          )}
        </div>

        {/* Locality */}
        <div>
          <input
            type="text"
            name="locality"
            placeholder="Current Locality"
            value={formData.locality}
            onChange={handleChange}
            disabled={isLoading}
            className={inputClass}
          />
        </div>

        {/* City */}
        <div>
          <input
            type="text"
            name="city"
            placeholder="Current City"
            value={formData.city}
            onChange={handleChange}
            disabled={isLoading}
            className={inputClass}
          />
        </div>

        {/* You Are */}
        <div>
          <select
            name="youAre"
            value={formData.youAre}
            onChange={handleChange}
            disabled={isLoading}
            className={`${inputClass} ${errors.youAre ? "border-red-500" : ""}`}
          >
            <option value="">You are a</option>
            <option>Businessman</option>
            <option>Service Holder</option>
            <option>Self Employed</option>
            <option>Professional</option>
          </select>
          {errors.youAre && (
            <p className="text-red-500 text-xs mt-1 text-left">{errors.youAre}</p>
          )}
        </div>

        {/* Professional Type */}
        {formData.youAre === "Professional" && (
          <div>
            <select
              name="professionalType"
              value={formData.professionalType}
              onChange={handleChange}
              disabled={isLoading}
              className={`${inputClass} ${
                errors.professionalType ? "border-red-500" : ""
              }`}
            >
              <option value="">Professional Type</option>
              <option>Doctor</option>
              <option>Lawyer</option>
              <option>Consultant</option>
              <option>Others</option>
            </select>
            {errors.professionalType && (
              <p className="text-red-500 text-xs mt-1 text-left">
                {errors.professionalType}
              </p>
            )}
          </div>
        )}

        {/* How did you hear about us */}
        <div>
          <select
            name="hearAbout"
            value={formData.hearAbout}
            onChange={handleChange}
            disabled={isLoading}
            className={`${inputClass} ${errors.hearAbout ? "border-red-500" : ""}`}
          >
            <option value="">How did you hear about us?</option>
            <option>Google</option>
            <option>LinkedIn</option>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>Channel Partner</option>
            <option>Newspaper</option>
            <option>Hoarding</option>
            <option>Website</option>
            <option>Friends/ Family</option>
            <option>Others</option>
          </select>
          {errors.hearAbout && (
            <p className="text-red-500 text-xs mt-1 text-left">{errors.hearAbout}</p>
          )}
        </div>

        {/* Sub Source */}
        {formData.hearAbout === "Channel Partner" && (
          <div>
            <select
              name="subSource"
              value={formData.subSource}
              onChange={handleChange}
              disabled={isLoading}
              className={`${inputClass} ${errors.subSource ? "border-red-500" : ""}`}
            >
              <option value="">Select Channel Partner</option>
              <option>Partner 1</option>
              <option>Partner 2</option>
              <option>Others</option>
            </select>
            {errors.subSource && (
              <p className="text-red-500 text-xs mt-1 text-left">{errors.subSource}</p>
            )}

            {formData.subSource === "Others" && (
              <input
                type="text"
                name="otherSubSource"
                value={formData.otherSubSource}
                onChange={handleChange}
                placeholder="Enter Partner Name"
                disabled={isLoading}
                className={`${inputClass} mt-2 ${
                  errors.otherSubSource ? "border-red-500" : ""
                }`}
              />
            )}
            {errors.otherSubSource && (
              <p className="text-red-500 text-xs mt-1 text-left">
                {errors.otherSubSource}
              </p>
            )}
          </div>
        )}

        {/* Property Type */}
        <div>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            disabled={isLoading}
            className={`${inputClass} ${errors.propertyType ? "border-red-500" : ""}`}
          >
            <option value="">Property Type</option>
            <option>Residential</option>
            <option>Commercial</option>
          </select>
          {errors.propertyType && (
            <p className="text-red-500 text-xs mt-1 text-left">{errors.propertyType}</p>
          )}
        </div>

        {/* Projects */}
        <div>
          <select
            name="project"
            value={formData.project}
            onChange={handleChange}
            disabled={isLoading}
            className={`${inputClass} ${errors.project ? "border-red-500" : ""}`}
          >
            <option value="">{projectOptions.length === 0 ? "Loading projects..." : "Select Project"}</option>
            {projectOptions.length > 0 &&
              projectOptions.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
          </select>
          {errors.project && (
            <p className="text-red-500 text-xs mt-1 text-left">{errors.project}</p>
          )}
        </div>

        {/* Interested In */}
        <div>
          <label className="block mb-2 font-semibold text-sm md:text-base lg:text-lg">You are Interested In?</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "2 BHK",
              "2.5 BHK",
              "3 BHK",
              "3.5 BHK",
              "4 BHK",
              "Residential Plot",
              "Commercial Plot",
              "Shop",
              "Office Space",
            ].map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm md:text-base lg:text-lg">
                <input
                  type="checkbox"
                  name="interestedIn"
                  value={item}
                  checked={formData.interestedIn.includes(item)}
                  onChange={handleChange}
                  className="accent-[#808080]"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            disabled={isLoading}
            className={`${inputClass} ${errors.budget ? "border-red-500" : ""}`}
          >
            <option value="">Budget</option>
            <option>10L - 20L</option>
            <option>20L - 40L</option>
            <option>40L - 75L</option>
            <option>75L - 1 Cr</option>
            <option>1 Cr - 1.5 Cr</option>
            <option>1.5 Cr - 2.5 Cr</option>
            <option>2.5 Cr - 5 Cr</option>
            <option>5 Cr and Above</option>
          </select>
          {errors.budget && (
            <p className="text-red-500 text-xs mt-1 text-left">{errors.budget}</p>
          )}
        </div>

        {/* Possession Timeline */}
        <div>
          <label className="block mb-1 font-medium">Possession Timeline</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "Pre Launch",
              "Under Construction (4-5 Years)",
              "Under Construction (1-2 Years)",
              "Ready to Move In",
            ].map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="possessionTimeline"
                  value={item}
                  checked={formData.possessionTimeline.includes(item)}
                  onChange={handleChange}
                  className="accent-black-400"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Looking For */}
        <div>
          <label className="block mb-1 font-medium">Are you Looking for</label>
          <div className="flex gap-4">
            {["Investment", "Self Use"].map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="lookingFor"
                  value={item}
                  checked={formData.lookingFor.includes(item)}
                  onChange={handleChange}
                  className="accent-black-400"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Fund Plan */}
        <div>
          <select
            name="fundPlan"
            value={formData.fundPlan}
            onChange={handleChange}
            disabled={isLoading}
            className={inputClass}
          >
            <option value="">How do you plan to fund the Purchase?</option>
            <option>Self Funding</option>
            <option>Loan</option>
          </select>
        </div>

        {/* Finalize Timeline */}
        <div>
          <select
            name="finalizeTimeline"
            value={formData.finalizeTimeline}
            onChange={handleChange}
            disabled={isLoading}
            className={`${inputClass} ${errors.finalizeTimeline ? "border-red-500" : ""}`}
          >
            <option value="">How soon are you planning to finalise?</option>
            <option>Within 1 Month</option>
            <option>Within 2 Months</option>
            <option>Within 3 Months</option>
            <option>Just exploring</option>
          </select>
          {errors.finalizeTimeline && (
            <p className="text-red-500 text-xs mt-1 text-left">
              {errors.finalizeTimeline}
            </p>
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

      {/* Thank You Popup */}
      <ThankYouPopup isOpen={showThankYou} onClose={() => setShowThankYou(false)} />
    </div>
  );
}
