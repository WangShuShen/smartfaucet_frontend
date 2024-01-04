import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

// 定義 Faucet 類型
export type Faucet_Info = {
  faucet_uid: string;
  faucet_status:
    | "electromagneticvalve_status"
    | "normalconnection_status"
    | "humanfixed_status"
    | "errorconnection_status";
  faucet_hierarchy: string;
};

// 定義 State 類型
type Faucet_Info_State = {
  faucet_info: Faucet_Info | null; // 改為單個 Faucet_Info 物件或 null
  loading_info: boolean;
  error_info: string | null;
};

// 初始狀態
const initialState: Faucet_Info_State = {
  faucet_info: null, // 初始為 null
  loading_info: false,
  error_info: null,
};

// 非同步 thunk 動作，用於獲取蓮蓬頭資料
export const fetchFaucetInfo = createAsyncThunk<
  Faucet_Info,
  string,
  { state: RootState }
>("faucets/fetchFaucetInfo", async (faucetUid: string, thunkAPI) => {
  if (!faucetUid) {
    return thunkAPI.rejectWithValue("faucetUid is null or empty");
  }
  try {
    const apiUrl = process.env.NEXT_PUBLIC_FACUETINFO_API as string;
    const response = await axios.post(apiUrl, { faucet_uid: faucetUid });

    const faucetInfo: Faucet_Info = {
      faucet_uid: response.data.faucet_uid,
      faucet_status: response.data.faucet_status,
      faucet_hierarchy: response.data.faucet_hierarchy,
    };

    return faucetInfo;
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

// 建立 slice
const faucetsInfoSlice = createSlice({
  name: "faucetinfo",
  initialState,
  reducers: {
    // 這裡可以加入您自定義的 reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaucetInfo.pending, (state) => {
        state.loading_info = true;
      })
      .addCase(fetchFaucetInfo.fulfilled, (state, action) => {
        state.faucet_info = action.payload;
        state.loading_info = false;
      })
      .addCase(fetchFaucetInfo.rejected, (state, action) => {
        state.error_info = action.error.message || "Error fetching faucets";
        state.loading_info = false;
      });
  },
});

export default faucetsInfoSlice.reducer;
