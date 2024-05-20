"use client";
import React from "react";
import { useState, useEffect } from "react";
import ControlButton from "./components/control_button";
import Slider from "./components/slider";
import DropdownButton from "./components/dropdown_button";
import InputButton from "./components/input_button";
import Button from "./components/button";
import { useFaucetSetting } from "./service/faucet_control_segment_hook";
import {
  saveFaucetSettings,
  resetFaucetSettings,
} from "./service/faucet_control_segment_hook";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";
import { setNotification } from "@/app/redux/app/app";
import { useDispatch } from "react-redux";
import { createApiClient } from "@/utils/apiClient";
import { useLanguage } from "@/utils/loadLanguage";
import useLang from "@/app/component/useLang";
async function fetchSelfAPI() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_SELFLIST_API;
    const postApiClient = createApiClient("post", apiUrl);

    const payload = {};
    const response = await postApiClient(apiUrl, payload);

    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response || error.message);
    return null;
  }
}
const waterShutoffDelayOptions = [
  { label: "1sec", value: "1" },
  { label: "10sec", value: "10" },
  { label: "15sec", value: "15" },
  { label: "30sec", value: "30" },
];

const flowRateOptions = [
  { label: "0.5GPM", value: "0.5" },
  { label: "10GPM", value: "10" },
  { label: "15GPM", value: "15" },
  { label: "30GPM", value: "30" },
];

const solenoidActivationDurationOptions = [
  { label: "10ms", value: "10" },
  { label: "15ms", value: "15" },
  { label: "20ms", value: "20" },
  { label: "25ms", value: "25" },
  { label: "30ms", value: "30" },
];

const maxIRWaterCheckDurationOptions = [
  { label: "15sec", value: "15" },
  { label: "30sec", value: "30" },
  { label: "45sec", value: "45" },
  { label: "60sec", value: "60" },
  { label: "75sec", value: "75" },
  { label: "90sec", value: "90" },
  { label: "105sec", value: "105" },
  { label: "120sec", value: "120" },
];

const auto1secStartStopSwitchOptions = [
  { label: "ON", value: "ON" },
  { label: "OFF", value: "OFF" },
];

const carbonCreditReductionOptions = [
  { label: "1kg", value: "1" },
  { label: "10kg", value: "10" },
  { label: "15kg", value: "15" },
  { label: "30kg", value: "30" },
];

const energySavingModeOptions = [
  { label: "ON", value: "ON" },
  { label: "OFF", value: "OFF" },
];

const autoFlushing12hrOptions = [
  { label: "ON", value: "ON" },
  { label: "OFF", value: "OFF" },
];

const irSensingTestOptions = [
  { label: "ON", value: "ON" },
  { label: "OFF", value: "OFF" },
];

const energySavingValueOptions = [
  { label: "10 mins", value: "10" },
  { label: "20 mins", value: "20" },
  { label: "30 mins", value: "30" },
];
type Option = {
  label: string;
  value: string;
  selected?: boolean;
};

type OptionsMap = {
  [key: string]: Option[];
  waterShutoffDelay: Option[];
  flowRate: Option[];
  solenoidActivationDuration: Option[];
  maxIRWaterCheckDuration: Option[];
  auto1secStartStopSwitch: Option[];
  carbonCreditReduction: Option[];
  energySavingMode: Option[];
  autoFlushing12hr: Option[];
  irSensingTest: Option[];
  energySavingValue: Option[];
};

function createDropdownOptions(
  details: any,
  optionsMap: OptionsMap
): OptionsMap {
  const updatedOptions: OptionsMap = {
    waterShutoffDelay: [],
    flowRate: [],
    solenoidActivationDuration: [],
    maxIRWaterCheckDuration: [],
    auto1secStartStopSwitch: [],
    carbonCreditReduction: [],
    energySavingMode: [],
    autoFlushing12hr: [],
    irSensingTest: [],
    energySavingValue: [],
  };

  if (!details || !details.faucet_ctrl) {
    return optionsMap;
  }

  const controlDetails = details.faucet_ctrl;

  Object.keys(optionsMap).forEach((key) => {
    const controlValue = controlDetails[key] ?? "";
    updatedOptions[key] = optionsMap[key].map((option) => ({
      ...option,
      selected: option.value === controlValue,
    }));
  });

  return updatedOptions;
}
export default function Faucet_Control_Segment({ location }) {
  const dispatch = useDispatch();
  const faucetuid = useSelector(
    (state: RootState) => state.faucetinfo.faucet_info?.faucet_uid
  );
  const faucet_status = useSelector(
    (state: RootState) => state.faucetinfo.faucet_info?.faucet_status
  );
  const { faucetDetail, loading_detail, error_detail } = useFaucetSetting(
    faucetuid || ""
  );
  const [role, setRole] = useState("");
  const disabledStyle = {
    opacity:
      !faucetuid ||
      faucetuid === "" ||
      faucet_status === "solenoidfault_status" ||
      faucet_status === "errorconnection_status"
        ? 0.5
        : 1,
    pointerEvents:
      !faucetuid ||
      faucetuid === "" ||
      faucet_status === "solenoidfault_status" ||
      faucet_status === "errorconnection_status"
        ? "none"
        : "auto",
  };
  const disabledStyle_role = {
    opacity: role === "manager" ? 1 : 0.5,
    pointerEvents: role === "manager" ? "auto" : "none",
  };

  useEffect(() => {
    loadData();
  }, []);
  const lang = useLang();
  const languageData = useLanguage("faucet_ctrl", lang);
  if (!languageData) {
    return <div>Loading...</div>;
  }
  async function loadData() {
    const response = await fetchSelfAPI();
    setRole(response.role);
  }
  const handleResetClick = () => {
    dispatch(setNotification("回復原廠設定成功"));
    if (faucetuid) {
      resetFaucetSettings(faucetuid).then(() => {});
    } else {
      console.error("No faucet setting to save.");
    }
  };
  const handleSaveClick = () => {
    const faucetSettings = faucetDetail?.faucet_ctrl;
    dispatch(setNotification("設定已儲存"));
    if (faucetuid && faucetSettings) {
      saveFaucetSettings(faucetuid, faucetSettings).then(() => {});
    } else {
      console.error("No faucet setting to save.");
    }
  };

  if (loading_detail)
    return (
      <div className="flex justify-center">
        <span className="loading loading-bars loading-lg mt-24"></span>
      </div>
    );
  if (error_detail)
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error! Task failed successfully.</span>
      </div>
    );
  let updatedOptionsMap = {
    waterShutoffDelay: waterShutoffDelayOptions,
    flowRate: flowRateOptions,
    solenoidActivationDuration: solenoidActivationDurationOptions,
    maxIRWaterCheckDuration: maxIRWaterCheckDurationOptions,
    auto1secStartStopSwitch: auto1secStartStopSwitchOptions,
    carbonCreditReduction: carbonCreditReductionOptions,
    energySavingMode: energySavingModeOptions,
    autoFlushing12hr: autoFlushing12hrOptions,
    irSensingTest: irSensingTestOptions,
    energySavingValue: energySavingValueOptions,
  };

  if (faucetDetail) {
    updatedOptionsMap = createDropdownOptions(faucetDetail, updatedOptionsMap);
  }

  const infraredDistanceValue = faucetDetail
    ? Number(faucetDetail?.faucet_ctrl.infraredDistance)
    : 10;

  return (
    <div
      className="flex justify-center items-center mt-2 justify-around"
      style={disabledStyle}
    >
      <div className="flex flex-wrap bg-white w-[85%] h-1/8">
        <div className="w-full sm:w-1/3 sm:flex-none p-4">
          <Slider
            min={10}
            max={25}
            label={languageData.infrared_distance_adjustment}
            val={infraredDistanceValue}
            settingKey="infraredDistance"
          />
          <ControlButton
            options={updatedOptionsMap.waterShutoffDelay}
            segmentTitle={languageData.water_stopping_time}
            settingKey="waterShutoffDelay"
          />
          <ControlButton
            options={updatedOptionsMap.flowRate}
            segmentTitle={languageData.water_wave_function}
            settingKey="flowRate"
            style={disabledStyle_role}
          />
          <ControlButton
            options={updatedOptionsMap.solenoidActivationDuration}
            segmentTitle={languageData.solenoid_valve_start_time}
            settingKey="solenoidActivationDuration"
            style={disabledStyle_role}
          />
        </div>
        <div className="w-full sm:w-2/3 sm:flex-none  p-4 flex flex-col">
          <div className="flex-1  p-4">
            <ControlButton
              options={updatedOptionsMap.maxIRWaterCheckDuration}
              segmentTitle={languageData.max_induce_confirm_time}
              settingKey="maxIRWaterCheckDuration"
            />
          </div>
          <div className="flex-3  p-4 flex w-full ">
            <div className="flex flex-grow-2  p-2 flex-col">
              <ControlButton
                options={updatedOptionsMap.auto1secStartStopSwitch}
                segmentTitle={languageData.start_1s_automatic_switch}
                settingKey="auto1secStartStopSwitch"
              />
              <ControlButton
                options={updatedOptionsMap.carbonCreditReduction}
                segmentTitle={languageData.start_1s_automatic_switch}
                settingKey="carbonCreditReduction"
              />
              <div className="flex justify-start items-center">
                <ControlButton
                  options={updatedOptionsMap.energySavingMode}
                  segmentTitle={languageData.power_saving_mode}
                  settingKey="energySavingMode"
                  style={disabledStyle_role}
                />
                <div className="flex flex-col h-full">
                  <div className="flex-1 "></div>
                  <div className="flex-1 flex  ">
                    <DropdownButton
                      options={updatedOptionsMap.energySavingValue}
                      settingKey="energySavingValue"
                      style={disabledStyle_role}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-grow-2  p-2 flex-col">
              <ControlButton
                options={updatedOptionsMap.autoFlushing12hr}
                segmentTitle={languageData.twelve_hours_automatic_flushing_mdoe}
                settingKey="autoFlushing12hr"
              />
              <ControlButton
                options={updatedOptionsMap.irSensingTest}
                segmentTitle={languageData.infrared_induction_test}
                settingKey="irSensingTest"
              />
              <InputButton
                label={languageData.maintain}
                placeholder={languageData.input_comment}
                buttonText={languageData.add}
              />
            </div>
            <div className="flex flex-grow-1 p-2 flex-col h-full justify-end items-start ">
              <Button
                label={languageData.restore_original_setting}
                onClick={handleResetClick}
              />
              <Button label={languageData.save} onClick={handleSaveClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
