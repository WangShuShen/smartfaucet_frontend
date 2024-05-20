import React, { useState } from "react";
import { useTimeFrameDispatch } from "./service/Timeoption_hooks";
import { useLanguage } from "@/utils/loadLanguage";
import useLang from "@/app/component/useLang";
export default function TimeOption_Component({ faucet_uid }) {
  const [selectedOption, setSelectedOption] = useState("周");
  const changeTimeFrame = useTimeFrameDispatch({ faucet_uid });

  const handleChange = (option) => {
    setSelectedOption(option);
    changeTimeFrame(option);
  };
  const lang = useLang();
  const languageData = useLanguage("faucet_usage", lang);
  if (!languageData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex ml-8 justify-normal">
      {[
        `${languageData.week}`,
        `${languageData.month}`,
        `${languageData.year}`,
      ].map((option) => (
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
