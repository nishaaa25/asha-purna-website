"use client";
import Link from "next/link";

export default function BottomBar({
  btnOneText,
  btnTwoText,
  btnOneLink,
  btnTwoLink,
  onBrochureClick, // Custom handler for brochure button
}) {
  const handleBrochureClick = (e) => {
    e.preventDefault();
    if (onBrochureClick) {
      onBrochureClick();
    }
  };

  return (
    <>
      <div className="w-10/12 lg:w-4/12 relative mx-auto">
        <div className="w-full relative backdrop-blur-md bg-[#eeeeee]/10 p-[10px] md:p-3 lg:p-5 rounded-lg lg:rounded-xl grid grid-cols-2 gap-4 lg:gap-6 mx-auto">
          {/* Button One */}
          {btnOneText === "Brochure" ? (
            <button
              type="button"
              onClick={handleBrochureClick}
              className=" text-xs md:text-sm lg:text-base xl:text-lg w-full font-medium border-[0.5px] lg:border border-white py-2 lg:py-[10px] rounded-md lg:rounded-lg bg-transparent hover:bg-white flex items-center justify-center gap-2 text-white hover:text-black transition-all duration-300 cursor-pointer text-center"
            >
              <p>{btnOneText}</p>
            </button>
          ) : (
            <Link href={btnOneLink} className="flex-1">
              <button type="button" className="w-full text-xs md:text-sm lg:text-base xl:text-lg font-medium border-[0.5px] lg:border border-white py-2 lg:py-[10px] rounded-md lg:rounded-lg bg-transparent hover:bg-white flex items-center justify-center gap-2 text-white hover:text-black transition-all duration-300 cursor-pointer text-center">
                <p>{btnOneText}</p>
              </button>
            </Link>
          )}

          {/* Button Two */}
          <Link href={btnTwoLink} className="flex-1">
            <button type="button" className="w-full text-xs md:text-sm lg:text-base xl:text-lg font-medium border-[0.5px] lg:border border-white py-2 lg:py-[10px] rounded-md lg:rounded-lg bg-white text-black flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer text-center">
              <p>{btnTwoText}</p>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
