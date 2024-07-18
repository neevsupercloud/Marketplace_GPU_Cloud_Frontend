import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import ubuntu from '../../asset/icons8-ubuntu-48.png';
import { useStore } from '../../store';  // Ensure this is correctly imported

interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  created_at: string;
  locations: string[];
  icon?: string;
}

interface ChangeTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSelectedTemplate: (template: Template) => void;
}

const ChangeTemplateModal: React.FC<ChangeTemplateModalProps> = ({ isOpen, onClose, setSelectedTemplate }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const { image, setImage } = useStore();

  useEffect(() => {
    if (isOpen) {
      axios.get('https://api.mkinf.io/v0/images', {
        headers: {
          'Authorization': 'Bearer 4WC70c0pXKICy1AILVtQIBmxcP4KGl'
        }
      }).then(response => {
        setTemplates(response.data.items);
      }).catch(error => {
        console.error('Error fetching templates:', error);
      });
    }
  }, [isOpen]);
 console.log(image)
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent className="h-[80vh] w-[80vh]  w-[80vw] rounded-[10px]">
        <ModalHeader>Templates</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="overflow-y-auto h-[80vh]">
          <div className="mb-4">
            <input type="text" placeholder="Find something to deploy..." className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSelectedTemplate(template);
                  setImage(template.name);  // Update image state with the selected template's name
                  onClose();
                }}
              >
                <img src={ubuntu} alt="" className="w-11 h-14 mr-4" />
                <div>
                  <div className="font-semibold text-gray-800">{template.name}</div>
                  <div className="text-sm text-gray-600">{template.description}</div>
                </div>
              </div>
            ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChangeTemplateModal;
