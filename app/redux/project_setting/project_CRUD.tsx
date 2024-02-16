import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProjectState = {
  companyValue: string;
  buildingValue: string;
  floorValue: string;
  hubValue:string;
  locationValue:string;
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
    },
    setBuilding: (state, action: PayloadAction<string>) => {
      state.buildingValue = action.payload;
    },
    setFloor: (state, action: PayloadAction<string>) => {
      state.floorValue = action.payload;
    },
    setHub: (state, action: PayloadAction<string>) => {
      state.hubValue = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.locationValue = action.payload;
    },
  },
});

export const { setCompany,setBuilding, setFloor,setHub,setLocation} =
ProjectSlice.actions;
export default ProjectSlice.reducer;
