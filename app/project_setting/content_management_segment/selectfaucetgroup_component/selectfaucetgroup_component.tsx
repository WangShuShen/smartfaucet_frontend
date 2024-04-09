import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { fetchProject } from "@/app/redux/project_setting/project_list";
import { selectprojectReducer } from "@/app/redux/project_setting/project_CRUD";
import axios from "axios";
async function fetchlistfaucet(hubUid) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_LISTUNBINDFAUCET_API as string;
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
    const apiUrl = process.env.NEXT_PUBLIC_LISTLOCATIONFAUCET_API as string;
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
    const apiUrl = process.env.NEXT_PUBLIC_BINDLOCATIONFAUCET_API as string;
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
export default function SelectFaucetGroupComponent() {
  const dispatch = useDispatch();
  const selected_project = useSelector(
    (state: RootState) => state.project_CRUD.selected_project
  );
  const [unbindfaucets, setUnbindfaucets] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [lastLocationUid, setLastLocationUid] = useState("");
  const [bindFaucets, setBindFaucets] = useState([]);
  const project_CRUD = useSelector((state: RootState) => state.project_CRUD);
  const emptyRows = Math.max(5 - unbindfaucets.length, 0);
  const emptyRowsArray = Array(emptyRows).fill(null);

  const shouldShowListFaucetButton =
    !bindFaucets.length &&
    selected_project?.location_uid !== "" &&
    selected_project &&
    selected_project &&
    selectedIds.length === 0;

  useEffect(() => {
    const fetchFaucets = async () => {
      if (
        selected_project?.location_uid &&
        selected_project?.location_uid !== lastLocationUid
      ) {
        const data = await fetchbindfaucet(selected_project?.location_uid);
        setBindFaucets(data || []);
        setLastLocationUid(selected_project?.location_uid);
      }
    };

    fetchFaucets();
  }, [selected_project?.location_uid, lastLocationUid]);
  const handleListFaucetClick = async () => {
    const data = await fetchlistfaucet(project_CRUD.selected_project.hub_uid);
    if (data) {
      setUnbindfaucets(data);
    }
  };

  const handleSelectChange = (selectedFaucetUid) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(selectedFaucetUid)) {
        return prevSelectedIds.filter((id) => id !== selectedFaucetUid);
      } else {
        return [...prevSelectedIds, selectedFaucetUid];
      }
    });
  };
  const handleAddButtonClick = async () => {
    const results = await Promise.all(
      selectedIds.map((faucetUid) =>
        bindfaucetapi(selected_project.location_uid, faucetUid)
      )
    );
    console.log(results);
  };
  return (
    <div className="overflow-x-auto relative min-h-[300px]">
      <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <div className="overflow-y-auto max-h-[260px]">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                  FAUCET
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                  ID
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                  STATE
                </th>
                <th className="sticky top-0 z-10 px-5 py-3 text-center text-xs uppercase tracking-wider bg-[#A9CFD9] text-[#5F6162]">
                  SELECT FAUCET
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#EFEFEF]">
              {unbindfaucets.map((unbindfaucet, index) => (
                <tr key={unbindfaucet.faucet_uid}>
                  <td className="px-5 py-3 text-sm"></td>
                  <td className="px-5 py-3 text-sm text-center">
                    {unbindfaucet.faucet_uid}
                  </td>
                  <td className="px-5 py-3 text-sm text-center">
                    {unbindfaucet.faucet_status}
                  </td>
                  <td className="px-5 py-3 border-gray-200 text-sm flex items-center justify-center">
                    <label className="flex cursor-pointer items-center justify-center">
                      <input
                        type="checkbox"
                        name="projectSelection"
                        checked={selectedIds.includes(unbindfaucet.faucet_uid)}
                        onChange={() =>
                          handleSelectChange(unbindfaucet.faucet_uid)
                        }
                        className="sr-only"
                      />
                      <span className="block w-4 h-4 rounded bg-[#D9D9D9] flex items-center justify-center">
                        {selectedIds.includes(unbindfaucet?.faucet_uid) && (
                          <svg className="w-3 h-3" viewBox="0 0 24 24">
                            <path
                              fill="#0C659E"
                              d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                            />
                          </svg>
                        )}
                      </span>
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
          <div className="absolute bottom-0 right-0 mb-10 mr-2">
            {shouldShowListFaucetButton ? (
              <button
                type="button"
                className="text-[#118BBB] font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={handleListFaucetClick}
              >
                List Faucet
              </button>
            ) : (
              <button
                type="button"
                className="text-[#118BBB] font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={handleAddButtonClick}
                disabled={selectedIds.length === 0} 
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
