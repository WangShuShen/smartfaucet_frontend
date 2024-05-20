"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFloorapi } from "@/app/redux/project_setting/project_CRUD";
import withLanguage from "./../service/withLanguage";

interface NotificationProps {
  message: string;
  onClose: () => void;
  languageData: any;
}

const Notification: React.FC<NotificationProps> = ({ onClose, languageData }) => {
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const selected_project = useSelector(
    (state: RootState) => state.project_CRUD.selected_project
  );
  const dispatch = useDispatch();

  const handleSave = () => {
    if (selectedValue) {
      const floorWithLabel = `${selectedValue}樓`;
      dispatch(
        setFloorapi({
          floor_name: floorWithLabel,
          building_uid: selected_project.building_uid,
        })
      );
      onClose();
    }
  };

  const options = Array.from({ length: 99 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-[#D9D9D9] rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center">
          <label className="text-[#0C659E] mr-3 font-medium">
            {languageData.label.floor}
          </label>
          <select
            value={selectedValue ?? ""}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="flex-1 p-2 rounded text-start shadow-md appearance-none "
            style={{ color: selectedValue ? "#118BBB" : "#AAAAAA" }}
          >
            <option value="" disabled selected>
              {languageData.placeholder.select_floor}
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
