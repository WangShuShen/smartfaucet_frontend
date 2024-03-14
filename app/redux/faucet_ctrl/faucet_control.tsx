import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

type FaucetControl = {
  waterShutoffDelay: string;
  flowRate: string;
  solenoidActivationDuration: string;
  maxIRWaterCheckDuration: string;
  auto1secStartStopSwitch: string;
  carbonCreditReduction: string;
  energySavingMode: string;
  autoFlushing12hr: string;
  irSensingTest: string;
  firmwareUpdate: string;
  infraredDistance: string;
  energySavingValue: string;
};

type FaucetDetail = {
  faucet_ctrl: FaucetControl;
};

type FaucetDetailsState = {
  faucetDetail: FaucetDetail | null;
  loading_detail: boolean;
  error_detail: string | null;
};

const initialFaucetDetailsState: FaucetDetailsState = {
  faucetDetail: null,
  loading_detail: false,
  error_detail: null,
};

export const fetchFaucetSetting = createAsyncThunk<
  FaucetDetail,
  string,
  { state: RootState }
>("faucets/fetchFaucetDetails", async (faucetUid: string, thunkAPI) => {
  if (!faucetUid) {
    return thunkAPI.rejectWithValue("faucetUid is null or empty");
  }
  try {
    const apiUrl = process.env.NEXT_PUBLIC_FETCH_FAUCET_SETTING_API as string;
    const response = await axios.post(apiUrl, {
      faucet_uid: faucetUid,
    });
    let energySavingMode = "";
    let energySavingValue = "";
    if (response.data.energy_saving_mode) {
      const modeValue = response.data.energy_saving_mode.split(" ");
      if (modeValue.length > 0) {
        energySavingMode = modeValue[0]; 
        if (modeValue.length > 1) {
          energySavingValue = modeValue[1]; 
        }
      }
    }
    const faucetControlData: FaucetControl = {
      waterShutoffDelay: response.data.water_shutoff_delay,
      flowRate: response.data.flow_rate,
      solenoidActivationDuration: response.data.solenoid_activation_duration,
      maxIRWaterCheckDuration: response.data.max_water_check_duration,
      auto1secStartStopSwitch: response.data.auto1sec_start_stop_switch,
      carbonCreditReduction: response.data.carbon_credit_reduction,
      autoFlushing12hr: response.data.auto_flushing12hr,
      irSensingTest: response.data.infrared_test,
      firmwareUpdate: response.data.firmware_update,
      infraredDistance: response.data.infrared_distance,
      energySavingMode, 
      energySavingValue,
    };
    return { faucet_ctrl: faucetControlData };
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

const faucetSettingSlice = createSlice({
  name: "faucetSetting",
  initialState: initialFaucetDetailsState,
  reducers: {
    updateFaucetSetting: (state, action) => {
      const { key, value } = action.payload;
      if (key) {
        state.faucetDetail.faucet_ctrl[key] = value;
      } else {
        console.warn(
          "Tried to update faucetSetting with undefined key",
          action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaucetSetting.pending, (state) => {
        state.loading_detail = true;
      })
      .addCase(fetchFaucetSetting.fulfilled, (state, action) => {
        state.faucetDetail = action.payload;
        state.loading_detail = false;
      })
      .addCase(fetchFaucetSetting.rejected, (state, action) => {
        state.error_detail =
          action.error.message || "Error fetching faucet details";
        state.loading_detail = false;
      });
  },
});
export const { updateFaucetSetting } = faucetSettingSlice.actions;
export default faucetSettingSlice.reducer;
