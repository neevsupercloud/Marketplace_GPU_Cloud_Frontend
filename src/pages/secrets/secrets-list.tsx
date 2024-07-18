import { useStore } from "../../store";
import { ENDPOINTS, useQuery } from "../../store/api.tsx";
import { GetSecretsResponse } from "../../types";
import { Spinner } from "@chakra-ui/react";
import SecretItem from "./secret-list-item.tsx";

export default function SecretsList() {
  const { secrets, currOrg, setSecrets,auth } = useStore();
  const { project_slug, _put, _get } = useQuery();
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${auth}`, // Pass the access token in the header
    'Content-Type': 'application/json',
  };

  function deleteSecret(key: string) {
    const existing = { ...secrets };
    console.log("Deleting secret with key:", key);
  
    if (!existing) {
      console.log("No secrets found");
      return;
    }
    if (!project_slug || !currOrg) {
      console.log("Project slug or current org is not set");
      return;
    }
  
    delete existing[key];
    console.log("Existing secrets after deletion:", existing);
  
    _put(ENDPOINTS.secrets(currOrg, project_slug), { secrets: { ...existing },headers})
      .then(resp => {
        console.log("PUT response:", resp);
        return _get<GetSecretsResponse>(ENDPOINTS.secrets(currOrg, project_slug),headers);
      })
      .then(resp => {
        console.log("GET response:", resp);
        if (resp) {
          setSecrets(resp.secrets ?? {});
          console.log("Updated secrets:", resp.secrets);
        }
      })
      .catch(error => {
        console.error("Error deleting secret:", error);
      });
  }
  

  if (!secrets) return <Spinner />;
  if (Object.entries(secrets).length === 0) return <p className="text-slate-500">No secrets present</p>;

  return Object.entries(secrets).map(e => <SecretItem remove={deleteSecret} key={e[0]} entry={e} />);
}