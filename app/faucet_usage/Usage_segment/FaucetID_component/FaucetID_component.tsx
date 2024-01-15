import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/redux/store";
export default function Faucetid_Component(faucetUid: string) {
  const dispatch = useDispatch<AppDispatch>();
  const { faucet_info, loading_info, error_info } = useSelector(
    (state: RootState) => state.faucetinfo
  );
  return (
    <div className="flex items-stretch">
      <img src="/TAP-145015.svg" className="w-24 -mt-4 mr-2"></img>
      <p className="self-center mb-4">ID: {faucet_info?.faucet_uid}</p>
    </div>
  );
}
