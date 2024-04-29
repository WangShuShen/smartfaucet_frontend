import React, { useState } from "react";
import { useTimeFrameDispatch } from "./service/Timeoption_hooks";

export default function TimeOption_Component({ faucet_uid }) {
  const [selectedOption, setSelectedOption] = useState("周");
  const changeTimeFrame = useTimeFrameDispatch({ faucet_uid });

  const handleChange = (option) => {
    setSelectedOption(option);
    changeTimeFrame(option);
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
