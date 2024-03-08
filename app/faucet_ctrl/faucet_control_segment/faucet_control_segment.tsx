"use client";
import React from "react";
import { useState } from "react";
import ControlButton from "./components/control_button";
import Slider from "./components/slider";
import DropdownButton from "./components/dropdown_button";
import InputButton from "./components/input_button";
import Button from "./components/button";
import { useFaucetSetting } from "./service/faucet_control_segment_hook";
import { saveFaucetSettings } from "./service/faucet_control_segment_hook";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";
import { setNotification } from "@/app/redux/app/app";
import { useDispatch } from "react-redux";
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
export default function Faucet_Control_Segment() {
  const dispatch = useDispatch();
  const faucetuid = useSelector(
    (state: RootState) => state.faucetinfo.faucet_info?.faucet_uid
  );
  const faucet_status = useSelector(
    (state: RootState) => state.faucetinfo.faucet_info?.faucet_status
  );
  const disabledStyle = {
    opacity:
      faucet_status === "solenoidfault_status" ||
      faucet_status === "errorconnection_status"
        ? 0.5
        : 1,
    pointerEvents:
      faucet_status === "solenoidfault_status" ||
      faucet_status === "errorconnection_status"
        ? "none"
        : "auto",
  };

  const [savebuttonisOpen, setsavebuttonIsOpen] = useState(false);
  const handleClick = () => {
    console.log("OnClick!");
  };
  const handleSaveClick = () => {
    const faucetSettings = faucetDetail?.faucet_ctrl;
    dispatch(setNotification("設定已儲存"));
    if (faucetuid && faucetSettings) {
      setsavebuttonIsOpen(!savebuttonisOpen);
      saveFaucetSettings(faucetuid, faucetSettings).then(() => {});
    } else {
      console.error("No faucet setting to save.");
    }
  };
  const { faucetDetail, loading_detail, error_detail } = useFaucetSetting(
    faucetuid || ""
  );
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
            label="紅外線距離調整(公分)"
            val={infraredDistanceValue}
            settingKey="infraredDistance"
          />
          <ControlButton
            options={updatedOptionsMap.waterShutoffDelay}
            segmentTitle="離開紅外線偵測後止水時間"
            settingKey="waterShutoffDelay"
          />
          <ControlButton
            options={updatedOptionsMap.flowRate}
            segmentTitle="選擇水波器功能"
            settingKey="flowRate"
          />
          <ControlButton
            options={updatedOptionsMap.solenoidActivationDuration}
            segmentTitle="電磁閥啟動時間"
            settingKey="solenoidActivationDuration"
          />
        </div>
        <div className="w-full sm:w-2/3 sm:flex-none  p-4 flex flex-col">
          <div className="flex-1  p-4">
            <ControlButton
              options={updatedOptionsMap.maxIRWaterCheckDuration}
              segmentTitle="最常感應水確認時間"
              settingKey="maxIRWaterCheckDuration"
            />
          </div>
          <div className="flex-3  p-4 flex w-full ">
            <div className="flex flex-grow-2  p-2 flex-col">
              <ControlButton
                options={updatedOptionsMap.auto1secStartStopSwitch}
                segmentTitle="啟動1S/S自動開關"
                settingKey="auto1secStartStopSwitch"
              />
              <ControlButton
                options={updatedOptionsMap.carbonCreditReduction}
                segmentTitle="減少多少碳權"
                settingKey="carbonCreditReduction"
              />
              <div className="flex justify-start items-center">
                <ControlButton
                  options={updatedOptionsMap.energySavingMode}
                  segmentTitle="進入省電時間"
                  settingKey="energySavingMode"
                />
                <div className="flex flex-col h-full">
                  <div className="flex-1 "></div>
                  <div className="flex-1 flex  ">
                    <DropdownButton
                      options={updatedOptionsMap.energySavingValue}
                      settingKey="energySavingValue"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-grow-2  p-2 flex-col">
              <ControlButton
                options={updatedOptionsMap.autoFlushing12hr}
                segmentTitle="12小時自動沖水時間"
                settingKey="autoFlushing12hr"
              />
              <ControlButton
                options={updatedOptionsMap.irSensingTest}
                segmentTitle="紅外線感應測試"
                settingKey="irSensingTest"
              />
              <InputButton
                label="維護明細"
                placeholder="輸入內容"
                buttonText="新增"
              />
            </div>
            <div className="flex flex-grow-1 p-2 flex-col h-full justify-end items-start ">
              <Button label="回復原廠設定" onClick={handleClick} />
              <Button label="存檔" onClick={handleSaveClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
