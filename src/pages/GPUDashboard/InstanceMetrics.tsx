import { useState } from 'react'
import { useStore } from '../../store';
import { useQuery } from '../../store/api';
import { MdOutlineCalendarToday } from "react-icons/md";
import { grafanaBaseUrl/* , orgId, dataSource, theme */ } from "./data.ts";

function InstanceMetrics() {
    const { currVm } = useStore();
    const { project_slug } = useQuery();

    const [duration, setDuration] = useState(5);

    const iframeWidth = (document.documentElement.clientWidth / 100) * 75;
    const toTime = new Date().valueOf();
    const fromTime = new Date().setMinutes(new Date().getMinutes() - duration).valueOf();

    // const iframeURL = `${grafanaBaseUrl}?orgId=${orgId}&var-datasource=${dataSource}&var-namespace=${project_slug}&var-vm=${currVm?.slug}&from=${fromTime}&to=${toTime}&theme=${theme}`;

    // const data = [
    //     {
    //         title: 'CPU Usage',
    //         panelId: 1,
    //     },
    //     {
    //         title: 'Memory Usage',
    //         panelId: 3,
    //     },
    //     {
    //         title: 'Disk - IOPS',
    //         panelId: 15,
    //     },
    //     {
    //         title: 'Disk - IO Traffic',
    //         panelId: 19,
    //     },
    //     {
    //         title: 'Network Traffic - Receive Bandwidth',
    //         panelId: 9,
    //     },
    //     {
    //         title: 'Network Traffic - Transmit Bandwidth',
    //         panelId: 20,
    //     },
    // ]

    console.log('====================================');
    console.log("currVm?.slug :", currVm?.slug);
    console.log('====================================');

    return (
        <div className='flex flex-col justify-start items-center rounded-[8px] bg-[#fff] border border-[#0D1115]/10'>
            <div className='flex justify-end items-center bg-[#0d11150a] border border-b-[#0D1115]/10 w-full min-h-[60px] px-[20px]'>
                <div className="bg-white flex justify-between items-center border border-[#0D11151A]/10 rounded-[4px] w-[180px] p-2">
                    <MdOutlineCalendarToday size={22} className='mx-2' />
                    <select name="" id="" className="outline-none w-full" onChange={(e) => { setDuration(Number(e.target.value)) }}>
                        <option value={5} className="px-2 py-1">Last 5 minutes</option>
                        <option value={15} className="px-2 py-1">Last 15 minutes</option>
                        <option value={30} className="px-2 py-1">Last 30 minutes</option>
                        <option value={60} className="px-2 py-1">Last 1 hour</option>
                        <option value={3 * 60} className="px-2 py-1">Last 3 hour</option>
                        <option value={6 * 60} className="px-2 py-1">Last 6 hour</option>
                        <option value={12 * 60} className="px-2 py-1">Last 12 hour</option>
                        <option value={24 * 60} className="px-2 py-1">Last 24 hour</option>
                        <option value={2 * 24 * 60} className="px-2 py-1">Last 2 days</option>
                        <option value={7 * 24 * 60} className="px-2 py-1">Last 7 days</option>
                        <option value={30 * 24 * 60} className="px-2 py-1">Last 30 days</option>
                        <option value={90 * 24 * 60} className="px-2 py-1">Last 90 days</option>
                        <option value={6 * 30 * 24 * 60} className="px-2 py-1">Last 6 months</option>
                    </select>
                </div>
            </div>
            <div className='mt-[30px]'>
                <iframe
                    src={`${grafanaBaseUrl}?orgId=1&refresh=10s&var-datasource=prometheus&var-namespace=${project_slug}&var-vm=${currVm?.slug}&from=${fromTime}&to=${toTime}&theme=light&panelId=1`}
                    width={`${iframeWidth}px`}
                    height="320"
                ></iframe>
            </div>
            <div className='mt-[30px]'>
                <iframe
                    src={`${grafanaBaseUrl}?orgId=1&refresh=10s&var-datasource=prometheus&var-namespace=${project_slug}&var-vm=${currVm?.slug}&from=${fromTime}&to=${toTime}&theme=light&panelId=3`}
                    width={`${iframeWidth}px`}
                    height="320"
                ></iframe>
            </div>
            <div className='mt-[30px]'>
                <iframe
                    src={`${grafanaBaseUrl}?orgId=1&refresh=10s&var-datasource=prometheus&var-namespace=${project_slug}&var-vm=${currVm?.slug}&from=${fromTime}&to=${toTime}&theme=light&panelId=15`}
                    width={`${iframeWidth}px`}
                    height="320"
                ></iframe>
            </div>
            <div className='mt-[30px]'>
                <iframe
                    src={`${grafanaBaseUrl}?orgId=1&refresh=10s&var-datasource=prometheus&var-namespace=${project_slug}&var-vm=${currVm?.slug}&from=${fromTime}&to=${toTime}&theme=light&panelId=19`}
                    width={`${iframeWidth}px`}
                    height="320"
                ></iframe>
            </div>
            <div className='mt-[30px]'>
                <iframe
                    src={`${grafanaBaseUrl}?orgId=1&refresh=10s&var-datasource=prometheus&var-namespace=${project_slug}&var-vm=${currVm?.slug}&from=${fromTime}&to=${toTime}&theme=light&panelId=9`}
                    width={`${iframeWidth}px`}
                    height="320"
                ></iframe>
            </div>
            <div className='my-[30px]'>
                <iframe
                    src={`${grafanaBaseUrl}?orgId=1&refresh=10s&var-datasource=prometheus&var-namespace=${project_slug}&var-vm=${currVm?.slug}&from=${fromTime}&to=${toTime}&theme=light&panelId=20`}
                    width={`${iframeWidth}px`}
                    height="320"
                ></iframe>
            </div>
            {/* {
                data?.map((panel, i) => {
                    console.log('====================================');
                    console.log("panel url :", `${iframeURL}&panelId=${panel.panelId}`);
                    console.log('====================================');
                    return (
                        <div key={i} className='mt-[30px]'>
                            <iframe 
                                src={`${iframeURL}&panelId=${panel.panelId}`} 
                                width={`${iframeWidth}px`} 
                                height="320"
                            ></iframe>
                        </div>
                        
                    )
                })
            } */}
        </div>
    )
}

export default InstanceMetrics
