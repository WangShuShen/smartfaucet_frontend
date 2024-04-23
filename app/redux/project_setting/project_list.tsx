import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import { createApiClient } from "@/utils/apiClient";
type Project = {
  projects: Array<{
    project_company_uid?: string;
    project_company_name?: string;
    building_uid?: string;
    building_name?: string;
    floor_uid?: string;
    floor_name?: string;
    hub_uid?: string;
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

export const fetchProject = createAsyncThunk<
  Project[],
  void,
  { state: RootState }
>("project/fetchHierarch", async (_, thunkAPI) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_PROJECTLIST_API as string;
    const postApiClient = createApiClient("post", apiUrl);

    const payload = {};
    const response = await postApiClient(apiUrl, payload);

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
        hub_uid: item.hub_uid ?? "",
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
});

const ProjectSlice = createSlice({
  name: "project_list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.projects_loading = false;
      })
      .addCase(fetchProject.pending, (state, action) => {
        state.projects_loading = true;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.projects_error =
          action.error.message || "Error fetching projects";
        state.projects_loading = false;
      });
  },
});

export default ProjectSlice.reducer;
