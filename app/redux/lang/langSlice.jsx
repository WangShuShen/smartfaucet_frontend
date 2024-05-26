import { createSlice } from "@reduxjs/toolkit";

const langSlice = createSlice({
  name: "lang",
  initialState: "en",
  reducers: {
    setLang: (state, action) => {
      localStorage.setItem("lang", action.payload);
      return action.payload;
    },
  },
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
