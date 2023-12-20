"use client";
import React from "react";
import Figure_Segment from "./Figure_segment/Figure_segment";
import Usage_Segment from "./Usage_segment/Usage_segment";
import SimpleLayout from "../simple-layout";

export default function Faucet_usage_Page() {
  return (
    <div className="block">
      <Usage_Segment />
      <Figure_Segment />
    </div>
  );
}

Faucet_usage_Page.Layout = SimpleLayout;
