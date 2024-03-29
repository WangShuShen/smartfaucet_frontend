"use client";
import React from "react";
import Projectlistblock_Component from "./projectlistblock_component/projectlistblock_component";
import SelectFaucetGroup_Component from "./selectfaucetgroup_component/selectfaucetgroup_component";
export default function Content_management_Segment() {
  return (
    <div className="flex justify-between">
      <div className="mt-4 w-[46%]">
        <Projectlistblock_Component></Projectlistblock_Component>
      </div>
      <div className="mt-4 w-[46%] mr-24">
        <SelectFaucetGroup_Component></SelectFaucetGroup_Component>
      </div>
    </div>
  );
}
