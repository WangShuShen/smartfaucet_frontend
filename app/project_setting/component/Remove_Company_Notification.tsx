"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCompanyapi } from "@/app/redux/project_setting/project_CRUD";
interface NotificationProps {
  message: string;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ onClose }) => {
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(setCompanyapi(inputValue));
    onClose();
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-[#D9D9D9] rounded-lg shadow-xl p-6 max-w-md w-full">
        {/* 警告訊息 */}
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>
            注意：刪除專案/公司名稱將會連帶移除所有階層式設置。您將需要重新進行設置。
          </p>
        </div>
        <div className="flex items-center">
          <label className="text-[#0C659E] mr-3 font-medium">專案/公司：</label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-white flex-1 p-2 rounded text-gray-800 shadow-md"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            onMouseEnter={() => setIsSaveHovered(true)}
            onMouseLeave={() => setIsSaveHovered(false)}
            className="text-[#118BBB] font-medium py-2 px-4 rounded hover:text-black"
          >
            Save
            {isSaveHovered && <div className="h-0.5 bg-black"></div>}
          </button>
          <button
            onClick={onClose}
            onMouseEnter={() => setIsCancelHovered(true)}
            onMouseLeave={() => setIsCancelHovered(false)}
            className="text-[#118BBB] font-medium py-2 px-4 rounded hover:text-black"
          >
            Cancel
            {isCancelHovered && <div className="h-0.5 bg-black"></div>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
