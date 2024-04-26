import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProject } from "@/app/redux/project_setting/project_list";
import {
  selectprojectReducer,
  setUpdateUIDReducer,
} from "@/app/redux/project_setting/project_CRUD";
import { setNotification } from "@/app/redux/app/app";
export default function ProjectListBlockComponent() {
  const dispatch = useDispatch();
  const reduxProjects = useSelector((state) => state.project.projects);
  const project_CRUD = useSelector((state) => state.project_CRUD);
  const isNotification = useSelector((state) => state.app.isNotification);
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const emptyRows = Math.max(5 - projects.length, 0);
  const emptyRowsArray = Array(emptyRows).fill(null);
  const isClickable = (value) => value && value.trim() !== "";

  useEffect(() => {
    const projectsWithId = reduxProjects.map((project, index) => ({
      ...project,
      id: `${project.project_company_uid}-${index}`,
    }));
    setProjects(projectsWithId);
    if (project_CRUD.selected_project === null && projects.length > 0) {
      setSelectedId(null);
    }
  }, [reduxProjects, project_CRUD]);
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchProject());
    }, 100);
  }, [project_CRUD, isNotification]);
  const handleSelectChange = (id) => {
    setSelectedId(id);
    const selectedProject = projects.find((project) => project.id === id);
    dispatch(selectprojectReducer(selectedProject));
  };
  const handleCompanyNameClick = (selected_name, selected_uid) => {
    dispatch(setUpdateUIDReducer(selected_uid));
    dispatch(setNotification("更改Company Management"));
  };
  const handleBuildingNameClick = (selected_name, selected_uid) => {
    dispatch(setUpdateUIDReducer(selected_uid));
    dispatch(setNotification("更改Building Management"));
  };
  const handleFloorNameClick = (selected_name, selected_uid) => {
    dispatch(setUpdateUIDReducer(selected_uid));
    dispatch(setNotification("更改Floor Management"));
  };
  const handleLocationNameClick = (selected_name, selected_uid) => {
    dispatch(setUpdateUIDReducer(selected_uid));
    dispatch(setNotification("更改Location Management"));
  };
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <div className="overflow-y-auto max-h-[260px]">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 px-5 py-3 bg-[#EFEFEF] text-center text-xs text-[#5F6162] uppercase tracking-wider ${hasUpdated.company ? 'bg-[#007BFF]' : 'bg-[#EFEFEF]'} text-[#5F6162]`}">
                  選取
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                  專案/公司
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                  任務/建築物
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                  樓層
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 bg-[#A9CFD9] text-center text-xs text-[#5F6162] uppercase tracking-wider">
                  Hub
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 bg-[#A9CFD9] text-center text-xs text-[#5F6162] uppercase tracking-wider">
                  位置
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#EFEFEF]">
              {projects.map((project, index) => (
                <tr key={project.id}>
                  <td className="px-5 py-3 border-gray-200 text-sm ">
                    <label className="flex cursor-pointer">
                      <input
                        type="radio"
                        name="projectSelection"
                        checked={selectedId === project.id}
                        onChange={() => handleSelectChange(project.id)}
                        className="sr-only"
                      />
                      <span className="block w-4 h-4 rounded bg-[#D9D9D9] ml-14 relatives">
                        {selectedId === project?.id && (
                          <svg className="w-3 h-3" viewBox="0 0 18 24">
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
                    className={`px-5 py-3 border-gray-200 text-sm text-center truncate max-w-[30px] ${
                      isClickable(project.project_company_name)
                        ? "cursor-pointer"
                        : ""
                    }`}
                    title={project.project_company_name}
                    onClick={() =>
                      isClickable(project.project_company_name) &&
                      handleCompanyNameClick(
                        project.project_company_name,
                        project.project_company_uid
                      )
                    }
                  >
                    {project.project_company_name}
                  </td>
                  <td
                    className={`px-5 py-3 border-gray-200 text-sm text-center truncate max-w-[30px] ${
                      isClickable(project.building_name) ? "cursor-pointer" : ""
                    }`}
                    title={project.building_name}
                    onClick={() =>
                      isClickable(project.building_name) &&
                      handleBuildingNameClick(
                        project.building_name,
                        project.building_uid
                      )
                    }
                  >
                    {project.building_name}
                  </td>
                  <td
                    className={`px-5 py-3 border-gray-200 text-sm text-center relative truncate max-w-[30px] ${
                      isClickable(project.floor_name) ? "cursor-pointer" : ""
                    }`}
                    title={project.floor_name}
                    onClick={() =>
                      isClickable(project.floor_name) &&
                      handleFloorNameClick(
                        project.floor_name,
                        project.floor_uid
                      )
                    }
                  >
                    {project.floor_name}
                  </td>
                  <td
                    className={
                      "px-5 py-3 border-gray-200 text-sm text-center truncate max-w-[30px] "
                    }
                    title={project.hub_uid}
                  >
                    {project.hub_uid[0]}
                  </td>
                  <td
                    className={`px-5 py-3 border-gray-200 text-sm text-center truncate max-w-[30px] ${
                      isClickable(project.location_name) ? "cursor-pointer" : ""
                    }`}
                    title={project.location_name}
                    onClick={() =>
                      isClickable(project.location_name) &&
                      handleLocationNameClick(
                        project.location_name,
                        project.location_uid
                      )
                    }
                  >
                    {project.location_name}
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
