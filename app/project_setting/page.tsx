"use client";
import React from "react";
import Project_button_Segment from "./project_button_segment/Project_button_segment";
import State_Segment from "./State_segment/State_segment";
import Content_Management from "./content_management_segment/Content_Management_segment";
import LoadingScreen from "@/app/component/LoadingScreen";
import Company_Notification from "./component/Company_Notification";
import Building_Notification from "./component/Building_Notification";
import Floor_Notification from "./component/Floor_Notification";
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
    if (notificationMessage === "新增Building Management") {
      return (
        <Building_Notification
          message={notificationMessage}
          onClose={handleCloseNotification}
        />
      );
    }
    if (notificationMessage === "新增Floor Management") {
      return (
        <Floor_Notification
          message={notificationMessage}
          onClose={handleCloseNotification}
        />
      );
    }
    return (
      <Company_Notification
        message={notificationMessage}
        onClose={handleCloseNotification}
      />
    );
  };
  // if (loading_state) return <LoadingScreen></LoadingScreen>;
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
