"use client";
import React from "react";
import Project_button_Segment from "./project_button_segment/Project_button_segment";
import State_Segment from "./State_segment/State_segment";
import Content_Management from "./content_management_segment/Content_Management_segment";
import LoadingScreen from "@/app/component/LoadingScreen";
import Create_Company_Notification from "./component/Create_Company_Notification";
import Create_Building_Notification from "./component/Create_Building_Notification";
import Create_Floor_Notification from "./component/Create_Floor_Notification";
import Create_Hub_Notification from "./component/Create_Hub_Notification";
import Create_Location_Notification from "./component/Create_Location_Notification";
import Remove_Company_Notification from "./component/Remove_Company_Notification";
import { hideNotification } from "@/app/redux/app/app";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";
export default function Project_setting_Page() {
  const dispatch = useDispatch();
  const { isNotification, notificationMessage } = useSelector(
    (state: RootState) => state.app
  );
  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  const renderNotificationComponent = () => {
    switch (notificationMessage) {
      case "新增Company Management":
        return (
          <Create_Company_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "新增Building Management":
        return (
          <Create_Building_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "新增Floor Management":
        return (
          <Create_Floor_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "新增HUB Management":
        return (
          <Create_Hub_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "新增Location Management":
        return (
          <Create_Location_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "刪除Company Management":
        return (
          <Remove_Company_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="flex justify-center	">
      {isNotification && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {renderNotificationComponent()}
        </div>
      )}
      <div className="block">
        <div className="">
          <Project_button_Segment />
        </div>
        <div className="">
          <Content_Management></Content_Management>
        </div>
        <div className="">{/* <State_Segment /> */}</div>
      </div>
    </div>
  );
}
