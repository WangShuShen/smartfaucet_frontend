import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateFaucetSetting } from "@/app/redux/faucet_ctrl/faucet_control";

interface ButtonOption {
  label: string;
  value: string;
  selected?: boolean;
}

interface ControlButtonProps {
  options: ButtonOption[];
  segmentTitle?: string;
  settingKey: string;
}

export default function ControlButton({
  options,
  segmentTitle,
  settingKey,
  style,
}: ControlButtonProps) {
  const dispatch = useDispatch();
  const initialSelected =
    options.find((option) => option.selected)?.value || "";
  const [selected, setSelected] = useState<string>(initialSelected);

  const handleButtonClick = (value: string) => {
    if (typeof settingKey === "undefined") {
      console.error("settingKey is undefined for value", value);
    } else {
      setSelected(value);
      dispatch(updateFaucetSetting({ key: settingKey, value }));
    }
  };

  useEffect(() => {
    const newSelected = options.find((option) => option.selected)?.value || "";
    setSelected(newSelected);
  }, []);
  return (
    <div className="p-3" style={style}>
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
            onClick={() => handleButtonClick(option.value)}
            style={{
              margin: "0 2px",
              backgroundColor:
                selected === option.value ? "#81c0c0" : "#d0d0d0",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
