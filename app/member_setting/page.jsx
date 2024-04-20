"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { fetchProject } from "@/app/redux/project_setting/project_list";
import {
  selectprojectReducer,
  setisbindReducer,
} from "@/app/redux/project_setting/project_CRUD";
import axios from "axios";
async function fetchlistfaucet(hubUid) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_LISTUNBINDFAUCET_API;
    const response = await axios.post(apiUrl, {
      hub_uid: hubUid,
    });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
async function fetchbindfaucet(location_Uid) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_LISTLOCATIONFAUCET_API;
    const response = await axios.post(apiUrl, {
      location_uid: location_Uid,
    });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
async function bindfaucetapi(location_Uid, faucet_uid) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BINDLOCATIONFAUCET_API;
    const response = await axios.post(apiUrl, {
      faucet_uid: faucet_uid,
      f_location_uid: location_Uid,
    });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
export default function Member_Setting_Page() {
  const dispatch = useDispatch();
  const reduxProjects = useSelector((state) => state.project.projects);
  const project_CRUD = useSelector((state) => state.project_CRUD);
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const emptyRows = Math.max(10 - projects.length, 0);
  const emptyRowsArray = Array(emptyRows).fill(null);

  useEffect(() => {
    dispatch(fetchProject());
  }, [project_CRUD]);

  useEffect(() => {
    const projectsWithId = reduxProjects.map((project, index) => ({
      ...project,
      id: `${project.project_company_uid}-${index}`,
    }));
    setProjects(projectsWithId);
    if (project_CRUD.selected_project === null && projects.length > 0) {
      setSelectedId(null);
    }
  }, [reduxProjects]);

  const handleSelectChange = (id) => {
    setSelectedId(id);
    const selectedProject = projects.find((project) => project.id === id);
    dispatch(selectprojectReducer(selectedProject));
  };
  return (
    <div>
      <div className="flex justify-end mb-2">
        <button className="btn bg-[#118BBB] mr-2">
          <img src="/revise.svg" className="text-bold"></img>
          授權使用者
        </button>
        <button className="btn bg-[#118BBB]">
          <img src="/edit.svg" className="text-bold"></img>
          編輯使用者
        </button>
      </div>
      <div className="flex justify-center item-center ">
        <div className="overflow-x-auto w-[100%]">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <div className="overflow-y-auto max-h-[1400px]">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="sticky top-0 z-10 px-5 py-3 bg-[#EFEFEF] text-center text-xs text-[#5F6162] uppercase tracking-wider ${hasUpdated.company ? 'bg-[#007BFF]' : 'bg-[#EFEFEF]'} text-[#5F6162]`}">
                      選取
                    </th>
                    <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                      使用者帳號
                    </th>
                    <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                      狀態
                    </th>
                    <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                      上次登入時間
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
                        className="px-5 py-3 border-gray-200 text-sm text-center truncate max-w-[30px]"
                        title={project.project_company_name}
                      >
                        {project.project_company_name}
                      </td>
                      <td
                        className="px-5 py-3 border-gray-200 text-sm text-center truncate max-w-[30px]"
                        title={project.building_name}
                      >
                        {project.building_name}
                      </td>
                      <td className="px-5 py-3 border-gray-200 text-sm text-center relative truncate max-w-[30px]">
                        {project.floor_name}
                      </td>
                    </tr>
                  ))}
                  {emptyRowsArray.map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td className="px-5 py-3 border-gray-200 text-sm">
                        <input type="radio" disabled className="hidden" />
                      </td>
                      <td className="px-5 py-3 border-gray-200 text-sm">
                        &nbsp;
                      </td>
                      <td className="px-5 py-3 border-gray-200 text-sm">
                        &nbsp;
                      </td>
                      <td className="px-5 py-3 border-gray-200 text-sm">
                        &nbsp;
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
