import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export default function StayUpdated() {
  return (
    <div className="relative bg-cream-600 text-center pb-15 lg:pb-[100px]">
      <div className="relative w-full lg:w-7/12 mx-auto">
        <SectionHeader
          heading="Stay Updated"
          desc="Subscribe to our newsletter and never miss the latest news, insights, and updates from Ashapurna Builcon."
        />
      </div>
      <div className="py-10 px-7 md:px-12 lg:px-30 relative border-[0.50px] w-10/12 md:w-9/12 mx-auto border-black/50 rounded-xl">
        <form className="flex flex-col gap-5 md:gap-8 lg:gap-12 lg:py-20">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            className="bg-transparent outline-none py-3 border-b-[0.70px] lg:border-b-1 border-black-400/30 placeholder:text-black-500/50 text-black-400/50 text-sm md:text-lg lg:text-base"
          />

          <div className="w-full relative mb-6">
            <button
              type="submit"
              className="border border-[#cccccc]  bg-black-400 text-white font-medium text-xs md:text-base lg:text-base py-[10px] lg:py-[15px] min-w-8/12 md:min-w-4/12 lg:min-w-3/12 rounded-md mt-4 cursor-pointer"
            >
              Subscribe
            </button>
          </div>
          <div className="flex justify-start items-center gap-2">
            <input
              type="checkbox"
              name="news-letter"
              id="news-letter"
              className="bg-transparent scale-[1.4] lg:scale-[1.7] mr-2"
            />
            <span className="text-sm lg:text-sm leading-7 text-black-400/70">
              Keep me updated on news.
            </span>
          </div>
          <p className="text-sm md:text-base lg:text-base leading-[130%] text-black-400/50 text-start pb-2">
            Please visit the
            <Link href="" className="text-orange-800 underline mx-1">
              Privacy Policy.
            </Link>
            to understand how Ashapurna handles your personal data.
          </p>
        </form>
      </div>
    </div>
  );
}
