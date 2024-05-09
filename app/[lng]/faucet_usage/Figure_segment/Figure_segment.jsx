"use client";
import React from "react";
import Figure from "./Figure_component/Figure_component";
import TimeOption from "./Timeoption_component/Timeoption_component";

export default function Figure_Segment({ faucet_uid }) {
  return (
    <div className="block">
      <TimeOption faucet_uid={faucet_uid} />
      <Figure />
    </div>
  );
}
