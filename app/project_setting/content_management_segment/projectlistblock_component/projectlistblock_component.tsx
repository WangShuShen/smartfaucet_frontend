import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setNotification } from "@/app/redux/app/app";

export default function ProjectListBlockComponent() {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const emptyRows = Math.max(5 - projects.length, 0);
  const emptyRowsArray = Array(emptyRows).fill(null);

  const handleSelectChange = (id) => {
    setSelectedId(id);

    const selectedProject = projects.find((project) => project.id === id);
    if (selectedProject) {
      console.log("選中的項目資料：", selectedProject);
    } else {
      console.log("未找到選中的項目");
    }
  };
  const handleAddFloor = () => {
    dispatch(setNotification("新增Floor Management"));
  };
  const companyValue = useSelector(
    (state: RootState) => state.project.companyValue
  );
  const buildingValue = useSelector(
    (state: RootState) => state.project.buildingValue
  );
  const FloorValue = useSelector(
    (state: RootState) => state.project.floorValue
  );
  useEffect(() => {
    if (companyValue) {
      const newId = projects.length + 1;

      setProjects((prevProjects) => [
        ...prevProjects,
        {
          id: newId,
          company: companyValue,
          building: "",
          floor: "",
          hub: "",
          location: "",
        },
      ]);

      setSelectedId(newId);
    }
  }, [companyValue]);

  useEffect(() => {
    if (selectedId && buildingValue) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === selectedId
            ? { ...project, building: buildingValue }
            : project
        )
      );
    }
  }, [buildingValue]);
  useEffect(() => {
    if (selectedId && FloorValue) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === selectedId
            ? { ...project, floor: FloorValue }
            : project
        )
      );
    }
  }, [FloorValue]);
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
                  <td
                    className="px-5 py-3 border-gray-200 text-sm text-center truncate max-w-[30px]"
                    title={project.company}
                  >
                    {project.company}
                  </td>
                  <td
                    className="px-5 py-3 border-gray-200 text-sm text-center truncate max-w-[30px]"
                    title={project.building}
                  >
                    {project.building}
                  </td>
                  <td className="px-5 py-3 border-gray-200 text-sm text-center relative">
                    {project.floor}
                    {project.building && !project.floor && (
                      <button
                        onClick={() => handleAddFloor()}
                        className="absolute left-6 top-1/2 transform -translate-y-1/2"
                        style={{ outline: "none" }}
                      >
                        <img
                          src="add_icon.svg"
                          alt="Add"
                          className="w-4 h-4" // 調整圖標大小
                        />
                      </button>
                    )}
                  </td>
                  <td
                    className="px-5 py-3 border-gray-200 text-sm text-center truncate max-w-[30px]"
                    title={project.hub}
                  >
                    {project.hub}
                  </td>
                  <td
                    className="px-5 py-3 border-gray-200 text-sm text-center truncate max-w-[30px]"
                    title={project.location}
                  >
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
