"use client";
import React from "react";
import Project_button_Segment from "./project_button_segment/Project_button_segment";
import Content_Management from "./content_management_segment/Content_Management_segment";
import LoadingScreen from "@/app/component/LoadingScreen";
import Create_Company_Notification from "./component/Create_Company_Notification";
import Create_Building_Notification from "./component/Create_Building_Notification";
import Create_Floor_Notification from "./component/Create_Floor_Notification";
import Create_Hub_Notification from "./component/Create_Hub_Notification";
import Create_Location_Notification from "./component/Create_Location_Notification";
import Remove_Company_Notification from "./component/Remove_Company_Notification";
import Remove_Building_Notification from "./component/Remove_Building_Notification";
import Remove_Floor_Notification from "./component/Remove_Floor_Notification";
import Remove_Hub_Notification from "./component/Remove_Hub_Notification";
import Remove_Location_Notification from "./component/Remove_Location_Notification";
import Update_Company_Notification from "./component/Update_Company_Notification";
import Update_Building_Notification from "./component/Update_Building_Notification";
import Update_Floor_Notification from "./component/Update_Floor_Notification";
import Update_Location_Notification from "./component/Update_Location_Notification";
import Notification from "./component/Notification";
import CopyNotification from "./component/CopyNotification";
import { hideNotification } from "@/app/redux/app/app";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setcopyfaucetReducer,
  selectfaucetReducer,
  setcopyfaucetfromReducer,
  setUpdateUIDReducer,
} from "@/app/redux/project_setting/project_CRUD";
export default function Project_setting_Page() {
  const dispatch = useDispatch();
  const loading_state = useSelector((state) => state.app.isLoading);
  const { isNotification, notificationMessage } = useSelector(
    (state) => state.app
  );
  const selected_faucet = useSelector(
    (state) => state.project_CRUD.selected_faucet
  );

  const copyfaucetfrom = useSelector(
    (state) => state.project_CRUD.copyfaucetfrom
  );
  const handleCloseNotification = () => {
    dispatch(hideNotification());
    if (notificationMessage === "選擇要COPY的faucet") {
      dispatch(setcopyfaucetReducer("ready"));
      dispatch(selectfaucetReducer(null));
    }
    if (notificationMessage === "faucet複製完成") {
      dispatch(setcopyfaucetReducer(null));
      dispatch(selectfaucetReducer(null));
      dispatch(setcopyfaucetfromReducer(null));
    }
    if (
      notificationMessage === "更改Company Management" ||
      notificationMessage === "更改Building Management" ||
      notificationMessage === "更改Floor Management" ||
      notificationMessage === "更改Loaction Management"
    ) {
      dispatch(setUpdateUIDReducer(null));
    }
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
      case "刪除Building Management":
        return (
          <Remove_Building_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "刪除Floor Management":
        return (
          <Remove_Floor_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "刪除HUB Management":
        return (
          <Remove_Hub_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "刪除Location Management":
        return (
          <Remove_Location_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "更改Company Management":
        return (
          <Update_Company_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "更改Building Management":
        return (
          <Update_Building_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "更改Floor Management":
        return (
          <Update_Floor_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "更改Location Management":
        return (
          <Update_Location_Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "選擇要COPY的faucet":
        return (
          <Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        );
      case "faucet複製完成":
        return (
          <CopyNotification
            message={notificationMessage}
            onClose={handleCloseNotification}
            copyFaucetFrom={copyfaucetfrom}
            selectFaucet={selected_faucet}
          />
        );
      default:
        return <></>;
    }
  };
  if (loading_state) return <LoadingScreen></LoadingScreen>;
  return (
    <div className="flex justify-center">
      {isNotification && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {renderNotificationComponent()}
        </div>
      )}
      <div className="block">
        <div className="flex justify-center">
          <Project_button_Segment />
        </div>
        <div className="">
          <Content_Management></Content_Management>
        </div>
      </div>
    </div>
  );
}
