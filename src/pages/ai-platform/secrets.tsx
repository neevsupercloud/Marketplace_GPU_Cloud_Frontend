import {Fragment, useRef, useState} from "react";
import useAlert from "../../store/useAlert.ts";
import {StringMap} from "../../types";
import {Button, Editable, EditableInput, EditablePreview} from "@chakra-ui/react";
import {BsPlus} from "react-icons/bs";

interface Props {
  saveSecrets: (secrets: StringMap) => void;
}

export default function Secrets({saveSecrets}: Props) {
  const [entries, setEntries] = useState<number[]>([]);
  const secretsRef = useRef<HTMLFormElement>(null);
  const {errorToast} = useAlert();

  function addConfig() {
    setEntries(entries => [...entries, entries.length + 1]);
  }

  function build() {
    const secretsForm = secretsRef.current;
    if (!secretsForm) {
      errorToast("form is null");
      return {};
    }

    const formdata = new FormData(secretsForm);
    const secrets: StringMap = {}
    const keyValuePairs = [...formdata.values()] as string[];

    for (let i=1; i<keyValuePairs.length; i+=2) {
      secrets[keyValuePairs[i-1]] = keyValuePairs[i];
    }

    console.log(secrets);
    return secrets;
  }

  function save() {
    const secrets = build();
    saveSecrets(secrets);
  }

  return (
    <>
      <form ref={secretsRef}>
        <div className="grid grid-cols-2">
          <p className="bg-slate-200 p-2 rounded-tl-lg border-x border-t border-slate-300">key</p>
          <p className="bg-slate-200 p-2 rounded-tr-lg border-r border-t border-slate-300">value</p>
          {entries.map(e => (
            <Fragment key={e}>
              <Editable defaultValue="New Key (Click to edit)">
                <EditablePreview className="p-2 border-l border-b border-slate-300 w-full"/>
                <EditableInput name="keys"/>
              </Editable>
              <Editable defaultValue="New Value (Click to edit)">
                <EditablePreview className="p-2 border-r border-b border-slate-300 w-full"/>
                <EditableInput name="values"/>
              </Editable>
            </Fragment>
          ))}
        </div>
      </form>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <Button leftIcon={<BsPlus/>} onClick={addConfig}>Add Config</Button>
        <Button leftIcon={<BsPlus/>} colorScheme="brand" isDisabled={entries.length===0} onClick={save}>Save</Button>
      </div>
    </>
  );
}