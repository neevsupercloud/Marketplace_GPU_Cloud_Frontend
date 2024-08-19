import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useStore } from "../../store";

interface DeleteVolumeModalProps {
  vol_name: string;
  onClose: () => void;
}

const DeleteVolumeModal: React.FC<DeleteVolumeModalProps> = ({ vol_name, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setVolumes } = useStore();
  console.log(vol_name)

  const deleteVolume = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.mkinf.io/v0/disks/${vol_name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
        },
      });
      if (response.ok) {
        // Fetch the updated volumes list after deletion
        const updatedResponse = await fetch('https://api.mkinf.io/v0/disks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl',
          },
        });
        const updatedData = await updatedResponse.json();
        setVolumes(updatedData.items);
        onClose();
      } else {
        console.error('Failed to delete volume:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting volume:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Volume</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete the volume "{vol_name}"?
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button
            colorScheme="red"
            onClick={deleteVolume}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteVolumeModal;
