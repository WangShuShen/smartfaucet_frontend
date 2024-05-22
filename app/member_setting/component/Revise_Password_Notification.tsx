"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createApiClient } from "@/utils/apiClient";
import { useLanguage } from "@/utils/loadLanguage";
import useLang from "@/app/component/useLang";
interface NotificationProps {
  message: string;
  onClose: () => void;
}
async function updateMemberAPI({ email_string, new_password }) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_MEMBERUPDATE_API;
    const postApiClient = createApiClient("post", apiUrl);

    const payload = { email: email_string, password: new_password };
    const response = await postApiClient(apiUrl, payload);

    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
export const Notification: React.FC<NotificationProps> = ({
  email,
  onClose,
}) => {
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const handleSave = async () => {
    await updateMemberAPI({ email_string: email, new_password: inputValue });
    onClose();
  };
  const lang = useLang();
  const languageData = useLanguage("member_setting", lang);
  if (!languageData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-[#D9D9D9] rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center">
          <label className="text-[#0C659E] mr-3 font-medium">
            {languageData.password_would_change}：
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
