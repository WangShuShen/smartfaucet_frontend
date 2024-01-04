import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type FaucetUsageUpdate = {
  total_usage_count: number;
  total_usage_time: number;
  total_usage_water: number;
};

type FaucetUsageUpdateState = {
  latestUpdate: FaucetUsageUpdate | null;
  loading: boolean;
  error: string | null;
};

const initialState: FaucetUsageUpdateState = {
  latestUpdate: null,
  loading: false,
  error: null,
};

export const fetchLatestUsage = createAsyncThunk(
  'faucetUsage/fetchLatest',
  async (faucetUid: string) => {
    const response = await axios.post(`https://your-api-endpoint/retrieve_update`, {
      faucet_uid: faucetUid
    });
    return response.data as FaucetUsageUpdate;
  }
);

const faucetUsageReducer = createSlice({
  name: 'faucetUsage',
  initialState,
  reducers: {
    // 可以添加一些同步的 reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestUsage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestUsage.fulfilled, (state, action) => {
        state.latestUpdate = action.payload;
        state.loading = false;
      })
      .addCase(fetchLatestUsage.rejected, (state, action) => {
        state.error = action.error.message || 'Error fetching latest usage data';
        state.loading = false;
      });
  },
});

export default faucetUsageReducer.reducer;
