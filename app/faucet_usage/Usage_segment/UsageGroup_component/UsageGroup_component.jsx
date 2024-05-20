import React from "react";
import { useFaucetUsageData } from "./service/UsageGroup_hooks";
import { useLanguage } from "@/utils/loadLanguage";
import useLang from "@/app/component/useLang";
export default function UsageGroup_Component({ faucet_uid }) {
  const { latestUpdate, loading_usage, error_usage } = useFaucetUsageData({
    faucet_uid,
  });
  const lang = useLang();
  const languageData = useLanguage("faucet_usage", lang);
  if (!languageData) {
    return <div>Loading...</div>;
  }
  if (loading_usage) return <div>Loading...</div>;
  if (error_usage) return <div>Error: {error_usage}</div>;

  return (
    <div className="stats bg-[#EFEFEF] rounded-full h-18 border-[#118BBB] border-2 mr-4 h-16">
      <div className="stat">
        <div className="flex">
          <div className="font-bold text-[#118BBB]">
            {languageData.activation_times} ▸
          </div>
          <div className="font-bold text-[#5F6162]">
            {latestUpdate ? `${latestUpdate.total_usage_count} times` : "N/A"}
          </div>
        </div>
      </div>
      <div className="stat">
        <div className="flex">
          <div className="font-bold text-[#118BBB]">
            {languageData.water_discharge_time} ▸
          </div>
          <div className="font-bold text-[#5F6162]">
            {latestUpdate ? `${latestUpdate.total_usage_time} second` : "N/A"}
          </div>
        </div>
      </div>
      <div className="stat">
        <div className="flex">
          <div className="font-bold text-[#118BBB]">
            {languageData.water_consumption} ▸
          </div>
          <div className="font-bold text-[#5F6162]">
            {latestUpdate ? `${latestUpdate.total_usage_water}gal` : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
}
