import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
 
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useQuery } from "../../store/api.tsx";
import { useStore } from "../../store";

import Spinner from "../Spinner-loader.tsx";
interface Props {
  onClose: () => void;
}

const MAX_SIZE = 2048;

export default function AddVolumeModal({ onClose }: Props) {
  // const { auth } = useStore();
  const [form, setForm] = useState({ name: "", size: "" });
  const { project_slug } = useQuery();
  const { currOrg, setVolumes, volumes } = useStore();
  const [state, setState] = useState<"idle" | "loading">("idle");

  function addVol() {
    if (!form.name || !form.size) return alert("Name or size not present");
    if (!currOrg || !project_slug) return alert("Organization or project not set");

    setState("loading");

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${auth}`, // Pass the access token in the header
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        size: `${form.size}Gi`
      })
    };

    fetch(`https://api.neevcloud.com/api/v1/orgs/${currOrg}/projects/${project_slug}/volumes`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(resp => {
        console.log('Response:', resp);
        if (!resp || !resp.volume) throw new Error("Failed to create volume");
        const prev = volumes ? [...volumes] : [];
        setVolumes([...prev, resp.volume]);
        setState("idle");
        onClose();
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Failed to create volume");
        setState("idle");
      });
  }

  function handleSizeChange(e: ChangeEvent<HTMLInputElement>) {
    let nextVal = e.target.value && e.target.value !== "" ? parseInt(e.target.value) : 0;
    if (nextVal > MAX_SIZE) nextVal = MAX_SIZE;
    setForm({ ...form, size: nextVal.toString() });
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, name: e.target.value.replace(/\s/g, '') });
  }

  if (state === "loading") return <Spinner />;

  return (
    <div className="absolute z-50 left-0 right-0 top-0 bottom-0 bg-black/[.5] flex justify-center items-center">
      <div className="container max-w-md rounded-lg bg-white shadow-lg">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <p className="font-semibold text-black text-lg">Create new volume</p>
        </div>
        <div className="p-4 rounded-b-lg flex flex-col gap-y-4">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={form.name}
              onChange={handleNameChange}
              placeholder="Name for the volume"
            />
            <FormHelperText>
              Name must not contain any whitespace characters
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Size</FormLabel>
            <InputGroup>
              <Input
                type="number"
                value={form.size}
                onChange={handleSizeChange}
                placeholder=""
              />
              <InputRightAddon>Gi</InputRightAddon>
            </InputGroup>
            <FormHelperText>
              Maximum allowed size is 2TB
            </FormHelperText>
          </FormControl>
          <div className="w-full grid grid-cols-2 gap-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="brand" onClick={addVol} isDisabled={form.name === ""}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
