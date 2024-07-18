import  { useState } from 'react';
import { HomeIcon } from '@heroicons/react/24/outline';
import Overview from './InstanceCards';
// import RescaleGPU from './RescaleGPU';
// import MonitoringGPU from './MonitoringGPU';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import backbutton from '../../asset/icons8-back-24.png';

function AboutInstanceGpu() {
    const [activeTab, setActiveTab] = useState('Overview');
    const navigate = useNavigate();

    const navItems = [
        { name: 'Overview', icon: HomeIcon },
        // { name: 'Rescale', icon: ArrowPathIcon },
        // { name: 'Matrixs', icon: ArrowPathIcon },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return <Overview />;
            // case 'Rescale':
            //     return <RescaleGPU />;
            // case 'Matrixs':
            //     return <MonitoringGPU />;
            default:
                return null;
        }
    };

    const handleBack = () => {
        navigate("/gpu-compute/gpu-dashboard");
    };

    return (
        <div className='bg-[#ffffff] rounded-tl-[20px]' style={{ height: "130%", marginTop: "-27px" }}>
            <div>
                <div>
                    <h1 className="font-sans font-semibold text-xl text-blue-900 mb-4" style={{ marginTop: "30px", marginLeft: "60px", paddingTop: "35px" }}>
                        GPU Instance
                    </h1>
                    <img
                        className="mr-30 w-8 h-8 cursor-pointer transform transition-transform hover:scale-110"
                        onClick={handleBack}
                        src={backbutton}
                        alt="Back button"
                        style={{ marginLeft: "15px", marginTop: "-45px" }}
                        data-tooltip-id="backTooltip"
                        data-tooltip-content="Go back"
                    />
                    <ReactTooltip id="backTooltip" place="top" />
                </div>

                <div className="border-b border-gray-300 mt-4 mb-4" style={{ width: '100%', height: "100%" }}></div>
                <div className="p-1 flex flex-col md:flex-row" style={{ marginTop: "-30px" }}>
                    <div className="w-full md:w-1/5 m-5 p-[25px] rounded-lg shadow bg-[##ffffff]" style={{ marginTop: "33px", borderRadius: "5px" }}>
                        <nav className="flex flex-col space-y-2 text-[#223354b3]" style={{ marginTop: "10px" }}>
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    onClick={() => setActiveTab(item.name)}
                                    className="flex items-center text-sm font-medium text-[#223354b3] transition-colors hover:bg-purple-500 hover:text-white hover:rounded-r-lg py-3 pl-4"
                                    style={{ borderRadius: '0 10px 10px 0', paddingRight: '10px', lineHeight: '1.5', marginLeft: "-18px", fontWeight: 700 }}
                                >
                                    <item.icon className="h-5 w-5 mr-2" style={{ fontWeight: 700 }} />
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="w-full md:w-4/5 p-4">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutInstanceGpu;
