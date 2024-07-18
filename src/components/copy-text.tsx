import {CopyToClipboard} from "react-copy-to-clipboard";
import useAlert from "../store/useAlert.ts";
import clsx from "clsx";

interface Props {
  children: string;
  className?: string;
}

export default function CopyText({children, className=""}: Props) {
  const {successToast} = useAlert();
  return (
    <CopyToClipboard
      text={children}
      onCopy={() => successToast("Copied to clipboard!")}
    >
      <p className={clsx("cursor-pointer p-1 hover:rounded-lg hover:bg-slate-500/[.1] w-fit", className)}>{children}</p>
    </CopyToClipboard>
  )
}