// slices/faucetSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export const faucetSlice = createSlice({
  name: "faucet",
  initialState: {
    selectedFaucetId: "",
  },
  reducers: {
    setSelectedFaucetId: (state, action) => {
      state.selectedFaucetId = action.payload;
    },
  },
});

// 導出 actions
export const { setSelectedFaucetId } = faucetSlice.actions;

// 導出 reducer
export default faucetSlice.reducer;
