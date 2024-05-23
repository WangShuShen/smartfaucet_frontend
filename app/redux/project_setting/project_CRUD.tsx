import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { createApiClient } from "@/utils/apiClient";
type ProjectItem = {
  project_company_uid?: string;
  project_company_name?: string;
  building_uid?: string;
  building_name?: string;
  floor_uid?: string;
  floor_name?: string;
  hub_uid?: string;
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
    hub_uid?: string;
    location_uid?: string;
    location_name?: string;
  }>;
};
type ProjectState = {
  selected_project: ProjectItem;
  setcopyfaucet_status: string | null;
  update_uid: string | null;
  copyfaucetfrom: string | null;
  set_projects: Project[];
  selected_faucet: Array | null;
  set_projects_loading: boolean;
  isbindfaucet: boolean;
  set_projects_error: string | null;
};
const initialState: ProjectState = {
  selected_project: null,
  setcopyfaucet_status: null,
  update_uid: null,
  copyfaucetfrom: null,
  selected_faucet: null,
  set_projects: [],
  set_projects_loading: false,
  set_projects_error: null,
  isbindfaucet: false,
};
const handleApiResponse = (response: any) => {
  return response.data &&
    Array.isArray(response.data) &&
    response.data.length > 0
    ? response.data.map((item: any) => ({
        ...item,
        project_company_uid: item.project_company_uid ?? "",
        project_company_name: item.project_company_name ?? "",
        building_uid: item.building_uid ?? "",
        building_name: item.building_name ?? "",
        floor_uid: item.floor_uid ?? "",
        floor_name: item.floor_name ?? "",
        hub_uid: item.hub_uid ?? "",
        location_uid: item.location_uid ?? "",
        location_name: item.location_name ?? "",
      }))
    : [];
};

export const setCompanyapi = createAsyncThunk(
  "project_CRUD/setCompany",
  async (companyname: string, thunkAPI) => {
    if (!companyname.trim()) {
      return thunkAPI.rejectWithValue("Company name is required");
    }
    try {
      const apiUrl = "faucet_hierarchy/ProjectCompanyManager/create";
      const postApiClient = createApiClient("post", apiUrl);

      const payload = {
        project_company_name: companyname,
      };
      const response = await postApiClient(apiUrl, payload);

      return handleApiResponse(response);
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
      const apiUrl = "faucet_hierarchy/BuildingManager/create";
      const postApiClient = createApiClient("post", apiUrl);

      const payload = {
        building_name: building_name,
        f_project_company_uid: project_company_uid,
      };
      const response = await postApiClient(apiUrl, payload);

      return handleApiResponse(response);
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

export const setFloorapi = createAsyncThunk(
  "project_CRUD/setFloor",
  async (
    { floor_name, building_uid }: { floor_name: string; building_uid: string },
    thunkAPI
  ) => {
    if (!floor_name.trim()) {
      return thunkAPI.rejectWithValue("FLoor name is required");
    }

    try {
      const apiUrl = "faucet_hierarchy/FloorManager/create";
      const postApiClient = createApiClient("post", apiUrl);

      const payload = {
        floor_name: floor_name,
        f_building_uid: building_uid,
      };
      const response = await postApiClient(apiUrl, payload);

      return handleApiResponse(response);
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

export const setHubapi = createAsyncThunk(
  "project_CRUD/setHub",
  async (
    { hub_uid, f_floor_uid }: { hub_uid: string; f_floor_uid: string },
    thunkAPI
  ) => {
    if (!hub_uid.trim()) {
      return thunkAPI.rejectWithValue("HUB uid is required");
    }

    try {
      const apiUrl = "faucet_hierarchy/HubManager/bind";
      const postApiClient = createApiClient("post", apiUrl);

      const payload = {
        hub_uid: hub_uid,
        f_floor_uid: f_floor_uid,
      };
      const response = await postApiClient(apiUrl, payload);

      return handleApiResponse(response);
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

export const setLocationapi = createAsyncThunk(
  "project_CRUD/setLocation",
  async (
    { location_name, f_hub_uid }: { location_name: string; f_hub_uid: string },
    thunkAPI
  ) => {
    if (!location_name.trim()) {
      return thunkAPI.rejectWithValue("HUB uid is required");
    }

    try {
      const apiUrl = "faucet_hierarchy/LocationManager/create";
      const postApiClient = createApiClient("post", apiUrl);

      const payload = {
        location_name: location_name,
        f_hub_uid: f_hub_uid,
      };
      const response = await postApiClient(apiUrl, payload);

      return handleApiResponse(response);
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
      const apiUrl = "faucet_hierarchy/ProjectCompanyManager/delete"
      const postApiClient = createApiClient("post", apiUrl);

      const payload = {
        project_company_uid: project_company_Uid,
      };
      const response = await postApiClient(apiUrl, payload);

      return handleApiResponse(response);
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
      const apiUrl = "faucet_hierarchy/BuildingManager/delete"
      const postApiClient = createApiClient("post", apiUrl);

      const payload = {
        building_uid: building_Uid,
      };
      const response = await postApiClient(apiUrl, payload);

      return handleApiResponse(response);
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

export const removeFloorapi = createAsyncThunk(
  "project_CRUD/removeFloor",
  async (floor_Uid: string, thunkAPI) => {
    if (!floor_Uid.trim()) {
      return thunkAPI.rejectWithValue("Floor uid is required");
    }

    try {
      const apiUrl = "faucet_hierarchy/FloorManager/delete"
      const postApiClient = createApiClient("post", apiUrl);

      const payload = {
        floor_uid: floor_Uid,
      };
      const response = await postApiClient(apiUrl, payload);

      return handleApiResponse(response);
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

export const removeHubapi = createAsyncThunk(
  "project_CRUD/removeHub",
  async (hub_Uid: string, thunkAPI) => {
    if (!hub_Uid.trim()) {
      return thunkAPI.rejectWithValue("Hub uid is required");
    }

    try {
      const apiUrl = "faucet_hierarchy/HubManager/unbind"
      const postApiClient = createApiClient("post", apiUrl);

      const payload = {
        hub_uid: hub_Uid,
      };
      const response = await postApiClient(apiUrl, payload);

      return handleApiResponse(response);
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

export const removeLocationapi = createAsyncThunk(
  "project_CRUD/removeLocation",
  async (location_Uid: string, thunkAPI) => {
    if (!location_Uid.trim()) {
      return thunkAPI.rejectWithValue("Location uid is required");
    }

    try {
      const apiUrl = "faucet_hierarchy/LocationManager/delete";
      const postApiClient = createApiClient("post", apiUrl);

      const payload = {
        location_uid: location_Uid,
      };
      const response = await postApiClient(apiUrl, payload);

      return handleApiResponse(response);
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
    selectfaucetReducer: (state, action: PayloadAction<ProjectItem | null>) => {
      state.selected_faucet = action.payload;
    },
    setcopyfaucetReducer: (
      state,
      action: PayloadAction<ProjectItem | null>
    ) => {
      state.setcopyfaucet_status = action.payload;
    },
    setcopyfaucetfromReducer: (
      state,
      action: PayloadAction<ProjectItem | null>
    ) => {
      state.copyfaucetfrom = action.payload;
    },
    setisbindReducer: (state, action: PayloadAction<ProjectItem | null>) => {
      state.isbindfaucet = action.payload;
    },
    setUpdateUIDReducer: (state, action: PayloadAction<ProjectItem | null>) => {
      state.update_uid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCompanyapi.fulfilled, (state, action) => {
        state.set_projects = action.payload;
        state.set_projects_loading = false;
        state.selected_project = null;
      })
      .addCase(setCompanyapi.pending, (state) => {
        state.set_projects_loading = true;
      })
      .addCase(setCompanyapi.rejected, (state, action) => {
        state.set_projects_error =
          action.error.message || "Error fetching projects";
        state.set_projects_loading = false;
      })
      .addCase(setBuildingapi.fulfilled, (state, action) => {
        state.set_projects = action.payload;
        state.set_projects_loading = false;
        state.selected_project = null;
      })
      .addCase(setBuildingapi.pending, (state) => {
        state.set_projects_loading = true;
      })
      .addCase(setBuildingapi.rejected, (state, action) => {
        state.set_projects_error =
          action.error.message || "Error fetching projects";
        state.set_projects_loading = false;
      })
      .addCase(setFloorapi.fulfilled, (state, action) => {
        state.set_projects = action.payload;
        state.set_projects_loading = false;
        state.selected_project = null;
      })
      .addCase(setFloorapi.pending, (state) => {
        state.set_projects_loading = true;
      })
      .addCase(setFloorapi.rejected, (state, action) => {
        state.set_projects_error =
          action.error.message || "Error fetching projects";
        state.set_projects_loading = false;
      })
      .addCase(setHubapi.fulfilled, (state, action) => {
        state.set_projects = action.payload;
        state.set_projects_loading = false;
        state.selected_project = null;
      })
      .addCase(setHubapi.pending, (state) => {
        state.set_projects_loading = true;
      })
      .addCase(setHubapi.rejected, (state, action) => {
        state.set_projects_error =
          action.error.message || "Error fetching projects";
        state.set_projects_loading = false;
      })
      .addCase(setLocationapi.fulfilled, (state, action) => {
        state.set_projects = action.payload;
        state.set_projects_loading = false;
        state.selected_project = null;
      })
      .addCase(setLocationapi.pending, (state) => {
        state.set_projects_loading = true;
      })
      .addCase(setLocationapi.rejected, (state, action) => {
        state.set_projects_error =
          action.error.message || "Error fetching projects";
        state.set_projects_loading = false;
      })
      .addCase(removeCompanyapi.fulfilled, (state, action) => {
        state.set_projects = action.payload;
        state.set_projects_loading = false;
        state.selected_project = null;
      })
      .addCase(removeCompanyapi.pending, (state) => {
        state.set_projects_loading = true;
      })
      .addCase(removeCompanyapi.rejected, (state, action) => {
        state.set_projects_error =
          action.error.message || "Error fetching projects";
        state.set_projects_loading = false;
      })
      .addCase(removeBuildingapi.fulfilled, (state, action) => {
        state.set_projects = action.payload;
        state.set_projects_loading = false;
        state.selected_project = null;
      })
      .addCase(removeBuildingapi.pending, (state) => {
        state.set_projects_loading = true;
      })
      .addCase(removeBuildingapi.rejected, (state, action) => {
        state.set_projects_error =
          action.error.message || "Error fetching projects";
        state.set_projects_loading = false;
      })
      .addCase(removeFloorapi.fulfilled, (state, action) => {
        state.set_projects = action.payload;
        state.set_projects_loading = false;
        state.selected_project = null;
      })
      .addCase(removeFloorapi.pending, (state) => {
        state.set_projects_loading = true;
      })
      .addCase(removeFloorapi.rejected, (state, action) => {
        state.set_projects_error =
          action.error.message || "Error fetching projects";
        state.set_projects_loading = false;
      })
      .addCase(removeHubapi.fulfilled, (state, action) => {
        state.set_projects = action.payload;
        state.set_projects_loading = false;
        state.selected_project = null;
      })
      .addCase(removeHubapi.pending, (state) => {
        state.set_projects_loading = true;
      })
      .addCase(removeHubapi.rejected, (state, action) => {
        state.set_projects_error =
          action.error.message || "Error fetching projects";
        state.set_projects_loading = false;
      })
      .addCase(removeLocationapi.fulfilled, (state, action) => {
        state.set_projects = action.payload;
        state.set_projects_loading = false;
        state.selected_project = null;
      })
      .addCase(removeLocationapi.pending, (state) => {
        state.set_projects_loading = true;
      })
      .addCase(removeLocationapi.rejected, (state, action) => {
        state.set_projects_error =
          action.error.message || "Error fetching projects";
        state.set_projects_loading = false;
      });
  },
});
export const {
  selectprojectReducer,
  setisbindReducer,
  selectfaucetReducer,
  setcopyfaucetReducer,
  setcopyfaucetfromReducer,
  setUpdateUIDReducer,
} = project_CRUD_Slice.actions;
export default project_CRUD_Slice.reducer;
