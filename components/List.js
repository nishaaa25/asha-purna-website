export default function List({ features, heading }) {
  return (
    <div className="w-full relative">
      <h5 className="font-bold text-sm md:text-2xl lg:text-[32px] leading-[110%] text-gray-700 capitalize">
        {heading}
      </h5>
      <ul className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3 ">
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
