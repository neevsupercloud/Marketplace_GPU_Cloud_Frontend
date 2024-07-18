import {VM_T} from "../../types";
import useAlert from "../../store/useAlert.ts";
import {copyTextToClipboard, VM_STATES} from "../../data.ts";
import {Tooltip} from "@mui/material";
import {jupyter} from "../../images.ts";
import {BsTerminal} from "react-icons/bs";

export default function DisplayServices({vm}: { vm: VM_T }) {
  const {successToast, errorToast} = useAlert();

  function copySsh() {
    copyTextToClipboard(vm.services.ssh || "no endpoint found")
      .then(done => done ? successToast("copied endpoint") : errorToast("could not copy"));
  }

  if (vm.services.jupyter && vm.state === VM_STATES.RUNNING) return (
    <div className="w-full flex items-center gap-x-6">
      <Tooltip title="Click to open Jupyter Notebook in a new tab">
        <a href={vm.services.jupyter}
           target="_blank">
          <img src={jupyter} alt={vm.distro} className="w-8"/>
        </a>
      </Tooltip>

      <Tooltip title="Click to copy IP address to clipboard">
        <button onClick={copySsh}
                className="flex items-center gap-x-2 shadow rounded-full border border-slate-300 py-1 px-4">
          <p className="text-lg"><BsTerminal/></p>
          <p>{vm.services.ssh}</p>
        </button>
      </Tooltip>
    </div>
  );

  else return <p>None</p>;
}