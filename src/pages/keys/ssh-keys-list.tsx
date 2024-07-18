import { useStore } from "../../store";
import {Box } from "@chakra-ui/react";
import Spinner from "../../components/Spinner-loader";
import SshKeyListItem from "./ssh-key-list-item";

export default function SshKeysList() {
  const { sshKeys } = useStore();
  const isScrollable = sshKeys && sshKeys.length > 5;

  if (!sshKeys) {
    return <Spinner />;
  }

  return (
    <Box p={4} className="overflow-x-auto">
      <Box
        mb={4}
        className="bg-white p-2 rounded-md my-2 shadow-lg border border-gray-300"
        maxH={isScrollable ? "170px" : "auto"} // Fixed height when scrollable
        overflowY={isScrollable ? "auto" : "visible"} // Enable vertical scroll when needed
      >
        <table className="min-w-full bg-white border border-slate-200">
          <thead>
            <tr className="bg-gray-100 border-b border-slate-200">
              <th className="px-4 py-2 text-left" style={{ color: "#3f5175" }}>SSH Key Name</th>
              <th className="px-4 py-2 text-left" style={{ color: "#3f5175" }}>Created On (IST)</th>
              <th className="px-4 py-2 text-center" style={{ color: "#3f5175" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sshKeys.map(k => (
              <SshKeyListItem k={k} key={k.keyID} />
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
