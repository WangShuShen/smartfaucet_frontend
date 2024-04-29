"use client";
import React, { useEffect } from "react";
import FaucetItem from "../faucetitem_segment/faucetitem_segment";
import Faucet_Control from "../faucet_control_segment/faucet_control_segment";
import { useSelector } from "react-redux";
import LoadingScreen from "@/app/component/LoadingScreen";
import Notification from "../component/Notification";
import { hideNotification } from "@/app/redux/app/app";
import { useDispatch } from "react-redux";
import { setLoading } from "@/app/redux/app/app";
export default function Faucet_Ctrl_Page({ params }) {
  const dispatch = useDispatch();
  const loading_state = useSelector((state) => state.app.isLoading);

  const { isNotification, notificationMessage } = useSelector(
    (state) => state.app
  );

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);
  if (loading_state) return <LoadingScreen></LoadingScreen>;

  return (
    <div className="block w-[100%] m-auto">
      {isNotification && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <Notification
            message={notificationMessage}
            onClose={handleCloseNotification}
          />
        </div>
      )}
      <FaucetItem location={params.location_uid}></FaucetItem>
      <Faucet_Control></Faucet_Control>
    </div>
  );
}
