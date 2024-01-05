// import React from "react";

// export default function UsageGroup_Component() {
//   return (
//     <div className="stats bg-[#EFEFEF] rounded-full h-18 border-[#118BBB] border-2 mr-4 h-16">
//       <div className="stat">
//         <div className="flex">
//           <div className="font-bold text-[#118BBB]">總啟動次數 ▸ </div>
//           <div className="font-bold text-[#5F6162]">1254次</div>
//         </div>
//       </div>
//       <div className="stat">
//         <div className="flex">
//           <div className="font-bold text-[#118BBB]">總啟動時間 ▸ </div>
//           <div className="font-bold text-[#5F6162]">2000秒</div>
//         </div>
//       </div>
//       <div className="stat">
//         <div className="flex">
//           <div className="font-bold text-[#118BBB]">總流量 ▸ </div>
//           <div className="font-bold text-[#5F6162]">7652gal</div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { useFaucetUsageData } from './service/UsageGroup_hooks';

export default function UsageGroup_Component() {
  const { latestUpdate, loading_usage, error_usage } = useFaucetUsageData();

  if (loading_usage) return <div>Loading...</div>;
  if (error_usage) return <div>Error: {error_usage}</div>;

  return (
    <div className="stats bg-[#EFEFEF] rounded-full h-18 border-[#118BBB] border-2 mr-4 h-16">
      <div className="stat">
        <div className="flex">
          <div className="font-bold text-[#118BBB]">總啟動次數 ▸ </div>
          <div className="font-bold text-[#5F6162]">
            {latestUpdate ? `${latestUpdate.total_usage_count}次` : 'N/A'}
          </div>
        </div>
      </div>
      <div className="stat">
        <div className="flex">
          <div className="font-bold text-[#118BBB]">總啟動時間 ▸ </div>
          <div className="font-bold text-[#5F6162]">
            {latestUpdate ? `${latestUpdate.total_usage_time}秒` : 'N/A'}
          </div>
        </div>
      </div>
      <div className="stat">
        <div className="flex">
          <div className="font-bold text-[#118BBB]">總流量 ▸ </div>
          <div className="font-bold text-[#5F6162]">
            {latestUpdate ? `${latestUpdate.total_usage_water}gal` : 'N/A'}
          </div>
        </div>
      </div>
    </div>
 );
}