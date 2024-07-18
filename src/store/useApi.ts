import {
  CreateSecretsResponse, CreateVmPayload,
  GetSecretsResponse,
  GetSshKeysResponse, GetVolumesResponse, Model,
  Secrets,
  SshKey,
  VM_T,
  VmResponseType, Volume
} from "../types";
import { ENDPOINTS, useQuery } from "./api.tsx";
import { useStore } from "./index.ts";

export default function useApi() {


 
  const { currOrg, auth } = useStore();
  const { _get, _put, _post, project_slug, _delete,  } = useQuery();

  function generateHeaders(): Record<string, string> {
    if (!auth) {
      console.error("No authentication information found.");
      return {
        'Accept': '',
        'Authorization': 'grgegtg',
        'Content-Type': '',
      };
    }
    return {
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth}`, // Pass the access token in the header
      'Content-Type': 'application/json',
    };
  }
  
  function getVms() {
    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        const headers = generateHeaders();
        return _get<VmResponseType>(ENDPOINTS.listVms(currOrg, project_slug), headers);
      })
      .then(resp => resp ? resp.items : [])
      .catch(err => {
        console.log(err);
        return [] as VM_T[];
      });
  }
  

  function getVm(slug: string) {
    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        const headers = generateHeaders();
        return _get<{ resource: VM_T }>(ENDPOINTS.getVm(currOrg, project_slug, slug), headers);
      })
      .then(resp => resp ? resp.resource : null)
      .catch(err => {
        console.log(err);
        return null;
      });
  }
  
  function getSshKeys() {
    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        const headers = generateHeaders();
        return _get<GetSshKeysResponse>(ENDPOINTS.getSshKeys(currOrg, project_slug), headers);
      })
      .then(resp => resp && resp.keys ? resp.keys : [])
      .catch(err => {
        console.log(err);
        return [] as SshKey[];
      });
  }
  

  function deleteSshKey(keyId: string) {
    const headers = generateHeaders();
  
    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        return _delete(
          ENDPOINTS.getSshKeys(currOrg, project_slug) + `/${keyId}`,
          { headers } // Pass headers here
        );
      })
      .then(() => getSshKeys())
      .catch(err => {
        console.log(err);
        return [] as SshKey[];
      });
  }
  

  function getSecrets() {
    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        const headers = generateHeaders();
        return _get<GetSecretsResponse>(ENDPOINTS.secrets(currOrg, project_slug), headers);
      })
      .then(resp => resp ? resp.secrets : null)
      .catch(err => {
        console.log(err);
        return null;
      });
  }
  

  function createSecrets(payload: { secrets: Secrets }) {
    const headers =generateHeaders();
    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        return _post<CreateSecretsResponse>(ENDPOINTS.secrets(currOrg, project_slug), payload,{headers});
      })
      .then(() => getSecrets())
      .catch(err => {
        console.log(err);
        return {} as Secrets;
      });
  }

  function updateSecrets(payload: { secrets: Secrets }) {
    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        return _put<CreateSecretsResponse>(ENDPOINTS.secrets(currOrg, project_slug), payload);
      })
      .then(() => getSecrets())
      .catch(err => {
        console.log(err);
        return {} as Secrets;
      });
  }

  function createVm(payload: CreateVmPayload) {
    const headers = generateHeaders();

    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        return _post<{ message: string, resource: VM_T }>(ENDPOINTS.createVm(currOrg, project_slug), payload, { headers });
      })
      .then(resp => resp ? resp.resource : null)
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  function startVm(vm_slug: string) {
    const headers = generateHeaders();

    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        return _post<{ message: string }>(
          ENDPOINTS.action(currOrg, project_slug, vm_slug),
          { action: "start" },
          { headers } // Pass headers here
        );
      })
      .then(() => getVm(vm_slug))
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  function stopVm(vm_slug: string) {
    const headers =generateHeaders();
    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        return _post<{ message: string }>(
          ENDPOINTS.action(currOrg, project_slug, vm_slug),
          { action: "stop" },
          { headers } // Pass headers here
        );
      })
      .then(() => getVm(vm_slug))
      .catch(err => {
        console.log(err);
        return null;
      });
  }

  function terminateVm(vm_slug: string) {
    const headers = generateHeaders();

    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        return _post<{ message: string }>(
          ENDPOINTS.action(currOrg, project_slug, vm_slug),
          { action: "terminate" },
          { headers } // Pass headers here
        );
      })
      .then(() => getVms())
      .catch(err => {
        console.log(err);
        return [] as VM_T[];
      });
  }
  function deleteVolume(vol_name: string) {
    const headers = {'Accept': 'application/json',
    'Authorization': `Bearer ${auth}`, // Ensure Bearer token is set here
    'Content-Type': 'application/json',
    }
  
    return Promise.resolve()
    .then(() => {
      if (!currOrg || !project_slug) throw new Error("no org or project");
      console.log(`Deleting volume: ${vol_name} in org: ${currOrg}, project: ${project_slug}`);
      return _delete<{ message: string }>(
        ENDPOINTS.deleteVolume(currOrg, project_slug, vol_name),
        { headers }
      );
    })
    .then(() => getVolumes())
    .catch(err => {
      console.error('Error deleting volume:', err);
      return [] as Volume[];
    });
  }

  // function deleteVolume(vol_name: string) {
  //   const headers = generateHeaders();
  
  //   return Promise.resolve()
  //     .then(() => {
  //       if (!currOrg || !project_slug) throw new Error("no org or project");
  //       console.log(`Deleting volume: ${vol_name} in org: ${currOrg}, project: ${project_slug}`);
  //       return _delete<{ message: string }>(
  //         ENDPOINTS.deleteVolume(currOrg, project_slug, vol_name),
  //         { headers }
  //       );
  //     })
  //     .then(() => getVolumes())
  //     .catch(err => {
  //       console.error('Error deleting volume:', err);
  //       return [] as Volume[];
  //     });
  // }
  
  

  function getVolumes() {
    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        const headers = generateHeaders();
        return _get<GetVolumesResponse>(ENDPOINTS.getVolumes(currOrg, project_slug), headers);
      })
      .then(resp => resp && resp.volumes ? resp.volumes : [])
      .catch(err => {
        console.log(err);
        return [] as Volume[];
      });
  }
  
  function getModels() {
    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        const headers = generateHeaders();
        return _get<{ endpoints: Model[] }>(ENDPOINTS.models(currOrg, project_slug), headers);
      })
      .then(resp => resp && resp.endpoints ? resp.endpoints : [])
      .catch(err => {
        console.log(err);
        return [] as Model[];
      });
  }



  function createModel(payload: object) {
    console.log("hue",payload)
    const headers =generateHeaders();
    return Promise.resolve()
      .then(() => {
        if (!currOrg || !project_slug) throw new Error("no org or project");
        return _post<{ status: string }>(
          ENDPOINTS.models(currOrg, project_slug),
          payload,
          { headers } // Pass the headers here
        );
      })
      .catch(err => {
        console.log(err);
        return { status: "failed" };
      });
  }


  return {
    getVms,
    getSshKeys,
    deleteSshKey,
    getSecrets,
    createSecrets,
    updateSecrets,
    createVm,
    startVm,
    stopVm,
    terminateVm,
    getVolumes,
    deleteVolume,
    createModel,
    getModels,
    getVm,
     
  };
}