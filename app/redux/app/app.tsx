import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

type AppState = {
  isLoading: boolean;
  notification: boolean;
};

const initialState: AppState = {
  isLoading: false,
  notification: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      state.notification = false;
    },
    setNotification: (state, action: PayloadAction<boolean>) => {
      state.isLoading = false;
      state.notification = action.payload;
    },
  },
});

export const { setLoading, setNotification } = appSlice.actions;
export default appSlice.reducer;
