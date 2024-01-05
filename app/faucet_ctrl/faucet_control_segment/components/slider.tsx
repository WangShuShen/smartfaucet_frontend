import React, { useState, useEffect } from "react";

interface SliderProps {
  min: number;
  max: number;
  step?: number; // Optional prop to define the step size
  label: string;
  val: number;
}

export default function Slider({
  min,
  max,
  step = 1,
  label,
  val,
}: SliderProps) {
  const [value, setValue] = useState(val); // 使用 val 來初始化 value

  // 當 val 變化時，更新 value
  useEffect(() => {
    setValue(val);
  }, [val]);
  return (
    <div className="p-4 max-w-md ">
      <label
        htmlFor="slider"
        className="text-lg sm:text-xs md:text-sm lg:text-lg block text-lg font-bold text-stone-600 mb-2"
      >
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <span className="text-xs sm:text-xxs md:xs lg:text-sm font-bold text-sky-700 shrink-0">
          {min}
        </span>
        <div className="relative flex-grow">
          <input
            id="slider"
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="slider w-full h-2 bg-black rounded-lg appearance-none cursor-pointer"
            style={{
              backgroundColor: "black",
            }}
          />
        </div>
        <span className="text-xs sm:text-xxs md:xs lg:text-sm font-bold text-sky-700 shrink-0">
          {max}
        </span>
        <span className="text-xs sm:text-xxs md:xs lg:text-sm font-bold text-sky-700 ml-2 shrink-0">
          {value}
        </span>
      </div>
    </div>
  );
}
