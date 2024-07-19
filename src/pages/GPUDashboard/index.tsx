import { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { BiPlus, BiRefresh } from 'react-icons/bi';
import { RiShutDownLine, RiDeleteBin6Line } from 'react-icons/ri';
import { TbReload } from 'react-icons/tb';
import { Tooltip } from 'react-tooltip';
import Spinner from '../../components/Spinner-loader';
import { useStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';
import '../../../src/index.css';
import DeleteVmModal from '../../components/modals/delete-vm-modal'; // Import the modal component

const STATUS_COLOR: { [key: string]: string } = {
  STATE_SHUTOFF: 'text-red-500',
  STATE_PAUSED: 'text-yellow-500',
  STATE_RUNNING: 'text-green-500',
};

export default function GPUDashboard() {
  const { setAllVms, setVmCount, setOperationId, allVms, operation_id } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVmId, setSelectedVmId] = useState<string | null>(null);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    const fetchOperationStatus = async () => {
      if (!operation_id) return;

      try {
        const response = await fetch(`https://api.mkinf.io/v0/vms/operations/${operation_id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
          },
        });

        const result = await response.json();

        if (result.state === 'FAILED') {
          toast.error(`Out of Stock, Please try for different location`);
          setLoading(false);
          setOperationId("")

          return;
        }

        fetchVms();
      } catch (error) {
        console.error('Error fetching operation status:', error);
        setLoading(false);
      }
    };

    const fetchVms = async () => {
      try {
        const response = await fetch('https://api.mkinf.io/v0/vms', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
          },
        });
        const result = await response.json();
        const vms = result.items;
        setAllVms(vms);
        setVmCount(vms.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching VMs:', error);
        setLoading(false);
      }
    };

    const startInterval = () => {
      fetchOperationStatus();
      const operationIntervalId = setInterval(fetchOperationStatus, 2000); // Run fetchOperationStatus every 2 seconds
      setTimeout(() => clearInterval(operationIntervalId), 6000); // Clear interval after 6 seconds (3 times)
      const vmsIntervalId = setInterval(fetchVms, 3000); // Continue fetching VMs every 3 seconds
      return () => {
        clearInterval(operationIntervalId);
        clearInterval(vmsIntervalId);
      };
    };

    const clearIntervals = startInterval();

    return () => {
      clearIntervals();
    };
  }, [operation_id]);



  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!allVms) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('IP copied');
    });
  };

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

  const renderStatus = (state: string) => {
    switch (state) {
      case 'STATE_SHUTOFF':
        return <span className="text-red-500" style={{ marginLeft: "11px" }} >Stopped</span>;
      case 'STATE_SHUTDOWN':
        return (
          <span className="text-yellow-500" style={{ marginLeft: "11px" }}>
            Stopping
            <span className="loading-dots">...</span>
          </span>
        );
      case 'STATE_PAUSED':
        return (
          <span className="text-yellow-500" style={{ marginLeft: "11px" }}>
            On Progress
            <span className="loading-dots">...</span>
          </span>
        );
      case 'STATE_DEFINING':
        return (
          <span className="text-yellow-500" style={{ marginLeft: "11px" }}>
            On Progress
            <span className="loading-dots">...</span>
          </span>
        );
      case 'STATE_RUNNING':
        return <span className="text-green-500" style={{ marginLeft: "11px" }}>Running</span>;
      default:
        return state;
    }
  };

  const handleDelete = (vmId: string, state: string) => {
    if (state !== 'STATE_SHUTOFF') return;
    setSelectedVmId(vmId);
    setIsDeleteModalOpen(true);
  };

  const handleRestart = async (vmId: string, state: string) => {
    if (state !== 'STATE_SHUTOFF') return;

    try {
      const response = await fetch(`https://api.mkinf.io/v0/vms/${vmId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl`,
        },
        body: JSON.stringify({ action: 'START' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('VM restarted successfully:', result);
      toast.success('VM restarted successfully');
      handleRefresh();
    } catch (error) {
      console.error('Error restarting VM:', error);
      toast.error('Error restarting VM');
    }
  };

  const handleShutdown = async (vmId: string, state: string) => {
    if (state !== 'STATE_RUNNING') return;

    try {
      const response = await fetch(`https://api.mkinf.io/v0/vms/${vmId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl`,
        },
        body: JSON.stringify({ action: 'STOP' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('VM shutdown successfully:', result);
      toast.success('VM shutdown successfully');
      handleRefresh();
    } catch (error) {
      console.error('Error shutting down VM:', error);
      toast.error('Error shutting down VM');
    }
  };

  return (
    <div className="p-5 bg-[#ffffff] min-h-full rounded-tl-[20px]">
      <div className="flex justify-between items-center flex-wrap mb-4">
        <h2 className='font-Inter font-[600] text-[28px] text-[#3F5175] mx-5'>Compute Dashboard</h2>
        <div className="flex justify-end flex-wrap">
          <Button
            leftIcon={<BiPlus style={{ marginRight: '-5px' }} />}
            onClick={() => { navigate('/gpu-compute/create-gpu-instance'); }}
            style={{
              backgroundImage: 'linear-gradient(to left, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))',
              width: '160px',
              transition: 'transform 0.3s',
            }}
            variant="solid"
            color="white"
            borderRadius="7px"
            _hover={{
              bg: 'white',
              color: 'white',
              transform: 'translateY(-2px)',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
            }}
            marginX="18px"
            padding="20px"
            className='font-Inter'
          >
            Create Instance
          </Button>
          <Button
            leftIcon={<BiRefresh style={{ marginRight: '-5px' }} />}
            onClick={handleRefresh}
            style={{
              backgroundImage: 'linear-gradient(to left, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))',
              width: '135px',
              transition: 'transform 0.3s',
            }}
            variant="solid"
            color="white"
            borderRadius="7px"
            _hover={{
              bg: 'white',
              color: 'white',
              transform: 'translateY(-2px)',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
            }}
            marginX="18px"
            padding="20px"
            className='font-Inter'
          >
            Refresh
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-y-2 w-[97.5%] min-[1600px]:table-fixed mx-auto">
          <thead>
            <tr>
              <th className="bg-white text-start text-[#3F5175] border-y border-l border-[#0D11151A]/10 rounded-l-[8px] py-2 px-4">Instance</th>
              <th className="bg-white text-start text-[#3F5175] border-y border-[#0D11151A]/10 py-2 px-4">Configuration</th>
              <th className="bg-white text-start text-[#3F5175] border-y border-[#0D11151A]/10 py-2 px-4">Status</th>
              <th className="bg-white text-start text-[#3F5175] border-y border-[#0D11151A]/10 py-2 px-4">Location</th>
              <th className="bg-white text-start text-[#3F5175] border-y border-[#0D11151A]/10 py-2 px-4">IP Address</th>
              <th className="bg-white text-start text-[#3F5175] border-y border-r border-[#0D11151A]/10 rounded-r-[8px] ml-8 py-2 px-12">Action</th>
            </tr>
          </thead>
          <tbody>
            {allVms?.length > 0 ?
              allVms.map((vm: any, i: number) => (
                <tr className='hover:shadow-xl hover:drop-shadow-xl hover:rounded-[8px] cursor-pointer' key={i}>
                  <td className="bg-white border-y border-l border-[#0D11151A]/10 rounded-l-[8px] py-2 px-4" onClick={() => { navigate(`/gpu-compute/about-instance/${vm.id}`); }}>
                    <div className='flex flex-col items-start'>
                      <h5 className='font-Inter text-[13px] font-[600]'>{vm.name}</h5>
                      <h5 className='font-Inter text-[13px] font-[600]'>{renderGpuInfo(vm.type)}</h5>
                    </div>
                  </td>
                  <td className="bg-white border-y border-[#0D11151A]/10 py-2 px-4" onClick={() => { navigate(`/gpu-compute/about-instance/${vm.id}`); }}>
                    <div className='flex flex-col items-start'>
                      <h5 className='font-Inter font-[400] text-[12px] text-[#0D1115B8]/72'>{vm.type}</h5>
                      <h5 className='font-Inter font-[400] text-[12px] text-[#0D1115B8]/72'>{vm.disks && vm.disks.length > 0 ? vm.disks[0].size : 'No disks'} Storage</h5>
                    </div>
                  </td>
                  <td className={`bg-white border-y border-[#0D11151A]/10 p-2 text-start ${STATUS_COLOR[vm.state]} font-[600] font-Inter text-[12px]`} style={{ width: "120px" }} onClick={() => { navigate(`/gpu-compute/about-instance/${vm.id}`); }}>
                    {renderStatus(vm.state)}
                  </td>
                  <td className="bg-white border-y border-[#0D11151A]/10 font-Inter text-start font-[400] text-[12px] text-[#0D1115B8]/72 py-2 px-4" onClick={() => { navigate(`/gpu-compute/about-instance/${vm.id}`); }}>{vm.location}</td>
                  <td className="bg-white border-y border-[#0D11151A]/10 font-Inter text-start font-[400] text-[12px] text-[#0D1115B8]/72 py-2 px-4 cursor-pointer" onClick={() => copyToClipboard(vm.network_interfaces && vm.network_interfaces.length > 0 && vm.network_interfaces[0].ips && vm.network_interfaces[0].ips.length > 0 && vm.network_interfaces[0].ips[0].public_ipv4.address ? vm.network_interfaces[0].ips[0].public_ipv4.address : '')}>
                    {vm.network_interfaces && vm.network_interfaces.length > 0 && vm.network_interfaces[0].ips && vm.network_interfaces[0].ips.length > 0 && vm.network_interfaces[0].ips[0].public_ipv4.address ? vm.network_interfaces[0].ips[0].public_ipv4.address : ''}
                  </td>
                  <td className="bg-white border-y border-r border-[#0D11151A]/10 font-Inter text-start font-[400] text-[12px] text-[#0D1115B8]/72 py-2 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-full ${vm.state !== 'STATE_SHUTOFF' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#EEEEEE]'}`} data-tooltip-id="delete-tooltip" data-tooltip-content="Delete" onClick={() => handleDelete(vm.id, vm.state)}>
                        <RiDeleteBin6Line color="#FF0000" size={20} />
                      </div>
                      <div className={`p-2 rounded-full ${vm.state !== 'STATE_SHUTOFF' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#EEEEEE]'}`} data-tooltip-id="restart-tooltip" data-tooltip-content="Restart" onClick={() => handleRestart(vm.id, vm.state)}>
                        <TbReload color="#236BF5" size={20} />
                      </div>
                      <div className={`p-2 rounded-full ${vm.state !== 'STATE_RUNNING' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-[#EEEEEE]'}`} data-tooltip-id="shutdown-tooltip" data-tooltip-content="Shutdown" onClick={() => handleShutdown(vm.id, vm.state)}>
                        <RiShutDownLine color="#673ab7" size={20} />
                      </div>
                    </div>
                    <Tooltip id="delete-tooltip" />
                    <Tooltip id="restart-tooltip" />
                    <Tooltip id="shutdown-tooltip" />
                  </td>
                </tr>
              ))
              :
              <tr>
              <td colSpan={6} className="text-center py-4">
                  <div className="text-center">
                      <img 
                          src='https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721347200&semt=ais_user' 
                          style={{ display: "block", margin: "0 auto",width:"300px",height:"240px",opacity:0.5 }} 
                          alt="No data concept"
                      />
                      <div style={{opacity:0.5,color:"#3f5175",fontWeight:600}}>Deploy your first Gpu Vm !!</div>
                  </div>
              </td>
          </tr>
          
            }
          </tbody>
        </table>
      </div>

      {isDeleteModalOpen && selectedVmId && (
        <DeleteVmModal
          onClose={() => setIsDeleteModalOpen(false)}
          vm_slug={selectedVmId}
        />
      )}
      <ToastContainer />
    </div>
  );
}
