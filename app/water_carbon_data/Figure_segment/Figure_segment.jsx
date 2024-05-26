"use client";
import React, { useState, useEffect } from "react";
import Figure from "./Figure_component/Figure_component";
import TimeOption from "./Time_component/Time_component";
import { createApiClient } from "@/utils/apiClient";

async function fetchChartData(buildingId, timeFrame) {
  try {
    const apiUrls = {
      week: "faucet/FaucetConsumptionManager/building_week",
      month: "faucet/FaucetConsumptionManager/building_month",
      year: "faucet/FaucetConsumptionManager/building_year",
    };

    const apiUrl = apiUrls[timeFrame];
    const postApiClient = createApiClient("post", apiUrl);

    const payload = { building_uid: buildingId };
    const response = await postApiClient(apiUrl, payload);

    return response.data.map((item) => ({
      total_usage_count: item.usage_count,
      date: item.date,
    }));
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return [];
  }
}

export default function FigureSegment({ buildingId }) {
  const [timeFrame, setTimeFrame] = useState("week");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!buildingId) return;

    const getData = async () => {
      const data = await fetchChartData(buildingId, timeFrame);
      setChartData(data);
    };

    getData();
  }, [timeFrame, buildingId]);

  return (
    <div className="flex flex-col w-full bg-white rounded-b-2xl block pl-8 ">
      <TimeOption onTimeChange={(value) => setTimeFrame(value)} />
      <Figure chartData={chartData} />
    </div>
  );
}
