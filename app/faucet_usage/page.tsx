"use client";
import React, { useEffect } from "react";
import Figure_Segment from "./Figure_segment/Figure_segment";
import Usage_Segment from "./Usage_segment/Usage_segment";
import SimpleLayout from "../simple-layout";
import { setLoading } from "@/app/redux/app/app";
import { useDispatch } from "react-redux";
export default function Faucet_usage_Page() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);
  return (
    <div className="block">
      <Usage_Segment />
      <Figure_Segment />
    </div>
  );
}

Faucet_usage_Page.Layout = SimpleLayout;
