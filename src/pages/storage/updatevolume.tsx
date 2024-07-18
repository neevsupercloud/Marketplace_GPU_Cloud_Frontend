import React, { useState, FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from '@chakra-ui/react';

interface ResizeVolumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResize: (newSize: string) => void;
}

const ResizeVolumeModal: FC<ResizeVolumeModalProps> = ({ isOpen, onClose, onResize }) => {
  const [newSize, setNewSize] = useState('');

  const handleResize = () => {
    onResize(newSize);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="rgba(0, 0, 0, 0.5)" backdropFilter="blur(10px)" />
      <ModalContent borderRadius="10px">
        <ModalHeader color="#3f5175">Resize Volume</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Enter new size (e.g., 10GiB)"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            bg="white"
            color="black"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} color="white">Cancel</Button>
          <Button
            onClick={handleResize}
            bg="linear-gradient(to left, rgb(181, 44, 246), rgb(74, 145, 247))"
            color="white"
            _hover={{
              bg: "linear-gradient(to left, rgb(181, 44, 246), rgb(74, 145, 247))",
              opacity: 0.9
            }}
            ml={3}
          >
            Resize
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResizeVolumeModal;
