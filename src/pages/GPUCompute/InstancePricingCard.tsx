import React from 'react';
import { BiRupee } from "react-icons/bi";

interface InstancePricingCardProps {
  isChecked: boolean;
  savingPercentage: number;
  planName: string;
  price: number;
  details: string;
}

const InstancePricingCard: React.FC<InstancePricingCardProps> = (props) => {
  return (
    <div
      className={`p-4 border-2 ${!props.isChecked ? "border-[#673AB7]/10" : "border-[#673AB7]"} rounded-[4px] mx-2 relative cursor-pointer`}
      style={{ marginTop: "20px", backgroundColor: "white", borderRadius: "10px" }}
    >
      <div
        className={`font-Inter font-[600] text-[16px] ${props.isChecked ? "text-[#673AB7]" : "text-[#673AB7]"} `}
        style={{ fontSize: "15px" }}
      >
        {props.planName}
        <br />
        <span className="text-[18px]">
          <BiRupee className="inline" /> {props.price}/hr.
        </span>
      </div>
      <div className="my-1 font-Inter font-[400] text-[16px] text-[#0D1115]/50" style={{ fontSize: "12px" }}>
        {props.details}
      </div>
      {props.savingPercentage !== 0 ? (
        <div className="absolute -top-3 right-5 bg-[#EC7B29] font-Inter font-[400] text-[12px] rounded-[4px] p-1 px-2 text-white">
          {props.savingPercentage}% Saving
        </div>
      ) : null}
    </div>
  );
};

export default InstancePricingCard;
