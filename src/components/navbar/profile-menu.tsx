import { Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import Spinner from "../Spinner-loader";
import { BiChevronDown,BiPlus} from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import NewProjectModal from "../modals/new-project-modal";
import { useState } from "react";
import { useKeycloak } from '@react-keycloak/web';

export default function ProfileMenu() {
  const { keycloak } = useKeycloak();
  const [showModal, setShowModal] = useState(false);

  const headingContent = {
    fontSize: '14px',
    color: 'rgba(34, 51, 84, 0.7)',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    fontWeight: 700,
    lineHeight: 1.75,
  };

  const sub_headingContent = {
    fontSize: '14px',
    color: 'rgba(34, 51, 84, 0.7)',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    fontWeight: 500,
    lineHeight: 1.75,
  };

  if (!keycloak.authenticated) return <Spinner />;

  const firstName = keycloak.tokenParsed?.given_name;
  const lastName = keycloak.tokenParsed?.family_name;
  const email = keycloak.tokenParsed?.email;

  return (
    <Menu>
      <MenuButton
        as={Button}
        color="#673ab7"
        fontWeight={"600"}
        rightIcon={<BiChevronDown />}
      >
        <div className="flex items-center gap-x-2">
          <MdAccountCircle />
          <p className="username_auth">{`${firstName} ${lastName}`}</p>
        </div>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => setShowModal(true)} className="w-full flex items-center justify-between">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={headingContent}>Signed in as</p>
              <p style={sub_headingContent}>{email}</p>
              <hr className="mt-1 border-gray-300" style={{ width: "200px" }} />
            </div>

            <div style={{ display: "flex", marginTop: "7px" }}>
              <p style={{ marginTop: "5px" }}><BiPlus /></p>
              <p className="text-center font-semibold w-full" style={{ marginLeft: "-35px" }}>New Project</p>
            </div>
            <hr className="mt-1 border-gray-300" style={{ width: "200px" }} />
          </div>
        </MenuItem>
        <MenuItem onClick={() => keycloak.logout()} className="w-full flex items-center justify-between">
          <div style={{ display: "flex", gap: "22px" }}>
            <p className="text-red-500"><CiLogout /></p>
            <p className="text-red-500 text-center font-semibold w-full" style={{ marginTop: "-5px" }}>Logout</p>
          </div>
        </MenuItem>
      </MenuList>
      {showModal && <NewProjectModal onClose={() => setShowModal(false)} />}
    </Menu>
  );
}
