"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";

import { removeCompanyapi } from "@/app/redux/project_setting/project_CRUD";
interface NotificationProps {
  message: string;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ onClose }) => {
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const selected_project = useSelector(
    (state: RootState) => state.project_CRUD.selected_project
  );
  const handleSave = () => {
    if (selected_project) {
      dispatch(removeCompanyapi(selected_project.project_company_uid));
      onClose();
    } else {
      console.error("project_company_name is empty or undefined.");
    }
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-[#D9D9D9] rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>
            注意：
            {selected_project
              ? `刪除位置 ${selected_project.project_company_name}。`
              : "請勾選下方的欄位資料。"}
          </p>
        </div>
        <div className="flex justify-end mt-4">
          {selected_project ? (
            <>
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
                className="text-[#118BBB] font-medium py-2 px-4 rounded hover:text-black ml-2"
              >
                Cancel
                {isCancelHovered && <div className="h-0.5 bg-black"></div>}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              onMouseEnter={() => setIsCancelHovered(true)}
              onMouseLeave={() => setIsCancelHovered(false)}
              className="text-[#118BBB] font-medium py-2 px-4 rounded hover:text-black"
            >
              確認
              {isCancelHovered && <div className="h-0.5 bg-black"></div>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
