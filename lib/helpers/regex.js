// Email validation regex
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone number validation regex (Indian format)
export const phoneRegex = /^[6-9]\d{9}$/;

// Name validation regex (alphabets and spaces only)
export const nameRegex = /^[a-zA-Z\s]+$/;

// Pincode validation regex (Indian 6-digit pincode)
export const pincodeRegex = /^[1-9][0-9]{5}$/;

// PAN card validation regex
export const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

// Aadhaar validation regex
export const aadhaarRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;

// Alphanumeric validation
export const alphanumericRegex = /^[a-zA-Z0-9]+$/;

// URL validation regex
export const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// Validation helper functions
export const isValidEmail = (email) => emailRegex.test(email);
export const isValidPhone = (phone) => phoneRegex.test(phone);
export const isValidName = (name) => nameRegex.test(name);
export const isValidPincode = (pincode) => pincodeRegex.test(pincode);
export const isValidPAN = (pan) => panRegex.test(pan);
export const isValidAadhaar = (aadhaar) => aadhaarRegex.test(aadhaar);
export const isValidURL = (url) => urlRegex.test(url);



