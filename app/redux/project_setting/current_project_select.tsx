import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

type CurrentProcessState = {
  companyValue: string;
  buildingValue: string;
  floorValue: string;
  hubValue: string;
  locationValue: string;
};
const initialState: CurrentProcessState = {
  companyValue: "",
  buildingValue: "",
  floorValue: "",
  hubValue: "",
  locationValue: "",
};

const Current_ProjectSlice = createSlice({
  name: "current_project",
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
  Current_ProjectSlice.actions;
export default Current_ProjectSlice.reducer;
