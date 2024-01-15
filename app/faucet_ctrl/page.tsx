"use client";
import React from "react";
import FaucetItem from "./faucetitem_segment/faucetitem_segment";
import Faucet_Control from "./faucet_control_segment/faucet_control_segment";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";
import LoadingScreen from "@/app/component/LoadingScreen";
import { Suspense } from "react";
export default function Faucet_Ctrl_Page() {
  const loading_state = useSelector((state: RootState) => state.app.isLoading);
  const faucet_uid = useSelector(
    (state: RootState) => state.faucetinfo.faucet_info?.faucet_uid
  );
  if (loading_state) return <LoadingScreen></LoadingScreen>;
  return (
    <div className="block w-[100%] m-auto">
      <Suspense fallback={<p>Loading ...</p>}>
        <FaucetItem></FaucetItem>
        <Faucet_Control></Faucet_Control>
      </Suspense>
    </div>
  );
}
