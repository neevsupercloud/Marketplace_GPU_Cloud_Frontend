import React from 'react';
import FilterGpusbyVram from './FilterGpusbyVram';

interface GpuOption {
  name: string;
  label: string;
  vram: string;
  available: boolean;
  tensorCores: number;
}

interface GpuSelectionProps {
  options: GpuOption[];
  selectedLocation: string;
  selectedName: string;
  setSelectedName: (name: string) => void;
  setSelectedOption: (option: GpuOption) => void;
  title: string;
}

const GpuSelectionComponent: React.FC<GpuSelectionProps> = ({
  options,
  selectedName,
  setSelectedName,
  setSelectedOption,
  selectedLocation,
  title
}) => {

  const handleSelection = (name: string) => {
    const selected = options.find(option => option.name === name);
    if (selected && selected.available) {
      setSelectedName(name);
      setSelectedOption(selected);  // Ensure selectedOption is set correctly
    }
  };

  return (
    <div className="p-0 my-5">
      {/* <div className="font-Inter font-[600] text-[16px] text-[#0D1115]/70">
        {title}
      </div> */}
      {/* <hr className="my-2 border-gray-300" style={{ marginBottom: "30px" }} /> */}
      {/* <div className="p-2 my-2 border border-[#0d11151a] rounded">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {options.map((option) => (
            <div
              key={option.name}
              className={`p-4 border-2 rounded-lg  ${selectedName === option.name ? 'bg-[#ffffff] border-[#673AB7]' : 'hover:bg-gray-200'} ${option.available ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              onClick={() => handleSelection(option.name)}
              style={{ color: 'rgb(63, 81, 117)', backgroundColor: "white", position: 'relative' }}
            >
              <p style={{ marginLeft: "0px", fontSize: "13px", marginTop: "-7px", marginBottom: "5px", fontWeight: 600 }}>{option.label}</p>
              <div className="flex items-center justify-between w-full border border-[#0D1115]/10"></div>
              <p style={{ fontSize: "12px", marginTop: "5px", color: "#0d1115b3", fontWeight: 600 }}>VRAM: {option.vram}</p>
              <p style={{ fontSize: "12px", marginTop: "5px", color: "#0d1115b3", fontWeight: 600 }}>Tensor Cores: {option.tensorCores}</p>
              {option.available ? (
                <p style={{ fontSize: "11px", color: '#22c55e', position: 'absolute', bottom: '16px', right: '10px' }}>Available</p>
              ) : (
                <p style={{ fontSize: "11px", color: 'red', position: 'absolute', bottom: '16px', right: '10px' }}>Unavailable</p>
              )}
            </div>
          ))}
        </div>
      </div> */}
      <div className="font-Inter font-[600] text-[16px] text-[#0D1115]/70">Configuration</div>
      <hr className="my-2 border-gray-300" style={{ marginBottom: "20px" }} />
      <FilterGpusbyVram setSelectedGpu={setSelectedOption} selectedLocation={selectedLocation} />
    </div>
  );
};

export default GpuSelectionComponent;
