import React, { useState } from "react";

export default function FaucetInfo() {
  return (
    <div className="card w-96 shadow-xl h-72">
      <div className="flex px-10 pt-10">
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
      <div className="card-body items-center text-center">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        {/* <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
}
