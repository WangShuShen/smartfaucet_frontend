"use client";
import React from "react";
import Project_button_Segment from "./project_button_segment/Project_button_segment";
import State_Segment from "./State_segment/State_segment";
import Content_Management from "./content_management_segment/Content_Management_segment";
export default function Project_setting_Page() {
  return (
    <div className="flex justify-center	">
      <div className="block">
        <div className="">
          <Project_button_Segment />
        </div>
        <div className="">
          <Content_Management></Content_Management>
        </div>
        <div className="">
          <State_Segment />
        </div>
      </div>
    </div>
  );
}
