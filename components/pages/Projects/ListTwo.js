export default function ListTwo({ features, heading }) {
  return (
    <div className="w-full lg:w-1/2 relative">
      <h5 className="font-bold text-sm md:text-2xl uppercase lg:text-[32px] leading-[110%] text-gray-700">
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
// export default function ListTwo({ features, heading }) {
//   return (
//     <div className="w-full lg:w-1/2 relative">
//       <h5 className="font-semibold text-lg md:text-2xl lg:text-[28px] uppercase text-gray-700">
//         {heading}
//       </h5>
//       <ul className="mt-4 md:mt-6 lg:mt-8 grid grid-cols-1 gap-3">
//         {features.map((feature, index) => (
//           <li
//             key={index}
//             className="text-sm md:text-base text-gray-600 flex items-start gap-3 leading-relaxed"
//           >
//             <span className="bg-orange-600 min-w-2 min-h-2 w-2 h-2 rounded-full mt-[6px]"></span>
//             <span>{feature}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

