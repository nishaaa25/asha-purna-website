"use client";
import React from "react";

export default function CounterThree({ data }) {
  return (
    <div
      className={
        "lg:flex justify-center flex-row pt-10 w-[90%] lg:w-9/12 mx-auto relative gap-y-8 gap-3 grid grid-cols-2 lg:flex-nowrap items-center"
      }
    >
      {data
        ?.filter((counter) => counter.value !== null && counter.value !== undefined)
        .map((counter, index) => {
          const isStatic = isNaN(Number(counter.value));
          const isSingleItem = data.length === 1;

          return (
            <div
              key={index}
              className="text-gray-900 min-w-2/4 lg:min-w-[30%] relative counter flex-center flex-col lg:gap-2"
            >
              <div className="flex items-center font-medium">
                {!isStatic ? (
                  <>
                    <span className="text-[50px] md:text-[60px] lg:text-[56px] leading-[100%] counter-title tracking-[-3%]">
                      {counter.value}
                    </span>
                    <span className="text-[43px] md:text-[60px] lg:text-[56px] leading-[100%] text-orange-600 font-[300] tracking-[-3.6px]">
                      +
                    </span>
                  </>
                ) : (
                  <span className="text-[50px] md:text-[60px] lg:text-[56px] leading-[100%] tracking-[-3%]">
                    {counter.value.split("").map((char, i) =>
                      char === "×" || char.toLowerCase() === "l" ? (
                        <span
                          key={i}
                          className="text-orange-600 font-[300] tracking-[-3.6px]"
                        >
                          {char}
                        </span>
                      ) : (
                        <span key={i}>{char}</span>
                      )
                    )}
                  </span>
                )}
              </div>

              <h4 className="text-sm md:text-lg  leading-8 tracking-[-0.5px] font-normal mt-1 text-gray-900  lg:text-center">
                {counter.title}
              </h4>

              {!isSingleItem && index !== data.length - 1 && (
                <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-32 bg-orange-600/70"></span>
              )}
            </div>
          );
        })}
    </div>
  );
}
