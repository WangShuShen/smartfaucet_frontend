"use client";
import React from "react";
import Projectlistblock_Component from "./projectlistblock_component/projectlistblock_component";
import SelectFaucetGroup_Component from "./selectfaucetgroup_component/selectfaucetgroup_component";
export default function Content_management_Segment() {
  return (
    <div className="lg:flex md:flex-row lg:justify-between md:justify-center">
      <div className="relative mt-4 lg:w-[46%] md:w-[100%] sm:w-[50%] xs:w-[40%] lg:ml-0 md:ml-8 sm:ml-48 xs:ml-56">
        <Projectlistblock_Component></Projectlistblock_Component>
      </div>
      <div className="mt-4 lg:w-[46%] md:w-[100%] sm:w-[50%] xs:w-[40%] lg:ml-0 md:ml-8 sm:ml-48 xs:ml-56 mr-24">
        <SelectFaucetGroup_Component></SelectFaucetGroup_Component>
      </div>
    </div>
  );
}
