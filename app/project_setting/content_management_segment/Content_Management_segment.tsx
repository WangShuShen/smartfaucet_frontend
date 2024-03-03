"use client";
import React from "react";
import Projectlistblock_Component from "./projectlistblock_component/projectlistblock_component";
export default function Content_management_Segment() {
  return (
    <div className="flex justify-between">
      <div className="mt-4">
        <Projectlistblock_Component></Projectlistblock_Component>
      </div>
    </div>
  );
}
