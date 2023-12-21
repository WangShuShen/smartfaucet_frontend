import React, { useState } from "react";

export default function FaucetInfo() {
  return (
    <div className="card w-96 h-72">
      <div className="flex pt-2">
        <img
          src="faucetexample_outlook.svg"
          alt="faucetexample_outlook"
          className="rounded-xl"
        />
        <div className="flex flex-col">
          <p className="text-[#0C659E] font-sans font-bold object-center">
            台積電/Ｃ棟/01樓/女廁
          </p>
          <p className="text-[#0C659E] font-sans font-bold object-center mt-12">
            ID :
          </p>
        </div>
      </div>
      <div className="block ">
        <p className="text-[#118BBB] font-sans font-bold ">FACILITY BY WEEK</p>
        <div className="bg-[#118BBB] h-0.5 w-5/6"></div>
      </div>
      <div className="block mt-2">
        <div className="flex mt-2">
          <p className="text-[#5F6162] font-sans font-bold text-xs">
            啟動次數 ▸
          </p>
          <p className="text-[#118BBB] font-sans font-bold text-xs">5222</p>
        </div>
        <div className="flex mt-2">
          <p className="text-[#5F6162] font-sans font-bold text-xs">
            累計出水時間(min) ▸
          </p>
          <p className="text-[#118BBB] font-sans font-bold text-xs">5222</p>
        </div>
        <div className="flex mt-2">
          <p className="text-[#5F6162] font-sans font-bold text-xs">
            累計流水量(gal) ▸
          </p>
          <p className="text-[#118BBB] font-sans font-bold text-xs">5222</p>
        </div>
      </div>
      <div className="card-body justify-center text-center -mt-7">
        <button className="btn btn-wide bg-[#118BBB]">GPM</button>
      </div>
    </div>
  );
}
