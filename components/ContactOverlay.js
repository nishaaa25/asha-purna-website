"use client";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function FloatingContactButtons() {
  const phoneNumber = "+919314041747"; // Replace with your number
  const whatsappNumber = "+919314041747"; // Replace with your number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="fixed bottom-40 lg:bottom-6 right-4 lg:right-6 flex flex-col gap-3 z-50">
      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition text-lg"
      >
        <FaWhatsapp />
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition text-lg"
      >
        <FaPhoneAlt />
      </a>
    </div>
  );
}
