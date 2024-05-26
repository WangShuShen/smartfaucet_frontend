"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useFaucetInfo, useFaucetUsage } from "./service/faucetinfo_hooks";
import { setLoading } from "@/app/redux/app/app";
import { useDispatch, useSelector } from "react-redux";
import { useLanguage } from "@/utils/loadLanguage";
import useLang from "@/app/component/useLang";
export default function FaucetInfo(faucetUid) {
  const dispatch = useDispatch();
  const router = useRouter();
  const specification = useSelector(
    (state) => state.faucetinfo.faucet_info?.specification
  );
  const { faucet_info, loading_info, error_info } = useFaucetInfo(faucetUid);
  const { latestUpdate, loading_usage, error_usage } =
    useFaucetUsage(faucetUid);
  const lang = useLang();
  const languageData = useLanguage("faucet_ctrl", lang);

  if (!languageData) {
    return <div>Loading...</div>;
  }
  if (loading_info || loading_usage)
    return <span className="loading loading-bars loading-lg mt-24"></span>;

  if (error_info || error_usage)
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! Task failed.</span>
      </div>
    );

  const handleClick = () => {
    if (faucet_info?.faucet_uid) {
      dispatch(setLoading(true));
      router.push(`/faucet_usage/${faucet_info?.faucet_uid}/${specification}`);
    } else {
      alert("Please choose faucet！");
    }
  };
  return (
    <div className="flex card w-1/2 h-72">
      <div className="flex pt-2">
        <img
          src="/faucet_ctrl/faucetexample_outlook.svg"
          alt="faucetexample_outlook"
          className="rounded-xl"
        />
        <div className="flex flex-col">
          {faucet_info ? (
            <>
              <p className="text-[#0C659E] font-sans font-bold object-center">
                {faucet_info.faucet_hierarchy}
              </p>
              <p className="text-[#0C659E] font-sans font-bold object-center mt-12">
                ID :{faucet_info.faucet_uid}
              </p>
            </>
          ) : (
            <p>Loading or no faucet info available...</p>
          )}
        </div>
      </div>
      <div className="block ">
        <p className="text-[#118BBB] font-sans font-bold ">
          {languageData.weekly_usage}
        </p>
        <div className="bg-[#118BBB] h-0.5 w-5/6"></div>
      </div>
      <div className="block mt-2">
        <div className="flex mt-2">
          <p className="text-[#5F6162] font-sans font-bold text-xs">
            {languageData.activation_time} ▸
          </p>
          <p className="text-[#118BBB] font-sans font-bold text-xs">
            {latestUpdate?.total_usage_count}
          </p>
        </div>
        <div className="flex mt-2">
          <p className="text-[#5F6162] font-sans font-bold text-xs">
            {languageData.water_discharge_time}(min) ▸
          </p>
          <p className="text-[#118BBB] font-sans font-bold text-xs">
            {latestUpdate?.total_usage_time}
          </p>
        </div>
        <div className="flex mt-2">
          <p className="text-[#5F6162] font-sans font-bold text-xs">
            {languageData.water_consumption}(gal) ▸
          </p>
          <p className="text-[#118BBB] font-sans font-bold text-xs">
            {latestUpdate?.total_usage_water}
          </p>
        </div>
      </div>
      <div className="card-body justify-center text-center -mt-6 -ml-8">
        <button className="btn w-full bg-[#118BBB]" onClick={handleClick}>
          GPM
        </button>
      </div>
    </div>
  );
}
