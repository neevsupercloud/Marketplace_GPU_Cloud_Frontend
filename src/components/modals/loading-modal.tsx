// import {Spinner} from "@chakra-ui/react";
import Spinner from "../Spinner-loader";

export default function LoadingModal() {
  return (
    <div className="absolute z-50 left-0 right-0 top-0 bottom-0 bg-black/[.5] flex justify-center items-center">
      <div className="container max-w-lg rounded-lg bg-white shadow-lg">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <p className="font-semibold text-black text-lg">Processing...</p>
        </div>
        <div className="p-4 rounded-b-lg flex items-center justify-center">
          <Spinner />
        </div>
      </div>
    </div>
  );
}