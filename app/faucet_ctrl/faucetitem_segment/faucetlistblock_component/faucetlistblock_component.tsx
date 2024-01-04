import React, { useState } from "react";
import { useFaucetListBlock } from "./service/faucetlistblock_hooks";
import {
  useFaucetInfo,
  useFaucetUsage,
} from "../faucetinfo_component/service/faucetinfo_hooks";
import { useFaucetSetting } from "../../faucet_control_segment/service/faucet_control_segment_hook";
// Define a type for the faucet object
type Faucet = {
  faucet_uid: string;
  faucet_status:
    | "electromagneticvalve_status"
    | "normalconnection_status"
    | "humanfixed_status"
    | "errorconnection_status";
};

export default function FaucetListBlock_Component() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedFaucetUid, setSelectedFaucetUid] = useState<string | null>(
    null
  );
  const { faucets, loading, error } = useFaucetListBlock();

  const faucetInfo = useFaucetInfo(selectedFaucetUid || "");
  const faucetusage = useFaucetUsage(selectedFaucetUid || "");
  const faucetsetting = useFaucetSetting(selectedFaucetUid || "");
  const handleFaucetClick = (faucetUid: string, index: number) => {
    setSelectedCard(index);
    setSelectedFaucetUid(faucetUid); // 更新選中的水龍頭 UID
  };
  const getRingColor = (
    status: Faucet["faucet_status"],
    isSelected: boolean
  ): string => {
    if (!isSelected) return "hidden";
    return status === "electromagneticvalve_status" ||
      status === "errorconnection_status"
      ? "ring-red-500"
      : "ring-[#D9D9D9]";
  };

  if (loading)
    return <span className="loading loading-bars loading-lg mt-24"></span>;
  if (error)
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
  return (
    <div className="flex">
      <div className="flex bg-[#EFEFEF] overflow-x-auto rounded-md h-72">
        <div className="flex flex-nowrap">
          {faucets.map((faucet: Faucet, index) => (
            <div
              key={faucet.faucet_uid}
              className="card card-compact w-68 bg-[#EFEFEF] h-auto mr-2 flex-shrink-0 relative"
              onClick={() => handleFaucetClick(faucet.faucet_uid, index)}
            >
              <div className="flex flex-col items-center p-4 relative">
                <img
                  src={`/${
                    selectedCard === index
                      ? `${faucet.faucet_status}_select`
                      : faucet.faucet_status
                  }.svg`}
                  alt={faucet.faucet_status}
                  className="mb-4 z-10 pb-2"
                />
                <img
                  src="/TAP-145015.svg"
                  alt="TAP-145015"
                  className="mb-2 z-10"
                />
                <div
                  className={`absolute top-8 left-4 right-4 bottom-16 rounded-lg ${getRingColor(
                    faucet.faucet_status,
                    selectedCard === index
                  )} ring-4 ring-opacity-50 z-0`}
                ></div>
                <p className="z-10 text-[#5F6162] font-bold">
                  ID {faucet.faucet_uid}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
