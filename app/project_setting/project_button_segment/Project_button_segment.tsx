"use client";
import React from "react";
import CRUD_Project_Button from "./CRUD_project_component/CRUD_project_component";
import Search_engine_Component from "./Search_engine_component/Search_engine_component";
import Project_managerment_Component from "./Project_managerment_component/Project_managerment_component";

export default function Project_button_Segment() {
  const Create_Project_Data = [
    { imgSrc: "/project_setting_create_company.svg", text: "新增專案/公司" },
    { imgSrc: "/project_setting_create_building.svg", text: "新增任務/建築物" },
    { imgSrc: "/projectsetting_create_floor.svg", text: "新增樓層" },
    { imgSrc: "/projectsetting_create_hub.svg", text: "新增HUB" },
    { imgSrc: "/projectsetting_create_location.svg", text: "新增位置" },
  ];
  const Delete_Project_Data = [
    { imgSrc: "/project_setting_delete_company.svg", text: "刪除專案/公司" },
    { imgSrc: "/project_setting_delete_building.svg", text: "刪除任務/建築物" },
    { imgSrc: "/projectsetting_delete_floor.svg", text: "刪除樓層" },
    { imgSrc: "/projectsetting_delete_hub.svg", text: "刪除HUB" },
    { imgSrc: "/projectsetting_delete_location.svg", text: "刪除位置" },
  ];

  const Project_Managerment_Data = [
    { imgSrc: "/project_setting_save.svg", text: "儲存" },
    { imgSrc: "/project_setting_edit.svg", text: "編輯任務/建築物" },
    { imgSrc: "/project_setting_copy.svg", text: "複製" },
  ];

  return (
    <div className="flex justify-between">
      <Search_engine_Component />
      <div className="w-1/2 h-40 bg-gradient-to-b from-custom-from to-custom-to rounded-xl flex flex-col mx-6">
        <div className="basis-1/4 flex items-center justify-center">
          <p className="text-white font-bold">新增 +</p>
        </div>
        <div className="basis-3/4 justify-center items-center">
          <div className="flex justify-between items-center w-full px-6">
            {Create_Project_Data.map((button, index) => (
              <CRUD_Project_Button
                key={index}
                imgSrc={button.imgSrc}
                text={button.text}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-1/2 h-40 bg-gradient-to-b from-[#727272] to-[#959595] rounded-xl flex flex-col mx-6">
        <div className="basis-1/4 flex items-center justify-center">
          <p className="text-white font-bold">刪除 X</p>
        </div>
        <div className="basis-3/4 justify-center items-center">
          <div className="flex justify-between items-center w-full px-6">
            {Delete_Project_Data.map((button, index) => (
              <CRUD_Project_Button
                key={index}
                imgSrc={button.imgSrc}
                text={button.text}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        {Project_Managerment_Data.map((button, index) => (
          <Project_managerment_Component
            key={index}
            imgSrc={button.imgSrc}
            text={button.text}
          />
        ))}
      </div>
    </div>
  );
}
