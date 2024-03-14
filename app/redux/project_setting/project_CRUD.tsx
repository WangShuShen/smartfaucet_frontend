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
  set_projects: Project[];
  set_projects_loading: boolean;
  set_projects_error: string | null;
};
const initialState: ProjectState = {
  set_projects: [],
  set_projects_loading: false,
  set_projects_error: null,
};

export const setCompanyapi = createAsyncThunk(
  "project_CRUD/setCompany",
  async (companyname: string, thunkAPI) => {
    if (!companyname.trim()) {
      return thunkAPI.rejectWithValue("Company name is required");
    }

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



const project_CRUD_Slice = createSlice({
  name: "project_CRUD",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCompanyapi.fulfilled, (state, action) => {
        state.set_projects = action.payload;
        state.set_projects_loading = false;
      })
      .addCase(setCompanyapi.pending, (state) => {
        state.set_projects_loading = true;
      })
      .addCase(setCompanyapi.rejected, (state, action) => {
        state.set_projects_error =
          action.error.message || "Error fetching projects";
        state.set_projects_loading = false;
      });
  },
});

export default project_CRUD_Slice.reducer;
