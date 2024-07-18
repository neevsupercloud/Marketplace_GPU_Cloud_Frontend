import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {BiChevronDown, BiGlobe} from "react-icons/bi";
import './Navbar.css'

export default function SelectRegion() {
  return (
    <div className="region-city">
    <Menu >
      <MenuButton
        as={Button}
        color="#673ab7"
        fontWeight={"600"}
        rightIcon={<BiChevronDown/>}
       
      >
        <div className="flex items-center gap-x-2 ">
          <BiGlobe/>
          <p className="region-city">Indore</p>
        </div>
      </MenuButton>
      <MenuList>
        <MenuItem>Indore</MenuItem>
      </MenuList>
    </Menu>
    </div>
  );
}