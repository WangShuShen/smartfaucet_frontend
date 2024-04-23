import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import { createApiClient } from "@/utils/apiClient";
type FaucetUsageUpdate = {
  total_usage_count: number;
  total_usage_time: number;
  total_usage_water: number;
};

type FaucetUsageUpdateState = {
  latestUpdate: FaucetUsageUpdate | null;
  loading_usage: boolean;
  error_usage: string | null;
};

const initialState: FaucetUsageUpdateState = {
  latestUpdate: null,
  loading_usage: false,
  error_usage: null,
};

export const fetchLatestUsage = createAsyncThunk<
  FaucetUsageUpdate,
  string,
  { state: RootState }
>("faucets/fetchFaucetsUsage", async (faucetUid: string, thunkAPI) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_FACUETCONSUMPTION_API as string;
    const postApiClient = createApiClient("post", apiUrl);

    const payload = { faucet_uid: faucetUid };
    const response = await postApiClient(apiUrl, payload);

    const faucetusage: FaucetUsageUpdate = {
      total_usage_count: response.data.total_usage_count,
      total_usage_time: response.data.total_usage_time,
      total_usage_water: response.data.total_usage_water,
    };
    return faucetusage;
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

const faucetUsageReducer = createSlice({
  name: "faucetUsage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestUsage.pending, (state) => {
        state.loading_usage = true;
      })
      .addCase(fetchLatestUsage.fulfilled, (state, action) => {
        state.latestUpdate = action.payload;
        state.loading_usage = false;
      })
      .addCase(fetchLatestUsage.rejected, (state, action) => {
        state.error_usage =
          action.error.message || "Error fetching latest usage data";
        state.loading_usage = false;
      });
  },
});

export default faucetUsageReducer.reducer;
