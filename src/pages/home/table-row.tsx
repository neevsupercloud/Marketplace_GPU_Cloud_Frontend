import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tr
} from "@chakra-ui/react";
import {copyTextToClipboard, getIcon, STATUS_COLOR, VM_STATES} from "../../data.ts";
import {jupyter} from "../../images.ts";
import {BiDotsVertical} from "react-icons/bi";
import {VM_T} from "../../types";
import {useStore} from "../../store";
import {BsPower, BsTerminal, BsTrash, BsXOctagon} from "react-icons/bs";
import {useState} from "react";
import DeleteVmModal from "../../components/modals/delete-vm-modal.tsx";
import {Tooltip} from "@chakra-ui/react";
import useAlert from "../../store/useAlert.ts";
import useApi from "../../store/useApi.ts";

interface Props {
  vm: VM_T;
}

export default function TableRow({vm}: Props) {
  const {replaceVm, setCurrVm} = useStore();
  const [vmSlug, setVmSlug] = useState<null | string>(null);
  const {successToast, errorToast} = useAlert();
  const {startVm, stopVm} = useApi();

  function _startVm(vm_slug: string) {
    startVm(vm_slug).then(vm => vm && replaceVm(vm));
  }

  function _stopVm(vm_slug: string) {
    stopVm(vm_slug).then(vm => vm && replaceVm(vm));
  }

  function copySsh() {
    copyTextToClipboard(vm.services.ssh || "no endpoint found")
      .then(done => done ? successToast("copied endpoint") : errorToast("could not copy"));
  }

  return (
    <Tr key={vm.uid} onClick={() => setCurrVm(vm)} className="cursor-pointer">
      <Td>
        <p>{vm.displayName}</p>
        <p className="text-gray-400 text-sm">{vm.slug}</p>
      </Td>
      <Td>
        <p>{vm.cpu}</p>
      </Td>
      <Td>
        <p>{vm.ram}</p>
      </Td>
      <Td>
        <p>{vm.storage}</p>
      </Td>
      <Td className="flex items-center gap-x-4">
        <p>{vm.distro}</p>
        <img src={getIcon(vm.distro)} alt={vm.distro} className="w-8"/>
      </Td>
      <Td><p className={`uppercase font-semibold ${STATUS_COLOR.get(vm.state)}`}>{vm.state}</p></Td>
      {
        vm.services.jupyter && vm.state === VM_STATES.RUNNING ?
          <Td>
            <div className="w-full flex items-center gap-x-6">
              <Tooltip label="Click to open Jupyter Notebook in a new tab">
                <a href={vm.services.jupyter}
                   target="_blank">
                  <img src={jupyter} alt={vm.distro} className="w-8"/>
                </a>
              </Tooltip>

              <Tooltip label="Click to copy IP address to clipboard">
                <button onClick={copySsh}
                        className="flex items-center gap-x-2 shadow rounded-full border border-slate-300 py-1 px-4">
                  <p className="text-lg"><BsTerminal/></p>
                  <p>{vm.services.ssh}</p>
                </button>
              </Tooltip>

            </div>
          </Td>
          :
          <Td>
            <p>None</p>
          </Td>
      }
      {
        (vm.actions.start || vm.actions.stop) && (
          <Td>
            <div className="flex items-center justify-end">
              <Menu>
                <Tooltip label="Click to see more option">
                  <MenuButton
                    as={Button}
                    color="#2a69ac"
                    className="z-0"
                  >
                    <BiDotsVertical/>
                  </MenuButton>
                </Tooltip>
                <MenuList>
                  {vm.actions.start && (
                    <MenuItem onClick={() => _startVm(vm.slug)} className="flex items-center justify-center gap-x-2">
                      <p className="text-green-700"><BsPower/></p>
                      <p className="text-center font-semibold text-green-700">Start</p>
                    </MenuItem>
                  )}
                  {vm.actions.stop && (
                    <MenuItem onClick={() => _stopVm(vm.slug)} className="flex items-center justify-center gap-x-2">
                      <p className="text-red-700"><BsXOctagon/></p>
                      <p className="text-center font-semibold text-red-700">Stop</p>
                    </MenuItem>
                  )}
                  {vm.actions.terminate && (
                    <Tooltip
                      label="Terminate VM will permanently delete the VM. You will lose data stored on ephemeral disk. This action can't be reverted.">
                      <MenuItem className="text-red-500 flex items-center justify-center gap-x-2"
                                onClick={() => setVmSlug(vm.slug)}>
                        <p className="text-red-700"><BsTrash/></p>
                        <p className="text-center font-semibold text-red-700">Delete</p>
                      </MenuItem>
                    </Tooltip>
                  )}
                </MenuList>
              </Menu>
            </div>
          </Td>
        )
      }
      {vmSlug && <DeleteVmModal onClose={() => setVmSlug(null)} vm_slug={vmSlug}/>}
    </Tr>
  );
}