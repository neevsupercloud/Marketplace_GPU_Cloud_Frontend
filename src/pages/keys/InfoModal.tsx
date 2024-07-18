
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
//   Flex,
  IconButton,
  useClipboard
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

interface CodeBlockProps {
  children: string;
}

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CodeBlock({ children }: CodeBlockProps) {
  const { hasCopied, onCopy } = useClipboard(children);

  return (
    <Box position="relative" mb={4} borderRadius="md" bg="gray.100" p={4} shadow="lg" fontFamily="monospace" color="#3f5175">
      <Box as="pre" overflow="auto">
        {children}
      </Box>
      <IconButton
        aria-label="Copy to clipboard"
        icon={<CopyIcon />}
        onClick={onCopy}
        size="sm"
        position="absolute"
        top="3"
        right="2"
        bg="white"
        borderRadius="full"
        shadow="md"
        _hover={{ bg: "gray.200" }}
      >
        {hasCopied ? "Copied" : "Copy"}
      </IconButton>
    </Box>
  );
}

function InfoModal({ isOpen, onClose }: InfoModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
      <ModalContent>
        <ModalHeader style={{color:"#3f5175",fontWeight:700}}>SSH Key Permissions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" style={{color:"#3f5175"}}>Ubuntu / CentOS:</Text>
          <CodeBlock>chmod 400 path/to/sshkey.pem</CodeBlock>

          <Text fontWeight="bold" style={{color:"#3f5175"}}>macOS:</Text>
          <CodeBlock>chmod 400 path/to/sshkey.pem</CodeBlock>
          <CodeBlock>chmod 0644 path/to/sshkey.pem</CodeBlock>

          <Text fontWeight="bold" style={{color:"#3f5175"}}>Windows :</Text>
          <Text fontWeight="bold" style={{color:"#3f5175",fontSize:"13px"}} mt={2}>1. Open Command Prompt</Text>
          <Text fontWeight="bold" style={{color:"#3f5175",fontSize:"13px",marginBottom:"10px"}} mt={2}>2. Navigate to the directory containing your pem file..</Text>
          <CodeBlock>icacls key.pem /inheritance:r</CodeBlock>
          {/* <Text fontWeight="bold" style={{color:"#3f5175"}} mt={2}>WSL (Ubuntu/Debian/etc.):</Text> */}
          <CodeBlock>icacls key.pem /grant:r "%username%:R"</CodeBlock>
        </ModalBody>
        <ModalFooter>
          <Button
            bgGradient="linear(to-l, rgba(181, 44, 246, 1), rgba(74, 145, 247, 1))"
            color="white"
            mr={3}
            onClick={onClose}
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
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InfoModal;
