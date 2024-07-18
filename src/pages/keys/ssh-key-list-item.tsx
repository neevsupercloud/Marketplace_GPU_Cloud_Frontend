import { SshKey } from "../../types";
import useApi from "../../store/useApi.ts";
import { useStore } from "../../store";
import { FaKey } from "react-icons/fa";
import { format } from "date-fns";
import { RiDeleteBin6Line } from "react-icons/ri";
// import copy from '../../asset/icons8-copy-30.png';
import { Tooltip } from "@chakra-ui/react";
// import Swal from 'sweetalert2';

export default function SshKeyListItem({ k }: { k: SshKey }) {
  const { deleteSshKey } = useApi();
  const { setSshKeys } = useStore();

  async function deleteKey() {
    try {
      const keys = await deleteSshKey(`${k.keyID}`);
      setSshKeys(keys);
    } catch (error) {
      console.error("Error deleting SSH key:", error);
    }
  }

  // function copyToClipboard() {
  //   navigator.clipboard.writeText(k.key);
  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Copied!',
  //     text: 'SSH Key copied to clipboard',
  //     timer: 1500,
  //     showConfirmButton: false
  //   });
  // }

  return (
    <tr key={k.keyID} className="border-b border-slate-200">
      <td className="px-4 py-2 text-left">
        <div className="flex items-center">
          <FaKey className="text-slate-400" />
          <p className="font-bold ml-2" style={{color:"#3f5175"}}>{k.name}</p>
        </div>
      </td>
      <td className="px-4 py-2 text-left">
        <p className="text-sm text-slate-500" style={{color:"#3f5175"}}>{format(new Date(k.createdAt), "yyyy-MM-dd")}</p>
      </td>
      <td className="px-4 py-2 text-center flex space-x-2 justify-center">
        {/* <Tooltip label="Copy SSH Key" aria-label="Copy SSH Key">
          <div
            className="p-2 rounded-full cursor-pointer mx-2 bg-[#EEEEEE]"
            onClick={copyToClipboard}
          >
            <img src={copy} alt="Copy SSH Key" className="w-5 h-5 mt-0.5"  />
          </div>
        </Tooltip> */}
        <Tooltip label="Delete" aria-label="Delete">
          <div
            className="p-2 rounded-full cursor-pointer mx-2 bg-[#EEEEEE]"
            onClick={deleteKey}
          >
            <RiDeleteBin6Line className="mt-0.5" color='#FF0000' size={20} />
          </div>
        </Tooltip>
      </td>
    </tr>
  );
}
