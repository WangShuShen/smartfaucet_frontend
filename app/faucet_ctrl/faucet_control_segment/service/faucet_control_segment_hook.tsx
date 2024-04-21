import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFaucetSetting } from "@/app/redux/faucet_ctrl/faucet_control";
import type { RootState, AppDispatch } from "@/app/redux/store";
import axios from "axios";
export const useFaucetSetting = (faucetUid: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { faucetDetail, loading_detail, error_detail } = useSelector(
    (state: RootState) => state.faucetSetting
  );
  const faucetuid = useSelector(
    (state: RootState) => state.faucetinfo.faucet_info?.faucet_uid
  );
  useEffect(() => {
    if (
      faucetuid &&
      !(typeof faucetuid === "object" && Object.keys(faucetuid).length === 0)
    ) {
      dispatch(fetchFaucetSetting(faucetuid));
    }
  }, [dispatch, faucetuid]);

  return { faucetDetail, loading_detail, error_detail };
};

export const saveFaucetSettings = async (faucetUid: string, settings: any) => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_FETCH_SAVE_FAUCET_SETTING_API;

    if (!API_BASE_URL) {
      console.error("API base URL is not defined.");
      return;
    }
    const formattedSettings = {
      specification: settings.specification,
      infrared_distance: settings.infraredDistance,
      solenoid_activation_duration: settings.solenoidActivationDuration,
      water_shutoff_delay: settings.waterShutoffDelay,
      max_water_check_duration: settings.maxIRWaterCheckDuration,
      flow_rate: settings.flowRate,
      auto_flushing12hr: settings.autoFlushing12hr,
      auto1sec_start_stop_switch: settings.auto1secStartStopSwitch,
      energy_saving_mode: settings.energySavingMode,
      energy_saving_time: settings.energySavingValue,
      carbon_credit_reduction: settings.carbonCreditReduction,
      auto_fault_report: settings.autoFaultReport,
      firmware_update: settings.firmwareUpdate,
      infrared_test: settings.irSensingTest,
    };
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      API_BASE_URL,
      {
        faucet_uid: faucetUid,
        ...formattedSettings,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error saving faucet settings:", error);
  }
};
