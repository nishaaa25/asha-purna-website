"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ThankYouEnquirePopup from "./ThankYouEnquirePopup";
import CustomDropdown from "./CustomDropdown";
import { useAPI } from "@/lib/hooks/useAPI";
import { isValidEmail, isValidPhone, isValidName } from "@/lib/helpers/regex";
import { showErrorToast, showSuccessToast } from "@/lib/helpers/toastConfig";

export default function HorizontalForm() {
  const { get, post, loading } = useAPI();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project_id: "",
    message: ""
  });

  const [propertyOptions, setPropertyOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

  // Fetch property options from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Direct fetch for better reliability
        const response = await fetch(
          `https://apiservices.ashapurna.com/api/web/home/properties`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-version': 'v1',
            },
            body: JSON.stringify({}),
          }
        );
        
        const result = await response.json();
        console.log('Property Options API Response:', result);
        
        if (result._status && result._data?.getProperties) {
          setPropertyOptions(result._data.getProperties);
          console.log('Loaded', result._data.getProperties.length, 'property options from API');
        } else {
          console.warn('API returned false status, using fallback options');
          setPropertyOptions([
            { id: 1, name: "Plots" },
            { id: 2, name: "Townships/Villas" },
            { id: 3, name: "Commercial" },
            { id: 4, name: "Residential" },
            { id: 5, name: "Hospitality" },
          ]);
        }
      } catch (error) {
        console.error('Error fetching property options:', error);
        // Use fallback options
        setPropertyOptions([
          { id: 1, name: "Plots" },
          { id: 2, name: "Townships/Villas" },
          { id: 3, name: "Commercial" },
          { id: 4, name: "Residential" },
          { id: 5, name: "Hospitality" },
        ]);
      }
    };
    fetchProperties();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Enter name";
    } else if (!isValidName(formData.name)) {
      newErrors.name = "Enter valid name";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Enter phone number";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Mobile number must be 10 digits only";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Enter email address";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    // Property validation
    if (!formData.project_id) {
      newErrors.project_id = "Select property";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Enter message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    console.log('HorizontalForm submission started');
    console.log('Form data:', formData);
    
    if (validateForm()) {
      try {
        // Submit to API
        const params = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          project_id: Number(formData.project_id),
        };

        console.log('Submitting to API:', process.env.ENQUIRY_FORM, params);
        const response = await post(process.env.ENQUIRY_FORM, params);

        console.log('API Response:', response);

        if (response.status) {
          console.log('Horizontal form submitted successfully');
          // Show thank you popup
          setIsThankYouOpen(true);
          
          // Reset form
          setFormData({
            name: "",
            email: "",
            phone: "",
            project_id: "",
            message: ""
          });
          setErrors({});
        } else {
          console.error('Horizontal form submission failed:', response.message);
          showErrorToast(response.message || "Failed to submit enquiry. Please try again.");
        }
      } catch (error) {
        console.error('HorizontalForm submission error:', error);
        showErrorToast("An unexpected error occurred. Please try again.");
      }
    } else {
      console.log('Form validation failed:', errors);
    }
  };

  return (
    <>
      <div className="py-4 lg:py-5 px-6 lg:px-10 xl:px-12 relative bg-[#eeeeee]/20 backdrop-blur-2xl enquiry-form hidden lg:flex flex-center rounded-[10px] text-white">
        <form onSubmit={handleSubmit} className="flex-center gap-4 xl:gap-6 w-full enquiry-form justify-between">
          <div className="relative flex-1 min-w-[80px] max-w-[180px] ">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className={`border-b text-white placeholder:text-white/80 ${errors.name ? 'border-red-500' : 'border-b-white'} pt-1 pb-1.5 text-sm xl:text-[15px] outline-none leading-[110%] w-full bg-transparent`}
            />
            {errors.name && <p className="text-red-500 text-[10px] absolute -bottom-4 left-0 whitespace-nowrap">{errors.name}</p>}
          </div>
          <div className="relative flex-1 min-w-[80px] max-w-[180px]">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className={`border-b text-white placeholder:text-white/80 ${errors.email ? 'border-red-500' : 'border-b-white'} pt-1 pb-1.5 text-sm xl:text-[15px] outline-none leading-[110%] w-full bg-transparent`}
            />
            {errors.email && <p className="text-red-500 text-[10px] absolute -bottom-4 left-0 whitespace-nowrap">{errors.email}</p>}
          </div>
          <div className="relative flex-1 min-w-[80px] max-w-[180px]">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone No."
              maxLength="10"
              className={`border-b text-white placeholder:text-white/80 ${errors.phone ? 'border-red-500' : 'border-b-white'} pt-1 pb-1.5 text-sm xl:text-[15px] outline-none leading-[110%] w-full bg-transparent`}
            />
            {errors.phone && <p className="text-red-500 text-[10px] absolute -bottom-4 left-0 whitespace-nowrap">{errors.phone}</p>}
          </div>
          <div className="relative flex-1 min-w-[80px] max-w-[180px]">
            <CustomDropdown
              options={propertyOptions}
              value={formData.project_id}
              onChange={handleInputChange}
              placeholder={propertyOptions.length === 0 ? "Loading..." : "Property"}
              error={!!errors.project_id}
              disabled={loading}
            />
            {errors.project_id && <p className="text-red-500 text-[10px] absolute -bottom-4 left-0 whitespace-nowrap">{errors.project_id}</p>}
          </div>
          <div className="relative flex-1 min-w-[80px] max-w-[180px]">
            <input
              type="text"
              name="message"
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message"
              className={`border-b text-white placeholder:text-white/80 ${errors.message ? 'border-red-500' : 'border-b-white'} pt-1 pb-1.5 text-sm xl:text-[15px] outline-none leading-[110%] w-full bg-transparent`}
            />
            {errors.message && <p className="text-red-500 text-[10px] absolute -bottom-4 left-0 whitespace-nowrap">{errors.message}</p>}
          </div>
          <button 
            className="relative px-4 xl:px-6 py-3 xl:py-3.5 bg-white text-black text-sm xl:text-base font-bold rounded-lg border border-[#cccccc] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex-shrink-0" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Now"}
          </button>
        </form>
      </div>

      {/* Thank You Popup - Shows above navbar */}
      <ThankYouEnquirePopup
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
        buttonText="Explore Projects"
        buttonLink="/projects"
      />
    </>
  );
}
