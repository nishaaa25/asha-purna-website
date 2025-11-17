"use client";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function FloatingContactButtons() {
  const phoneNumber = "+919314041747";
  const whatsappNumber = "+919314041747";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleCallClick = (e) => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // If NOT mobile → prevent tel: from opening and show number
    if (!isMobile) {
      e.preventDefault();
      alert(`Call this number: ${phoneNumber}`);
    }
  };

  return (
    <div className="fixed hidden lg:flex bottom-40 lg:bottom-6 right-4 lg:right-6 flex-col gap-3 z-50">
      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#33343b] text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition text-lg"
      >
        <FaWhatsapp />
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        onClick={handleCallClick}
        className="bg-[#33343b] text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition text-lg"
      >
        <FaPhoneAlt />
      </a>
    </div>
  );
}
