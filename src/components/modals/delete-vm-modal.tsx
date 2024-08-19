import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useStore } from "../../store";

interface Props {
  onClose: () => void;
  vm_slug: string;
}

export default function DeleteVmModal({ onClose, vm_slug }: Props) {
  const [confirmName, setConfirmName] = useState("");
  const { setAllVms } = useStore();
  const navigate = useNavigate();

  async function terminateVm(vm_slug: string) {
    try {
      const response = await fetch(`https://api.mkinf.io/v0/vms/${vm_slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const vms = await response.json();
      setAllVms(vms);
      navigate("/gpu-compute/gpu-dashboard");
    } catch (error) {
      console.error('Error deleting VM:', error);
    } finally {
      onClose();
    }
  }

  return (
    <div className="fixed z-50 left-0 top-0 w-screen h-screen bg-black/[.5] backdrop-blur-sm flex justify-center items-center">
      <div className="container max-w-2xl rounded-lg bg-white shadow-lg">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <p className="font-semibold text-black text-lg">Delete {vm_slug}</p>
        </div>
        <div className="p-4 rounded-b-lg flex flex-col gap-y-4">
          <FormControl>
            <FormLabel>To confirm, type "{vm_slug}" in the box below</FormLabel>
            <Input
              value={confirmName}
              onChange={e => setConfirmName(e.target.value)}
            />
          </FormControl>
          <div className="w-full grid grid-cols-2 gap-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              isDisabled={confirmName !== vm_slug}
              onClick={() => terminateVm(vm_slug)}
              className="gradient-button"
              style={{backgroundColor:"linear-gradient(to left, rgb(181, 44, 246), rgb(74, 145, 247));"}}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
