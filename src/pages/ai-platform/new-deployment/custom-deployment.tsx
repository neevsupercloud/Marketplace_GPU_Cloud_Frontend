import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import HuggingFaceIcon from "../../../components/huggingface-icon.tsx";
import {RxDoubleArrowRight} from "react-icons/rx";
import ModelCard from "../model-card.tsx";
import {huggingFaceModels} from "../../../data.json";
// import useApi from "../../../store/useApi.ts";
// import useAlert from "../../../store/useAlert.ts";

interface Props {
  modelUrl: string;
  setModelUrl: (url: string) => void;
}

export default function CustomDeployment({modelUrl, setModelUrl}: Props) {
  // const {createModel} = useApi();
  // const {successToast} = useAlert();
  // const [configs, setConfigs] = useState<StringMap>({});
  // const [secrets, setSecrets] = useState<StringMap>({});

  function deploy() {
    // createModel(modelUrl).then(() => successToast("Deployment Started!"));
  }

  return (
    <>
      <FormControl>
        <FormLabel>Enter HuggingFace URI of a model to deploy</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <HuggingFaceIcon boxSize={6}/>
          </InputLeftElement>
          <Input
            value={modelUrl}
            onChange={e => setModelUrl(e.target.value)}
            placeholder="Example: mistralai/Mistral-7B-v0.1"
          />
        </InputGroup>
        <FormHelperText>
          We'll try to deploy the model, but some Hugging Face models might not work due to limited deployment info.
          Feel free to adjust the configuration settings
        </FormHelperText>
      </FormControl>
      <p className="font-semibold text-center w-full">or</p>
      <p className="font-semibold">Quick select a model to deploy</p>
      <div className="mt-2 grid grid-cols-3 gap-4">
        {huggingFaceModels.map(model => (
          <ModelCard {...model} key={model.title} setModelUrl={url => setModelUrl(url)}/>
        ))}
      </div>
      <br/>
      {/*<div className="grid grid-cols-2 gap-4">*/}
      {/*  <FormControl>*/}
      {/*    <FormLabel>CPU</FormLabel>*/}
      {/*    <InputGroup>*/}
      {/*      <Input name="cpu" placeholder="4"/>*/}
      {/*      <InputRightAddon>GB</InputRightAddon>*/}
      {/*    </InputGroup>*/}
      {/*  </FormControl>*/}
      {/*  <FormControl>*/}
      {/*    <FormLabel>GPU</FormLabel>*/}
      {/*    <InputGroup>*/}
      {/*      <Input name="cpu" placeholder="4"/>*/}
      {/*      <InputRightAddon>GB</InputRightAddon>*/}
      {/*    </InputGroup>*/}
      {/*  </FormControl>*/}
      {/*  <FormControl>*/}
      {/*    <FormLabel>Memory</FormLabel>*/}
      {/*    <InputGroup>*/}
      {/*      <Input name="cpu" placeholder="4"/>*/}
      {/*      <InputRightAddon>GB</InputRightAddon>*/}
      {/*    </InputGroup>*/}
      {/*  </FormControl>*/}
      {/*  <FormControl>*/}
      {/*    <FormLabel>Storage</FormLabel>*/}
      {/*    <InputGroup>*/}
      {/*      <Input name="cpu" placeholder="4"/>*/}
      {/*      <InputRightAddon>GB</InputRightAddon>*/}
      {/*    </InputGroup>*/}
      {/*  </FormControl>*/}
      {/*</div>*/}
      {/*<Tabs variant="enclosed-colored" className="min-h-full mt-4">*/}
      {/*  <TabList>*/}
      {/*    <Tab>Configuration</Tab>*/}
      {/*    <Tab>Secrets</Tab>*/}
      {/*  </TabList>*/}
      {/*  <TabPanels className="min-h-full">*/}
      {/*    <TabPanel className="min-h-full">*/}
      {/*      <Configuration saveConfigs={c => setConfigs(c)}/>*/}
      {/*    </TabPanel>*/}
      {/*    <TabPanel>*/}
      {/*      <Secrets saveSecrets={s => setSecrets(s)}/>*/}
      {/*    </TabPanel>*/}
      {/*  </TabPanels>*/}
      {/*</Tabs>*/}
      <div className="grid">
        <Button
          rightIcon={<RxDoubleArrowRight/>}
          colorScheme="brand"
          // isDisabled={Object.keys(configs).length === 0 || Object.keys(secrets).length === 0}
          isDisabled={modelUrl === ""}
          onClick={deploy}
        >
          Deploy
        </Button>
      </div>
    </>
  );
}