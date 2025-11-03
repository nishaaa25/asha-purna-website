"use client";

import { useState } from "react";
import HeroComponentTwo from "@/components/HeroComponentTwo";
import ChannelPartnerForm from "@/components/pages/Form/ChannelPartnerForm";
import ClientForm from "@/components/pages/Form/ClientForm";
import SectionHeader from "@/components/SectionHeader";

export default function Page() {
  const [activeForm, setActiveForm] = useState("channel");

  return (
    <div className="w-full relative pb-10 md:pb-20 lg:pb-[100px]">
      <HeroComponentTwo imgUrl="/assets/investor.jpg" />

      {/* Become Partner Section */}
      <section className="w-full relative px-20 flex-center flex-col ">
        <SectionHeader
          heading="Become a Partner"
          desc="Whether you’re an individual looking to collaborate as a Channel Partner 
            or a client interested in exploring our real estate opportunities — 
            we’d love to connect with you. Fill out the form below and our team 
            will reach out to you shortly."
          
        />
        <div className="flex gap-4 relative -top-15">
          <button
            onClick={() => setActiveForm("channel")}
            className={` text-xs md:text-base border border-black-400 lg:text-base py-[10px] font-medium lg:py-[15px] min-w-38 lg:min-w-50 px-5 lg:px-6 rounded-md mt-2 capitalize cursor-pointer text-center ${
              activeForm === "channel" 
                ? "bg-black-400 text-white "
                : " text-black-400 hover:bg-white"
            }`}
          >
            Channel Partner
          </button>

          <button
            onClick={() => setActiveForm("client")}
             className={` text-xs md:text-base border border-black-400 lg:text-base py-[10px] font-medium lg:py-[15px] min-w-38 lg:min-w-50 px-5 lg:px-6 rounded-md mt-2 capitalize cursor-pointer text-center ${
              activeForm === "client" 
                ? "bg-black-400 text-white"
                : " text-black-400 hover:bg-white"
            }`}
          >
            Client
          </button>
        </div>

        {/* Forms */}
        <div className="w-10/12 mx-auto bg-white  transition-all">
          {activeForm === "channel" && <ChannelPartnerForm />}
          {activeForm === "client" && <ClientForm />}
          {!activeForm && (
            <p className="text-gray-500 text-center">
              Please select an option to get started.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
