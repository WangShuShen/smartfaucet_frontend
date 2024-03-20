import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "@/app/redux/app/app";
export default function CRUD_Project_Button({ imgSrc, text, isDisabled }) {
  const dispatch = useDispatch();
  const handleCRUDbutton = () => {
    let notificationMessage = "";

    switch (text) {
      case "新增專案/公司":
        notificationMessage = "新增Company Management";
        break;
      case "新增任務/建築物":
        notificationMessage = "新增Building Management";
        break;
      case "刪除專案/公司":
        notificationMessage = "刪除Company Management";
        break;
      case "刪除任務/建築物":
        notificationMessage = "刪除Building Management";
        break;
      default:
        notificationMessage = "編輯Project Management";
        break;
    }
    dispatch(setNotification(notificationMessage));
  };
  return (
    <button
      onClick={handleCRUDbutton}
      className={`bg-white text-black font-bold text-xs justify-center rounded-lg items-center mx-1 ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{ width: "95px", height: "95px" }}
      disabled={isDisabled}
    >
      <img src={imgSrc} alt={text} className="w-16 h-16 ml-5 mb-1" />
      <span className="text-[#727171]">{text}</span>
    </button>
  );
}
