"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ onClose }) => {
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (selectedValue) {
      const floorWithLabel = `${selectedValue}樓`;
      onClose();
    } else {
    }
  };

  const options = Array.from({ length: 99 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-[#D9D9D9] rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center">
          <label className="text-[#0C659E] mr-3 font-medium">樓層：</label>
          <select
            value={selectedValue ?? ""}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="flex-1 p-2 rounded text-start shadow-md appearance-none "
            style={{ color: selectedValue ? "#118BBB" : "#AAAAAA" }}
          >
            <option value="" disabled selected>
              請選擇樓層
            </option>
            {options.map((option) => (
              <option
                key={option}
                value={option}
                className="text-center bg-[#A9CFD9] text-[#118BBB] border-1 border-[#118BBB]"
              >
                {option}
              </option>
            ))}
          </select>
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
