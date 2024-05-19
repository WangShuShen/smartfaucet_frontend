"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";
import { createApiClient } from "@/utils/apiClient";
import withLanguage from "./../service/withLanguage";

interface NotificationProps {
  message: string;
  onClose: () => void;
  languageData: any;
}

async function useUpdateAPI({ name, uid }) {
  const apiUrl = process.env.NEXT_PUBLIC_COMPANYUPDATE_API as string;
  const postApiClient = createApiClient("post", apiUrl);

  const payload = {
    project_company_name: name,
    project_company_uid: uid,
  };
  const response = await postApiClient(apiUrl, payload);
}

const Notification: React.FC<NotificationProps> = ({ onClose, languageData }) => {
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const update_uid = useSelector(
    (state: RootState) => state.project_CRUD.update_uid
  );

  const handleSave = () => {
    useUpdateAPI({ name: inputValue, uid: update_uid });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-[#D9D9D9] rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center">
          <label className="text-[#0C659E] mr-3 font-medium">
            {languageData.label.company}
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
            {languageData.button.save}
            {isSaveHovered && <div className="h-0.5 bg-black"></div>}
          </button>
          <button
            onClick={onClose}
            onMouseEnter={() => setIsCancelHovered(true)}
            onMouseLeave={() => setIsCancelHovered(false)}
            className="text-[#118BBB] font-medium py-2 px-4 rounded hover:text-black"
          >
            {languageData.button.cancel}
            {isCancelHovered && <div className="h-0.5 bg-black"></div>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withLanguage(Notification);
