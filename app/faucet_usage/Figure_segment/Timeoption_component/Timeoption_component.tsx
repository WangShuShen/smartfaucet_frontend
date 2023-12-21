"use client";
import React, { useState } from "react";

export default function TimeOption_Component() {
  const [selectedOption, setSelectedOption] = useState<string>("周");

  const handleChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex ml-8 justify-normal">
      {["周", "月", "年"].map((option) => (
        <p
          key={option}
          className={`mr-20 cursor-pointer font-bold ${
            selectedOption === option ? "text-[#118BBB]" : ""
          }`}
          onClick={() => handleChange(option)}
        >
          {option}
        </p>
      ))}
    </div>
  );
}
