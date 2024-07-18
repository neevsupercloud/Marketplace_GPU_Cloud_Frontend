import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
 
  useToast,
  Box,
  Flex,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import forge from "node-forge";
import { ENDPOINTS, useQuery } from "../../store/api";
import { GetSshKeysResponse } from "../../types";
import { useStore } from "../../store";
import { BiCopy } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { saveAs } from 'file-saver';
import Spinner from "../Spinner-loader";
interface GenerateKeyModalProps {
  onClose: () => void;
}

export default function GenerateKeyModal({ onClose }: GenerateKeyModalProps) {
  const [form, setForm] = useState({ name: "", key: "" });
  const { project_slug, _post, _get } = useQuery();
  const { currOrg, setSshKeys } = useStore();
  const [state, setState] = useState<"idle" | "loading">("idle");
  const [key, setKey] = useState({ publicKey: "", privateKey: "" });
  const [generating, setGenerating] = useState(false);
  const toast = useToast();
  const { auth } = useStore();

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, name: e.target.value.replace(/\s/g, "") });
  }

  function generateSSHKey() {
    setGenerating(true);
    const rsaKeyPair = forge.pki.rsa.generateKeyPair(2048);

    // Convert keys to OpenSSH format
    const privateKey = forge.ssh.privateKeyToOpenSSH(rsaKeyPair.privateKey);
    const publicKey = forge.ssh.publicKeyToOpenSSH(rsaKeyPair.publicKey);

    console.log({ privateKey, publicKey });

    // Update form with generated public key
    setKey({ privateKey, publicKey });
    setForm({ ...form, key: publicKey });
  }

  useEffect(() => {
    if (key.privateKey !== "") setGenerating(false);
  }, [key]);

  function addKeys() {
    if (!form.name) return alert("Name not present");
    if (!currOrg || !project_slug) return alert("org or project not set");
    setState("loading");

    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${auth}`, // Pass the access token in the header
      'Content-Type': 'application/json',
    };

    _post(ENDPOINTS.addSshKeys(currOrg, project_slug), { keys: [{ ...form }] }, { headers })
      .then(resp => {
        console.log("value", form);
        console.log(resp);
        return _get<GetSshKeysResponse>(ENDPOINTS.getSshKeys(currOrg, project_slug), headers);
      })
      .then(resp => {
        if (resp) setSshKeys(resp.keys);

        // Download the public key and private key files
        const privateKeyBlob = new Blob([key.privateKey], { type: "text/plain;charset=utf-8" });

        saveAs(privateKeyBlob, `${form.name}.pem`);
      })
      .finally(() => {
        setState("idle");
        onClose();
      });
  }

  if (state === "loading") return <Spinner />;

  return (
    <Flex
      className="absolute z-50 left-0 right-0 top-0 bottom-0 bg-black/[.5] flex justify-center items-center"
      backdropFilter="blur(10px)"
    >
      <Box className="container max-w-2xl rounded-lg bg-white shadow-lg">
        <Flex className="p-4 border-b  items-center justify-between">
          <p className="font-semibold text-black text-lg" style={{ color: "#3f5175", fontWeight: 700 }}>Generate SSH key</p>
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
          {
            key.privateKey !== "" ? (
              <>
                <code
                  className="max-w-full max-h-[200px] overflow-auto border border-slate-300 p-2 bg-slate-200 rounded-lg">
                  {key.privateKey}
                </code>
                <CopyToClipboard
                  text={key.privateKey}
                  onCopy={() => toast({
                    title: 'Copied to clipboard!',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                  })}
                >
                  <Button
                    leftIcon={<BiCopy />}
                    className="absolute top-2 right-2"
                    colorScheme="brand"
                  >
                    Copy
                  </Button>
                </CopyToClipboard>
              </>
            ) : generating && <Spinner />
          }
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
            {
              key.publicKey !== ""
                ? <Button
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
                >
                  Save
                </Button>
                : <Button
                  onClick={generateSSHKey}
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
                  opacity={form.name === "" || generating ? 0.5 : 1}
                  isDisabled={form.name === "" || generating}
                >
                  Generate
                </Button>
            }
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
