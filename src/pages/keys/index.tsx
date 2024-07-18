import { Button, Box, Flex, Tooltip, useDisclosure } from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import AddKeyModal from "../../components/modals/add-key-modal";
import { useQuery } from "../../store/api";
import { useStore } from "../../store";
import { RiAiGenerate } from "react-icons/ri";
import GenerateKeyModal from "../../components/modals/generate-key-modal";
import useApi from "../../store/useApi";
import SshKeysList from "./ssh-keys-list";
import info from "../../asset/info-pruple.png"
import InfoModal from "./InfoModal"; // import the modal

export default function Keys() {
  const [showModal, setShowModal] = useState<"none" | "add-key" | "generate-key">("none");
  const { project_slug } = useQuery();
  const { currOrg, setSshKeys } = useStore();
  const { getSshKeys } = useApi();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI hook for modal

  useEffect(() => {
    getSshKeys().then(keys => setSshKeys(keys));
  }, [currOrg, project_slug]);

  return (
    <Flex direction="column" align="center" bg="white" w="100%" h="100%" p={4}>
      <Box w="full" maxW="1500px">
        <Flex justify="space-between" align="center" mb={4}>
          <Flex align="center">
            <h2 className="font-Inter font-[600] text-[28px] text-[#3F5175] mx-5">SSH Keys</h2>
            <Tooltip label="Info" aria-label="Info">
              <Box
                className="p-2 rounded-full cursor-pointer bg-[#EEEEEE] ml-2"
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={onOpen} // open the modal
              >
                <img src={info} alt="Info" className="w-6 h-6" />
              </Box>
            </Tooltip>
          </Flex>
          <Flex gap={4}>
            <Button
              leftIcon={<RiAiGenerate />}
              onClick={() => setShowModal("generate-key")}
              bgGradient="linear(to-l, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))"
              color="white"
              borderRadius="30px"
              _hover={{
                bgGradient: 'linear(to-l, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))',
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
              }}
              _active={{
                bgGradient: 'linear(to-l, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))',
                transform: 'translateY(0)',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
              }}
              px="20px"
              py="6"
              className='font-Inter'
            >
              Generate SSH key
            </Button>

            <Button
              leftIcon={<BiPlus />}
              onClick={() => setShowModal("add-key")}
              bgGradient="linear(to-l, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))"
              color="white"
              borderRadius="30px"
              _hover={{
                bgGradient: 'linear(to-l, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))',
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
              }}
              _active={{
                bgGradient: 'linear(to-l, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))',
                transform: 'translateY(0)',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
              }}
              px="20px"
              py="6"
              className='font-Inter'
            >
              Add SSH key
            </Button>
          </Flex>
        </Flex>
        <SshKeysList />
      </Box>
      {showModal === "add-key" && <AddKeyModal onClose={() => setShowModal("none")} />}
      {showModal === "generate-key" && <GenerateKeyModal onClose={() => setShowModal("none")} />}
      <InfoModal isOpen={isOpen} onClose={onClose} /> {/* render the modal */}
    </Flex>
  );
}
