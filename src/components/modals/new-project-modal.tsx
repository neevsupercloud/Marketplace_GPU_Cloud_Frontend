import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { ENDPOINTS, useQuery } from "../../store/api.tsx";
import { ProjectType, useStore } from "../../store";


export default function NewProjectModal({ onClose }: { onClose: () => void }) {
  const [displayName, setDisplayName] = useState("");
  const { _post, _get } = useQuery();
  const { setCurrProject, setProjectList, currOrg, auth } = useStore();

  const createProject = async () => {
    if (!currOrg) {
      console.log("Current organization is not set");
      return;
    }

    if (!auth) {
      console.log("Authentication token is not available");
      return;
    }

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth}`, // Pass the access token in the header
      'Content-Type': 'application/json',
    };

    try {
      console.log('Creating project with headers:', headers);
      await _post(ENDPOINTS.createProject(currOrg), { displayName }, { headers }); // Pass headers directly
      console.log('Fetching projects with headers:', headers);
      const resp = await _get<{ projects: ProjectType[] }>(ENDPOINTS.getProjects(currOrg), headers); // Pass headers directly

      if (!resp || !resp.projects) {
        console.log("Failed to fetch projects", resp);
        return;
      }

      const { projects } = resp;
      setProjectList(projects);
      setCurrProject(projects[projects.length - 1]);
    } catch (error) {
      console.error("Error creating project or fetching projects", error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="absolute z-10 left-0 top-0 w-screen h-screen bg-transparent/[.5] flex justify-center items-center">
      <div className="container relative max-w-xl bg-white rounded-lg p-4 shadow flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-xl">New Project</p>
          <Button className="w-fit" onClick={onClose}>
            <CgClose />
          </Button>
        </div>
        <Input
          placeholder="Enter project name"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
        />
        <Button
          onClick={createProject}
          colorScheme="brand"
          isDisabled={displayName === "" || !displayName}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
