// components/faucet_control_segment.tsx
import React from "react";
import { useState, useEffect } from "react";

interface ButtonOption {
  label: string;
  value: string;
  selected?: boolean;
}

interface ControlButtonProps {
  options: ButtonOption[];
  segmentTitle?: string; // Optional prop for the segment title
}

export default function ControlButton({
  options,
  segmentTitle,
}: ControlButtonProps) {
  // 在組件掛載時，找到應該被選中的選項
  const initialSelected =
    options.find((option) => option.selected)?.value || "";
  const [selected, setSelected] = useState<string>(initialSelected);
  useEffect(() => {
    const newSelected = options.find((option) => option.selected)?.value || "";
    setSelected(newSelected);
  }, [options]);
  return (
    <div className="p-3">
      {segmentTitle && (
        <h2 className="text-stone-600 text-lg font-bold mb-2 text-lg sm:text-xs md:sm lg:text-lg">
          {segmentTitle}
        </h2>
      )}
      <div className="flex divide-x divide-transparent">
        {options.map((option, index) => (
          <button
            key={option.value}
            className={`px-2 sm:px-0.5 md:px-1.5 lg:px-2.5 py-2 sm:py-0.5 md:py-1 lg:py-2 text-xs sm:text-xxs md:xs lg:text-sm font-medium rounded transition-colors ${
              selected === option.value ? "text-stone-600" : "text-stone-600"
            } ${
              index === 0
                ? "rounded-l-lg"
                : index === options.length - 1
                ? "rounded-r-lg"
                : ""
            } ${
              index === 0
                ? "rounded-r-none"
                : index === options.length - 1
                ? "rounded-l-none"
                : "rounded-none"
            }`}
            onClick={() => setSelected(option.value)}
            style={{
              margin: "0 2px",
              backgroundColor:
                selected === option.value ? "#81c0c0" : "#d0d0d0",
            }} // 添加水平间隔
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
