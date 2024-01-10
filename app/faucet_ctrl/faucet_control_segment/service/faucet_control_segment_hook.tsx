// faucetinfo_hooks.ts
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

  useEffect(() => {
    if (
      faucetUid &&
      !(typeof faucetUid === "object" && Object.keys(faucetUid).length === 0)
    ) {
      dispatch(fetchFaucetSetting(faucetUid));
    }
  }, [dispatch, faucetUid]);

  return { faucetDetail, loading_detail, error_detail };
};

// Function to save faucet settings
export const saveFaucetSettings = async (faucetUid: string, settings: any) => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_FETCH_SAVE_FAUCET_SETTING_API;
    // Ensure the API URL is defined
    if (!API_BASE_URL) {
      console.error("API base URL is not defined.");
      return;
    }
    const formattedSettings = {
      specification: settings.specification, // Assuming this comes from somewhere in your state
      infrared_distance: settings.infraredDistance,
      solenoid_activation_duration: settings.solenoidActivationDuration,
      water_shutoff_delay: settings.waterShutoffDelay,
      max_water_check_duration: settings.maxIRWaterCheckDuration,
      flow_rate: settings.flowRate,
      auto_flushing12hr: settings.autoFlushing12hr,
      auto1sec_start_stop_switch: settings.auto1secStartStopSwitch,
      energy_saving_mode:
        settings.energySavingMode + " " + settings.energySavingValue,
      carbon_credit_reduction: settings.carbonCreditReduction,
      auto_fault_report: settings.autoFaultReport, // Assume you have this in your state
      firmware_update: settings.firmwareUpdate,
      infrared_test: settings.irSensingTest,
    };
    const response = await axios.post(API_BASE_URL, {
      faucet_uid: faucetUid,
      ...formattedSettings,
    });
  } catch (error) {
    console.error("Error saving faucet settings:", error);
    // Handle the error appropriately
  }
};
