import {
  Button, HStack, Menu, MenuButton, MenuItem, MenuList, Tag, TagCloseButton, TagLabel,
} from "@chakra-ui/react";
import {useStore} from "../../store";
import {BiChevronDown, BiHdd} from "react-icons/bi";
import {GetVolumesResponse, Volume} from "../../types";
import {useEffect, useState} from "react";
import {ENDPOINTS, useQuery} from "../../store/api.tsx";
import {Link} from "react-router-dom";
import Spinner from "../Spinner-loader.tsx";

export default function CustomizeDeploymentModal({onClose}: { onClose: () => void }) {
  const {newVm, updateNewVm, currOrg, setVolumes} = useStore();
  const {_get, project_slug} = useQuery();
  const [modalState, setModalState] = useState<"loading" | "idle">("loading");
  const [selectedVolumes, setSelectedVolumes] = useState<Volume[]>([]);

  function save() {
    updateNewVm({volumes: selectedVolumes.map(v => v.metadata.name)});
    console.log(newVm);
    onClose();
  }

  function selectVol(v: Volume) {
    setSelectedVolumes(prev => [...prev, v]);
  }

  function deselect(v: Volume) {
    setSelectedVolumes(prev => prev.filter(_v => (_v.metadata.uid !== v.metadata.uid)));
  }

  useEffect(() => {
    console.log(selectedVolumes);
  }, [selectedVolumes]);

  useEffect(() => {
    if (!project_slug || !currOrg) return;
    setModalState("loading");
    const headers = {
      'Accept': 'application/json',
      // 'Authorization': `Bearer ${auth}`, // Pass the access token in the header
      'Content-Type': 'application/json',
    };
    _get<GetVolumesResponse>(ENDPOINTS.getVolumes(currOrg, project_slug), headers)
      .then(resp => {
        if (!resp || !resp.volumes) return console.log("cannot fetch volumes");
        setVolumes(resp.volumes);
      })
      .finally(() => setModalState("idle"));
  }, [currOrg, project_slug]);

  if (modalState === "loading") return <Spinner/>;

  return (
    <div className="absolute left-0 top-0 w-screen h-screen bg-transparent/[.5] flex justify-center items-center">
      <div className="container max-w-xl bg-white rounded-lg p-4 shadow flex flex-col gap-y-4">
        <SelectVolumesMenu selectedVolumes={selectedVolumes} selectVol={selectVol}/>
        {
          selectedVolumes.length > 0 && (
            <>
              <p className="font-semibold">Selected Volumes:</p>
              <HStack spacing={4}>
                {selectedVolumes.map((v) => (
                  <Tag
                    size="lg"
                    key={v.metadata.uid}
                    borderRadius='full'
                    variant='outline'
                    colorScheme='brand'
                  >
                    <TagLabel>{`${v.metadata.name} [${v.status.capacity.storage}]`}</TagLabel>
                    <TagCloseButton onClick={() => deselect(v)} />
                  </Tag>
                ))}
              </HStack>
            </>
          )
        }
        <div className="grid grid-cols-2 gap-x-4">
          <Button onClick={onClose} variant="outline" colorScheme="red">Cancel</Button>
          <Button colorScheme="brand" onClick={save}>Save</Button>
        </div>
      </div>
    </div>
  );
}

interface Props {
  selectedVolumes: Volume[];
  selectVol: (v: Volume) => void;
}

function SelectVolumesMenu({selectedVolumes, selectVol}: Props) {
  const {volumes} = useStore();

  if (!volumes) return (
    <div className="flex items-center gap-x-2">
      <p>No volumes available.</p>
      <Link to="/manage/storage/volumes" className="underline text-brand">Create new volume</Link>
    </div>
  );

  const notSelectedVolumes = volumes.filter(v => !selectedVolumes.includes(v));

  return (
    <Menu matchWidth>
      <MenuButton
        as={Button}
        color="#2a69ac"
        rightIcon={<BiChevronDown/>}
      >
        <div className="flex items-center gap-x-2">
          <p>Select volumes</p>
        </div>
      </MenuButton>
      <MenuList>
        {notSelectedVolumes.map(v => (
          <MenuItem key={v.metadata.uid} onClick={() => selectVol(v)}>
            <div className="flex items-center justify-between w-full gap-x-4">
              <p className="text-xl text-brand">
                <BiHdd/>
              </p>
              <div className="flex flex-col w-full">
                <p>{v.metadata.name}</p>
                <p className="text-gray-400 text-sm">{v.status.capacity.storage}</p>
              </div>
            </div>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
