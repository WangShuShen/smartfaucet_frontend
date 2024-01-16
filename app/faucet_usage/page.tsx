"use client";
import React from "react";
import Figure_Segment from "./Figure_segment/Figure_segment";
import Usage_Segment from "./Usage_segment/Usage_segment";
import SimpleLayout from "../simple-layout";
import { Suspense } from "react";
export default function Faucet_usage_Page() {
  return (
    <div className="block">
      <Suspense fallback={<p>Loading ...</p>}>
        <Usage_Segment />
        <Figure_Segment />
      </Suspense>
    </div>
  );
}

Faucet_usage_Page.Layout = SimpleLayout;
