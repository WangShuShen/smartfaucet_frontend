import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";
import { createApiClient } from "@/utils/apiClient";
export type Faucet_Info = {
  faucet_uid: string;
  faucet_status:
    | "electromagneticvalve_status"
    | "normalconnection_status"
    | "humanfixed_status"
    | "errorconnection_status";
  faucet_hierarchy: string;
  specification: string;
};

type Faucet_Info_State = {
  faucet_info: Faucet_Info | null;
  loading_info: boolean;
  error_info: string | null;
};

const initialState: Faucet_Info_State = {
  faucet_info: null,
  loading_info: false,
  error_info: null,
};

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
    const postApiClient = createApiClient("post", apiUrl);

    const payload = { faucet_uid: faucetUid };
    const response = await postApiClient(apiUrl, payload);

    const faucetInfo: Faucet_Info = {
      faucet_uid: response.data.faucet_uid,
      faucet_status: response.data.faucet_status,
      faucet_hierarchy: response.data.faucet_hierarchy,
      specification: response.data.specification,
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

const faucetsInfoSlice = createSlice({
  name: "faucetinfo",
  initialState,
  reducers: {
    setFaucetSpecification: (state, action) => {
      if (state.faucet_info) {
        state.faucet_info.specification = action.payload;
      }
    },
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
export const { setFaucetSpecification } = faucetsInfoSlice.actions;
export default faucetsInfoSlice.reducer;
