import React from 'react';
import UtilizationCard from './UtilizationCard';
import { MdStorage } from 'react-icons/md';
import useApi from '../../store/useApi';
import { useStore } from '../../store';
import { FaRegCheckCircle } from 'react-icons/fa';
// import { Spinner } from '@chakra-ui/react';
import Spinner from '../../components/Spinner-loader';
import { useParams } from 'react-router-dom';
// import InstanceMetrics from './InstanceMetrics';
import InstanceLogs from './InstanceLogs';
import './AboutInstance.css'

function AboutInstance() {
    const { currVm, setCurrVm } = useStore();
    const { slug } = useParams();
    const { getVm } = useApi();

    const [activeSubTab, setActiveSubTab] = React.useState("Overview");

    const UtilizationCardData = [
        { title: "CPU", percentage: "25%", progress: 25 },
        { title: "RAM", percentage: "25%", progress: 25 },
        { title: "GPU", percentage: "25%", progress: 25 },
        { title: "GPU Memory", percentage: "25%", progress: 25 },
        { title: "Container", percentage: "25%", progress: 25 },
        { title: "Volume", percentage: "25%", progress: 25 },
    ];

    React.useEffect(() => {
        getVm(slug + "").then(vm => setCurrVm(vm));
    }, [slug]);

    if (!currVm) return <Spinner />;

 
    const sub_Heading = {
        // marginLeft: "1px",
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        lineHeight: 1.5,
        fontWeight: 600,
        fontSize: '16px',
        color: 'rgb(63, 81, 117)',
        // marginBottom: "10px"
    };

    const Sub_sub_Heading = {
        // marginLeft: "1px",
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        lineHeight: 1.5,
        fontWeight: 600,
        fontSize: '15px',
        color: 'rgb(63, 81, 117)',
        marginBottom: "10px"
    };



    return (
        <div className="p-5 bg-[#F9F9F9] md:bg-[#f3f5f9]" style={{ backgroundColor: "#f3f5f9" }}>
            <div className="aboutInstance_overview">
                <h2 className="font-Inter font-[600] text-[28px] text-[#3f5175] mx-2 my-2 md:mx-5 md:my-2">{activeSubTab === "Overview" ? "About Instance" : activeSubTab}</h2>
                <div className="flex justify-center items-center">
                    <div className={`border cursor-pointer font-Inter font-[600] text-[14px] ${activeSubTab === "Overview" ? "border-2 border-[#673ab7] text-[#673ab7]" : "border-[#0D111533]/20"} h-[36px] rounded-l-[4px] p-1 px-4`} onClick={() => setActiveSubTab("Overview")}>Overview</div>
                    <div className={`border cursor-pointer font-Inter font-[600] text-[14px] ${activeSubTab === "Logs" ? "border-2 border-[#673ab7] text-[#673ab7]" : "border-[#0D111533]/20"} h-[36px] p-1 px-4`} onClick={() => setActiveSubTab("Logs")}>Logs</div>
                    <div className={`border cursor-pointer font-Inter font-[600] text-[14px] ${activeSubTab === "Metrics" ? "border-2 border-[#673ab7] text-[#673ab7]" : "border-[#0D111533]/20"} h-[36px] rounded-r-[4px] p-1 px-4`} onClick={() => setActiveSubTab("Metrics")}>Metrics</div>
                </div>
            </div>
            {activeSubTab === "Overview" ? (
                <div className="flex flex-col md:flex-row px-5 gap-x-5 bg-[#f2f5f9]">
                    <div className="w-full md:w-[70%]" style={{ marginTop: "190px" }}>
                        <div className="flex justify-start items-center -mt-[150px]">

                            <div className="h-[50px] w-[50px] bg-[#673ab7]" style={{ borderRadius: "4px", boxShadow: "0 0 4px rgba(0,0,0,0.09)" }}>
                                <div style={{ width: "30px", height: "30px", marginLeft:"9px",marginTop:"9px" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill='white' viewBox="0 0 512 512"><path d="M64 32C28.7 32 0 60.7 0 96v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm48 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM64 288c-35.3 0-64 28.7-64 64v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V352c0-35.3-28.7-64-64-64H64zm280 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm56 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" /></svg>
                                </div>

                            </div>
                            <div className="mx-3 font-Inter font-[600] text-[20px] text-[#0D1115]" style={sub_Heading}>
                                A100:12x144
                                <br /><span className="font-[400] text-[16px] text-[#3f5175]/70" style={sub_Heading}>
                                    {/* ID: {currVm?.displayName} */}
                                </span>
                            </div>
                        </div>
                        <div className="bg-[#f2f5f9] mt-5 font-Inter font-[400] text-[12px] text-[#3f5175]/70">
                            Volume Path: /root/cache/huggingface:/root/.cache/huggingface
                        </div>
                        <div className="bg-[#f2f5f9] my-1 font-Inter font-[600] text-[14px] text-[#0D1115]" style={Sub_sub_Heading}>
                            Pod Uptime: 10m
                        </div>
                        <div className="my-5">
                            <div className="my-2 font-Inter font-[600] text-[14px] text-[#0D1115]" style={Sub_sub_Heading}>
                                Utilization
                            </div>
                            <div className="bg-[#f2f5f9] border border-[#0D11151A]/10 p-5" >
                                {UtilizationCardData.map((items) => {
                                    return (
                                        <UtilizationCard {...items} />
                                    )
                                })
                                }
                            </div>
                        </div>
                        <div className="bg-[#f2f5f9] border border-[#0D11151A]/10 py-1 rounded-[4px] flex justify-start items-center gap-10">
                            <div className=" flex justify-start items-center font-Inter font-[600] text-[14px] text-[#3f5175]/70">
                                <FaRegCheckCircle color='#65CF69' className='mx-5' />Deployment is active and consuming resources
                            </div>
                            <div className="font-Inter font-[400] text-[14px] text-[#673ab7] cursor-pointer">Deactivate</div>
                        </div>
                    </div>
                    <div className="w-full md:w-[30%]">
                        <div className="bg-[#f2f5f9] p-4 mt-10 border border-[#0D11151A]/10 rounded-[4px]">
                            <div className="my-2" style={{ color: "#3f5175", fontWeight: 500 }}>
                                Instance type
                            </div>
                            <div className="bg-[#f2f5f9] p-3 flex border border-[#0D11151A]/10 justify-between item-center">
                                <div className="flex justify-start item-center">
                                    <MdStorage color='#673ab7' size={22} className='' />
                                    <div className="mx-2" style={{ color: "#3f5175", fontWeight: 500 }}>
                                        A100:12x144
                                    </div>
                                </div>
                                <div className="bg-[#673ab7] p-1 px-2 rounded-[4px] text-[11px] text-white">
                                    High demand
                                </div>
                            </div>
                            {/* <div className="border border-[#0D11151A]/10 p-3 bg-[#f2f5f9]">
                                <div className="flex justify-between items-center text-[12px]" style={{ color: "3f5175", fontWeight: 500 }}>
                                    <div className="">GPU</div>
                                    <div className="">1 Nvidia A100 (80 GiB)</div>
                                </div>
                                <div className="flex justify-between items-center text-[12px] my-1" style={{ color: "3f5175", fontWeight: 500 }}>
                                    <div className="">CPU</div>
                                    <div className="">{currVm?.cpu}  {currVm?.cpu == "1" ? "vCPU" : "vCPUs"}</div>
                                </div>
                                <div className="flex justify-between items-center text-[12px]" style={{ color: "3f5175", fontWeight: 500 }}>
                                    <div className="">RAM</div>
                                    <div className="">{currVm?.ram}</div>
                                </div>
                                <div className="flex justify-between items-center text-[12px]" style={{ color: "3f5175", fontWeight: 500 }}>
                                    <div className="">Storage</div>
                                    <div className="">{currVm?.storage} NVMe</div>
                                </div>
                                <div className="flex justify-between items-center text-[12px] my-1" style={{ color: "3f5175", fontWeight: 500 }}>
                                    <div className="">Cost</div>
                                    <div className="">$0.10240/min</div>
                                </div>
                            </div> */}
                            <div className="border border-[#0D11151A]/10 text-[12px] p-3 bg-[#f2f5f9] mb-2 text-[#3f5175]" style={{ fontWeight: "500px" }}>
                                You may experience downtime when this instance type is at capacity. For guaranteed uptime and lower costs,<span className="text-[#673ab7] cursor-pointer" style={{ fontWeight: 500 }}>&nbsp;&nbsp;talk to our sales team.</span>
                            </div>
                        </div>
                        <div className="p-4 bg-[#f2f5f9] mt-10 border border-[#0D11151A]/10" style={{ marginBottom: "100px" }}>
                            <div className="p-3">
                                <div className="flex justify-between items-center">
                                    <div className="font-Inter font-[600] text-[18px] text-[#3f5175]">
                                        Usage
                                    </div>
                                    <div className="font-Inter font-[400] text-[14px] text-[#673ab7]" style={{fontWeight:500}}>
                                        View usage
                                    </div>
                                </div>
                                <div className="font-Inter font-[600] text-[25px] text-[#3f5175] my-2">
                                    $0.00 <span className="text-[#3f5175]/80 text-[12px] font-[400]" style={{fontWeight:500}}>this billing period</span>
                                </div>
                            </div>
                            <div className="border border-[#0D11151A]/10 font-Inter font-[600] text-[12px] text-[#3f5175] p-5">
                                Usage cost for the single deployment.
                            </div>
                        </div>
                    </div>
                </div>
            ) : activeSubTab === "Logs" ? (
                <InstanceLogs />
            ) : (
                // <InstanceMetrics />f
                <div>d</div>
            )}
        </div>
    )
}

export default AboutInstance