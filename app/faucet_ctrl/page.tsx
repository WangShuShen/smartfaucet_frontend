"use client";
import React from "react";
import { useState } from "react";
import FaucetItem from "./faucetitem_segment/faucetitem_segment";
import Faucet_Control from "./faucet_control_segment/faucet_control_segment";

export default function Faucet_Ctrl_Page() {
  return (
    <div className="block w-[100%] m-auto">
      <FaucetItem></FaucetItem>
      <Faucet_Control></Faucet_Control>
    </div>
  );
}
