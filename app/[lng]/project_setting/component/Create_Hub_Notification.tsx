"use client";
import React, { useState, useEffect } from "react";;
import { useDispatch, useSelector } from "react-redux";
import { setHubapi } from "@/app/redux/project_setting/project_CRUD";
import { createApiClient } from "@/utils/apiClient";
interface NotificationProps {
  message: string;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ onClose }) => {
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [selectedHub, setSelectedHub] = useState<string>("");
  const [hubOptions, setHubOptions] = useState<string[]>([]);
  const selected_project = useSelector(
    (state: RootState) => state.project_CRUD.selected_project
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHubUids = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_HUBLIST_API as string;
        const postApiClient = createApiClient("post", apiUrl);

        const payload = {};
        const response = await postApiClient(apiUrl, payload);

        setHubOptions(response.data);
      } catch (error) {
        console.error("Error fetching hub UIDs:", error);
      }
    };

    fetchHubUids();
  }, []);

  const handleSave = () => {
    if (selectedHub) {
      dispatch(
        setHubapi({
          hub_uid: selectedHub,
          f_floor_uid: selected_project?.floor_uid,
        })
      );
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 ">
      <div className="bg-[#D9D9D9] rounded-lg shadow-xl p-6 max-w-lg w-full">
        <div className="flex items-center">
          <label className="text-[#0C659E] mr-3 font-medium">Hub：</label>
          <select
            value={selectedHub}
            onChange={(e) => setSelectedHub(e.target.value)}
            className="bg-white flex-1 p-2 rounded text-gray-800 shadow-md"
          >
            <option value="">請選擇 Hub</option>
            {hubOptions.map((hubUid) => (
              <option
                key={hubUid}
                value={hubUid}
                className="text-center bg-[#A9CFD9] text-[#118BBB] border-1 border-[#118BBB]"
              >
                {hubUid}
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
