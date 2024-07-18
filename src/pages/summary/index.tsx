// import { useStore } from "../../store";
// import { getIcon, randomName } from "../../data.ts";
// import { Button, Tag, TagLabel } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { CreateVmPayload } from "../../types";
// import useApi from "../../store/useApi.ts";
// import { BsNvidia } from "react-icons/bs";

// export default function Summary() {
//   const { selectedGpu, newVm } = useStore();
//   const navigate = useNavigate();
//   const { createVm } = useApi();

//   function deploy() {
//     if (!selectedGpu) return console.log("INSUFFICIENT DETAILS");

//     const payload: CreateVmPayload = {
//       cpu: `${selectedGpu.vCpuCount}`,
//       distro: newVm.distro,
//       ram: `${selectedGpu.ramInGb}Gi`,
//       displayName: "vm-" + randomName(),
//       storage: `${selectedGpu.storageInGb}Gi`,
//       gpu: `${selectedGpu.gpu}`,
    
//     };
//     console.log("vm",payload)

//     if (selectedGpu.gpuEnabled) payload.gpu = selectedGpu.gpu;

//     console.log(payload);
//     createVm(payload).then(resp => {
//       if (!resp) return console.log(resp);
//       navigate("/");
//     });
//   }

//   if (!selectedGpu || !newVm) return <p>Loading...</p>;

//   return (
//     <div className="px-4">
//       <div className="container max-w-3xl bg-white p-4 rounded-lg shadow">
//         <p className="text-xl font-semibold">{selectedGpu.planName}</p>
//         <div className="grid w-full border rounded-lg mt-4 border-slate-300 grid-cols-2">
//           <p className="font-semibold p-4 border-b border-slate-300">Number of vCPUs</p>
//           <p className="border-l border-slate-300 p-4 border-b">{selectedGpu.vCpuCount}</p>
//           <p className="font-semibold p-4 border-b border-slate-300">RAM</p>
//           <p className="border-l border-slate-300 p-4 border-b">{selectedGpu.ramInGb} GB</p>
//           <p className="font-semibold p-4 border-b border-slate-300">Storage</p>
//           <p className="border-l border-slate-300 p-4 border-b">{selectedGpu.storageInGb} GB</p>
//           <p className="font-semibold p-4 border-b border-slate-300">Distribution</p>
//           <div className="flex items-center gap-x-2 border-b border-slate-300">
//             <p className="border-l border-slate-300 p-4">{newVm.distro}</p>
//             <img src={getIcon(newVm.distro)} alt={newVm.distro} className="w-8" />
//           </div>
//           {newVm.volumes && newVm.volumes.length > 0 && (
//             <>
//               <p className="font-semibold p-4 border-b border-slate-300">Volumes</p>
//               <div className="flex border-l px-2 items-center gap-x-2 border-b border-slate-300 flex-wrap">
//                 {newVm.volumes?.map(v => (
//                   <Tag
//                     size="lg"
//                     key={v}
//                     borderRadius="full"
//                     variant="solid"
//                     colorScheme="brand"
//                   >
//                     <TagLabel>{v}</TagLabel>
//                   </Tag>
//                 ))}
//               </div>
//             </>
//           )}
//           {selectedGpu.gpuEnabled && (
//             <>
//               <p className="font-semibold p-4 border-b border-slate-300">GPU</p>
//               <div className="flex items-center gap-x-2 border-b border-l pl-4 border-slate-300">
//                 <p className="text-green-500 text-xl"><BsNvidia /></p>
//                 <p>{selectedGpu.gpu}</p>
//               </div>
//             </>
//           )}
//           {/*<p className="font-semibold p-4 border-b border-slate-300">Exposed Ports</p>*/}
//           {/*<p className="border-l border-slate-300 p-4 border-b border-slate-300">{format(newVm.exposedPorts)}</p>*/}
//           <p className="font-semibold p-4">Total Cost</p>
//           <p className="font-semibold text-lg border-l border-slate-300 p-4">₹{selectedGpu.hourlyPriceINR}/hr</p>
//         </div>
//         <div className="grid grid-cols-2 gap-x-4 mt-4">
//           <Button colorScheme="red" variant="outline" onClick={() => navigate(-1)}>
//             Go Back
//           </Button>
//           <Button colorScheme="brand" onClick={deploy}>
//             Deploy
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }