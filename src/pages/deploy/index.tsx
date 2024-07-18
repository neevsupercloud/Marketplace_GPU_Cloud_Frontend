import {useStore} from "../../store";
import {Button, Checkbox, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {BiChevronDown, BiHdd} from "react-icons/bi";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CustomizeDeploymentModal from "../../components/modals/customize-deployment-modal.tsx";
import {getIcon, OsOptions} from "../../data.ts";
// import {BsNvidia} from "react-icons/bs";

export default function Deploy() {
  const {selectedGpu: gpu, updateNewVm, newVm} = useStore();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!gpu) {
      console.log("null selection");
      navigate(-1);
    }
  }, [gpu]);

  if (!gpu) return <p>loading...</p>;

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 gap-x-4 p-4 shadow rounded-lg bg-white w-full">
        <div className="flex flex-col gap-y-4 h-full">
          {/* <p className="font-bold text-xl">{gpu.planName}</p> */}
          <div className="flex items-center gap-x-6">
            {/* <p>{gpu.vCpuCount} vCPU</p> */}
            {/* <p>{gpu.ramInGb}GB RAM</p> */}
            {/* {gpu.gpuEnabled && (
              <div className="flex items-center gap-x-2">
                <p className="text-green-500 text-xl"><BsNvidia/></p>
                <p>{gpu.gpu}</p>
              </div>
            )} */}
          </div>
          <Button
            leftIcon={<BiHdd/>}
            colorScheme="brand"
            variant="outline"
            className="w-fit"
            onClick={() => setShowModal(true)}
          >
            Add Volumes
          </Button>
          <p className="font-bold text-brand bg-brand/[.1] px-4 py-2 rounded-lg">
            <div className="flex items-center justify-between">
              <p>On-Demand (Non-Interruptible)</p>
              {/* <p className="font-bold text-lg">₹{gpu.hourlyPriceINR}/hr</p> */}
            </div>
          </p>
          <p className="text-gray-400">Pay as you go, with costs based on actual usage time.</p>
          <Button
            colorScheme="brand"
            variant="outline"
            className="w-full"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
        <div className="flex flex-col gap-y-4">
          <Menu>
            <MenuButton
              as={Button}
              color="#2a69ac"
              rightIcon={<BiChevronDown/>}
            >
              {newVm.distro}
            </MenuButton>
            <MenuList w="730px">
              {OsOptions.map(os => (
                <MenuItem key={os} onClick={() => updateNewVm({distro: os})}>{os}</MenuItem>
              ))}
            </MenuList>
          </Menu>
          <div
            className="p-4 shadow-md bg-white rounded-lg border border-slate-200 flex justify-between items-center">
            <img src={getIcon(newVm.distro)} alt={newVm.distro} className="w-12"/>
            <div className="text-right flex flex-col h-full gap-y-2">
              <p className="text-xl font-semibold">{newVm.distro}</p>
            </div>
          </div>
          <Checkbox disabled>SSH Terminal Access</Checkbox>
          <Checkbox defaultChecked>Start Jupyter Notebook</Checkbox>
          <Button onClick={() => navigate("/create-vm/summary")} colorScheme="brand" className="w-full">
            Continue
          </Button>
        </div>
      </div>
      {showModal && <CustomizeDeploymentModal onClose={() => setShowModal(false)}/>}
    </div>
  );
}