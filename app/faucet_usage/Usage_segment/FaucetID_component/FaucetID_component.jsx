import React from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Faucetid_Component({ faucet_uid }) {
  const dispatch = useDispatch();
  const { faucet_info, loading_info, error_info } = useSelector(
    (state) => state.faucetinfo
  );
  return (
    <div className="flex items-stretch">
      <img src="/faucet_ctrl/TAP-145015.svg" className="w-24 -mt-4 mr-2"></img>
      <p className="self-center mb-4">ID: {faucet_uid}</p>
    </div>
  );
}
