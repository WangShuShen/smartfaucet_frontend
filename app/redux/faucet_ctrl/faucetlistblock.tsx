import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import { createApiClient } from "@/utils/apiClient";
export type Faucet = {
  faucet_uid: string;
  faucet_status:
    | "electromagneticvalve_status"
    | "normalconnection_status"
    | "humanfixed_status"
    | "errorconnection_status";
  specification: string;
};

type FaucetsState = {
  faucets: Faucet[];
  loading: boolean;
  error: string | null;
};

const initialState: FaucetsState = {
  faucets: [],
  loading: false,
  error: null,
};

export const fetchFaucets = createAsyncThunk<
  Faucet[],
  string,
  { state: RootState }
>("faucets/fetchFaucets", async (location, thunkAPI) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_LISTLOCATIONFAUCET_API as string;
    const postApiClient = createApiClient("post", apiUrl);

    const payload = { location_uid: location };
    const response = await postApiClient(apiUrl, payload);
    return response.data.map((item: any) => ({
      faucet_uid: item.faucet_uid,
      faucet_status: item.faucet_status,
      specification: item.specification,
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response || error.message);
      return thunkAPI.rejectWithValue(error.message);
    } else {
      console.error("Unexpected error:", error);
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
});

const faucetsSlice = createSlice({
  name: "faucets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaucets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFaucets.fulfilled, (state, action) => {
        state.faucets = action.payload;
        state.loading = false;
      })
      .addCase(fetchFaucets.rejected, (state, action) => {
        state.error = action.error.message || "Error fetching faucets";
        state.loading = false;
      });
  },
});

export default faucetsSlice.reducer;
