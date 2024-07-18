import {STATUS_COLOR} from "../../data.ts";

export default function DisplayVmStatus({status}: { status: string }) {
  console.log(status);
  return <p className={`uppercase font-semibold ${STATUS_COLOR.get(status)}`}>{status}</p>;
}