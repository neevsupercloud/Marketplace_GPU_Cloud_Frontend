import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from '../../store';
import { VM_T } from '../../types'; // Adjust the import path as needed
import DeleteVmModal from '../../components/modals/delete-vm-modal';
import Spinner from '../../components/Spinner-loader';
import { RiShutDownLine, RiDeleteBin6Line } from 'react-icons/ri';
import { TbReload } from 'react-icons/tb';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import cpu from "../../asset/icons8-cpu-24.png";
import ram from "../../asset/icons8-ram-66.png";
import storage from "../../asset/white-storage.png";
import ip from "../../asset/icons8-ip-48.png";
import cloud from "../../asset/icons8-cloud-24.png";
import vol from "../../asset/white-storage.png";
import gpuIcon from "../../asset/icons8-cloud-computing-25.png"; // Add GPU icon

const renderGpuInfo = (type: string) => {
  switch (type) {
    case 'a100.1x':
    case 'a100.2x':
    case 'a100.4x':
    case 'a100.8x':
      return 'Nvidia A100 ';
    case 'a100-80gb.1x':
    case 'a100-80gb.2x':
    case 'a100-80gb.4x':
    case 'a100-80gb.8x':
      return 'Nvidia A100';
    case 'a40.1x':
    case 'a40.2x':
    case 'a40.4x':
    case 'a40.8x':
      return 'Nvidia A40';
    case 'l40s-48gb.1x':
    case 'l40s-48gb.2x':
    case 'l40s-48gb.4x':
    case 'l40s-48gb.8x':
    case 'l40s-48gb.10x':
      return 'Nvidia L40S ';
    default:
      return 'CPU';
  }
};

const STATUS_COLOR: { [key: string]: string } = {
  STATE_SHUTOFF: 'text-red-500',
  STATE_PAUSED: 'text-yellow-500',
  STATE_RUNNING: 'text-green-500',
};

const renderStatus = (state: string) => {
  switch (state) {
    case 'STATE_SHUTOFF':
      return <span className="text-[#3f5175]">Stopped</span>;
    case 'STATE_SHUTDOWN':
      return (
        <span className="text-[#3f5175]">
          Stopping
          <span className="loading-dots">...</span>
        </span>
      );
    case 'STATE_PAUSED':
      return (
        <span className="text-[#3f5175]">
          On Progress
          <span className="loading-dots">...</span>
        </span>
      );
    case 'STATE_DEFINING':
      return (
        <span className="text-[#3f5175]">
          On Progress
          <span className="loading-dots">...</span>
        </span>
      );
    case 'STATE_RUNNING':
      return <span className="text-[#3f5175]">Running</span>;
    default:
      return state;
  }
};

function InstanceCards() {
  const { setCurrVm } = useStore();
  const { slug } = useParams<{ slug: string }>();
  const [vmState, setVmState] = useState<VM_T | null>(null);
  const [vmSlug, setVmSlug] = useState<null | string>(null);
  const [stateChanged, setStateChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const retryCount = useRef(0);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const fetchVmDetails = async () => {
    try {
      const response = await fetch(`https://api.mkinf.io/v0/vms/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
        },
      });
      const data = await response.json();
      setVmState(data);
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching VM details:', error);
      toast.error('Error fetching VM details');
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchVmDetails();
  }, [slug, stateChanged]);

  const handleApiPolling = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    intervalId.current = setInterval(() => {
      fetchVmDetails();
    }, 2000);

    setTimeout(() => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }, 50 * 60 * 1000); // Stop after 50 minutes
  };

  const handleStopVm = async (vmSlug: string) => {
    try {
      const response = await fetch(`https://api.mkinf.io/v0/vms/${vmSlug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
        },
        body: JSON.stringify({ action: 'STOP' }),
      });
      if (response.ok) {
        toast.success('VM shutdown successfully');
        setStateChanged(!stateChanged);
        handleApiPolling(); // Start polling after action
      } else {
        throw new Error('Error shutting down VM');
      }
    } catch (error) {
      console.error('Error shutting down VM:', error);
      toast.error('Error shutting down VM');
    }
  };

  const handleStartVm = async (vmSlug: string) => {
    try {
      const response = await fetch(`https://api.mkinf.io/v0/vms/${vmSlug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
        },
        body: JSON.stringify({ action: 'START' }),
      });
      if (response.ok) {
        toast.success('VM restarted successfully');
        setStateChanged(!stateChanged);
        handleApiPolling(); // Start polling after action
      } else {
        throw new Error('Error restarting VM');
      }
    } catch (error) {
      console.error('Error restarting VM:', error);
      toast.error('Error restarting VM');
    }
  };

  const handleDeleteVm = async (vmSlug: string) => {
    try {
      const response = await fetch(`https://api.mkinf.io/v0/vms/${vmSlug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
        },
      });
      if (response.ok) {
        toast.success('VM deleted successfully');
        setVmSlug(null);
        handleApiPolling(); // Start polling after action
      } else {
        throw new Error('Error deleting VM');
      }
    } catch (error) {
      console.error('Error deleting VM:', error);
      toast.error('Error deleting VM');
    }
  };

  const renderAction = (vm: VM_T) => {
    const isRunning = vm.state === "STATE_RUNNING";
    const isStopped = vm.state === "STATE_SHUTOFF";
    const buttonStyle = {
      backgroundColor: '#ffffff',
      borderRadius: '0.25rem',
      color: '#212529',
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.375rem 0.75rem',
      cursor: 'pointer',
      fontSize: '1rem',
      margin: '0.25rem',
      border: '1px solid #e2e8f0',
      transition: 'background-color 0.3s ease'
    };

    const buttonDisabledStyle = {
      ...buttonStyle,
      opacity: 0.6,
      cursor: 'not-allowed',
    };

    return (
      <div className="p-4 bg-[#ffffff] shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-[#3f5175]" >Server Actions</h2>
        <Tooltip id="my-tooltip2" />
        <div className="flex flex-row justify-start items-center space-x-4">
          <div
            className="cursor-pointer bg-[#ffffff] shadow-md rounded-lg"
            data-tooltip-id="my-tooltip2"
            data-tooltip-content="Shutdown"
            data-tooltip-place="top"
            onClick={() => { if (isRunning) handleStopVm(vm.id); }}
            style={isRunning ? buttonStyle : buttonDisabledStyle}
          >
            <RiShutDownLine color={isRunning ? '#673ab7' : '#673ab7'} size={23} />
            <span className="text-[#3f5175]" style={{ marginLeft: '0.5rem' }}>Shut down</span>
          </div>
          <div
            className="cursor-pointer bg-[#ffffff] shadow-md rounded-lg"
            data-tooltip-id="my-tooltip2"
            data-tooltip-content="Restart"
            data-tooltip-place="top"
            onClick={() => { if (isStopped) handleStartVm(vm.id); }}
            style={isStopped ? buttonStyle : buttonDisabledStyle}
          >
            <TbReload color={isStopped ? '#236BF5' : '#0D1115'} size={23} />
            <span className="text-[#3f5175]" style={{ marginLeft: '0.5rem' }}>Restart</span>
          </div>
          <div
            className="cursor-pointer bg-[#ffffff] shadow-md rounded-lg"
            data-tooltip-id="my-tooltip2"
            data-tooltip-content="Delete"
            data-tooltip-place="top"
            data-tooltip-variant="error"
            onClick={() => { if (isStopped) setVmSlug(vm.id); }}
            style={isStopped ? buttonStyle : buttonDisabledStyle}
          >
            <RiDeleteBin6Line color={isStopped ? '#FF0000' : '#DC2626'} size={23} />
            <span className="text-[#3f5175]" style={{ marginLeft: '0.5rem' }}>Delete</span>
          </div>
        </div>
      </div>
    );
  };

  const cards = vmState ? [
    { title: 'GPU Type', value: vmState.type, icon: cpu },
    { title: 'Instance Name', value: vmState.name, icon: cpu },
    { title: 'RAM', value: '128GiB', icon: ram },
    { title: 'Booted From Volume', value: vmState.disks && vmState.disks.length > 0 ? vmState.disks[0].size : 'No disks', icon: vol },
    { title: 'Location', value: vmState.location, icon: cloud },
    { title: 'Status', value: renderStatus(vmState.state), icon: storage }, // Use renderStatus for status
    { title: 'IPv4', value: vmState.network_interfaces && vmState.network_interfaces.length > 0 ? vmState.network_interfaces[0].ips[0].public_ipv4.address : '', isCopyable: true, icon: ip },
    { title: 'VM', value: renderGpuInfo(vmState.type), icon: gpuIcon } // Add GPU card
  ] : [];

  return (
    <div className="p-4">
      <ToastContainer />
      {isLoading ? ( // Display spinner while loading
        <div className="flex justify-center items-center h-96">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {cards.map((card, index) => (
              <div key={index} className="bg-[#ffffff] shadow-md rounded-lg p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-[#3f5175]">{card.title}</h2>
                  <p
                    className={`mt-2 text-[#3f5175] ${card.isCopyable ? 'cursor-pointer' : ''}`}
                    onClick={() => card.isCopyable && card.value && navigator.clipboard.writeText(card.value)}
                  >
                    {card.value}
                  </p>
                </div>
                {card.icon && (
                  <div className="w-12 h-12 bg-[#673ab7] rounded-full flex items-center justify-center">
                    <img src={card.icon} alt={card.title} className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
          {vmState && renderAction(vmState)}
          {vmSlug && <DeleteVmModal onClose={() => setVmSlug(null)} vm_slug={vmSlug} />}
        </>
      )}
    </div>
  );
}

export default InstanceCards;
