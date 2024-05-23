"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/utils/loadLanguage";
import useLang from "@/app/component/useLang";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [languageDatafinal, setLanguageDatafinal] = useState("");
  const [confirm, setConfirm] = useState("");

  const lang = useLang();
  const languageData = useLanguage("faucet_ctrl", lang);

  useEffect(() => {
    if (languageData) {
      switch (message) {
        case "回復原廠設定成功":
          setLanguageDatafinal(languageData.restore_original_setting_success);
          break;
        case "設定已儲存":
          setLanguageDatafinal(languageData.save_success);
          break;
        default:
          setLanguageDatafinal("");
      }
      setConfirm(languageData.confirm);
    }
  }, [message, languageData]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-[#D9D9D9] rounded-lg shadow-xl p-6 max-w-sm w-full flex justify-center items-center flex-col">
      <div className="bg-white flex justify-center items-center mb-4 p-4 rounded w-4/5">
        <p className="text-gray-800 text-center">{languageDatafinal}</p>
      </div>

      <button
        onClick={onClose}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="text-[#118BBB] font-medium py-2 px-4 rounded hover:text-black"
      >
        {confirm}
        {isHovered && <div className="h-0.5 bg-black"></div>}
      </button>
    </div>
  );
};

export default Notification;
