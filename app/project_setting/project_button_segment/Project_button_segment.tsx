"use client";
import React, { useState, useEffect } from "react";
import CRUD_Project_Button from "./CRUD_project_component/CRUD_project_component";
import Search_engine_Component from "./Search_engine_component/Search_engine_component";
import Project_managerment_Component from "./Project_managerment_component/Project_managerment_component";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";
export default function Project_button_Segment() {
  const [createbuttonDisableStatus, setcreateButtonDisableStatus] = useState({
    createBuildingDisabled: false,
    createFloorDisabled: false,
    createHubDisabled: false,
    createLocationDisabled: false,
  });
  const [deletebuttonDisableStatus, setdeleteButtonDisableStatus] = useState({
    deleteCompanyDisabled: false,
    deleteBuildingDisabled: false,
    deleteFloorDisabled: false,
    deleteHubDisabled: false,
    deleteLocationDisabled: false,
  });
  const selected_project = useSelector(
    (state: RootState) => state.project_CRUD.selected_project
  );
  useEffect(() => {
    let createStatus = {
      createBuildingDisabled: false,
      createFloorDisabled: false,
      createHubDisabled: false,
      createLocationDisabled: false,
    };
    let deleteStatus = {
      deleteCompanyDisabled: false,
      deleteBuildingDisabled: false,
      deleteFloorDisabled: false,
      deleteHubDisabled: false,
      deleteLocationDisabled: false,
    };
    if (!selected_project?.project_company_uid) {
      createStatus.createBuildingDisabled = true;
      createStatus.createFloorDisabled = true;
      createStatus.createHubDisabled = true;
      createStatus.createLocationDisabled = true;
      deleteStatus.deleteCompanyDisabled = true;
      deleteStatus.deleteBuildingDisabled = true;
      deleteStatus.deleteFloorDisabled = true;
      deleteStatus.deleteHubDisabled = true;
      deleteStatus.deleteLocationDisabled = true;
    } else if (!selected_project.building_uid) {
      createStatus.createFloorDisabled = true;
      createStatus.createHubDisabled = true;
      createStatus.createLocationDisabled = true;
      deleteStatus.deleteBuildingDisabled = true;
      deleteStatus.deleteFloorDisabled = true;
      deleteStatus.deleteHubDisabled = true;
      deleteStatus.deleteLocationDisabled = true;
    } else if (!selected_project.floor_uid) {
      createStatus.createHubDisabled = true;
      createStatus.createLocationDisabled = true;
      deleteStatus.deleteFloorDisabled = true;
      deleteStatus.deleteHubDisabled = true;
      deleteStatus.deleteLocationDisabled = true;
    } else if (!selected_project.hub_uid) {
      createStatus.createLocationDisabled = true;
      deleteStatus.deleteHubDisabled = true;
      deleteStatus.deleteLocationDisabled = true;
    } else if (!selected_project.location_uid) {
      deleteStatus.deleteLocationDisabled = true;
    }
    setcreateButtonDisableStatus(createStatus);
    setdeleteButtonDisableStatus(deleteStatus);
  }, [selected_project]);
  const Create_Project_Data = [
    {
      imgSrc: "/project_setting_create_company.svg",
      text: "新增專案/公司",
      isDisabled: false,
    },
    {
      imgSrc: "/project_setting_create_building.svg",
      text: "新增任務/建築物",
      isDisabled: createbuttonDisableStatus.createBuildingDisabled,
    },
    {
      imgSrc: "/projectsetting_create_floor.svg",
      text: "新增樓層",
      isDisabled: createbuttonDisableStatus.createFloorDisabled,
    },
    {
      imgSrc: "/projectsetting_create_hub.svg",
      text: "新增HUB",
      isDisabled: createbuttonDisableStatus.createHubDisabled,
    },
    {
      imgSrc: "/projectsetting_create_location.svg",
      text: "新增位置",
      isDisabled: createbuttonDisableStatus.createLocationDisabled,
    },
  ];
  const Delete_Project_Data = [
    {
      imgSrc: "/project_setting_delete_company.svg",
      text: "刪除專案/公司",
      isDisabled: deletebuttonDisableStatus.deleteCompanyDisabled,
    },
    {
      imgSrc: "/project_setting_delete_building.svg",
      text: "刪除任務/建築物",
      isDisabled: deletebuttonDisableStatus.deleteBuildingDisabled,
    },
    {
      imgSrc: "/projectsetting_delete_floor.svg",
      text: "刪除樓層",
      isDisabled: deletebuttonDisableStatus.deleteFloorDisabled,
    },
    {
      imgSrc: "/projectsetting_delete_hub.svg",
      text: "刪除HUB",
      isDisabled: deletebuttonDisableStatus.deleteHubDisabled,
    },
    {
      imgSrc: "/projectsetting_delete_location.svg",
      text: "刪除位置",
      isDisabled: deletebuttonDisableStatus.deleteLocationDisabled,
    },
  ];

  const Project_Managerment_Data = [
    { imgSrc: "/project_setting_save.svg", text: "儲存" },
    { imgSrc: "/project_setting_edit.svg", text: "編輯任務/建築物" },
    { imgSrc: "/project_setting_copy.svg", text: "複製" },
  ];

  return (
    <div className="lg:flex lg:justify-between md:block md:justify-center">
      <div className="flex flex-col justify-end w-[30%]">
        <div className="lg:flex md:hidden sm:hidden xs:hidden">
          <Search_engine_Component />
        </div>
      </div>

      <div className="lg:w-auto md:w-auto sm:w-[70%] xs:w-[60%] lg:ml-0 md:ml-10 sm:ml-32 xs:ml-36 h-40 bg-gradient-to-b from-custom-from to-custom-to rounded-xl flex flex-col mx-6">
        <div className="basis-1/4 flex items-center justify-center">
          <p className="text-white font-bold">新增 +</p>
        </div>
        <div className="basis-3/4 justify-center items-center">
          <div className="flex justify-between items-center px-6 w-auto">
            {Create_Project_Data.map((button, index) => (
              <CRUD_Project_Button
                key={index}
                imgSrc={button.imgSrc}
                text={button.text}
                isDisabled={button.isDisabled}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="lg:w-auto md:w-auto sm:w-[70%] xs:w-[60%] lg:ml-0 md:ml-10 sm:ml-32 xs:ml-36 h-40 bg-gradient-to-b from-[#727272] to-[#959595] rounded-xl flex flex-col mx-6">
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
                isDisabled={button.isDisabled}
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
