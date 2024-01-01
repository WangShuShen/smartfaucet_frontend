import React from "react";
import FaucetItem from "./faucetitem_segment/faucetitem_segment";
import Faucet_Control from "./faucet_control_segment/faucet_control_segment";
import DashboardLayout from "../layout";
export default function Faucet_Ctrl_Page() {
  return (
    <div className="block w-[100%] m-auto">
      <FaucetItem></FaucetItem>
      <Faucet_Control></Faucet_Control>
    </div>
  );
}
Faucet_Ctrl_Page.Layout = DashboardLayout;
