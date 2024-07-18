import { ENDPOINTS } from "../../store/api";
import { useQuery } from '../../store/api';
import { useStore } from '../../store';

import { useParams } from 'react-router-dom';
import { useState } from "react";
import Swal from "sweetalert2";

function RescaleGPU() {
  const {auth} = useStore();
  const { slug } = useParams();
  const [ram, setRam] = useState<number | null>(null);
  const [cpu, setCpu] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null); // State to keep track of the selected row

  const { currOrg } = useStore();
  const { _put, project_slug, } = useQuery();

  const handleRowClick = (cpuValue: number, ramValue: number, rowIndex: number) => {
    setCpu(cpuValue);
    setRam(ramValue);
    setSelectedRow(rowIndex); // Set the selected row index
  };

  const handleRescale = () => {
    if (cpu === null || ram === null) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Please select one of the servers to rescale.'
      });
      return;
    }

    if (!currOrg || !project_slug || !slug) {
      console.error("Organization, project, or VM identifier is missing.");
      return;
    }

    const body = {
      name: slug,
      ram: `${ram}Gi`,
      cpu: `${cpu}`
    };
     
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth}`, // Pass the access token in the header
      'Content-Type': 'application/json',
    };

    _put<any>(ENDPOINTS.updateVm(currOrg, project_slug), body, { headers })
      .then((response: any) => {
        console.log("VM rescaled successfully:", response);
      })
      .catch((error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'An error occurred while rescaling the VM.'
        });
      });
  };

  return (
    <div className="m-5 p-[25px] rounded-lg shadow bg-[#ffffff]" style={{ marginTop: "19px", borderRadius: "5px" }}>
      <h1 className="text-2xl font-semibold text-blue-900 mb-4">Upgrade Server</h1>
      <p className="text-sm text-gray-700 mb-4 text-[#223354b3]">
        This action involves a short period of server downtime, as it is recreated using larger hardware.
        After enlarging, the Server cannot be shrunk automatically. Reducing the disk can damage the data, making it impossible.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ display: "flex", flexDirection: "column" }}>
        <div className="border border-gray-300 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700 text-[#223354b3]">Select the new Hardware</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200 text-[#223354b3]">NAME</th>
              <th className="px-4 py-2 bg-gray-200 text-[#223354b3]">CPU</th>
              <th className="px-4 py-2 bg-gray-200 text-[#223354b3]">RAM</th>
              <th className="px-4 py-2 bg-gray-200 text-[#223354b3]">STORAGE</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "TitanThunder", cpu: 48, ram: 240 },
              { name: "HyperNova", cpu: 16, ram: 64 },
              { name: "GPU-3090-24G", cpu: 16, ram: 32 },
              { name: "NebulaNucleus", cpu: 4, ram: 16 },
            ].map((server, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(server.cpu, server.ram, index)}
                className={`hover:bg-[#daceef] cursor-pointer ${selectedRow === index ? 'bg-[#daceef] text-[#374151]' : 'hovered-row'}`}
              >
                <td className="border-b border-gray-300 px-4 py-2 text-center">{server.name}</td>
                <td className="border-b border-gray-300 px-4 py-2 text-center">{server.cpu}</td>
                <td className="border-b border-gray-300 px-4 py-2 text-center">{server.ram} GB RAM</td>
                <td className="border-b border-gray-300 px-4 py-2 text-center">0 GB</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={handleRescale}
            style={{ background: 'linear-gradient(to left, rgb(181, 44, 246), rgb(74, 145, 247))', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
            Rescale
          </button>
        </div>
      </div>
    </div>
  );
}

export default RescaleGPU;
