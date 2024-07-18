import { useEffect, useState } from 'react';
import DashboardResource from "./Dashboard-resource";
import cloud from "../../asset/icons8-cloud-30.png";
import server from "../../asset/icons8-server-30.png";
import storage from "../../asset/icons8-storage-24.png";
import credit from "../../asset/icons8-key-25.png";
import DashboardGraph from "./Dashboard_graph";
import { useNavigate } from 'react-router-dom';
import './Dashresource.css';
import { useStore } from '../../store';
import useApi from '../../store/useApi';

interface VM {
  type: string;
  state: string;
  disks: { size: string }[];
}

export default function Dashboards() {
  const navigate = useNavigate();
  const { auth, currOrg, setCurrOrg } = useStore();
  const { getVms } = useApi();

  const [orgSlug, setOrgSlug] = useState<string | null>(null);
  const [totalCpu, setTotalCpu] = useState<number>(0);
  const [totalStorage, setTotalStorage] = useState<number>(0);
  const [totalVRam, setTotalVRam] = useState<number>(0);
  const [gpuCount, setGpuCount] = useState<number>(0);

  const subHeading = {
    margin: 0,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    fontWeight: 450,
    lineHeight: 1.5,
    color: 'rgb(103, 58, 183)',
    fontSize: '16px'
  };

  const headingContent = {
    fontSize: '14px',
    color: 'rgba(34, 51, 84, 0.7)',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    fontWeight: 400,
    lineHeight: 1.75
  };

  useEffect(() => {
    const fetchData = async () => {
      const projectName = generateRandomString(6);

      if (!auth) {
        console.error('Authentication token is not available');
        return;
      }

      try {
        const response = await fetch('https://api.neevcloud.com/api/v1/orgs', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${auth}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            displayname: projectName,
          }),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Organization created successfully');
          console.log("Response Data:", responseData);
          setOrgSlug(responseData.orgSlug);
          setCurrOrg(responseData.orgSlug);
        } else {
          console.error('Failed to create organization');
        }
      } catch (error) {
        console.error('Error:', error);
      }

      fetchUserData();
    };

    const fetchUserData = async () => {
      if (!auth) {
        console.error('Authentication token is not available');
        return;
      }

      let callCount = 0;
      const intervalId = setInterval(async () => {
        if (callCount >= 3) {
          clearInterval(intervalId);
          return;
        }

        try {
          console.log('Fetching user data with token:', auth);
          const response = await fetch('https://api.neevcloud.com/api/v1/me', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${auth}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log('User Data:', data);
            setCurrOrg(data.org.slug);
            console.log('Current Organization inside fetchUserData:', data.org.slug);
          } else {
            console.error('Failed to fetch user data', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user data', error);
        }

        callCount++;
      }, 1000);
    };

    fetchData();
  }, [auth, setCurrOrg]);

  useEffect(() => {
    console.log('Current Organization in useEffect:', currOrg);
  }, [currOrg]);

  useEffect(() => {
    const fetchVmsData = async () => {
      try {
        const response = await fetch('https://api.mkinf.io/v0/vms', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched VMs:', data);

          const runningVms = data.items.filter((vm: VM) => vm.state === 'STATE_RUNNING');
          const allRunningVms = data.items.length;

          // const totalCpu = runningVms.reduce((acc: number, vm: VM) => acc + parseInt(vm.type.split('.')[1]), 0);
          const totalStorage = runningVms.reduce((acc: number, vm: VM) => {
            return acc + vm.disks.reduce((diskAcc: number, disk: { size: string }) => diskAcc + parseInt(disk.size.replace('GiB', '')), 0);
          }, 0);

          const totalVram = runningVms.reduce((acc: number, vm: VM) => {
            // Assuming VM type names are in the format "gpuType.vramSize"
            return acc + parseInt(vm.type.split('.')[1]);
          }, 0);

          const gpuCount = runningVms.length;

          setTotalCpu(totalCpu);
          setTotalStorage(totalStorage);
          setGpuCount(gpuCount);
          setTotalVRam(totalVram);
        } else {
          console.error('Failed to fetch VMs data', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching VMs data:', error);
      }
    };

    fetchVmsData();
  }, [auth]);

  const handleNavigate = () => {
    navigate('/gpu-compute/create-gpu-instance');
  };

  const handleCompute = () => {
    navigate('/gpu-compute/gpu-dashboard');
  };

  const handleVolume = () => {
    navigate('/manage/volumes');
  };

  const handleKey = () => {
    navigate('/manage/ssh-keys');
  };

  return (
    <div className="bg-[#ffffff] rounded-tl-[20px]">
      <div className="p-4">
        <div className="container mx-auto p-6">
          {/* Home Section */}
          <div className="mb-6">
            <h1 style={{ fontWeight: 700, color: ' rgb(63, 81, 117)', fontSize: "18px", fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",' }}>Home</h1>
          </div>

          {/* Other Sections in the same row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-200 cursor-pointer " onClick={handleNavigate}>
              <div className="flex items-center">
                <h2 className="text-xl font-semibold" style={subHeading}>GPU Cloud</h2>
                <img src={cloud} alt="cloud" className="ml-2" style={{ width: "25px", height: "25px" }} />
              </div>
              <p style={headingContent}>Deploy a GPU cloud server.</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-200 cursor-pointer" onClick={handleCompute}>
              <div className="flex items-center">
                <h2 className="text-xl font-semibold" style={subHeading}>Compute</h2>
                <img src={server} alt="server" className="ml-2 mb-1" style={{ width: "25px", height: "20px" }} />
              </div>
              <p style={headingContent}>Your deployed Virtual Machines.</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-200 cursor-pointer" onClick={handleVolume}>
              <div className="flex items-center">
                <h2 className="text-xl font-semibold" style={subHeading}>Volumes</h2>
                <img src={storage} alt="storage" className="ml-2" style={{ width: "20px", height: "20px" }} />
              </div>
              <p style={headingContent}>Add Voume among all your VM.</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-200 cursor-pointer" onClick={handleKey}>
              <div className="flex items-center">
                <h2 className="text-xl font-semibold" style={subHeading}> SSH Key</h2>
                <img src={credit} alt="credit" className="ml-1" style={{ width: "25px", height: "25px" }} />
              </div>
              <p style={headingContent}>Generate or Add your SSH Key.</p>
            </div>
          </div>
        </div>
        <div className="resourcecontainer" style={{ marginLeft: "20px" }}>
          <div className="dashboardgraph">
            <DashboardGraph />
          </div>
          <div>
            <DashboardResource totalCpu={totalCpu} totalStorage={totalStorage} gpuCount={gpuCount} totalVRam={totalVRam} />
          </div>
        </div>
        <div className="mt-12">
        </div>
      </div>
    </div>
  );
}

const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
