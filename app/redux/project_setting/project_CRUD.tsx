import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import { json } from "stream/consumers";

type ProjectItem = {
  project_company_uid?: string;
  project_company_name?: string;
  building_uid?: string;
  building_name?: string;
  floor_uid?: string;
  floor_name?: string;
  location_uid?: string;
  location_name?: string;
};

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
  selected_project: ProjectItem;
  set_projects: Project[];
  set_projects_loading: boolean;
  set_projects_error: string | null;
};
const initialState: ProjectState = {
  selected_project: null,
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

export const setBuildingapi = createAsyncThunk(
  "project_CRUD/setBuilding",
  async (
    {
      building_name,
      project_company_uid,
    }: { building_name: string; project_company_uid: string },
    thunkAPI
  ) => {
    if (!building_name.trim()) {
      return thunkAPI.rejectWithValue("Building name is required");
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_COMPANYCREATE_API as string;
      const response = await axios.post(apiUrl, {
        building_name: building_name,
        f_project_company_uid: project_company_uid,
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

export const removeCompanyapi = createAsyncThunk(
  "project_CRUD/removeCompany",
  async (project_company_Uid: string, thunkAPI) => {
    if (!project_company_Uid.trim()) {
      return thunkAPI.rejectWithValue("Company uid is required");
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_COMPANYREMOVE_API as string;
      const response = await axios.post(apiUrl, {
        project_company_uid: project_company_Uid,
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

export const removeBuildingapi = createAsyncThunk(
  "project_CRUD/removeBuilding",
  async (building_Uid: string, thunkAPI) => {
    if (!building_Uid.trim()) {
      return thunkAPI.rejectWithValue("Building uid is required");
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_COMPANYREMOVE_API as string;
      const response = await axios.post(apiUrl, {
        project_company_uid: building_Uid,
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
  reducers: {
    selectprojectReducer: (
      state,
      action: PayloadAction<ProjectItem | null>
    ) => {
      state.selected_project = action.payload;
    },
  },
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
      })
      .addCase(removeCompanyapi.fulfilled, (state, action) => {
        state.set_projects = action.payload;
        state.set_projects_loading = false;
      })
      .addCase(removeCompanyapi.pending, (state) => {
        state.set_projects_loading = true;
      })
      .addCase(removeCompanyapi.rejected, (state, action) => {
        state.set_projects_error =
          action.error.message || "Error fetching projects";
        state.set_projects_loading = false;
      });
  },
});
export const { selectprojectReducer } = project_CRUD_Slice.actions;
export default project_CRUD_Slice.reducer;
