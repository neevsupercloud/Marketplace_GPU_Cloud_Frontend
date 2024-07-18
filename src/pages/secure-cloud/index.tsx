import {Menu, MenuItem, MenuList} from "@chakra-ui/react";
import CustomCard from "../../components/custom-card.tsx";
import {vmConfigs} from  "../../data.json";

export default function SecureCloud() {
  return (
    <div className="px-4">
      <div className="container max-w-xl flex justify-center items-center">
        <SelectNetworkVolume/>
      </div>
      <div className="mt-4 container max-w-7xl h-full grid grid-cols-3 gap-4">
        {vmConfigs.map((c, i) => (
          <CustomCard key={i} {...c} />
        ))}
      </div>
    </div>
  );
}

function SelectNetworkVolume() {
  return (
    <Menu>
      {/* <MenuButton
        as={Button}
        color="#2a69ac"
        isDisabled={true}
        rightIcon={<BiChevronDown/>}
      >
        <div className="flex items-center gap-x-2">
          <BiHdd/>
          <p>Select Network Volume</p>
        </div>
      </MenuButton> */}
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
}