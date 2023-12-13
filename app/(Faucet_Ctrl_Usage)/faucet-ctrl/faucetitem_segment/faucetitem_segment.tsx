"use client";
import FaucetListBlock from "./faucetlistblock_component/faucetlistblock_component";
import FaucetInfo from "./faucetinfo_component/faucetinfo_component";
export default function FaucetItem_Segment() {
  return (
    <div className="flex justify-between">
      <FaucetListBlock></FaucetListBlock>
      <FaucetInfo></FaucetInfo>
    </div>
  );
}
