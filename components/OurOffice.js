import Image from "next/image";

export default function OurOffice() {
  const contacts = [
    {
      icon: "/assets/location-2.svg",
      details: [
        "Head Office",
        "4A, East Patel Nagar, Circuit House Road, Jodhpur, Rajasthan, 342011",
      ],
    },
    {
      icon: "/assets/phone-red.svg",
      details: ["Contact Us"],
      isPhone: true,
    },
    {
      icon: "/assets/star.svg",
      details: ["Office Timing", "Mon - Sun : 9:00 AM - 7:00 PM"],
    },
  ];

  return (
    <div className="w-full relativen py-15 lg:py-[100px]">
      <h2 className="text-[22px] md:text-[45px] lg:text-[48px] lg:text-center leading-[130%] tracking-[-1.1px] mb-5 text-black-400 font-medium w-full px-[22px]  md:px-15 lg:px-24 ">
        Our Office
      </h2>
      <div className="relative w-full flex flex-col lg:flex-row gap-14 lg:gap-6 px-[22px] md:px-15 lg:px-24 items-stretch">
        {/* Left side - Contact box */}
        <div className="w-full lg:w-4/12 relative mx-auto border p-5 md:p-10 lf:px-10 lg:py-20 rounded-lg border-orange-600/20 flex flex-col gap-5 lg:gap-10">
          {contacts.map((contact, index) => (
            <div key={index} className="flex gap-4 lg:gap-6 h-full relative">
              <div className="w-[17px] h-[17px] md:w-5 md:h-5 lg:w-8 lg:h-6 relative flex-center">
                <Image
                  src={contact.icon}
                  alt="icon"
                  fill
                  className="object-contain relative"
                />
              </div>
              <div className="relative">
                <p className="mb-1 lg:mb-2 text-gray-600 font-semibold text-sm md:text-base lg:text-lg leading-[130%]">
                  {contact.details[0]}
                </p>
                {contact.isPhone ? (
                  <div className="relative font-medium text-xs md:text-base lg:text-base leading-[140%] text-gray-800 tracking-[-1.1%]">
                    <a
                      href="tel:9314041747"
                      className="hover:text-orange-600 transition-colors"
                    >
                      9314041747
                    </a>
                    <span>, </span>
                    <a
                      href="tel:02912514747"
                      className="hover:text-orange-600 transition-colors"
                    >
                      0291-2514747
                    </a>
                  </div>
                ) : (
                  <p className="relative font-medium text-xs md:text-base lg:text-base leading-[140%] text-gray-800 tracking-[-1.1%]">
                    {contact.details[1]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Google Map */}
        <div className="w-full lg:w-8/12 relative overflow-hidden rounded-[10px] h-[300px] lg:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d457918.34401696065!2d73.037212!3d26.278306!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x35b840646df082cc!2sAshapurna%20Buildcon%20Ltd%20Corporate%20office!5e0!3m2!1sen!2sus!4v1674640627695!5m2!1sen!2sus"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
