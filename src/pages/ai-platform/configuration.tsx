import {Button, Editable, EditableInput, EditablePreview} from "@chakra-ui/react";
import {Fragment, useRef, useState} from "react";
import {BsPlus} from "react-icons/bs";
import useAlert from "../../store/useAlert.ts";
import {StringMap} from "../../types";

interface Props {
  saveConfigs: (configs: StringMap) => void;
}

export default function Configuration({saveConfigs}: Props) {
  const [entries, setEntries] = useState<number[]>([]);
  const configsRef = useRef<HTMLFormElement>(null);
  const {errorToast} = useAlert();

  function addConfig() {
    setEntries(entries => [...entries, entries.length + 1]);
  }

  function build() {
    const configsForm = configsRef.current;
    if (!configsForm) {
      errorToast("form is null");
      return {};
    }

    const formdata = new FormData(configsForm);
    const configs: StringMap = {}
    const keyValuePairs = [...formdata.values()] as string[];

    for (let i=1; i<keyValuePairs.length; i+=2) {
      configs[keyValuePairs[i-1]] = keyValuePairs[i];
    }

    console.log(configs);
    return configs;
  }

  function save() {
    const configs = build();
    saveConfigs(configs);
  }

  return (
    <>
      <form ref={configsRef}>
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