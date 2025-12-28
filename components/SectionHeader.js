import Button from "./Button";

export default function SectionHeader({
  title,
  heading,
  spanText,
  btn,
  desc,
  size,
  btnLink,
}) {
  return (
    <div className="w-full relative py-15 lg:py-20  px-[22px]">
      <div className="w-full md:w-[85%] md:px-2 relative flex-center text-center flex-col gap-5 md:gap-8 mx-auto">
        {title && (
          <h5 className="text-orange-600 uppercase text-[20px] font-medium leading-[110%]">
            {title}
          </h5>
        )}
        <div className={`whitespace-nowrap text-gray-600 capitalize`}>
          {heading && (
            <h2 className="font-playfair font-medium text-[22px] md:text-[38px] lg:text-[44px] leading-[130%] tracking-[-1.1px] ">
              {heading}
            </h2>
          )}
          {spanText && (
            <h2
              className={`text-[22px] md:text-[38px] lg:text-responsive-44 leading-[130%] tracking-[-1.1%] font-light`}
            >
              {spanText}
            </h2>
          )}
        </div>
        {desc && (
          <p className="w-full relative text-sm md:text-lg lg:text-responsive-18 text-gray-600 leading-[140%] tracking-[-1.1%]">
            {desc}
          </p>
        )}
        {btn && <Button text={btn} link={btnLink} />}
      </div>
    </div>
  );
}
