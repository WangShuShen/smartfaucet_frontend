"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBuildingapi } from "@/app/redux/project_setting/project_CRUD";
interface NotificationProps {
  message: string;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ onClose }) => {
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const selected_project = useSelector(
    (state: RootState) => state.project_CRUD.selected_project
  );
  const dispatch = useDispatch();
  const handleSave = () => {
    console.log(selected_project.project_company_uid);
    dispatch(
      setBuildingapi({
        building_name: inputValue,
        project_company_uid: selected_project.project_company_uid,
      })
    );
    onClose();
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-[#D9D9D9] rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center">
          <label className="text-[#0C659E] mr-3 font-medium">
            任務/建築物：
          </label>
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
