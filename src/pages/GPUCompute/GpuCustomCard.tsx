import React from 'react';
import { useStore } from '../../store';

interface GpuCustomCardProps {
  planName: string;
  os: string;
  vCpuCount: number;
  ramInGb: number;
  storageInGb: number;
  monthlyPriceUSD: number;
  hourlyPriceUSD: number;
  enabled: boolean;
  gpuEnabled: boolean;
  gpu: string;
  gpuCount: number;
  isChecked: boolean;
}

const Heading = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  lineHeight: 1.5,
  fontWeight: 500,
  fontSize: '16px',
  color: 'rgb(63, 81, 117)',
};

const priceStyle = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  lineHeight: 1.5,
  fontWeight: 500,
  fontSize: '15px',
  color: 'rgb(63, 81, 117)',
};

const configStyle = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  lineHeight: 1.5,
  fontWeight: 500,
  fontSize: '13px',
  color: 'rgb(63, 81, 117)',
};

const GpuCustomCard: React.FC<GpuCustomCardProps> = (props) => {
  const { gpuName } = useStore();
  const isDisabled = !props.enabled || !props.gpuEnabled;

  return (
    <div
      className={`p-4 rounded-[8px] shadow bg-white flex flex-col border-2 ${props.isChecked && !isDisabled ? "border-[#673AB7]" : "border-[#0D1115]/10"} justify-between gap-y-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200'}`}
    >
      <div className="flex justify-between items-center">
        <p className={`font-[600] text-[18px] ${props.isChecked && !isDisabled ? "text-[#1952CE]" : "text-[#0D1115]"} font-Inter`} style={Heading}>
          {props.planName}
        </p>
        <p className={`font-[600] text-[18px] ${props.isChecked && !isDisabled ? "text-[#1952CE]" : "text-[#0D1115]"} font-Inter`} style={priceStyle}>
          ${props.hourlyPriceUSD.toFixed(2)} / hr
        </p>
      </div>
      <div className="flex items-center justify-between w-full border border-[#0D1115]/10"></div>
      <div className="flex items-center justify-between w-full text-black" style={configStyle}>
        <p className="font-[400] text-[14px] font-Inter text-[#0D1115]" style={configStyle}>{props.storageInGb}GB Storage</p>
        <p className="font-[400] text-[14px] font-Inter text-gray-500" style={{ fontSize: "12px" }}>
          {gpuName === 'select GPU' ? '' : gpuName}
        </p>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="font-[400] text-[14px] font-Inter text-[#0D1115]" style={configStyle}>
          {props.ramInGb}GB RAM - {props.vCpuCount} vCPUs
        </p>
        <div className="flex items-center gap-x-2">
          <p className={`font-[500] text-[10px] font-Inter ${props.gpuEnabled ? "text-green-500" : "text-red-500"}`}>
            {props.gpuEnabled ? "Available" : "Unavailable"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GpuCustomCard;
