import {Button} from "@chakra-ui/react";
import {BiPlus} from "react-icons/bi";
import {useEffect, useState} from "react";
import {useQuery} from "../../store/api.tsx";
import {useStore} from "../../store";
import AddSecretModal from "../../components/modals/add-secret-modal.tsx";
import SecretsList from "./secrets-list.tsx";
import useApi from "../../store/useApi.ts";

export default function Secrets() {
  const [showModal, setShowModal] = useState<"none" | "add-key" | "generate-key">("none");
  const {project_slug} = useQuery();
  const {currOrg, setSecrets} = useStore();
  const {getSecrets} = useApi();

  useEffect(() => {
    getSecrets().then(secrets => {
      if (!secrets) setSecrets({});
      else setSecrets(secrets);
    })
  }, [currOrg, project_slug]);

  return (
    <div className="p-5 pb-8">
      <div className="bg-white rounded-lg shadow-md  p-4">
        <div className="flex justify-between w-full items-center">
          <h1 className="text-2xl font-bold">Secrets</h1>
          <div className="flex items-center gap-x-4">
            <Button leftIcon={<BiPlus/>} onClick={() => setShowModal("add-key")}>Create new secret</Button>
          </div>
        </div>
        <br/>
        <div className="flex flex-col gap-y-4 mt-2">
          <SecretsList/>
        </div>
      </div>
      {showModal==="add-key" && <AddSecretModal onClose={() => setShowModal("none")}/>}
    </div>
  );
}