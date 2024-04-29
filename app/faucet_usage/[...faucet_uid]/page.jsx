"use client";
import React, { useEffect } from "react";
import Figure_Segment from "../Figure_segment/Figure_segment";
import Usage_Segment from "../Usage_segment/Usage_segment";
import SimpleLayout from "../../simple-layout";
import { setLoading } from "@/app/redux/app/app";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
export default function Faucet_usage_Page({ params }) {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);
  console.log(params);
  return (
    <div className="block">
      <Usage_Segment
        faucet_uid={params.faucet_uid[0]}
        specification={params.faucet_uid[1]}
      />
      <Figure_Segment faucet_uid={params.faucet_uid[0]} />
    </div>
  );
}

Faucet_usage_Page.Layout = SimpleLayout;
