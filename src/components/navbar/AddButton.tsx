// AddButton.tsx
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from './Modal';

const AddButton: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveProject = (projectName: string) => {
    console.log('Organization Name:', projectName);
    setModalOpen(false);
  };

  return (
    <>
      <button
        className="text-[#673ab7] p-2 flex items-center justify-center"
        style={{ backgroundColor: "white", borderRadius: "5px", fontWeight: 500 }}
        onClick={handleOpenModal}
      >
        <FaPlus size={20} />
        <div style={{ marginLeft: "5px" }}>Create organization</div>
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveProject} />
    </>
  );
};

export default AddButton;
