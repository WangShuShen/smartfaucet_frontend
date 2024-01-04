import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type FigureFaucetUsageData = {
  total_usage_count: number;
  total_usage_time: number;
  total_usage_water: number;
  date: string;
};

type FigureFaucetUsageState = {
  weeklyData: FigureFaucetUsageData[];
  monthlyData: FigureFaucetUsageData[];
  yearlyData: FigureFaucetUsageData[];
  selectedTimeFrame: '周' | '月' | '年' | null;
  loading: boolean;
  error: string | null;
};

const initialState: FigureFaucetUsageState = {
  weeklyData: [],
  monthlyData: [],
  yearlyData: [],
  selectedTimeFrame: null,
  loading: false,
  error: null,
};

const fetchEndpoint = (timeframe: string, faucetUid: string) => 
  `https://your-api-endpoint/v1/faucet_info/${timeframe}?faucet_uid=${faucetUid}`;


export const fetchFigureWeeklyUsage = createAsyncThunk(
  'figureFaucetUsage/fetchWeekly',
  async (faucetUid: string) => {
    const response = await axios.post(fetchEndpoint('retrieve_week', faucetUid));
    return response.data as FigureFaucetUsageData[];
  }
);

export const fetchFigureMonthlyUsage = createAsyncThunk(
  'figureFaucetUsage/fetchMonthly',
  async (faucetUid: string) => {
    const response = await axios.post(fetchEndpoint('retrieve_month', faucetUid));
    return response.data as FigureFaucetUsageData[];
  }
);

export const fetchFigureYearlyUsage = createAsyncThunk(
  'figureFaucetUsage/fetchYearly',
  async (faucetUid: string) => {
    const response = await axios.post(fetchEndpoint('retrieve_year', faucetUid));
    return response.data as FigureFaucetUsageData[];
  }
);

const figureFaucetUsageReducer = createSlice({
  name: 'figureFaucetUsage',
  initialState,
  reducers: {
    setSelectedTimeFrame: (state, action) => {
      state.selectedTimeFrame = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFigureWeeklyUsage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFigureWeeklyUsage.fulfilled, (state, action) => {
        state.weeklyData = action.payload;
        state.loading = false;
      })
      .addCase(fetchFigureWeeklyUsage.rejected, (state, action) => {
        state.error = action.error.message || 'Error fetching weekly usage data';
        state.loading = false;
      })
      .addCase(fetchFigureMonthlyUsage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFigureMonthlyUsage.fulfilled, (state, action) => {
        state.monthlyData = action.payload;
        state.loading = false;
      })
      .addCase(fetchFigureMonthlyUsage.rejected, (state, action) => {
        state.error = action.error.message || 'Error fetching monthly usage data';
        state.loading = false;
      })
      .addCase(fetchFigureYearlyUsage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFigureYearlyUsage.fulfilled, (state, action) => {
        state.yearlyData = action.payload;
        state.loading = false;
      })
      .addCase(fetchFigureYearlyUsage.rejected, (state, action) => {
        state.error = action.error.message || 'Error fetching yearly usage data';
        state.loading = false;
      });
  },
});

export const { setSelectedTimeFrame } = figureFaucetUsageReducer.actions;
export default figureFaucetUsageReducer.reducer;
