import React from 'react'
import stableIcon from "../../static/assets/img/stable-icon.jpg"
import { IoChevronDownSharp } from "react-icons/io5";
import { Button } from '@chakra-ui/react';
import { MdStorage } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import ConfigureAutoscalingModel from './ConfigureAutoscalingModel';
import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react';
import ModelDeploy from './ModelDeploy';
export default function DeploymentModelFinal(props: any) {

    const [activeDeployment, setActiveDeployment] = React.useState("All");
    const { isOpen, onOpen, onClose } = useDisclosure()

   
    // const [configs, setConfigs] = useState<StringMap>({});
    // const [secrets, setSecrets] = useState<StringMap>({});
    // const [modelUrl, setModelUrl] = React.useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


   

    // React.useEffect(() => {
    //     setModelUrl({
    //         "modelID": "mistralai/Mistral-7B-v0.1",
    //         "config": {
    //             "commodo_07": "07",
    //             "ipsum3": "test1",
    //             "sint_b": "test"
    //         },
    //         "cpu": "8",
    //         "memory": "64Gi",
    //         "modelName": "Mistralrsi",
    //         "secrets": {
    //             "nisia8": "test",
    //             "in_f2": "test"
    //         },
    //         "storage": "32Gi"
    //     });
    // }, [])


    return (
        <div className='bg-white rounded-[8px] flex justify-between items-start p-5 w-full gap-3'>
            <ConfigureAutoscalingModel isOpen={isOpen} onClose={onClose} />
            <div className="w-[70%]">
                <div className="flex justify-start items-center">
                    <img src={stableIcon} alt="" className="w-[50px] h-[50px]" />
                    <div className="mx-3 font-Inter font-[600] text-[20px] text-[#3f5175]">
                        {props?.modelPayload?.title}
                        {/* <br /><span className="font-[400] text-[16px]">
                            Created 16 minutes ago by Narendra Sen
                        </span> */}
                    </div>
                </div>
                <div className="my-5">
                    <div className="font-Inter font-[600] text-[20px] text-[#0D1115]">
                        Production <span className="font-[400] text-[14px] text-[#0D1115]/50">qk9ykd3</span>
                    </div>
                    <div className="font-Inter font-[400] text-[12px] text-[#0D1115]/70">
                        deployment-1 • Last deployed 22 minutes ago
                    </div>
                </div>
                <div className="flex justify-start items-center">
                    <div className="w-[15%] font-Inter font-[400] text-[14px] text-[#0D1115]/70">
                        <div className="">Replicas</div>
                        <div className="font-[600] text-[16px]">1 of 2 <span className="">active</span></div>
                    </div>
                    <div className="border-l border-[#D9D9D9] w-[35%] px-5 font-Inter font-[400] text-[14px] text-[#0D1115]/70">
                        <div className="">Autoscaling window</div>
                        <div className="font-[600] text-[16px]">1 minute</div>
                    </div>
                    <div className="w-[20%] font-Inter font-[400] text-[14px] text-[#0D1115]/70">
                        <div className="">Inference(last hour)</div>
                        <div className="font-[600] text-[16px]">0 <span className="">calls</span></div>
                    </div>
                    <div className="border-l border-[#D9D9D9] w-[30%] px-5 font-Inter font-[400] text-[14px] text-[#0D1115]/70">
                        <div className="">Response time(median)</div>
                        <div className="font-[600] text-[16px]">0 <span className="">ms</span></div>
                    </div>
                </div>
                <div className="flex justify-start items-center my-3 font-Inter font-[400] text-[14px] text-[#1952CE]">
                    <div className="w-[50%] cursor-pointer" onClick={() => onOpen()}>
                        Configure autoscaling
                    </div>
                    <div className="w-[50%] cursor-pointer">
                        View metrics
                    </div>
                </div>
                <div className="bg-[#0D11150A] border border-[#0D11151A]/10 flex items-center">
                    <div className="flex justify-start items-center">
                        <FaRegCheckCircle color='#65CF69' className='mx-2' />
                        <div className="mx-2 font-Inter font-[600] text-[14px] text-[#0D1115]/70">
                            Deployment is active and consuming resources
                        </div>
                    </div>
                    <span className="font-Inter font-[600] text-[14px] text-[#1952CE] mx-10">Deactivate</span>
                    <span className="font-Inter font-[600] text-[14px] text-[#1952CE] mx-5">View logs</span>
                </div>
                <div className="p-10 flex flex-col justify-center items-center bg-[#0D11150A] my-5">
                    <div className="font-Inter font-[500] text-[20px] text-[#0D1115]">
                        No development deployment
                    </div>
                    <div className="my-2 w-[70%] text-center font-Inter font-[400] text-[14px] text-[#0D1115]">
                        Development deployments allow for quick iteration with live reload. They're limited to one replica and always scale to zero after inactivity. Promote to production to use in live applications.
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="font-Inter font-[500] text-[20px] text-[#0D1115]">
                        Deployments
                        <span className="bg-[#0D11150A] border border-[#0D11151A]/10 p-1 mx-2 font-[400] text-[14px] text-[#0D111585]/50 rounded-[4px]">
                            1
                        </span>
                    </div>
                    <div className="flex justify-start items-center border-[#0D111533]/20 font-Inter font-[600] text-[14px] text-[#0D1115]/70">
                        <div className={`p-2 border-2 cursor-pointer rounded-l-[4px] ${activeDeployment == "All" ? "border-[#1952CE] text-[#1952CE]" : "border-[#0D11151A]/10"}`} onClick={() => setActiveDeployment("All")}>All</div>
                        <div className={`p-2 border-2 cursor-pointer ${activeDeployment == "Running" ? "border-[#1952CE] text-[#1952CE]" : "border-[#0D11151A]/10"}`} onClick={() => setActiveDeployment("Running")}>Running</div>
                        <div className={`p-2 border-2 cursor-pointer ${activeDeployment == "Scaled to Zero" ? "border-[#1952CE] text-[#1952CE]" : "border-[#0D11151A]/10"}`} onClick={() => setActiveDeployment("Scaled to Zero")}>Scaled to Zero</div>
                        <div className={`p-2 border-2 cursor-pointer ${activeDeployment == "Inactive" ? "border-[#1952CE] text-[#1952CE]" : "border-[#0D11151A]/10"}`} onClick={() => setActiveDeployment("Inactive")}>Inactive</div>
                        <div className={`p-2 border-2 cursor-pointer rounded-r-[4px] ${activeDeployment == "Failed" ? "border-[#1952CE] text-[#1952CE]" : "border-[#0D11151A]/10"}`} onClick={() => setActiveDeployment("Failed")}>Failed</div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start p-3 bg-[#0D11150A] border border-[#0D11151A]/10 rounded-[4px] my-5">
                    <div className="font-Inter font-[600] text-[16px] text-[#0D1115]">
                        deployment-1 <span className="font-[400] text-[14px] text-[#0D1115]/50 mx-2">qk9ykd3</span>
                    </div>
                    <div className="font-Inter font-[400] text-[12px] text-[#0D1115]/70 my-1">
                        Created a few seconds ago by Narendra Sen • Last deployed a few seconds ago
                    </div>
                </div>
            </div>
            <div className="w-[30%]">
                <div className="flex justify-end items-center">
                    <button
                        onClick={openModal}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Call Model
                    </button>
                    <ModelDeploy isOpen={isModalOpen} onClose={closeModal} />
                    <div className="mx-2">
                        <Menu>
                            <MenuButton as={Button} rightIcon={<IoChevronDownSharp />}>
                                Actions
                            </MenuButton>
                            <MenuList>
                                <MenuItem></MenuItem>
                                <MenuItem></MenuItem>
                                <MenuItem></MenuItem>
                                <MenuItem></MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
                <div className="bg-[#0D11150A] p-4 mt-10 border border-[#0D11151A]/10 rounded-[4px]">
                    <div className="my-2">
                        Instance type
                    </div>
                    <div className="bg-[#FFFFFF] p-3 flex border border-[#0D11151A]/10 justify-between item-center">
                        <div className="flex justify-start item-center">
                            <MdStorage size={22} className='' />
                            <div className="mx-2">
                                {props?.modelPayload?.machineName}:12x144
                            </div>
                        </div>
                        <div className="bg-[#0D1115B8]/70 p-1 px-2 rounded-[4px] text-[11px] text-white">
                            High demand
                        </div>
                    </div>
                    <div className="border border-[#0D11151A]/10 p-3 bg-white">
                        <div className="flex justify-between items-center text-[12px]">
                            <div className="">GPU</div>
                            <div className="">1 {props?.modelPayload?.title} (80 GiB)</div>
                        </div>
                        <div className="flex justify-between items-center text-[12px] my-1">
                            <div className="">CPU</div>
                            <div className="">12 vCPUs</div>
                        </div>
                        <div className="flex justify-between items-center text-[12px]">
                            <div className="">RAM</div>
                            <div className="">144 GiB</div>
                        </div>
                        <div className="flex justify-between items-center text-[12px] my-1">
                            <div className="">Cost</div>
                            <div className="">$0.10240/min</div>
                        </div>
                    </div>
                    <div className="border border-[#0D11151A]/10 text-[12px] p-3 bg-white mb-2">
                        You may experience downtime when this instance type is at capacity. For guaranteed uptime and lower costs,<span className="text-[#1952CE] cursor-pointer">talk to our sales team.</span>
                    </div>
                </div>
                <div className="p-4 bg-white mt-10 border border-[#0D11151A]/10">
                    <div className="p-3">
                        <div className="flex justify-between items-center">
                            <div className="font-Inter font-[600] text-[18px] text-[#0D1115]">
                                Usage
                            </div>
                            <div className="font-Inter font-[400] text-[14px] text-[#1952CE]">
                                View usage
                            </div>
                        </div>
                        <div className="font-Inter font-[600] text-[30px] text-[#0D1115]">
                            $0.00 <span className="text-[#0D1115D1]/80 text-[12px] font-[400]">this billing period</span>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-white border border-[#0D11151A]/10">
                    <div className="px-3 font-Inter font-[600] text-[12px] text-[#0D1115D1]/80">
                        Usage cost for the single deployment.
                    </div>
                </div>
            </div>
        </div>
    )
}
