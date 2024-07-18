import { useState } from 'react'
import { useQuery } from '../../store/api';
import { grafanaBaseUrl, /* orgId, dataSource, theme */ } from "./data.ts";

function InstanceLogs() {
    // const { currVm } = useStore();
    const currVm = { slug: 'vm-q3a6plzpqwb-99e17f87-qtqwg' };
    const { project_slug } = useQuery();

    const [duration] = useState(1)

    const iframeWidth = (document.documentElement.clientWidth / 100) * 75;
    const iframeHeight = (document.documentElement.clientHeight / 100) * 75;
    const fromTime = new Date().valueOf();
    const toTime = new Date().setHours(new Date().getHours() + duration).valueOf();

    // const iframeURL = `${grafanaBaseUrl}?orgId=${orgId}&var-datasource=${dataSource}&var-namespace=${project_slug}&var-vm=${currVm?.slug}&from=${fromTime}&to=${toTime}&theme=${theme}`;

    /* React.useEffect(() => {
        setDuration(1);
    }, []) */


    return (
        <div className='flex flex-col justify-start items-center rounded-[8px] bg-[#fff] border border-[#0D1115]/10 h-full'>
            <iframe
                src={`${grafanaBaseUrl}?orgId=1&refresh=10s&var-datasource=prometheus&var-namespace=${project_slug}&var-vm=${currVm?.slug}&from=${fromTime}&to=${toTime}&theme=light&panelId=21`}
                width={`${iframeWidth}px`}
                height={`${iframeHeight}px`}
                frameBorder="0"
            ></iframe>
        </div>
    )
}

export default InstanceLogs
