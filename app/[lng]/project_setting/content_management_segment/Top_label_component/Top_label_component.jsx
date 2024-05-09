import React from "react";

export default function Top_label_Component({
  text,
  bgColor,
  textColor = "text-slate-700",
}) {
  return (
    <div
      className={`basis-1/4 h-full ${bgColor} flex items-center justify-center rounded`}
    >
      <span className={`${textColor} text-sm font-semibold`}>{text}</span>
    </div>
  );
}
