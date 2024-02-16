import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

// const projects = [];

export default function ProjectListBlockComponent() {
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const emptyRows = Math.max(5 - projects.length, 0);
  const emptyRowsArray = Array(emptyRows).fill(null);
  const handleSelectChange = (id) => {
    setSelectedId(id);
  };
  const companyValue = useSelector(
    (state: RootState) => state.project.companyValue
  );
  useEffect(() => {
    // 假設 companyValue 是一個包含公司名稱的字串陣列
    // 每次 companyValue 更新時，將其添加到 projects 狀態中
    if (companyValue) {
      setProjects((prevProjects) => [
        ...prevProjects,
        { id: prevProjects.length + 1, company: companyValue },
      ]);
    }
  }, [companyValue]);
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <div className="overflow-y-auto max-h-[260px]">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 px-5 py-3 bg-[#EFEFEF] text-left text-xs text-[#5F6162] uppercase tracking-wider">
                  選取
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 bg-[#A9CFD9] text-left text-xs text-[#5F6162] uppercase tracking-wider">
                  專案/公司
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 bg-[#A9CFD9] text-left text-xs text-[#5F6162] uppercase tracking-wider">
                  任務/建築物
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 bg-[#A9CFD9] text-left text-xs text-[#5F6162] uppercase tracking-wider">
                  樓層
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 bg-[#A9CFD9] text-left text-xs text-[#5F6162] uppercase tracking-wider">
                  Hub
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 bg-[#A9CFD9] text-left text-xs text-[#5F6162] uppercase tracking-wider">
                  位置
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#EFEFEF]">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-5 py-3 border-gray-200 text-sm">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="projectSelection"
                        checked={selectedId === project.id}
                        onChange={() => handleSelectChange(project.id)}
                        className="sr-only"
                      />
                      <span className="block w-4 h-4 rounded bg-[#D9D9D9] mr-2 relative">
                        {selectedId === project.id && (
                          <svg
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#0C659E"
                              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                            />
                          </svg>
                        )}
                      </span>
                    </label>
                  </td>
                  <td className="px-5 py-3 border-gray-200 text-sm">
                    {project.company}
                  </td>
                  <td className="px-5 py-3 border-gray-200 text-sm">
                    {project.project}
                  </td>
                  <td className="px-5 py-3 border-gray-200 text-sm">
                    {project.floor}
                  </td>
                  <td className="px-5 py-3 border-gray-200 text-sm">
                    {project.hub}
                  </td>
                  <td className="px-5 py-3 border-gray-200 text-sm">
                    {project.location}
                  </td>
                </tr>
              ))}
              {emptyRowsArray.map((_, index) => (
                <tr key={`empty-${index}`}>
                  <td className="px-5 py-3 border-gray-200 text-sm">
                    <input type="radio" disabled className="hidden" />
                  </td>
                  <td className="px-5 py-3 border-gray-200 text-sm">&nbsp;</td>
                  <td className="px-5 py-3 border-gray-200 text-sm">&nbsp;</td>
                  <td className="px-5 py-3 border-gray-200 text-sm">&nbsp;</td>
                  <td className="px-5 py-3 border-gray-200 text-sm">&nbsp;</td>
                  <td className="px-5 py-3 border-gray-200 text-sm">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
