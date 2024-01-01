import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

type FaucetInfo = {
  activation_count: number;
  total_water_time: string;
  total_flow_volume: string;
};

type FaucetControl = {
  waterShutoffDelay: string;
  flowRate: string;
  solenoidActivationDuration: string;
  maxIRWaterCheckDuration: string;
  auto1secStartStopSwitch: string;
  carbonCreditReduction: string;
  energySavingMode: string;
  autoFlushing12hr: string;
  irSensingDuration: string;
  dropdownOptions: string;
};

type FaucetDetail = {
  faucet_uid: string;
  faucet_info: FaucetInfo;
  faucet_ctrl: FaucetControl;
};

type FaucetDetailsState = {
  faucetDetail: FaucetDetail | null;
  loading: boolean;
  error: string | null;
};

const initialFaucetDetailsState: FaucetDetailsState = {
  faucetDetail: null,
  loading: false,
  error: null,
};

export const fetchFaucetDetails = createAsyncThunk<
  FaucetDetail,
  string,
  { state: RootState }
>("faucets/fetchFaucetDetails", async (faucetUid: string, thunkAPI) => {
  try {
    const response = await axios.post(
      `https://3c379020-cf73-4412-8fc0-afb38993ffbd.mock.pstmn.io/v1/faucet_info?faucet_uid=${faucetUid}`,
      //postman mock api暫時沒辦法用
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate", // 禁用緩存
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    } else {
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
});

const faucetsDetailsSlice = createSlice({
  name: "faucetDetails",
  initialState: initialFaucetDetailsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaucetDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFaucetDetails.fulfilled, (state, action) => {
        state.faucetDetail = action.payload;
        state.loading = false;
      })
      .addCase(fetchFaucetDetails.rejected, (state, action) => {
        state.error = action.error.message || "Error fetching faucet details";
        state.loading = false;
      });
  },
});

export default faucetsDetailsSlice.reducer;
