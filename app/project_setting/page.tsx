"use client";
import React from "react";
import Project_button_Segment from "./project_button_segment/Project_button_segment";
import State_Segment from "./State_segment/State_segment";
import Content_Management from "./content_management_segment/Content_Management_segment";
import LoadingScreen from "@/app/component/LoadingScreen";
import Notification from "./component/Notification";
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
  // if (loading_state) return <LoadingScreen></LoadingScreen>;
  return (
    <div className="flex justify-center	">
      {isNotification && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
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
