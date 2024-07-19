import * as React from 'react';
import GpuCustomCard from './GpuCustomCard';
import Spinner from '../../components/Spinner-loader';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './FilterGpusbyVram.css';
import { useStore } from '../../store';

function FilterGpusbyVram(props: any) {
  const [data, setData] = React.useState<any[]>([]);
  const [filteredData, setFilteredData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { selectedLocation } = props;
  const { selectedGpu, setSelectedGpu } = useStore();
  const [gpuCount, setGpuCount] = React.useState<number>(0);

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
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch VM configs:', error);
        setLoading(false);
      }
    }
    fetchVmConfigs();
  }, [selectedLocation]);

  React.useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      const selectedGpu = filteredData.find(item => item.isChecked);
      props.setSelectedGpu(selectedGpu || {});
    }
  }, [filteredData, props]);

  React.useEffect(() => {
    const applyFilters = () => {
      let filtered = gpuCount === 0 ? data : data.filter(item => item.gpuCount === gpuCount);
      setFilteredData(filtered);
    };

    applyFilters();
  }, [data, gpuCount]);

  const handleGpuSelection = (index: number) => {
    setFilteredData(filteredData.map((item, i) => i === index ? { ...item, isChecked: true } : { ...item, isChecked: false }));
    setSelectedGpu(filteredData[index].planName);
  };
  console.log(selectedGpu)
  const unavailableCounts = [3, 5, 6, 7];

  return (
    <div className="mt-4 bg-white">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col items-between ">
          <div className="w-full my-4 px-4 bg-[#0000000a]" style={{ marginTop: "0px", height: "88px", borderRadius: "15px" }}>
            <div className="mb-2 text-[#3f5175]" style={{ marginLeft: "5px", fontWeight: 600, fontSize: "13px", marginTop: "7px" }}>GPU count</div>
            <div className="flex items-center mb-4 w-full" style={{ marginTop: "13px", width: "98%", marginLeft: "12px" }}>
              <div className="flex-grow">
                <Slider
                  min={0}
                  max={8}
                  step={1}
                  value={gpuCount}
                  onChange={(value) => {
                    if (typeof value === 'number') {
                      setGpuCount(value);
                    }
                  }}
                  trackStyle={{ backgroundColor: '#673ab7' }}
                  handleStyle={{ borderColor: '#673ab7', backgroundColor: '#673ab7' }}
                  railStyle={{ backgroundColor: '#e1bee7' }}
                  marks={{ 0: 'All', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8' }}
                />
              </div>
            </div>
          </div>

          {unavailableCounts.includes(gpuCount) ? (
            <div className="flex flex-col items-center mt-10">
              <img src="https://console.wasabisys.com/static/media/table-no-data.svg" alt="No Data" style={{ opacity: 0.5 }} />
              <div className="text-[#3f5175]" style={{ fontWeight: 600, marginTop: "10px", opacity: 0.5 }}>Unavailable</div>
            </div>
          ) : (
            <div className="mt-10 container max-w-8xl h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredData?.map((c: any, i: number) => (
                <a href='#configure-development' key={i} onClick={() => handleGpuSelection(i)}>
                  <GpuCustomCard {...c} />
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FilterGpusbyVram;
