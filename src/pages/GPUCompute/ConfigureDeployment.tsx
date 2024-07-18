import React, { useState, useEffect } from 'react';
import { Button, useDisclosure, Select } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import EditTemplateModal from './EditTemplateModal';
import ChangeTemplateModal from './Template-card';
import InstancePricingCard from './InstancePricingCard';
import useApi from '../../store/useApi';
import { useStore } from '../../store';
// import { CreateVmPayload } from '../../types';
// import { randomName } from '../../data';
import './FilterGpusbyVram.css';
// import Spinner from '../../components/Spinner-loader';
import ubuntu from "../../asset/icons8-ubuntu-48.png";

interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  created_at: string;
  locations: string[];
  icon?: string;
}

interface SshKey {
  keyID: number;
  name: string;
  key: string;
}

interface ConfigureDeploymentProps {
  // isCpu: boolean;
  selectedGpu: any;
  selectedGpuName: string;
  selectedDiskId: string;
  selectedLocation: string;
}

const ConfigureDeployment: React.FC<ConfigureDeploymentProps> = (props) => {
  const {getSshKeys } = useApi();
  const {
    currOrg,
    currProject,
    InstanceName,
    ssh_pub_key,
    operation_id,
    selectedGpu,
    image,
    setInstanceName,
    setSshPubKey,
    setOperationId
  } = useStore();
  const navigate = useNavigate();
  const { isOpen: isEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isChangeOpen, onOpen: onChangeOpen, onClose: onChangeClose } = useDisclosure();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [sshKeys, setSshKeys] = useState<SshKey[]>([]);
  const [instancePricingCardData, setInstancePricingCardData] = useState([
    {
      isChecked: true,
      savingPercentage: 0,
      planName: "On Demand",
      price: 3.49,
      details: "Pay as you go, with costs based on actual usage time."
    },
    {
      isChecked: false,
      savingPercentage: 0,
      planName: "100% Upfront Plan",
      price: 5.49,
      details: "Pay as you go, with costs based on actual usage time."
    },
    {
      isChecked: false,
      savingPercentage: 0,
      planName: "On Demand",
      price: 3.49,
      details: "Pay as you go, with costs based on actual usage time."
    },
    {
      isChecked: false,
      savingPercentage: 0,
      planName: "100% Upfront Plan",
      price: 3.49,
      details: "Pay as you go, with costs based on actual usage time."
    },
    {
      isChecked: false,
      savingPercentage: 0,
      planName: "100% Upfront Plan",
      price: 3.49,
      details: "Pay as you go, with costs based on actual usage time."
    },
 
  ]);

  useEffect(() => {
    if (currOrg && currProject) {
      getSshKeys()
        .then(keys => {
          setSshKeys(keys);
        })
        .catch(error => {
          console.error('Error fetching SSH keys:', error);
        });
    }
  }, [currOrg, currProject]);

  const deploy = async () => {
    console.log("Deploy function called.");
    // console.log("isCpu:", props.isCpu);
    console.log("selectedGpu:", props.selectedGpu);

    if (!InstanceName) {
      console.log("No Instance Name provided.");
      Swal.fire({
        icon: 'warning',
        title: 'No Instance Name',
        text: 'Please enter an instance name.'
      });
      return;
    }

    if ((!props.selectedGpu || !props.selectedGpu.isChecked)) {
      console.log("No GPU configuration selected.");
      Swal.fire({
        icon: 'warning',
        title: 'No Configuration Selected',
        text: 'Please select a configuration to proceed.'
      }).then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        console.log("Navigation to the top of the page");
      });
      return;
    }

    if (!selectedTemplate) {
      console.log("No template selected.");
      Swal.fire({
        icon: 'warning',
        title: 'No Template Selected',
        text: 'Please select a template to proceed.'
      });
      return;
    }

    if (props.selectedLocation === "Any") {
      console.log("No Location selected.");
      Swal.fire({
        icon: 'warning',
        title: 'Location not Selected',
        text: 'Please select a location to proceed.'
      });
      return;
    }

    if (!ssh_pub_key) {
      console.log("No SSH key selected.");
      Swal.fire({
        icon: 'warning',
        title: 'No SSH Key Selected',
        text: 'Please select an SSH key to proceed.'
      });
      return;
    }

    // Initial payload without disks
    const vmPayload: any = {
      name: InstanceName,
      type: selectedGpu,
      location: props.selectedLocation,
      image: image,
      ssh_public_key: ssh_pub_key,
    };

    // Add disks array only if selectedDiskId is present
    if (props.selectedDiskId) {
      vmPayload.disks = [
        {
          disk_id: props.selectedDiskId, // dynamically selected disk id
          attachment_type: "data", // fixed value
          mode: "read-write" // fixed value
        }
      ];
    }

    console.log("VM Payload to be sent:", vmPayload);

    try {
      const response = await fetch('https://api.mkinf.io/v0/vms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
        },
        body: JSON.stringify(vmPayload),
      });

      const data = await response.json();
      console.log('VM Created:', data);
      setOperationId(data.operation.operation_id);  // Store the operation_id in the store
      navigate("/gpu-compute/gpu-dashboard");
    } catch (error) {
      console.error('Error creating VM:', error);
    }
  };

  const Heading = {
    marginLeft: "5px",
    marginBottom: "25px",
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    lineHeight: 1.5,
    fontWeight: 700,
    fontSize: '20px',
    color: 'rgb(63, 81, 117)',
  };

  const price_Style = {
    marginLeft: "1px",
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    lineHeight: 1.5,
    fontWeight: 500,
    fontSize: '13px',
    color: 'rgb(63, 81, 117)',
    marginBottom: "7px"
  };

  const handleInstanceNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstanceName(e.target.value);
  };
  console.log("fkuwrgfwiufh",operation_id)

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="p-5 bg-[#ffffff] rounded-lg shadow flex flex-col justify-center w-11/12" style={{ width: "88%" }}>
        <EditTemplateModal isOpen={isEditOpen} onClose={onEditClose} />
        <ChangeTemplateModal isOpen={isChangeOpen} onClose={onChangeClose} setSelectedTemplate={setSelectedTemplate} />
        <div style={Heading}>
          Configure Deployment
          <div className="font-Inter font-[600] text-[16px] text-[#0D1115]/70" style={{ marginTop: "20px" }}>
            <input
              type="text"
              id="instanceName"
              name="instanceName"
              placeholder='Instance Name'
              onChange={handleInstanceNameChange}
              value={InstanceName || ''}
              className="block w-full border-b border-gray-300 focus:outline-none"
              style={{ marginTop: "6px", paddingBottom: "6px" }}
            />
          </div>
          <div className="font-Inter font-[600] text-[16px] text-[#0D1115]/70" style={{ marginTop: "20px" }}>
            {/* {props.isCpu ? "Operating System" : "Template"} */}
          </div>
          <hr className="my-2 border-gray-300" style={{ marginBottom: "6px" }} />
        </div>

        <div className="flex flex-wrap gap-4 w-full">
          <div className="p-5 bg-white border rounded-[10px] flex items-center" style={{ width: "100%" }}>
            <div className="flex items-center">
              <img src={ubuntu} alt="" className="w-[44px] h-[53px] mr-4" />
              <div className="font-Inter font-[600] text-[14px] text-[#3F5175]">
                {selectedTemplate ? selectedTemplate.name : "Select Template"}
              </div>
            </div>
            <Button onClick={onChangeOpen} ml="auto">
              Change Template
            </Button>
          </div>
        </div>

        <div className="mt-5 w-full">
          <div className="font-Inter font-[600] text-[16px] text-[#0D1115]/70">SSH Key</div>
          <hr className="my-2 border-gray-300" style={{ marginBottom: "6px" }} />
          <Select placeholder="Select SSH Key" onChange={(e) => setSshPubKey(e.target.value)}>
            {sshKeys.map(key => (
              <option key={key.keyID} value={key.key}>
                {key.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="font-Inter font-[600] text-[16px] text-[#0D1115]/70 mt-5 mx-2">
          Instance Pricing
          <hr className="my-2 border-gray-300" style={{ marginBottom: "6px" }} />
        </div>
        <div className="container mx-auto max-w-8xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 card_gpu">
            {instancePricingCardData.map((c, i) => (
              <div key={i} className="flex justify-center">
                <div className="" onClick={() => {
                  setInstancePricingCardData(instancePricingCardData.map((item, index) => index === i ? ({ ...item, isChecked: true }) : ({ ...item, isChecked: false })))
                }}>
                  <InstancePricingCard key={i} {...c} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-11/12 mt-8" style={{ width: "88%" }}>
        <div className="flex flex-wrap justify-between items-start mx-2 my-9">
          {props.selectedGpu && instancePricingCardData.filter(item => item.isChecked).map((item, index) => (
            <div key={index} className="w-full md:w-[49.5%] mb-4 md:mb-0 md:mr-2 p-5 border border-[#673AB7]/10 rounded-[10px]">
              <div className="mb-4 font-Inter font-[600] text-[16px] text-[#673AB7]/70">
                Pricing Summary
              </div>
              <div className="my-2 font-Inter font-[400] text-[14px] text-[#0D1115]" style={price_Style}>
                GPU Cost: ${item.price}/hr.<br />
                <div className="my-1" style={price_Style}>
                  Running Disk Cost: $0.006/hr.<br />
                </div>
                Exited Disk Cost: $0.006/hr.
              </div>
            </div>
          ))}
          {/* {props.selectedGpu && (
            <div className="w-full md:w-[49.5%]  md:mb-0 p-5 border border-[#673AB7]/10 rounded-[10px]" style={{ height: "158px" }}>
              <div className=" font-Inter font-[600] text-[16px] text-[#673AB7]/70">
                Instance Summary
              </div>
              <div className=" font-Inter font-[400] text-[14px] text-[#0D1115] mt-3 " style={price_Style}>
                <div className="my-1">
                  {props.selectedGpu.label ? props.selectedGpu.label : "Select Config"}<br />
                </div>
                <div>
                  {props.selectedGpu.RAM ? props.selectedGpu.RAM : "RAM"}<br />
                </div>
                <div>
                  ({props.selectedGpu.Disk ? props.selectedGpu.Disk : "0"} GB Storage)
                </div>
              </div>
            </div>
          )} */}
          {props.selectedGpu && (
            <div className="w-full md:w-[49.5%] mb-4 md:mb-0 p-5 border border-[#673AB7]/10 rounded-[10px]">
              <div className="mb-4 font-Inter font-[600] text-[16px] text-[#673AB7]/70">
                Instance Summary
              </div>
              <div className="my-2 font-Inter font-[400] text-[14px] text-[#0D1115]" style={price_Style}>
                {props.selectedGpuName}<br />
                <div className="my-1">
                  {props.selectedGpu.planName ? props.selectedGpu.planName : "Select Config"}<br />
                </div>
                ({props.selectedGpu.storageInGb ? props.selectedGpu.storageInGb : "0"} GB Storage)
              </div>
            </div>
          )}
        </div>

        <div className="mx-2" style={{ marginBottom: "150px", marginTop: "-10px" }}>
          <Button
            sx={{
              background: "linear-gradient(to left, rgb(181, 44, 246), rgb(74, 145, 247))"
            }}
            color="#FFFFFF"
            className="w-full"
            _hover={{ bg: "linear-gradient(to left, #B52CF6, #4A91F7)", color: "white" }}
            onClick={deploy}
            width={"170px"}
          >
            Deploy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfigureDeployment;
