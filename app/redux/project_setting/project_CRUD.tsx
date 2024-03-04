import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import { json } from "stream/consumers";

type Project = {
  projects: Array<{
    project_company_uid?: string;
    project_company_name?: string;
    building_uid?: string;
    building_name?: string;
    floor_uid?: string;
    floor_name?: string;
    location_uid?: string;
    location_name?: string;
  }>;
};
type ProjectState = {
  projects: Project[];
  projects_loading: boolean;
  projects_error: string | null;
};
const initialState: ProjectState = {
  projects: [],
  projects_loading: false,
  projects_error: null,
};

export const setCompanyapi = createAsyncThunk<void, { state: RootState }>(
  "project/setCompany",
  async (companyname: string, thunkAPI) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_COMPANYCREATE_API as string;
      const response = await axios.post(apiUrl, {
        project_company_name: companyname,
      });
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        return response.data.map((item: any) => ({
          project_company_uid: item.project_company_uid ?? "",
          project_company_name: item.project_company_name ?? "",
          building_uid: item.building_uid ?? "",
          building_name: item.building_name ?? "",
          floor_uid: item.floor_uid ?? "",
          floor_name: item.floor_name ?? "",
          location_uid: item.location_uid ?? "",
          location_name: item.location_name ?? "",
        }));
      } else {
        return [];
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response || error.message);
        return thunkAPI.rejectWithValue(error.message);
      } else {
        console.error("Unexpected error:", error);
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

const Project_CRUD_Slice = createSlice({
  name: "project_CRUD",
  initialState,
  reducers: {
    // setCompany: (state, action: PayloadAction<string>) => {
    //   state.companyValue = action.payload;
    //   state.buildingValue = "";
    //   state.floorValue = "";
    //   state.hubValue = "";
    //   state.locationValue = "";
    // },
    // setBuilding: (state, action: PayloadAction<string>) => {
    //   state.companyValue = "";
    //   state.buildingValue = action.payload;
    //   state.floorValue = "";
    //   state.hubValue = "";
    //   state.locationValue = "";
    // },
    // setFloor: (state, action: PayloadAction<string>) => {
    //   state.companyValue = "";
    //   state.buildingValue = "";
    //   state.floorValue = action.payload;
    //   state.hubValue = "";
    //   state.locationValue = "";
    // },
    // setHub: (state, action: PayloadAction<string>) => {
    //   state.companyValue = "";
    //   state.buildingValue = "";
    //   state.floorValue = "";
    //   state.hubValue = action.payload;
    //   state.locationValue = "";
    // },
    // setLocation: (state, action: PayloadAction<string>) => {
    //   state.companyValue = "";
    //   state.buildingValue = "";
    //   state.floorValue = "";
    //   state.hubValue = "";
    //   state.locationValue = action.payload;
    // },
    extraReducers: (builder) => {
      builder
        .addCase(setCompanyapi.pending, (state) => {
          state.status = "loading";
        })
        .addCase(setCompanyapi.fulfilled, (state, action) => {
          state.status = "idle";
          console.log("API response:", action.payload);
          state.companyValue = action.payload.companyValue;
          // 根據需要更新其他狀態
        })
        .addCase(setCompanyapi.rejected, (state) => {
          state.status = "failed";
        });
    },
  },
});
// export const { setCompany, setBuilding, setFloor, setHub, setLocation } =
//   Current_ProjectSlice.actions;
export default Project_CRUD_Slice.reducer;
