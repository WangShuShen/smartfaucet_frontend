import React from "react";

export default function ProjectListBlockComponent() {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-[#EFEFEF] text-left text-xs text-[#5F6162] uppercase tracking-wider">
                選取
              </th>
              <th className="px-5 py-3 bg-[#A9CFD9] text-left text-xs text-[#5F6162] uppercase tracking-wider">
                專案/公司
              </th>
              <th className="px-5 py-3 bg-[#A9CFD9] text-left text-xs text-[#5F6162] uppercase tracking-wider">
                任務/建築物
              </th>
              <th className="px-5 py-3 bg-[#A9CFD9] text-left text-xs text-[#5F6162] uppercase tracking-wider">
                樓層
              </th>
              <th className="px-5 py-3 bg-[#A9CFD9] text-left text-xs text-[#5F6162] uppercase tracking-wider">
                Hub
              </th>
              <th className="px-5 py-3 bg-[#A9CFD9] text-left text-xs text-[#5F6162] uppercase tracking-wider">
                位置
              </th>
            </tr>
          </thead>
          <tbody className="h-64 overflow-y-auto bg-[#EFEFEF]">
            <tr className="h-full">
              <td colSpan={6}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
