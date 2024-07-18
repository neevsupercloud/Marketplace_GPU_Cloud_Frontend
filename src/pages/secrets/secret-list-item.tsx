import { GoPasskeyFill } from "react-icons/go";
import { Button } from "@chakra-ui/react";
// import { AiOutlineDelete } from "react-icons/ai";
import CopyText from "../../components/copy-text.tsx";

export default function SecretItem({ entry, remove }: { entry: string[], remove: (key: string) => void }) {
  return (
    <div className="flex justify-start gap-x-4 items-center p-4 border border-slate-200 rounded-lg shadow w-full break-words text-wrap">
      <p className="text-slate-400 px-2 text-2xl"><GoPasskeyFill /></p>
      <div className="flex flex-col w-full gap-y-2 text-wrap break-words max-w-full overflow-clip">
        <div className="flex gap-x-4 items-center">
          <p className="font-bold">{entry[0]}</p>
        </div>
        <CopyText className="text-xs text-gray-500 text-wrap">{entry[1]}</CopyText>
      </div>
      <Button color="green" onClick={() => remove(entry[0])}>Update</Button>
    </div>
  );
}