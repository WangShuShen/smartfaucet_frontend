import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { fetchProject } from "@/app/redux/project_setting/project_list";
import { selectprojectReducer } from "@/app/redux/project_setting/project_CRUD";

export default function SelectFaucetGroupComponent() {
  const dispatch = useDispatch();

  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const reduxProjects = useSelector(
    (state: RootState) => state.project.projects
  );
  const emptyRows = Math.max(5 - projects.length, 0);
  const emptyRowsArray = Array(emptyRows).fill(null);
  useEffect(() => {
    if (reduxProjects && reduxProjects.length > 0) {
      setProjects(reduxProjects);
    }
  }, [reduxProjects]);
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <div className="overflow-y-auto max-h-[260px]">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                  FAUCET
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                  FAUCET
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                  ID
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                  SELECT FAUCET
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#EFEFEF]">
              {projects.map((project, index) => (
                <tr key={project.id}>
                  <td className="px-5 py-3 text-sm"></td>
                  <td className="px-5 py-3 text-sm text-center"></td>
                  <td className="px-5 py-3 text-sm text-center">
                    {project.id}
                  </td>
                  <td className="px-5 py-3 text-sm text-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="projectSelection"
                        checked={selectedId === project.id}
                        onChange={() => handleSelectChange(project.id)}
                        className="form-checkbox"
                      />
                    </label>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
