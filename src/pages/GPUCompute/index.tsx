import { useState, useEffect, useRef } from 'react';
import GpuSelectionComponent from './GpuSelectionComponent';
import CpuSelectionComponent from './CpuSelectionComponent';
import ConfigureDeployment from './ConfigureDeployment';
import AddVolume from './Addvolume'; // Import AddVolume component
import './FilterGpusbyVram.css';
import { useStore } from '../../store';
import Swal from 'sweetalert2';
import backbutton from '../../asset/icons8-back-24.png';
import { useNavigate } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import volume from "../../asset/icons8-storage-24.png";
import location from "../../asset/icons8-location-48.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface GpuOption {
  name: string;
  label: string;
  vram: string;
  available: boolean;
  tensorCores: number;
}

interface CpuOption {
  name: string;
  label: string;
  available: boolean;
  vCPU: number;
  RAM: string;
  Disk: string;
}

interface LocationOption {
  id: string;
  name: string;
}

interface Disk {
  id: string;
  name: string;
  type: string;
  size: string;
  location: string;
  block_size: number;
  created_at: string;
  updated_at: string;
  serial_number: string;
  attached_to: any[];
}

export default function GPUCompute() {
  const [selectedGpu, setSelectedGpu] = useState<any>({});
  const [selectedGpuName, setSelectedGpuName] = useState<string>('Select GPU');
  const [selectedCpu, setSelectedCpu] = useState<any>({});
  const [selectedCpuName, setSelectedCpuName] = useState<string>('Select CPU');
  const [gpuOptions, setGpuOptions] = useState<GpuOption[]>([]);
  const [locationOptions, setLocationOptions] = useState<LocationOption[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('us-northcentral1-a');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNetworkVolumeDropdownOpen, setIsNetworkVolumeDropdownOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false); // Track if any dropdown is open
  const [disks, setDisks] = useState<Disk[]>([]); // Store disks
  const [selectedDiskId, setSelectedDiskId] = useState<string>(''); // Store selected disk ID
  const [selectedDiskName, setSelectedDiskName] = useState<string>('Network Volume'); // Store selected disk name
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open
  const [locationError, setLocationError] = useState(false); // Track location error
  const { setGpuName } = useStore();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const networkVolumeDropdownRef = useRef<HTMLDivElement>(null);

  const Heading = {
    marginLeft: "-100px",
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    lineHeight: 1.5,
    fontWeight: 700,
    fontSize: '20px',
    color: 'rgb(63, 81, 117)',
  };

  useEffect(() => {
    setGpuName(isChecked ? selectedCpuName : selectedGpuName);
  }, [selectedGpuName, selectedCpuName, setGpuName, isChecked]);

  useEffect(() => {
    async function fetchLocationOptions() {
      try {
        const response = await fetch('https://api.mkinf.io/v0/locations', {
          headers: {
            'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
          },
        });
        const data = await response.json();
        const formattedLocationOptions = data.items.map((item: string) => ({
          id: item,
          name: item,
        }));
        setLocationOptions(formattedLocationOptions);
      } catch (error) {
        console.error('Failed to fetch location options:', error);
      }
    }
    fetchLocationOptions();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        networkVolumeDropdownRef.current &&
        !networkVolumeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsNetworkVolumeDropdownOpen(false);
        setIsAnyDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, networkVolumeDropdownRef]);

  const handleBack = () => {
    navigate("/gpu-compute/gpu-dashboard");
  };

  const toggleDropdown = () => {
    const newDropdownState = !isDropdownOpen;
    setIsDropdownOpen(newDropdownState);
    setIsAnyDropdownOpen(newDropdownState || isNetworkVolumeDropdownOpen);
  };

  const toggleNetworkVolumeDropdown = async () => {
    const newDropdownState = !isNetworkVolumeDropdownOpen;
    setIsNetworkVolumeDropdownOpen(newDropdownState);
    setIsAnyDropdownOpen(isDropdownOpen || newDropdownState);

    if (newDropdownState) {
      try {
        const response = await fetch('https://api.mkinf.io/v0/disks', {
          headers: {
            'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
          },
        });
        const data = await response.json();
        const availableDisks = data.items.filter((disk: Disk) => disk.attached_to.length === 0); // Filter disks
        setDisks(availableDisks);
      } catch (error) {
        console.error('Failed to fetch disks:', error);
      }
    }
  };

  const handleDiskSelection = (diskId: string, diskName: string) => {
    setSelectedDiskId(diskId);
    setSelectedDiskName(diskName);
    console.log(`Selected Disk ID: ${diskId}`);
    toggleNetworkVolumeDropdown();
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsNetworkVolumeDropdownOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLocationError = () => {
    setLocationError(true);
    toast.error('You must select a location to create a network volume', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      setLocationError(false);
    }, 3000);
  };

  return (
    <div className="p-5 bg-white rounded-tl-2xl relative">
      <ToastContainer />
      {isAnyDropdownOpen && <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>}
      {isModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20"></div>}
      {isModalOpen && <AddVolume selectedLocation={selectedLocation} onClose={closeModal} onError={handleLocationError} />}
      <div className="flex">
        <img
          className="mr-30 w-8 h-8 cursor-pointer transform transition-transform hover:scale-110"
          onClick={handleBack}
          src={backbutton}
          alt="Back button"
          style={{ marginRight: "120px" }}
          data-tooltip-id="backTooltip"
          data-tooltip-content="Go back"
        />
        <h2 className='font-Inter font-semibold text-2xl mx-5' style={Heading}>Create GPU instance</h2>
        <ReactTooltip id="backTooltip" place="top" />
      </div>

      <div className="flex justify-center rounded-lg ">
        <div className="m-5 p-6 bg-white rounded-lg shadow-lg w-11/12" style={{width:"86%"}}>
          <label className='themeSwitcherTwo relative rounded-lg inline-flex cursor-pointer select-none items-center justify-center bg-white border border-purple-200' style={{borderRadius:"20px"}}>
            <input
              type='checkbox'
              className='sr-only'
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
          </label>

          <div style={{display:"flex"}}>
            <div className="relative inline-block text-left mt-4 mb-4" ref={dropdownRef}>
              <div>
                <button
                  onClick={toggleDropdown}
                  className={`inline-flex justify-center w-full rounded-md border ${locationError ? 'border-red-500' : 'border-gray-300'} shadow-sm px-4 py-2 bg-white text-sm font-medium ${locationError ? 'text-red-500' : 'text-gray-700'} hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-[#673ab7]`}
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <img src={location} alt="Location" className="mr-2 w-4 h-4" />
                  {selectedLocation}
                  <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 12a.75.75 0 01-.53-.22l-3-3a.75.75 0 011.06-1.06L10 10.94l2.47-2.47a.75.75 0 011.06 1.06l-3 3A.75.75 0 0110 12z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg backdrop-blur-sm bg-white bg-opacity-90 ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                  <div className="py-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#673ab7] hover:text-white" onClick={() => { setSelectedLocation('Any'); toggleDropdown(); }}></button>
                    {locationOptions.map((location) => (
                      <button
                        key={location.id}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#673ab7] hover:text-white"
                        onClick={() => { setSelectedLocation(location.name); toggleDropdown(); }}
                      >
                        {location.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative inline-block text-left mt-4 mb-4 ml-4" ref={networkVolumeDropdownRef}>
              <div>
                <button
                  onClick={toggleNetworkVolumeDropdown}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-[#673ab7]"
                  id="network-volume-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  <img src={volume} alt="Volume" className="mr-2 w-4 h-4" />
                  {selectedDiskName}
                  <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 12a.75.75 0 01-.53-.22l-3-3a.75.75 0 011.06-1.06L10 10.94l2.47-2.47a.75.75 0 011.06 1.06l-3 3A.75.75 0 0110 12z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {isNetworkVolumeDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg backdrop-blur-sm bg-white bg-opacity-90 ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                  <div className="py-1">
                    <button
                      className="ml-8 mt-2 text-center px-4 py-2 text-sm text-white-700 hover:bg-[#673ab7] hover:text-white flex items-center justify-center border border-[#673ab7] rounded-[10px]"
                      style={{fontWeight:600,backgroundColor:"#673ab7",color:"white"}}
                      onClick={openModal}
                    >
                      + Network Volume
                    </button>
                    <div style={{marginTop:"15px"}}>

                    {disks.length > 0 && disks.map((disk) => (
                      <button
                        key={disk.id}
                        style={{fontWeight:700}}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#673ab7] hover:text-white"
                        onClick={() => handleDiskSelection(disk.id, disk.name)}
                      >
                        {disk.name}
                      </button>
                    ))}
                    </div>
                   
                  </div>
                </div>
              )}
            </div>
          </div>

          <GpuSelectionComponent
            options={gpuOptions}
            selectedName={selectedGpuName}
            setSelectedName={setSelectedGpuName}
            setSelectedOption={setSelectedGpu}
            selectedLocation={selectedLocation}
            title="GPU"
          />
        </div>
      </div>

      <div id='configure-development' className="flex justify-center p-5">
        <ConfigureDeployment
          selectedGpu={isChecked ? selectedCpu : selectedGpu}
          selectedGpuName={isChecked ? selectedCpuName : selectedGpuName}
          isCpu={isChecked}  // Pass this flag to ConfigureDeployment
          selectedLocation={selectedLocation}
          selectedDiskId={selectedDiskId}
        />
      </div>
    </div>
  );
}
