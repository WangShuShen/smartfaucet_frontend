import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setNotification } from "@/app/redux/app/app";

export default function ProjectListBlockComponent() {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [hasUpdated, setHasUpdated] = useState({
    company: false,
    building: false,
    floor: false,
  });
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
  const handleAddFloor = (id) => {
    setSelectedId(id);
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
      setHasUpdated((prev) => ({
        ...prev,
        company: true,
        building: false,
        floor: false,
      }));
      setSelectedId(newId);
    }
  }, [companyValue]);

  useEffect(() => {
    if (selectedId && buildingValue) {
      const selectedProjectIndex = projects.findIndex(
        (project) => project.id === selectedId
      );
      const selectedProject = projects[selectedProjectIndex];

      // 檢查是否已有建築物值
      if (selectedProject && selectedProject.building) {
        // 如果已有初始值，創建新的 row
        const newProject = {
          id: projects.length + 1,
          company: selectedProject.company, // 從上一個 row 複製 companyValue
          building: buildingValue, // 設置新的 buildingValue
          floor: "",
          hub: "",
          location: "",
        };

        // 添加新的 row 到列表
        setProjects((prevProjects) => [...prevProjects, newProject]);
        setSelectedId(newProject.id); // 選中新添加的 row
      } else {
        // 如果沒有初始值，更新當前選中的 row
        const updatedProjects = projects.map((project) =>
          project.id === selectedId
            ? { ...project, building: buildingValue }
            : project
        );

        setProjects(updatedProjects);
        setHasUpdated((prev) => ({
          ...prev,
          company: false,
          building: true,
          floor: false,
        }));
      }
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
      setHasUpdated((prev) => ({
        ...prev,
        company: false,
        building: false,
        floor: true,
      }));
    }
  }, [FloorValue]);
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <div className="overflow-y-auto max-h-[260px]">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 px-5 py-3 bg-[#EFEFEF] text-left text-xs text-[#5F6162] uppercase tracking-wider ${hasUpdated.company ? 'bg-[#007BFF]' : 'bg-[#EFEFEF]'} text-[#5F6162]`}">
                  選取
                </th>
                <th
                  className={`sticky top-0 z-10 px-5 py-3 text-left text-xs uppercase tracking-wider ${
                    hasUpdated.company
                      ? "bg-[#1498b5] text-[#FFFFFF]"
                      : "bg-[#A9CFD9] text-[#5F6162]"
                  } `}
                >
                  專案/公司
                </th>
                <th
                  className={`sticky top-0 z-10 px-5 py-3 text-left text-xs uppercase tracking-wider ${
                    hasUpdated.building
                      ? "bg-[#1498b5] text-[#FFFFFF]"
                      : "bg-[#A9CFD9] text-[#5F6162]"
                  } `}
                >
                  任務/建築物
                </th>
                <th
                  className={`sticky top-0 z-10 px-5 py-3 text-left text-xs uppercase tracking-wider ${
                    hasUpdated.floor
                      ? "bg-[#1498b5] text-[#FFFFFF]"
                      : "bg-[#A9CFD9] text-[#5F6162]"
                  }`}
                >
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
                        onClick={() => handleAddFloor(project.id)}
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
