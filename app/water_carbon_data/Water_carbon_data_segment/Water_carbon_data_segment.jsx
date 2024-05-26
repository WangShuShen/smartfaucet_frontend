"use client";
import React, { useEffect, useState } from "react";
import { createApiClient } from "@/utils/apiClient";
import Usage from "./Usage_component/Usage_component";
import withLanguage from "./../service/withLanguage";

async function fetchBuildingData(buildingId) {
  try {
    const apiUrl = "faucet/FaucetConsumptionManager/building_update";
    const postApiClient = createApiClient("post", apiUrl);

    const payload = { building_uid: buildingId };
    const response = await postApiClient(apiUrl, payload);

    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}

const Water_carbon_data_Segment = ({ buildingId, languageData }) => {
  const [totalUsageWater, setTotalUsageWater] = useState("0 GPM");
  const [totalUsageWaterSaved, setTotalUsageWaterSaved] = useState("0 GPM");

  useEffect(() => {
    if (!buildingId) return;

    const getData = async () => {
      const data = await fetchBuildingData(buildingId);
      if (data) {
        setTotalUsageWater(`${data.total_usage_water} GAL`);
        setTotalUsageWaterSaved(`${data.total_usage_water_saved} GAL`);
      }
    };

    getData();
  }, [buildingId]);

  return (
    <div className="w-full flex justify-center items-center space-x-10 py-4 mb-5 bg-custom-cyan rounded-t-2xl shadow-md shadow-gray-950">
      <div className="w-1/4">
        <Usage
          topText={languageData.usage.total_usage_water}
          bottomText={totalUsageWater}
        ></Usage>
      </div>
      <div className="w-1/4">
        <Usage
          topText={languageData.usage.total_usage_water_saved}
          bottomText={totalUsageWaterSaved}
        ></Usage>
      </div>
    </div>
  );
};

export default withLanguage(Water_carbon_data_Segment);
