"use client";
import React from 'react';
import ControlButton from './components/control_button';
import Slider from './components/slider';
import DropdownButton from './components/dropdown_button';
import InputButton from './components/input_button';
import Button from './components/button';

const waterShutoffDelayOptions = [
  { label: '1sec', value: '1' },
  { label: '10sec', value: '10' },
  { label: '15sec', value: '15' },
  { label: '30sec', value: '30' },
];

const flowRateOptions = [
  { label: '0.5GPM', value: '0.5' },
  { label: '10GPM', value: '10' },
  { label: '15GPM', value: '15' },
  { label: '30GPM', value: '30' },
];

const solenoidActivationDurationOptions = [
  { label: '10ms', value: '10' },
  { label: '15ms', value: '15' },
  { label: '20ms', value: '20' },
  { label: '25ms', value: '25' },
  { label: '30ms', value: '30' },
];


const maxIRWaterCheckDurationOptions = [
  { label: '15sec', value: '15' },
  { label: '30sec', value: '30' },
  { label: '45sec', value: '45' },
  { label: '60sec', value: '60' },
  { label: '75sec', value: '75' },
  { label: '90sec', value: '90' },
  { label: '105sec', value: '105' },
  { label: '120sec', value: '120' },
];

const auto1secStartStopSwitchOptions = [
  { label: 'ON', value: 'on' },
  { label: 'OFF', value: 'off' },
];


const carbonCreditReductionOptions = [
  { label: '1kg', value: '1' },
  { label: '10kg', value: '10' },
  { label: '15kg', value: '15' },
  { label: '30kg', value: '30' },
];


const energySavingModeOptions = [
  { label: 'ON', value: 'on' },
  { label: 'OFF', value: 'off' },
];

const autoFlushing12hrOptions = [
  { label: 'ON', value: 'on' },
  { label: 'OFF', value: 'off' },
];

const irSensingDurationOptions = [
  { label: 'ON', value: 'on' },
  { label: 'OFF', value: 'off' },
];

const dropdownOptions = [
  { label: '10 mins', value: '10' },
  { label: '20 mins', value: '20' },
  { label: '30 mins', value: '30' },
];

export default function Faucet_Control_Segment() {
  const handleClick = () => {
    console.log('按鈕被點擊');
  };
  return (
    <div className="container mx-auto flex justify-center items-center w-full min-h-screen">
      <div className="flex flex-wrap w-[90%] bg-white">
        <div className="w-full sm:w-1/3 sm:flex-none p-4">
          <Slider min={10} max={25} label="紅外線距離調整(公分)" />
          <ControlButton options={waterShutoffDelayOptions} segmentTitle="離開紅外線偵測後止水時間" />
          <ControlButton options={flowRateOptions} segmentTitle="選擇水波器功能" />
          <ControlButton options={solenoidActivationDurationOptions} segmentTitle="電磁閥啟動時間" />
        </div>
        <div className="w-full sm:w-2/3 sm:flex-none  p-4 flex flex-col">
          <div className="flex-1  p-4">
            <ControlButton options={maxIRWaterCheckDurationOptions} segmentTitle="最常感應水確認時間" />
          </div>
          <div className="flex-3  p-4 flex w-full ">
            <div className="flex flex-grow-2  p-2 flex-col">
              <ControlButton options={auto1secStartStopSwitchOptions} segmentTitle="啟動1S/S自動開關" />
              <ControlButton options={carbonCreditReductionOptions} segmentTitle="減少多少碳權" />
              <div className="flex justify-start items-center">
                <ControlButton options={energySavingModeOptions} segmentTitle="進入省電時間" />
                <div className="flex flex-col h-full">
                  <div className="flex-1 "></div>
                  <div className="flex-1 flex  ">
                    <DropdownButton options={dropdownOptions} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-grow-2  p-2 flex-col">
              <ControlButton options={autoFlushing12hrOptions} segmentTitle="12小時自動沖水時間" />
              <ControlButton options={irSensingDurationOptions} segmentTitle="紅外線感應時間" />
              <InputButton label="維護明細" placeholder="輸入內容" buttonText="新增" />
            </div>
            <div className="flex flex-grow-1 p-2 flex-col h-full justify-end items-start ">
              <Button label="回復原廠設定" onClick={handleClick} /> 
              <Button label="存檔" onClick={handleClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
