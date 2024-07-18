// import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from "../../store";

function MonitoringGPU() {
  const { slug } = useParams();
  const { currProject } = useStore();

  if (!currProject) {
    return <div>Loading...</div>; 
  }

  const namespace = currProject.slug || 'default-namespace';
  const vm = slug;

  const baseUrl = "https://metrics.neevcloud.com/d-solo/HV_1uZwWk/kubevirt-vm-info";
  const commonParams = `?orgId=1&refresh=10s&var-datasource=prometheus&var-namespace=${namespace}&var-vm=${vm}`;

  return (
    <div>
      <div>
        <p className='font-Inter font-[600] text-[20px] text-[#3F5175] my-3'>CPU Usage</p>
        <iframe
          src={`${baseUrl}${commonParams}&from=now-1h&to=now&theme=light&panelId=1`}
          width="100%"
          height="250px"
          style={{ border: "none" }}
        ></iframe>
      </div>
      <div style={{ marginTop: "50px" }}>
      <p className='font-Inter font-[600] text-[20px] text-[#3F5175] my-3'>Memory Usage</p>
        <iframe
          src={`${baseUrl}${commonParams}&from=now-1h&to=now&theme=light&panelId=3`}
          width="100%"
          height="250px"
          style={{ border: "none" }}
        ></iframe>
      </div>
      <p  className='font-Inter font-[600] text-[20px] text-[#3F5175]' style={{marginTop:"50px",marginBottom:"-40px"}}>Disk</p>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "50px", width: "100%", justifyContent: "space-between" }}>
      
        <div style={{ width: "49.5%" }}>
          <iframe
            src={`${baseUrl}${commonParams}&from=now-1h&to=now&theme=light&panelId=15`}
            width="100%"
            height="250px"
            style={{ border: "none" }}
          ></iframe>
        </div>
        <div style={{ width: "49.5%" }}>
          <iframe
            src={`${baseUrl}${commonParams}&from=now-1h&to=now&theme=light&panelId=19`}
            width="100%"
            height="250px"
            style={{ border: "none" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default MonitoringGPU;
