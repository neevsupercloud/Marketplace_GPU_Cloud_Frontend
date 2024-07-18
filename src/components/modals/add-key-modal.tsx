import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,

  Textarea,
  Flex,
  Box
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { ENDPOINTS, useQuery } from "../../store/api";
import { useStore } from "../../store";
import { GetSshKeysResponse } from "../../types";
import Spinner from "../Spinner-loader";

interface AddKeyModalProps {
  onClose: () => void;
}

export default function AddKeyModal({ onClose }: AddKeyModalProps) {
  const { auth } = useStore();
  const [form, setForm] = useState({ name: "", key: "" });
  const { project_slug, _post, _get } = useQuery();
  const { currOrg, setSshKeys } = useStore();
  const [state, setState] = useState<"idle" | "loading">("idle");

  function addKeys() {
    if (!form.name || !form.key) return alert("Key or name not present");
    if (!currOrg || !project_slug) return alert("org or project not set");
    setState("loading");

    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth}`, // Pass the access token in the header
      'Content-Type': 'application/json',
    };

    _post(ENDPOINTS.addSshKeys(currOrg, project_slug), { keys: [{ ...form }] }, { headers })
      .then(resp => {
        console.log(resp);
        return _get<GetSshKeysResponse>(ENDPOINTS.getSshKeys(currOrg, project_slug), headers)
      })
      .then(resp => {
        if (resp) setSshKeys(resp.keys);
      })
      .finally(onClose);
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, name: e.target.value.replace(/\s/g, '') })
  }

  if (state === "loading") return <Spinner />

  return (
    <Flex
      className="absolute z-50 left-0 right-0 top-0 bottom-0 bg-black/[.5] flex justify-center items-center"
      backdropFilter="blur(10px)"
    >
      <Box className="container max-w-2xl rounded-lg bg-white shadow-lg">
        <Flex className="p-4 border-b border-slate-200 items-center justify-between">
          <p className="font-semibold text-black text-lg" style={{ color: "#3f5175", fontWeight: 700 }}>Add SSH key</p>
        </Flex>
        <Flex className="p-4 rounded-b-lg flex-col gap-y-4">
          <FormControl>
            <FormLabel style={{ color: "#3f5175" }}>Name</FormLabel>
            <Input
              value={form.name}
              onChange={handleNameChange}
              placeholder="Suitable title for the key"
              _focus={{ borderColor: "#673ab7" }}
            />
            <FormHelperText style={{ color: "#3f5175" }}>
              Name must not contain any whitespace characters
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel style={{ color: "#3f5175" }}>SSH Key</FormLabel>
            <Textarea
              value={form.key}
              onChange={e => setForm({ ...form, key: e.target.value })}
              placeholder="Begins with 'ssh-'"
              _focus={{ borderColor: "#673ab7" }}
            />
            <FormHelperText style={{ color: "#3f5175" }}>
              Begins with 'ssh-rsa', 'ecdsa-sha2-nistp256', 'ecdsa-sha2-nistp384', 'ecdsa-sha2-nistp521', 'ssh-ed25519',
              'sk-ecdsa-sha2-nistp256@openssh.com', or 'sk-ssh-ed25519@openssh.com'
            </FormHelperText>
          </FormControl>
          <Flex className="w-full grid grid-cols-2 gap-x-2">
            <Button
              onClick={onClose}
              bgGradient="linear(to-l, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))"
              color="white"
              _hover={{
                bgGradient: 'linear(to-l, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))',
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
              }}
              _active={{
                bgGradient: 'linear(to-l, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))',
                transform: 'translateY(0)',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={addKeys}
              bgGradient="linear(to-l, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))"
              color="white"
              _hover={{
                bgGradient: 'linear(to-l, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))',
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
              }}
              _active={{
                bgGradient: 'linear(to-l, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))',
                transform: 'translateY(0)',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
              }}
              opacity={form.key === "" || form.name === "" ? 0.5 : 1}
              isDisabled={form.key === "" || form.name === ""}
            >
              Save
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
