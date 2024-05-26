// Toggle_switch_Component.js
import React, { useState } from "react";
import { setLang } from "@/app/redux/lang/langSlice";
import { useDispatch } from "react-redux";
export default function Toggle_switch_Component({ onToggle }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onToggle(isEnabled); // Pass the new state as argument
  };

  // Define a dummy function for language toggling
  const toggleEN = () => {
    dispatch(setLang("en"));
  };
  const toggleCH = () => {
    dispatch(setLang("ch"));
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <div
        className={`w-14 h-24  bg-transparent border-4 ${
          isEnabled ? "border-blue-500" : "border-white"
        } rounded-full flex items-center justify-center cursor-pointer`}
        onClick={toggleSwitch} // Remove duplicate onClick
      >
        <div
          className={`w-10 h-10 bg-white rounded-full shadow transition-transform duration-300 caret-transparent	 ${
            isEnabled
              ? "-translate-y-6 bg-blue-500 border-blue-500"
              : "translate-y-6"
          }`}
        />
      </div>
      <div className="flex">
        <button
          onClick={toggleEN}
          className={`text-base font-bold mt-6 ${
            isEnabled ? "text-blue-500" : "text-white"
          }`}
        >
          EN
        </button>
        <span className="text-white mt-6 mx-2">|</span>
        <button
          onClick={toggleCH}
          className={`text-base font-bold mt-6 ${
            isEnabled ? "text-blue-500" : "text-white"
          }`}
        >
          中
        </button>
      </div>
    </div>
  );
}
