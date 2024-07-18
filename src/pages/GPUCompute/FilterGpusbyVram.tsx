import * as React from 'react';
import GpuCustomCard from './GpuCustomCard';
import Spinner from '../../components/Spinner-loader';
import 'rc-slider/assets/index.css';
import './FilterGpusbyVram.css';
import { useStore } from '../../store';

function FilterGpusbyVram(props: any) {
    const [data, setData] = React.useState<any[]>([]);
    const [filteredData, setFilteredData] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true); // Add loading state
    const { selectedLocation } = props;
    const { selectedGpu, setSelectedGpu } = useStore();

    React.useEffect(() => {
        async function fetchVmConfigs() {
            try {
                const response = await fetch(`https://api.mkinf.io/v0/specs?location=${selectedLocation}`, {
                    headers: {
                        'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
                    },
                });
                const result = await response.json();
                const formattedData = result.items.map((item: any) => {
                    let hourlyPriceUSD = 0;
                    switch (item.product_name) {
                        case 'a40.1x':
                            hourlyPriceUSD = 1.10;
                            break;
                        case 'l40s-48gb.1x':
                            hourlyPriceUSD = 1.25;
                            break;
                        case 'a100-40gb-pcie.1x':
                            hourlyPriceUSD = 1.60;
                            break;
                        case 'a100-80gb-pcie.1x':
                            hourlyPriceUSD = 1.81;
                            break;
                        case 'a100-80gb-sxm.1x':
                            hourlyPriceUSD = 2.14;
                            break;
                        default:
                            hourlyPriceUSD = 0;
                            break;
                    }

                    return {
                        planName: item.product_name,
                        os: "Linux",
                        vCpuCount: item.cpu_cores,
                        ramInGb: item.memory_gb,
                        storageInGb: item.disk_gb,
                        monthlyPriceUSD: hourlyPriceUSD * 720,
                        hourlyPriceUSD: hourlyPriceUSD,
                        enabled: true,
                        gpuEnabled: item.num_gpu > 0,
                        gpu: item.gpu_type,
                        gpuCount: item.num_gpu
                    };
                });
                setData(formattedData);
                setFilteredData(formattedData);
                setLoading(false); // Set loading to false after data is fetched
                console.log(formattedData, "formattedData");
            } catch (error) {
                console.error('Failed to fetch VM configs:', error);
                setLoading(false); // Set loading to false if there's an error
            }
        }
        fetchVmConfigs();
    }, [selectedLocation]);

    React.useEffect(() => {
        if (filteredData && filteredData.length > 0) {
            const selectedGpu = filteredData.find(item => item.isChecked);
            props.setSelectedGpu(selectedGpu || {});
        }
    }, [filteredData]);

    const handleGpuSelection = (index: number) => {
        setFilteredData(filteredData.map((item, i) => i === index ? { ...item, isChecked: true } : { ...item, isChecked: false }));
        setSelectedGpu(filteredData[index].planName); // Update selectedGpu with the product_name
    };
    console.log(selectedGpu)

    return (
        <div className="mt-4 bg-[#ffffff]">
            {loading ? ( // Display spinner while loading
                <div className="flex justify-center items-center h-screen">
                    <Spinner/>
                </div>
            ) : (
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <div className="my-4 px-4 filters" style={{ marginTop: "-47px" }}>
                        {/* Slider Component can be added here */}
                    </div>
                    <div className="mt-10 container max-w-8xl h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 cards_custom">
                        {filteredData?.map((c: any, i: number) => (
                            <a href='#configure-development' className="" key={i} onClick={() => handleGpuSelection(i)}>
                                <GpuCustomCard {...c} />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilterGpusbyVram;
