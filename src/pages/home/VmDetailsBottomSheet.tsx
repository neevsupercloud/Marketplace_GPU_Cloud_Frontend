import {useStore} from "../../store";
import {CloseButton} from "@chakra-ui/react";


export default function VmDetailsBottomSheet() {
  const {currVm, setCurrVm} = useStore();

  if (!currVm) return (
    <div className="bg-white h-full p-4">
      <div className="flex items-center justify-between">
        <div className="mb-4">
          <p className="font-bold text-lg">Details</p>
        </div>
        <CloseButton onClick={() => setCurrVm(null)}/>
      </div>
      <div className="bg-white flex justify-center items-center w-full h-full">
        <p className="text-slate-500">No data to display</p>
      </div>
    </div>
  );

  return (
    // <div className="bg-white h-full border-t-2 border-slate-400 p-4">
    //   <div className="flex items-center justify-between">
    //     <div className="mb-4">
    //       <p className="font-bold text-lg">{currVm.displayName}</p>
    //       <p className="text-sm text-slate-500">{currVm.slug}</p>
    //     </div>
    //     <CloseButton onClick={() => setCurrVm(null)}/>
    //   </div>
    //   <Tabs variant="enclosed-colored" className="min-h-full">
    //     <TabList>
    //       <Tab>Details</Tab>
    //       <Tab>Logs</Tab>
    //     </TabList>
    //     <TabPanels className="min-h-full">
    //       <TabPanel className="min-h-full">
    //         <VmDetails vm={currVm}/>
    //       </TabPanel>
    //       <TabPanel>
    //         <p>logs!</p>
    //       </TabPanel>
    //     </TabPanels>
    //   </Tabs>
    // </div>
    <div>p</div>
  );
}

// function VmDetails({vm}: { vm: VM_T }) {
//   const publicIps = vm.publicIPs ? vm.publicIPs.join(", ") : "";
//   const privateIps = vm.privateIPs ? vm.privateIPs.join(", ") : "";
//   const ports = vm.ports ? vm.ports.join(", ") : "";
//   return (
//     <div className="h-full">
//       <div className="grid grid-cols-3 h-full gap-x-4 text-sm">
//         <div className="border-r">
//           <p className="font-semibold">Public IP</p>
//           <CopyText>{publicIps}</CopyText>
//         </div>
//         <div className="border-r">
//           <p className="font-semibold">Private IP</p>
//           <CopyText>{privateIps}</CopyText>
//         </div>
//         <div>
//           <p className="font-semibold">Exposed Ports</p>
//           <CopyText>{ports}</CopyText>
//         </div>
//         <Stack className="mt-4">
//           <p className="font-semibold mb-2">Volumes</p>
//           <div className="grid grid-cols-2 gap-2">
//             {vm.volumes.map(v => (
//               <div className="flex items-center gap-x-2 bg-white border shadow rounded-lg p-2" key={v.name}>
//                 <p className="text-4xl text-brand"><BsDeviceHdd/></p>
//                 <p>{v.name}</p>
//               </div>
//             ))}
//           </div>
//         </Stack>
//       </div>
//     </div>
//   );
// }