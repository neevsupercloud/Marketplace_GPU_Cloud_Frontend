import {useState} from "react";
import CustomDeployment from "./custom-deployment.tsx";

export default function NewDeployment() {
  const [modelUrl, setModelUrl] = useState<string>("");

  return (
    <div className="px-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <CustomDeployment modelUrl={modelUrl} setModelUrl={setModelUrl}/>
      </div>
    </div>
  );
}