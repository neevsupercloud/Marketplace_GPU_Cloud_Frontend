import { Button, FormControl, FormHelperText, FormLabel, Input, Spinner, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../store";
import useApi from "../../store/useApi";

interface Props {
  onClose: () => void;
}

export default function AddSecretModal({ onClose }: Props) {
  const [form, setForm] = useState({ value: "", key: "" });
  const { setSecrets } = useStore();
  const [state, setState] = useState<"idle" | "loading">("idle");
  const { getSecrets, createSecrets, updateSecrets } = useApi();

  function addSecret() {
    if (!form.value || !form.key) return alert("Key or value not present");

    const payload = { secrets: { [form.key]: form.value } };
    console.log("Payload:", payload); // Add logging here for debugging

    setState("loading");

    getSecrets()
      .then((secrets) => {
        if (!secrets) {
          console.log("Creating new secrets"); // Add logging
          return createSecrets(payload);
        } else {
          console.log("Updating existing secrets"); // Add logging
          return updateSecrets(payload);
        }
      })
      .then((secrets) => setSecrets(secrets ?? {}))
      .finally(() => {
        setState("idle");
        onClose();
      });
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, key: e.target.value.replace(/\s/g, "") });
  }

  function handleValueChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setForm({ ...form, value: e.target.value });
  }

  if (state === "loading") return <Spinner />;

  return (
    <div className="absolute z-50 left-0 right-0 top-0 bottom-0 bg-black/[.5] flex justify-center items-center">
      <div className="container max-w-2xl rounded-lg bg-white shadow-lg">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <p className="font-semibold text-black text-lg">Create new secret</p>
        </div>
        <div className="p-4 rounded-b-lg flex flex-col gap-y-4">
          <FormControl>
            <FormLabel>Key</FormLabel>
            <Input value={form.key} onChange={handleNameChange} placeholder="Secret name" />
            <FormHelperText>Name must not contain any whitespace characters</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Value</FormLabel>
            <Textarea value={form.value} onChange={handleValueChange} placeholder="Secret value" />
          </FormControl>
          <div className="w-full grid grid-cols-2 gap-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              colorScheme="brand"
              onClick={addSecret}
              isDisabled={form.key === "" || form.value === ""}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}