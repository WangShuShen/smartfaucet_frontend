import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

type AppState = {
  isLoading: boolean;
  isNotification: boolean;
  notificationMessage: string;
};

const initialState: AppState = {
  isLoading: false,
  isNotification: false,
  notificationMessage: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      state.isNotification = false;
    },
    setNotification: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isNotification = true;
      state.notificationMessage = action.payload;
    },
    hideNotification: (state) => {
      state.isNotification = false;
      state.isLoading = false;
      state.notificationMessage = "";
    },
  },
});

export const { setLoading, setNotification, hideNotification } =
  appSlice.actions;
export default appSlice.reducer;
