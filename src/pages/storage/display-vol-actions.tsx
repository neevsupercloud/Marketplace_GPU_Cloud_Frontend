import {IconButton} from "@chakra-ui/react";
import {BiTrash} from "react-icons/bi";
import {Volume} from "../../types";

interface Props {
  volume: Volume;
  deleteVol: (name: string) => void;
}

export default function DisplayVolumeActions({deleteVol, volume}: Props) {

  function del() {
    deleteVol(volume.metadata.name);
  }

  return (
    <div className="flex items-center gap-x-4">
      <IconButton className="text-xl text-red-500" variant="outline" onClick={del} aria-label="delete volume">
        <BiTrash/>
      </IconButton>
    </div>
  );
}