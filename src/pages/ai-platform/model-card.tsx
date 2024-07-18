import {ReactNode} from "react";
import {BiBot} from "react-icons/bi";

interface Props {
  title: string;
  desc: string;
  icon: ReactNode;
  url: string;
  setModelUrl: (url: string) => void;
}

export default function ModelCard({title, desc, icon, url, setModelUrl}: Props) {
  const _setModelUrl = () => setModelUrl(url);
  return (
    <div onClick={_setModelUrl} className="cursor-pointer hover:shadow-lg flex items-start gap-x-2 h-full w-full border rounded-lg p-2">
      <div className="">
        <GetIcon icon={icon}/>
      </div>
      <div className="">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-slate-500 text-sm">{desc}</p>
      </div>
    </div>
  );
}

function GetIcon({icon}: { icon: ReactNode }) {
  if (icon === null) return <BiBot/>;
  if (typeof icon === "string") return <img src={icon} alt="icon" className="w-16"/>;
  if (typeof icon === typeof BiBot) return icon;
}