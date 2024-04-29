"use client";
import React from "react";
import FaucetID from "./FaucetID_component/FaucetID_component";
import Title from "./Title_component/Title_component";
import UsageGroup from "./UsageGroup_component/UsageGroup_component";

export default function Usage_Segment({ faucet_uid, specification }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <Title />
        <FaucetID faucet_uid={faucet_uid} specification={specification} />
      </div>
      <UsageGroup faucet_uid={faucet_uid} />
    </div>
  );
}
