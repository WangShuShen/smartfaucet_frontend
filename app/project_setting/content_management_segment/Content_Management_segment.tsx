"use client";
import React from "react";
import Top_label_Component from "./Top_label_component/Top_label_component";
import List_faucet_button_Component from "./List_faucet_button_component/List_faucet_button_component";
import Faucet_top_button from "./Faucet_top_button_component/Faucet_top_button_component";
import Position_selector from "./Position_selector_component/Position_selector_component";

export default function Content_management_Segment() {
  const Select_top_label_Data = [
    {
      text: "專案/公司",
      bgColor: "bg-[#6BA9C5]",
      textColor: "text-white",
    },
    {
      text: "任務/建築物",
      bgColor: "bg-[#A9CFD9]",
      textColor: "text-slate-700",
    },
    { text: "樓層", bgColor: "bg-[#A9CFD9]", textColor: "text-slate-700" },
    { text: "位置", bgColor: "bg-[#A9CFD9]", textColor: "text-slate-700" },
  ];

  const faucet_top_label_Data = [
    { text: "FAUCET" },
    { text: "ID" },
    { text: "STATE" },
    { text: "SELECT FAUCET" },
  ];

  return (
    <div className="flex justify-between">
      <div className="flex flex-row justify-end w-2/5 h-80 bg-zinc-200 rounded-2xl mt-4 ml-5">
        <div className="w-1/5 h-20 rounded-tl-2xl">
          <Top_label_Component
            text="選取"
            bgColor="bg-transparent"
            textColor="text-slate-700"
          />
        </div>
        <div className="w-4/5 h-20 bg-[#A9CFD9] rounded-2xl flex">
          {Select_top_label_Data.map((label, index) => (
            <Top_label_Component
              key={index}
              text={label.text}
              bgColor={label.bgColor}
              textColor={label.textColor}
            />
          ))}
        </div>
        {/* <List_faucet_button_Component /> */}
      </div>
      <div className="flex flex-col  w-1/2 h-80 bg-zinc-200 mt-4 mr-10">
        <div className="w-full h-20 bg-[#A9CFD9] rounded-2xl flex">
          {faucet_top_label_Data.map((label, index) => (
            <Top_label_Component
              key={index}
              text={label.text}
              bgColor={"bg-[#A9CFD9]"}
            />
          ))}
        </div>
        {/* <List_faucet_button_Component /> */}
      </div>
    </div>
  );
}
