import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProjectState = {
  companyValue: string;
  buildingValue: string;
  floorValue: string;
  hubValue: string;
  locationValue: string;
};

const initialState: ProjectState = {
  companyValue: "",
  buildingValue: "",
  floorValue: "",
  hubValue: "",
  locationValue: "",
};

const ProjectSlice = createSlice({
  name: "project_CRUD",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<string>) => {
      state.companyValue = action.payload;
      state.buildingValue = "";
      state.floorValue = "";
      state.hubValue = "";
      state.locationValue = "";
    },
    setBuilding: (state, action: PayloadAction<string>) => {
      state.companyValue = "";
      state.buildingValue = action.payload;
      state.floorValue = "";
      state.hubValue = "";
      state.locationValue = "";
    },
    setFloor: (state, action: PayloadAction<string>) => {
      state.companyValue = "";
      state.buildingValue = "";
      state.floorValue = action.payload;
      state.hubValue = "";
      state.locationValue = "";
    },
    setHub: (state, action: PayloadAction<string>) => {
      state.companyValue = "";
      state.buildingValue = "";
      state.floorValue = "";
      state.hubValue = action.payload;
      state.locationValue = "";
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.companyValue = "";
      state.buildingValue = "";
      state.floorValue = "";
      state.hubValue = "";
      state.locationValue = action.payload;
    },
  },
});

export const { setCompany, setBuilding, setFloor, setHub, setLocation } =
  ProjectSlice.actions;
export default ProjectSlice.reducer;
