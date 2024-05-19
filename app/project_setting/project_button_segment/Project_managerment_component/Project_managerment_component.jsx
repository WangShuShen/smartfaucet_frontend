import React from "react";
import withLanguage from "./../../service/withLanguage";

const Project_management_Component = ({ imgSrc, text, isClickable, onClick, languageData }) => {
  const buttonStyle = isClickable
    ? { opacity: 1 }
    : { opacity: 0.5, cursor: "not-allowed" };

  const renderText = (text) => {
    switch (text) {
      case "儲存複製":
        return languageData.button.save_copy;
      case "複製":
        return languageData.button.copy;
      case "編輯位置":
        return languageData.button.edit_location;
      default:
        return text;
    }
  };

  return (
    <div className="flex flex-col justify-end px-2">
      <button
        className="bg-slate-200 text-black font-bold text-xs rounded-lg overflow-hidden"
        style={{ width: "90px", height: "80px", ...buttonStyle }}
        onClick={() => {
          if (isClickable) {
            onClick();
          } else {
            console.error(
              "Action blocked: Project management operations are not allowed."
            );
          }
        }}
        disabled={!isClickable}
      >
        <img src={imgSrc} alt={text} className="w-14 h-14 ml-5 mb-1" />
        <span className="text-[#118BBB]">{renderText(text)}</span>
      </button>
    </div>
  );
};

export default withLanguage(Project_management_Component);
