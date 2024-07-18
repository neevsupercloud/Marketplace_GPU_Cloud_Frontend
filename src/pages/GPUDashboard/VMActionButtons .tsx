import React from 'react';
// import { toast } from 'react-toastify';
import { VM_T } from '../../types'; // Adjust the import path as needed

interface VMActionButtonsProps {
  vm: VM_T;
  onStart: (vmSlug: string) => void;
  onStop: (vmSlug: string) => void;
  onDelete: (vmSlug: string) => void;
  stoppedVms: string[];
  restartedVms: string[];
}

const VMActionButtons: React.FC<VMActionButtonsProps> = () => {
  // const isStopped = stoppedVms.includes(vm.slug);

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       toast.success('IP copied');
//     });
//   };

  return (
    // <div className="py-2 flex justify-start items-center max-w-max ml-9" style={{ marginLeft: '-25px' }}>
    //   <Tooltip id="my-tooltip2" />
    //   <div
    //     className="p-2 bg-[#ffffff] rounded-full cursor-pointer mx-2 hover:bg-[#EEEEEE]"
    //     data-tooltip-id="my-tooltip2"
    //     data-tooltip-content="Console"
    //     data-tooltip-place="top"
    //     onClick={() => window.open(`${vm?.services?.jupyter ?? ''}`)}
    //   >
    //     <LiaTerminalSolid color="#673ab7" size={23} />
    //   </div>
    //   <div
    //     className="p-2 bg-[#ffffff] rounded-full cursor-pointer mx-2 hover:bg-[#EEEEEE]"
    //     data-tooltip-id="my-tooltip2"
    //     data-tooltip-content="Shutdown"
    //     data-tooltip-place="top"
    //     style={!vm.actions.stop ? { pointerEvents: 'none', opacity: .7 } : {}}
    //     onClick={() => { if (vm.actions.stop) onStop(vm.slug); }}
    //   >
    //     <RiShutDownLine color={vm.actions.stop ? '#673ab7' : '#673ab7'} size={23} />
    //   </div>
    //   <div
    //     className="p-2 bg-[#ffffff] rounded-full cursor-pointer mx-2 hover:bg-[#EEEEEE]"
    //     data-tooltip-id="my-tooltip2"
    //     data-tooltip-content="Restart"
    //     data-tooltip-place="top"
    //     style={(!vm.actions.start || !isStopped) ? { pointerEvents: 'none', opacity: .2 } : {}}
    //     onClick={() => { if (vm.actions.start && isStopped) onStart(vm.slug); }}
    //   >
    //     <TbReload color={vm.actions.start && isStopped ? '#236BF5' : '#0D1115'} size={23} />
    //   </div>
    //   <div
    //     className="p-2 bg-[#ffffff] rounded-full cursor-pointer mx-2 hover:bg-[#EEEEEE]"
    //     data-tooltip-id="my-tooltip2"
    //     data-tooltip-content="Delete"
    //     data-tooltip-place="top"
    //     data-tooltip-variant="error"
    //     style={(!vm.actions.terminate || !isStopped) ? { pointerEvents: 'none', opacity: .2 } : {}}
    //     onClick={() => { if (vm.actions.terminate && isStopped) onDelete(vm.slug); }}
    //   >
    //     <RiDeleteBin6Line color={vm.actions.terminate && isStopped ? '#FF0000' : '#DC2626'} size={23} />
    //   </div>
    // </div>
    <div>d</div>
  );
};

export default VMActionButtons;
