import {Button} from "@chakra-ui/react";
import {useStore} from "../store";
import {useNavigate} from "react-router-dom";
import {BsNvidia} from "react-icons/bs";

interface CustomCardProps {
  planName: string;
  os: string;
  vCpuCount: number;
  ramInGb: number;
  storageInGb: number;
  monthlyPriceINR: number;
  hourlyPriceINR: number;
  enabled: boolean;
  gpuEnabled: boolean;
  gpu: string;
  gpuCount: number;
}

export default function CustomCard(props: CustomCardProps) {
  const {setSelectedGpu} = useStore();
  const navigate = useNavigate();

  function select() {
    setSelectedGpu(props);
    navigate("/create-vm/configure");
  }

  return (
    <div className="p-4 rounded-lg shadow bg-white h-full flex flex-col justify-between gap-y-2">
      <p className="font-bold text-brand bg-brand/[.1] p-2 rounded-lg">{props.planName}</p>
      <div className="flex items-center justify-between w-full">
        <p className="text-sm text-gray-500">{props.vCpuCount} vCPU</p>
        <p className="text-sm text-gray-500">{props.ramInGb} GB RAM</p>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-sm text-gray-500">{props.storageInGb} GB Storage</p>
        {props.gpuEnabled && (
          <div className="flex items-center gap-x-2">
            <p className="text-xl text-green-500"><BsNvidia /></p>
            <p className="">{props.gpu}</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between w-full text-black">
        <p>On-Demand</p>
        <p>₹{props.hourlyPriceINR}/hr</p>
      </div>
      <Button
        onClick={select}
        variant="outline"
        colorScheme="brand"
        isDisabled={!props.enabled}
      >
        Deploy
      </Button>
    </div>
  );
}