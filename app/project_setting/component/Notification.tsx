"use client";
import React, { useState, useEffect } from "react";
import withLanguage from "./../service/withLanguage";

interface NotificationProps {
  message: string;
  onClose: () => void;
  languageData: any;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  onClose,
  languageData,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [lang_message, setLangMessage] = useState("");
  useEffect(() => {
    switch (message) {
      case "選擇要COPY的faucet":
        setLangMessage(languageData.message.choose_faucet_to_copy);
        break;
      default:
        setLangMessage(message);
    }
  }, [message, languageData.message]);
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-[#D9D9D9] rounded-lg shadow-xl p-6 max-w-sm w-full flex justify-center items-center flex-col">
      <div className="bg-white flex justify-center items-center mb-4 p-4 rounded w-4/5">
        <p className="text-gray-800 text-center">{lang_message}</p>
      </div>

      <button
        onClick={onClose}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="text-[#118BBB] font-medium py-2 px-4 rounded hover:text-black"
      >
        {languageData.button.confirm}
        {isHovered && <div className="h-0.5 bg-black"></div>}
      </button>
    </div>
  );
};

export default withLanguage(Notification);
