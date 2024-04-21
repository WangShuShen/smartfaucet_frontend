import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
  set_projects: Project[];
  set_projects_loading: boolean;
  isbindfaucet: boolean;
  set_projects_error: string | null;
};
const initialState: ProjectState = {
  selected_project: null,
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
      const apiUrl = process.env.NEXT_PUBLIC_COMPANYCREATE_API as string;
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        apiUrl,
        {
          project_company_name: companyname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const apiUrl = process.env.NEXT_PUBLIC_BUILDINGCREATE_API as string;
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        apiUrl,
        {
          building_name: building_name,
          f_project_company_uid: project_company_uid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const apiUrl = process.env.NEXT_PUBLIC_FLOORCREATE_API as string;
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        apiUrl,
        {
          floor_name: floor_name,
          f_building_uid: building_uid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const apiUrl = process.env.NEXT_PUBLIC_HUBCREATE_API as string;
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        apiUrl,
        {
          hub_uid: hub_uid,
          f_floor_uid: f_floor_uid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const apiUrl = process.env.NEXT_PUBLIC_LOCATIONCREATE_API as string;
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        apiUrl,
        {
          location_name: location_name,
          f_hub_uid: f_hub_uid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const apiUrl = process.env.NEXT_PUBLIC_COMPANYREMOVE_API as string;
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        apiUrl,
        {
          project_company_uid: project_company_Uid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const apiUrl = process.env.NEXT_PUBLIC_BUILDINGREMOVE_API as string;
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        apiUrl,
        {
          building_uid: building_Uid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const apiUrl = process.env.NEXT_PUBLIC_FLOORREMOVE_API as string;
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        apiUrl,
        {
          floor_uid: floor_Uid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const apiUrl = process.env.NEXT_PUBLIC_HUBREMOVE_API as string;
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        apiUrl,
        {
          hub_uid: hub_Uid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      const apiUrl = process.env.NEXT_PUBLIC_LOCATIONREMOVE_API as string;
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        apiUrl,
        {
          location_uid: location_Uid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    setisbindReducer: (state, action: PayloadAction<ProjectItem | null>) => {
      state.isbindfaucet = action.payload;
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
export const { selectprojectReducer, setisbindReducer } =
  project_CRUD_Slice.actions;
export default project_CRUD_Slice.reducer;
