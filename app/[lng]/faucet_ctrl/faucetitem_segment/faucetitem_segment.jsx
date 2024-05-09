"use client";
import FaucetListBlock from "./faucetlistblock_component/faucetlistblock_component";
import FaucetInfo from "./faucetinfo_component/faucetinfo_component";
export default function FaucetItem_Segment({ location }) {
  return (
    <div className="flex justify-center">
      <div className="w-[40%] lg:mr-10 md:ml-8 sm:ml-12 xs:ml-7">
        <FaucetListBlock location={location}></FaucetListBlock>
      </div>
      <div className="w-[40%] ml-20">
        <div className="flex justify-center">
          <FaucetInfo></FaucetInfo>
        </div>
      </div>
    </div>
  );
}
