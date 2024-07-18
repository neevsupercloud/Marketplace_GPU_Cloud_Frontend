import {CgClose} from "react-icons/cg";
import {useStore} from "../../store";

export default function ErrorModal() {
  const {setError, error} = useStore();
  const hideErrorModal = () => setError(null);
  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 bg-black/[.5] flex justify-center items-center">
      <div className="container max-w-lg rounded-lg bg-white shadow-lg">
        <div className="p-4 pb-0 flex items-center justify-between">
          {/* <p className="font-semibold text-black text-lg">Error occurred!</p>  */}
          <button onClick={hideErrorModal}><CgClose/></button>
        </div>
        <div className="p-4 rounded-b-lg text-red-500 font-semibold">
          {error}
        </div>
      </div>
    </div>
  );
}