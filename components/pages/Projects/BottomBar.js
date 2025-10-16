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
      <div className="w-10/12 lg:w-4/12 relative mx-auto overflow-visible px-[1px]">
        <div className="w-full relative overflow-visible backdrop-blur-md bg-[#eeeeee]/10 p-[10px] md:p-3 lg:p-5 rounded-lg lg:rounded-xl grid grid-cols-2 gap-4 lg:gap-6 mx-auto [transform:translateZ(0)]">
          {/* Button One */}
          {btnOneText === "Brochure" ? (
            <button
              type="button"
              onClick={handleBrochureClick}
              className="text-xs md:text-sm lg:text-base xl:text-lg w-full font-medium border border-white/80 py-2 lg:py-[10px] rounded-md lg:rounded-lg bg-transparent hover:bg-white flex items-center justify-center gap-2 text-white hover:text-black transition-all duration-300 cursor-pointer text-center"
            >
              <p>{btnOneText}</p>
            </button>
          ) : (
            <Link href={btnOneLink} className="flex-1">
              <button
                type="button"
                className="w-full text-xs md:text-sm lg:text-base xl:text-lg font-medium border border-white/80 py-2 lg:py-[10px] rounded-md lg:rounded-lg bg-transparent hover:bg-white flex items-center justify-center gap-2 text-white hover:text-black transition-all duration-300 cursor-pointer text-center"
              >
                <p>{btnOneText}</p>
              </button>
            </Link>
          )}

          {/* Button Two */}
          <Link href={btnTwoLink} className="flex-1">
            <button
              type="button"
              className="w-full text-xs md:text-sm lg:text-base xl:text-lg font-medium border border-white/80 py-2 lg:py-[10px] rounded-md lg:rounded-lg bg-white text-black flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer text-center"
            >
              <p>{btnTwoText}</p>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
