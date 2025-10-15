export default function ListTwo({ features, heading }) {
  return (
    <div className="w-full relative">
      <h5 className="font-bold text-sm md:text-2xl uppercase lg:text-[32px] leading-[110%] text-gray-700 lg:w-1/2">
        {heading}
      </h5>
      <ul className="mt-4 lg:mt-8 grid grid-cols-1 gap-3 ">
        {features.map((feature, index) => (
          <li
            key={index}
            className="text-xs md:text-base lg:text-base text-gray-600 flex items-center gap-2"
          >
            <div className="bg-orange-600 w-2 h-2 rounded-full"></div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
