"use client";
import React from "react";
import FaucetItem from "./faucetitem_segment/faucetitem_segment";
import Faucet_Control from "./faucet_control_segment/faucet_control_segment";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";
import LoadingScreen from "@/app/component/LoadingScreen";
import Notification from "./component/Notification";
import { hideNotification } from "@/app/redux/app/app";
import { useDispatch } from "react-redux";
export default function Faucet_Ctrl_Page() {
  const dispatch = useDispatch();
  const loading_state = useSelector((state: RootState) => state.app.isLoading);
  if (loading_state) return <LoadingScreen></LoadingScreen>;
  const { isNotification, notificationMessage } = useSelector(
    (state: RootState) => state.app
  );

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  return (
    <div className="block w-[100%] m-auto">
      {isNotification && (
        <div className="fixed inset-0 flex justify-center items-center">
          <Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        </div>
      )}
      <FaucetItem></FaucetItem>
      <Faucet_Control></Faucet_Control>
    </div>
  );
}
