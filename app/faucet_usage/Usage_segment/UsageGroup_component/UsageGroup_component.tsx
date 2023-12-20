import React from "react";

export default function UsageGroup_Component() {
  return (
    <div className="stats bg-[#EFEFEF] rounded-full h-18 border-[#118BBB] border-2 mr-4 h-16">
      <div className="stat">
        <div className="flex">
          <div className="font-bold text-[#118BBB]">總啟動次數 ▸ </div>
          <div className="font-bold text-[#5F6162]">1254次</div>
        </div>
      </div>
      <div className="stat">
        <div className="flex">
          <div className="font-bold text-[#118BBB]">總啟動時間 ▸ </div>
          <div className="font-bold text-[#5F6162]">2000秒</div>
        </div>
      </div>
      <div className="stat">
        <div className="flex">
          <div className="font-bold text-[#118BBB]">總流量 ▸ </div>
          <div className="font-bold text-[#5F6162]">7652gal</div>
        </div>
      </div>
    </div>
  );
}
