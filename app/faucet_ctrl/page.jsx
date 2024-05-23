"use client";
import React from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import LoadingScreen from "@/app/component/LoadingScreen";
import Notification from "./component/Notification";
import { hideNotification } from "@/app/redux/app/app";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Faucet_Ctrl_Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading_state = useSelector((state) => state.app.isLoading);

  const { isNotification, notificationMessage } = useSelector(
    (state) => state.app
  );

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  if (loading_state) return <LoadingScreen></LoadingScreen>;
  useEffect(() => {
    if (true) {
      router.push("/project_setting");
    }
  }, [router]);

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
      {/* <FaucetItem location={params.location_uid}></FaucetItem>
      <Faucet_Control></Faucet_Control> */}
    </div>
  );
}
