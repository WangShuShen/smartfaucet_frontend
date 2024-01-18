"use client";
import React from "react";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="bg-[#D9D9D9] rounded-lg shadow-xl p-6 max-w-sm w-full">
      <div className="flex justify-between items-center">
        <div className="block">
          <div className="bg-white">
            <p className="text-gray-800">{message}</p>
          </div>

          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
