"use client";
import React, { useState } from "react";

interface CopyNotificationProps {
  message: string;
  onClose: () => void;
  copyFaucetFrom?: string;
  selectFaucet?: string;
}

export const Notification: React.FC<CopyNotificationProps> = ({
  message,
  onClose,
  copyFaucetFrom,
  selectFaucet,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log(copyFaucetFrom);
  console.log(selectFaucet);
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-[#D9D9D9] rounded-lg shadow-xl p-6 max-w-sm w-full flex justify-center items-center flex-col">
      <div className="bg-white flex justify-center items-center mb-4 p-4 rounded w-4/5">
        <p className="text-gray-800 text-center">{message}</p>
      </div>
      <div className="flex">
        <div className="block">
          <div className="text-[#5F6162]">已將 {copyFaucetFrom} 裝置設定</div>
          <div className="flex">
            <div className="text-[#5F6162]">複製至</div>
            <div className="text-[#0C659E]"> {selectFaucet} </div>
          </div>
        </div>
        <button
          onClick={onClose}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="text-[#118BBB] font-medium py-2 px-4 rounded hover:text-black"
        >
          Done
          {isHovered && <div className="h-0.5 bg-black"></div>}
        </button>
      </div>
    </div>
  );
};

export default Notification;
