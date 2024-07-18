import React, { useState, useEffect } from "react";
import { useStore } from "../../store";
import { Button, IconButton} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowsAngleExpand } from "react-icons/bs";
import moment from "moment";
import ResizeVolumeModal from "./updatevolume.tsx";
import AddVolumeModal from "../../components/modals/add-volume-modal";
import DeleteVolumeModal from "../../components/modals/delete-volume-modal";
import Spinner from "../../components/Spinner-loader.tsx";

interface Volume {
  id: string;
  name: string;
  size: string;
  attached_to: any[];
  created_at: string;
}

interface DetailedVolume extends Volume {
  type: string;
  location: string;
  block_size: number;
  updated_at: string;
  serial_number: string;
}

export default function Volumes() {
  const { setVolumes, currOrg } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResizeModal, setShowResizeModal] = useState(false);
  const [volumeToDelete, setVolumeToDelete] = useState<Volume | null>(null);
  const [volumeToResize, setVolumeToResize] = useState<Volume | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailedVolume, setDetailedVolume] = useState<DetailedVolume | null>(null);
  const [selectedVolumeIndex, setSelectedVolumeIndex] = useState<number | null>(null);
  const [vmName, setVmName] = useState<string | null>(null);
  const { volumes } = useStore();

  const fetchVolumes = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.mkinf.io/v0/disks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setVolumes(data.items);
      } else {
        console.error('Failed to fetch volumes:', data.message);
      }
    } catch (error) {
      console.error('Error fetching volumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVmDetails = async (vmId: string) => {
    try {
      const response = await fetch(`https://api.mkinf.io/v0/vms/${vmId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setVmName(data.name);
      } else {
        console.error('Failed to fetch VM details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching VM details:', error);
    }
  };

  const fetchDetailedVolume = async (id: string, index: number) => {
    if (selectedVolumeIndex === index) {
      setDetailedVolume(null);
      setSelectedVolumeIndex(null);
      return;
    }

    try {
      const response = await fetch(`https://api.mkinf.io/v0/disks/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setDetailedVolume(data);
        setSelectedVolumeIndex(index);
        if (data.attached_to.length > 0) {
          fetchVmDetails(data.attached_to[0].vm_id);
        } else {
          setVmName(null);
        }
      } else {
        console.error('Failed to fetch detailed volume info:', data.message);
      }
    } catch (error) {
      console.error('Error fetching detailed volume info:', error);
    }
  };

  const handleResizeVolume = async (newSize: string) => {
    if (volumeToResize) {
      try {
        const response = await fetch(`https://api.mkinf.io/v0/disks/${volumeToResize.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
          },
          body: JSON.stringify({ size: newSize + "GiB" }),
        });
        const data = await response.json();
        if (response.ok) {
          setRefresh(!refresh);
        } else {
          console.error('Failed to resize volume:', data.message);
        }
      } catch (error) {
        console.error('Error resizing volume:', error);
      }
    }
  };

  useEffect(() => {
    fetchVolumes();
  }, [currOrg, refresh]);

  return (
    <div className="p-5 bg-white min-h-full rounded-tl-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl text-gray-900">Volume</h2>
        <Button
          leftIcon={<FiRefreshCw />}
          onClick={() => { setRefresh(!refresh) }}
          style={{
            backgroundImage: 'linear-gradient(to left, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))',
            width: '135px',
            transition: 'transform 0.3s',
          }}
          variant="solid"
          color="white"
          borderRadius="md"
          _hover={{
            bg: 'white',
            color: 'white',
            transform: 'translateY(-2px)', // Move the button slightly upwards on hover
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
          }}
          padding="20px"
        >
          Refresh
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner />
        </div>
      ) : (
        <table className="border-separate border-spacing-y-2 w-full mx-auto">
          <thead>
            <tr>
              <th className="bg-white text-left text-gray-600 border-y border-l border-gray-200 rounded-l-lg py-2 px-4">Name</th>
              <th className="bg-white text-left text-gray-600 border-y border-gray-200 py-2 px-4">Storage</th>
              <th className="bg-white text-left text-gray-600 border-y border-gray-200 py-2 px-4">Status</th>
              <th className="bg-white text-left text-gray-600 border-y border-gray-200 py-2 px-4">Created at</th>
              <th className="bg-white text-left text-gray-600 border-y border-r border-gray-200 rounded-r-lg py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {volumes?.map((vm, i) => (
              <React.Fragment key={i}>
                <tr 
                  onClick={() => fetchDetailedVolume(vm.id, i)} 
                  className='hover:shadow-xl hover:drop-shadow-xl hover:rounded-lg cursor-pointer'
                >
                  <td className="bg-white border-y border-l border-gray-200 rounded-l-lg py-2 px-4">
                    <div className='flex flex-col items-start'>
                      <h5 className='font-semibold text-lg text-gray-900'>{vm?.name}</h5>
                    </div>
                  </td>
                  <td className="bg-white border-y border-gray-200 py-2 px-4">
                    <div className='flex flex-col items-start'>
                      <h5 className='font-medium text-sm text-gray-700'>{vm?.size}</h5>
                    </div>
                  </td>
                  <td className={`bg-white border-y border-gray-200 font-semibold text-sm py-2 px-4 ${vm?.attached_to.length === 0 ? "text-blue-600" : "text-yellow-600"}`}>
                    {vm?.attached_to.length === 0 ? "Available" : "In Use"}
                  </td>
                  <td className="bg-white border-y border-gray-200 font-medium text-sm text-gray-700 py-2 px-4">
                    {moment(vm?.created_at).format("DD-MM-YYYY HH:mm")}
                  </td>
                  <td className="bg-white border-y border-r border-gray-200 rounded-r-lg py-2 px-4">
                    <div className="flex gap-2 items-center">
                      <IconButton
                        icon={<BsArrowsAngleExpand />}
                        aria-label="Resize Volume"
                        onClick={(e) => { e.stopPropagation(); setVolumeToResize(vm); setShowResizeModal(true); }}
                        variant="ghost"
                      />
                      <IconButton
                        icon={<RiDeleteBin6Line color="#FF0000" size={25} />}
                        aria-label="Delete Volume"
                        onClick={(e) => { e.stopPropagation(); setVolumeToDelete(vm); }}
                        variant="ghost"
                      />
                    </div>
                  </td>
                </tr>
                {selectedVolumeIndex === i && detailedVolume && (
                  <tr className="bg-gray-100">
                    <td colSpan={5} className="p-4">
                      <div className="flex flex-col lg:flex-row justify-between gap-6">
                        <div className="flex flex-col">
                          <span className="font-bold">Name:</span> {detailedVolume.name}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">Type:</span> {detailedVolume.type}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">Size:</span> {detailedVolume.size}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">Location:</span> {detailedVolume.location}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">Block Size:</span> {detailedVolume.block_size}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">Created At:</span> {moment(detailedVolume.created_at).format("DD-MM-YYYY HH:mm")}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">Updated At:</span> {moment(detailedVolume.updated_at).format("DD-MM-YYYY HH:mm")}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">Attached To:</span> {vmName ? vmName : "None"}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
      {showAddModal && <AddVolumeModal onClose={() => setShowAddModal(false)} />}
      {showResizeModal && volumeToResize && (
        <ResizeVolumeModal
          isOpen={showResizeModal}
          onClose={() => setShowResizeModal(false)}
          onResize={handleResizeVolume}
        />
      )}
      {volumeToDelete && <DeleteVolumeModal vol_name={volumeToDelete.id} onClose={() => setVolumeToDelete(null)} />}
    </div>
  );
}
