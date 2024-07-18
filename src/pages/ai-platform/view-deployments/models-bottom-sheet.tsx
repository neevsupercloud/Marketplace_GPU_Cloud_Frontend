import {useStore} from "../../../store";
import {CloseButton, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {Model} from "../../../types";
import Configuration from "../configuration.tsx";
import Secrets from "../secrets.tsx";

export default function ModelsBottomSheet() {
  const {currModel, setCurrModel} = useStore();

  if (!currModel) return (
    <div className="bg-white h-full p-4">
      <div className="flex items-center justify-between">
        <div className="mb-4">
          <p className="font-bold text-lg">Details</p>
        </div>
        <CloseButton onClick={() => setCurrModel(null)}/>
      </div>
      <div className="bg-white flex justify-center items-center w-full h-full">
        <p className="text-slate-500">No data to display</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white h-full border-t-2 border-slate-400 p-4">
      <div className="flex items-center justify-between">
        <div className="mb-4">
          <p className="font-bold text-lg">{currModel.modelID}</p>
        </div>
        <CloseButton onClick={() => setCurrModel(null)}/>
      </div>
      <Tabs variant="enclosed-colored" className="min-h-full">
        <TabList>
          <Tab>Details</Tab>
          <Tab>Configurations</Tab>
          <Tab>Secrets</Tab>
        </TabList>
        <TabPanels className="min-h-full">
          <TabPanel className="min-h-full">
            <ModelDetails model={currModel}/>
          </TabPanel>
          <TabPanel>
            <Configuration saveConfigs={c => console.log(c)}/>
          </TabPanel>
          <TabPanel>
            <Secrets saveSecrets={s => console.log(s)}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <ModelDetails model={currModel}/>
    </div>
  );
}

function ModelDetails({model}: { model: Model }) {
  return (
    <div className="h-full">
      <p className="font-semibold">URL</p>
      <p>{model.url}</p>
      <br/>
      <p className="font-semibold">deploymentFqdn</p>
      <p>{model.deploymentFqdn}</p>
      <br/>
      <p className="font-semibold">ingressFqdn</p>
      <p>{model.ingressFqdn}</p>
    </div>
  );
}